import { useEffect, useState } from "react";
import supabase from "../utils/supabase.ts";

interface Rezerwacja {
    id: number;
    status: string;
    imie_goscia: string | null;
    telefon_goscia: string | null;
    uzytkownik_id: string | null;
    zasoby_rezerwacji: {
        id: number;
        czas_od: string;
        czas_do: string;
    }[];
}

interface UserListItem {
    id: string;
    imie: string;
    nazwisko: string;
    telefon: string;
}

function Popover({ id, type, status: resourceStatus }: { id: number; type: string; status: string }) {
    const [rezerwacje, setRezerwacje] = useState<Rezerwacja[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isGuest, setIsGuest] = useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [userResults, setUserResults] = useState<UserListItem[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<number | null>(null);

    const fetchRezerwacje = async () => {
        setLoading(true);
        const todayStr = new Date().toLocaleDateString('en-CA');

        const { data, error } = await supabase
            .from('rezerwacje')
            .select(`
                id, status, imie_goscia, telefon_goscia, uzytkownik_id,
                zasoby_rezerwacji!inner (
                    id, czas_od, czas_do
                )
            `)
            .eq('zasoby_rezerwacji.zasob_id', id)
            .gte('zasoby_rezerwacji.czas_od', todayStr)
            .neq('status', 'Anulowana')
            .order('czas_od', { foreignTable: 'zasoby_rezerwacji', ascending: true });

        if (!error && data) {
            setRezerwacje(data as any);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) {
            fetchRezerwacje();
            const checkSession = async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setCurrentUserId(session.user.id);
                    const { data } = await supabase
                        .from('uzytkownicy')
                        .select('rola_id')
                        .eq('id', session.user.id)
                        .single();
                    if (data) setCurrentUserRole(data.rola_id);
                }
            };
            void checkSession();
        }
    }, [id]);

    const handleSearchUser = async () => {
        if (searchQuery.length < 2) return;
        const { data, error } = await supabase
            .from('uzytkownicy')
            .select('id, imie, nazwisko, telefon')
            .or(`nazwisko.ilike.%${searchQuery}%,imie.ilike.%${searchQuery}%`)
            .limit(5);

        if (!error && data) {
            setUserResults(data);
        } else {
            alert("Nie znaleziono użytkownika");
        }
    };

    const handleUpdateStatus = async (resId: number, newStatus: string) => {
        const { error } = await supabase
            .from('rezerwacje')
            .update({ status: newStatus })
            .eq('id', resId);

        if (!error) fetchRezerwacje();
    };

    const handleClientCancel = async (res: Rezerwacja) => {
        const czasOdStr = res.zasoby_rezerwacji[0]?.czas_od;
        if (!czasOdStr) return;
        const czasRozpoczecia = new Date(czasOdStr);
        const teraz = new Date();
        const roznicaMinut = (czasRozpoczecia.getTime() - teraz.getTime()) / 60000;
        if (roznicaMinut < 15) {
            alert("Błąd: Nie możesz anulować rezerwacji na mniej niż 15 minut przed jej rozpoczęciem.");
            return;
        }
        if (confirm("Czy na pewno chcesz anulować swoją rezerwację?")) {
            await handleUpdateStatus(res.id, 'Anulowana');
        }
    };

    const handleSave = async () => {
        setFormError(null);
        const start = new Date(timeFrom);
        const end = new Date(timeTo);

        const durationMin = (end.getTime() - start.getTime()) / 60000;
        if (durationMin < 30) return setFormError("Minimalny czas to 30 minut.");
        if (start < new Date()) return setFormError("Nie można rezerwować w przeszłości.");

        if (phone.trim() !== "") {
            const phoneRegex = /^(?:\+\d{1,3}[ -]?)?(\d[ -]?){9}$/;
            if (!phoneRegex.test(phone.trim())) {
                return setFormError("Wprowadź poprawny 9-cyfrowy numer telefonu.");
            }
        }

        setIsSaving(true);
        const { data: { session } } = await supabase.auth.getSession();

        const { data: overlaps } = await supabase
            .from('zasoby_rezerwacji')
            .select('id')
            .eq('zasob_id', id)
            .lt('czas_od', timeTo)
            .gt('czas_do', timeFrom);

        if (overlaps && overlaps.length > 0) {
            setIsSaving(false);
            return setFormError("Ten termin jest już zajęty przez inną rezerwację.");
        }

        const { data: res, error: err1 } = await supabase.from('rezerwacje').insert([{
            uzytkownik_id: isGuest ? null : selectedUserId,
            imie_goscia: name || "Gość",
            telefon_goscia: phone || null,
            status: 'Oczekiwanie',
            utworzono_przez_id: session?.user.id
        }]).select().single();

        if (err1) {
            setIsSaving(false);
            return alert(`Błąd: ${err1.message}`);
        }

        const { error: err2 } = await supabase.from('zasoby_rezerwacji').insert([{
            rezerwacja_id: res.id,
            zasob_id: Number(id),
            czas_od: timeFrom,
            czas_do: timeTo
        }]);

        if (err2) {
            setIsSaving(false);
            return alert("Błąd przypisania czasu.");
        }

        await supabase.from('zasoby').update({ status: 'Zajęty' }).eq('id', id);
        window.location.reload();
    };

    return (
        <div popover="auto" id={String(id)} className="fixed inset-0 m-auto w-[450px] h-fit min-h-64 p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl text-slate-800 overflow-visible">
            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {type.includes('#') ? type.split('#')[0].trim() : type} <span className="text-blue-600">#{id}</span>
                    </h2>
                    <p className="text-blue-600 mt-1 uppercase text-[10px] font-bold tracking-widest bg-blue-50 px-2.5 py-0.5 inline-block rounded-full">{resourceStatus}</p>
                </div>

                <div className="w-full">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Dzisiejszy Grafik:</p>
                    <div className="bg-slate-50 border border-slate-150 p-3 rounded-lg text-sm max-h-40 overflow-y-auto space-y-2">
                        {loading ? "Ładowanie..." : rezerwacje.length === 0 ? "Brak rezerwacji na dziś" :
                            rezerwacje.map((r, index) => {
                                const jestMoja = r.uzytkownik_id === currentUserId;
                                const czyPracownik = currentUserRole === 1;

                                const wyswietlanaNazwa = czyPracownik || jestMoja
                                    ? r.imie_goscia
                                    : `Gość #${index + 1}`;

                                return (
                                    <div key={r.id} className="border-b border-slate-200 pb-2 last:border-0 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-[11px] text-blue-700">
                                                {new Date(r.zasoby_rezerwacji[0].czas_od).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {wyswietlanaNazwa}
                                            </p>
                                            <span className="text-[9px] uppercase text-slate-400 font-semibold">Status: {r.status}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {czyPracownik && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(r.id, 'Zrealizowano')} className="bg-emerald-600 p-1 px-2 rounded text-[9px] text-white font-bold hover:bg-emerald-700 transition-colors">ZREALIZOWANO</button>
                                                    <button onClick={() => handleUpdateStatus(r.id, 'Anulowana')} className="bg-rose-600 p-1 px-2 rounded text-[9px] text-white font-bold hover:bg-rose-700 transition-colors">ANULUJ</button>
                                                </>
                                            )}
                                            {!czyPracownik && jestMoja && (
                                                <button onClick={() => handleClientCancel(r)} className="bg-rose-600 p-1 px-2 rounded text-[9px] text-white font-bold hover:bg-rose-700 transition-colors">ANULUJ MOJĄ</button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <hr className="border-slate-150" />

                <div className="space-y-4">
                    {currentUserRole === 1 && (
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button onClick={() => { setIsGuest(true); setName(""); setPhone(""); setSelectedUserId(null); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${isGuest ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>GOŚĆ</button>
                            <button onClick={() => { setIsGuest(false); setName(""); setPhone(""); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${!isGuest ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>STAŁY KLIENT</button>
                        </div>
                    )}

                    {currentUserRole === 1 && !isGuest && (
                        <div className="relative">
                            <div className="flex gap-2">
                                <input type="text" placeholder="Nazwisko lub Imię..." className="flex-1 bg-slate-50 p-2 rounded-lg text-xs outline-none border border-slate-200 text-slate-800" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                                <button onClick={handleSearchUser} className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg text-[10px] font-bold">SZUKAJ</button>
                            </div>
                            {userResults.length > 0 && (
                                <div className="absolute w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                                    {userResults.map(u => (
                                        <div key={u.id} className="p-2 hover:bg-slate-50 cursor-pointer text-xs border-b border-slate-100 text-slate-700 last:border-0" onClick={() => {
                                            setSelectedUserId(u.id);
                                            setName(`${u.imie} ${u.nazwisko}`);
                                            setPhone(u.telefon);
                                            setUserResults([]);
                                            setSearchQuery("");
                                        }}>
                                            {u.imie} {u.nazwisko} ({u.telefon})
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={name} placeholder="Imię i Nazwisko" className="col-span-2 bg-slate-50 p-2 rounded-lg text-xs outline-none border border-slate-200 text-slate-800" onChange={e => setName(e.target.value)} />
                        <input type="text" value={phone} placeholder="Telefon" className="col-span-2 bg-slate-50 p-2 rounded-lg text-xs outline-none border border-slate-200 text-slate-800" onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500">
                        <div className="flex flex-col gap-1">
                            <label className="text-blue-600 uppercase tracking-wide">OD:</label>
                            <input type="datetime-local" className="bg-slate-50 p-2 rounded-lg text-slate-800 text-xs border border-slate-200" onChange={e => setTimeFrom(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-blue-600 uppercase tracking-wide">DO:</label>
                            <input type="datetime-local" className="bg-slate-50 p-2 rounded-lg text-slate-800 text-xs border border-slate-200" onChange={e => setTimeTo(e.target.value)} />
                        </div>
                    </div>

                    {formError && <div className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] p-2 rounded-lg font-bold text-center">{formError}</div>}

                    <button onClick={handleSave} disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 p-4 rounded-2xl font-black text-white shadow-md transition-all active:scale-95">
                        {isSaving ? "ZAPISYWANIE" : "POTWIERDŹ REZERWACJĘ"}
                    </button>
                    <button popoverTarget={String(id)} popoverTargetAction="hide" className="w-full text-[10px] text-slate-400 uppercase font-bold tracking-widest py-2 hover:text-slate-600 transition-colors">Zamknij panel</button>
                </div>
            </div>
        </div>
    );
}

export default Popover;