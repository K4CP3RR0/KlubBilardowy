import { useEffect, useState } from "react";
import supabase from "../utils/supabase.ts";

interface Rezerwacje {
    id: number;
    status: string;
    imie_goscia: string | null;
    telefon_goscia: string | null;
    zasoby_rezerwacji: {
        id: number;
        czas_od: string;
        czas_do: string;
        zasoby: {
            id: number;
            nazwa: string;
            status: string;
        };
    }[];
}

{/* oli:
na jutro/srode:

    rozbije ten popover na komponenty/hooki
    komponent pod wyglad, hook pod logike
    1. usersearch - rozwijana lista uzytkownikow
    2. timepick - wybor czasu / obsluga czasu

*/}
function Popover({ id, type, status }: { id: number; type: string; status: string }) {
    const [rezerwacje, setRezerwacje] = useState<Rezerwacje[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isGuest, setIsGuest] = useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [timeFrom, setTimeFrom] = useState("");
    const [timeTo, setTimeTo] = useState("");

    const [formError, setFormError] = useState<string | null>(null);

    const fetchRezerwacje = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('rezerwacje')
            .select(`
                id, status, imie_goscia, telefon_goscia,
                zasoby_rezerwacji!inner (
                    id, czas_od, czas_do,
                    zasoby ( id, nazwa, status )
                )
            `).eq('zasoby_rezerwacji.zasob_id', id);

        if (!error && data) {
            setRezerwacje(data as unknown as Rezerwacje[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id) fetchRezerwacje(); {/*oli: kaskadowe rendery - musze doczytac*/}
    }, [id]);

    const handleSearchUser = async () => {
        const { data, error } = await supabase
            .from('uzytkownicy')
            .select('id, imie, nazwisko, telefon')
            .ilike('nazwisko', `%${searchQuery}%`)
            .limit(1).single();
        {/*oli: Do poprawki, .limit(1).single() bo uzupelnia dane z stalego klienta do formularza przy zapisywaniu rezerwacji,
            ale dziala to jedynie dla jednego wybranego. musi byc stworzona rozwijana lista, zeby wiedziec kogo konkretnie wybrac,
            [imie-nazwisko-koncowka telefonu/telefon]

        */}

        if (data) {
            setSelectedUserId(data.id);
            setName(`${data.imie} ${data.nazwisko}`);
            setPhone(data.telefon || "");
        } else if (error) {
            alert("Nie znaleziono użytkownika");
        }
    };

    const handleSave = async () => {
        {/* oli:
            caly handlesave jest pseudo-transkacja:
            dzieli sie na:
            1. tworzenie rekordu rezerwacji
            2. laczenie z zasobem w zasoby_rezerwacje
            3. zmiana status stolu [potwierdzona/zajety]
        */}

        setFormError(null);
        const now = new Date();
        const start = new Date(timeFrom);
        const end = new Date(timeTo);
        const nameRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$/;
        if (!timeFrom || !timeTo) return setFormError("Wybierz pełny zakres czasu.");
        if (start < now) return setFormError("Nie można rezerwować stolika w przeszłości.");
        if (end <= start) return setFormError("Godzina zakończenia musi być późniejsza niż rozpoczęcia.");
        if (!isGuest && !selectedUserId) return setFormError("Musisz wybrać użytkownika z listy.");
        if (name.length < 3) return setFormError("Imię i nazwisko jest za krótkie.");
        if (!nameRegex.test(name)) return setFormError("Imię i nazwisko nie może zawierać cyfr ani znaków specjalnych.");
        if (!timeFrom || !timeTo) return alert("Wybierz czas rezerwacji");
        setIsSaving(true);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            setIsSaving(false);
            return alert("Musisz być zalogowany");
        }


        const { data: res, error: err1 } = await supabase.from('rezerwacje').insert([{
            uzytkownik_id: isGuest ? null : selectedUserId,
            imie_goscia: name || "Gość",
            telefon_goscia: phone || null,
            status: 'Potwierdzona',
            utworzono_przez_id: session.user.id
        }]).select().single();



        if (err1) {
            console.error(err1);
            setIsSaving(false);
            return alert(`Błąd rezerwacji: ${err1.message}`);
        }

        const { error: err2 } = await supabase.from('zasoby_rezerwacji').insert([{
            rezerwacja_id: res.id,
            zasob_id: Number(id),
            czas_od: new Date(timeFrom).toISOString(),
            czas_do: new Date(timeTo).toISOString()
        }]);

        if (err2) {
            console.error(err2);
            setIsSaving(false);
            return alert(`Błąd przypisania stołu: ${err2.message}`);
        }

        await supabase.from('zasoby').update({ status: 'Zajęty' }).eq('id', id);
        alert("Dodano rezerwację");
        window.location.reload();
    };

    return (
        <div popover="auto" id={String(id)} className="fixed inset-0 m-auto w-112.5 h-fit min-h-64 p-8 rounded-3xl bg-[#03346E] border border-white/20 shadow-2xl text-white overflow-hidden">
            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        {type} <span className="text-green-400">#{id}</span>
                    </h2>
                    <p className="text-blue-200 mt-1 uppercase text-[10px] font-bold tracking-widest">{status}</p>
                </div>
                <div className="w-full">
                    <p className="text-[10px] font-bold text-blue-300 uppercase mb-2">Aktualne rezerwacje:</p>
                    <div className="bg-black/20 p-3 rounded-lg text-sm max-h-32 overflow-y-auto">
                        {loading ? "Ładowanie" : rezerwacje.length === 0 ? "Brak rezerwacji" :
                            rezerwacje.map((r) => (
                                <div key={r.id} className="border-b border-white/10 py-1 last:border-0">
                                    <span className="font-bold text-green-400">ID: {r.id}</span> | {r.imie_goscia || "Anonim"}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <hr className="border-white/10" />
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-blue-300 uppercase">Nowa rezerwacja:</p>
                    <div className="flex bg-black/40 p-1 rounded-xl">
                        <button onClick={() => { setIsGuest(true); setName(""); setPhone(""); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${isGuest ? 'bg-blue-600' : ''}`}>GOŚĆ</button>
                        <button onClick={() => { setIsGuest(false); setName(""); setPhone(""); }} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition-all ${!isGuest ? 'bg-blue-600' : ''}`}>STAŁY KLIENT</button>
                    </div>
                    {!isGuest && (
                        <div className="flex gap-2">
                            <input type="text" placeholder="Nazwisko..." className="flex-1 bg-white/10 p-2 rounded-lg text-xs outline-none border border-white/5" onChange={e => setSearchQuery(e.target.value)} />
                            <button onClick={handleSearchUser} className="bg-blue-600 hover:bg-blue-500 px-3 rounded-lg text-[10px] font-bold">SZUKAJ</button>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={name} placeholder="Imię i Nazwisko" className="col-span-2 bg-white/10 p-2 rounded-lg text-xs outline-none border border-white/5" onChange={e => setName(e.target.value)} />
                        <input type="text" value={phone} placeholder="Telefon" className="col-span-2 bg-white/10 p-2 rounded-lg text-xs outline-none border border-white/5" onChange={e => setPhone(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-blue-300">
                        <div className="flex flex-col gap-1">
                            <label>OD:</label>
                            <input type="datetime-local" className="bg-white/10 p-2 rounded-lg text-white text-xs border border-white/5" onChange={e => setTimeFrom(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>DO:</label>
                            <input type="datetime-local" className="bg-white/10 p-2 rounded-lg text-white text-xs border border-white/5" onChange={e => setTimeTo(e.target.value)} />
                        </div>
                    </div>
                    {formError && (
                        <div className="bg-red-500/20 border border-red-500 text-red-200 text-[10px] p-2 rounded-lg font-bold text-center animate-pulse">
                            Błąd: {formError}
                        </div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 p-4 rounded-2xl font-black text-white shadow-lg transition-all active:scale-95"
                    >
                        {isSaving ? "ZAPISYWANIE..." : "ZATWIERDŹ INSERT"}
                    </button>

                    <button popoverTarget={String(id)} popoverTargetAction="hide" className="w-full text-[10px] text-white/40 uppercase font-bold tracking-widest py-2">
                        Zamknij panel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popover;