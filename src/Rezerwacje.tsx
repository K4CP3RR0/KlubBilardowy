import { useTitle } from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect, useState } from "react";
import supabase from "./utils/supabase.ts";

interface GrafikRezerwacja {
    id: number;
    status: string;
    imie_goscia: string | null;
    uzytkownik_id: string | null;
    zasoby_rezerwacji: {
        zasob_id: number;
        czas_od: string;
        czas_do: string;
    }[];
}

interface Zasob {
    id: number;
    nazwa: string;
}

function Rezerwacje() {
    useTitle("Grafik Rezerwacji");

    const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA'));
    const [zasoby, setZasoby] = useState<Zasob[]>([]);
    const [rezerwacje, setRezerwacje] = useState<GrafikRezerwacja[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const initGrafik = async () => {
            setLoading(true);

            const { data: { session } } = await supabase.auth.getSession();
            if (session) setCurrentUserId(session.user.id);

            const { data: zasobyData } = await supabase.from('zasoby').select('id, nazwa').order('id', { ascending: true });
            if (zasobyData) setZasoby(zasobyData);

            const startOfDay = `${selectedDate}T00:00:00`;
            const endOfDay = `${selectedDate}T23:59:59`;

            const { data: rezerwacjeData } = await supabase
                .from('rezerwacje')
                .select(`
                    id, status, imie_goscia, uzytkownik_id,
                    zasoby_rezerwacji!inner (
                        zasob_id, czas_od, czas_do
                    )
                `)
                .gte('zasoby_rezerwacji.czas_od', startOfDay)
                .lte('zasoby_rezerwacji.czas_od', endOfDay)
                .neq('status', 'Anulowana');

            if (rezerwacjeData) setRezerwacje(rezerwacjeData as any);
            setLoading(false);
        };
        void initGrafik();
    }, [selectedDate]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
                <div className="bg-white border border-slate-150 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Harmonogram Klubu</h1>
                        <p className="text-slate-500 text-sm mt-0.5">Podgląd zajętości stołów bilardowych oraz tarcz dart na wybrany dzień.</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-blue-600 uppercase tracking-wide">Wybierz dzień podglądu:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-slate-50 text-slate-800 p-2.5 rounded-xl border border-slate-200 outline-none text-sm font-semibold focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-slate-500 font-semibold py-20">Generowanie widoku harmonogramu...</div>
                ) : (
                    <div className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-150 text-slate-500 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold w-[30%]">Nazwa Stołu / Stanowiska</th>
                                <th className="px-6 py-4 font-bold w-[70%]">Zarezerwowane godziny w dniu dzisiejszym</th>
                            </tr>
                            </thead>
                            <tbody>
                            {zasoby.map((zasob) => {
                                const zasobRezerwacje = rezerwacje.filter(r => r.zasoby_rezerwacji[0]?.zasob_id === zasob.id);

                                return (
                                    <tr key={zasob.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition">
                                        <td className="px-6 py-5 font-bold text-slate-900 border-r border-slate-100">
                                            {zasob.nazwa}
                                        </td>
                                        <td className="px-6 py-5">
                                            {zasobRezerwacje.length === 0 ? (
                                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Brak rezerwacji — wolny cały dzień</span>
                                            ) : (
                                                <div className="flex flex-wrap gap-2">
                                                    {zasobRezerwacje.map((r, idx) => {
                                                        const jestMoja = r.uzytkownik_id === currentUserId;
                                                        const odStr = new Date(r.zasoby_rezerwacji[0].czas_od).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                        const doStr = new Date(r.zasoby_rezerwacji[0].czas_do).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                                        return (
                                                            <div
                                                                key={r.id}
                                                                className={`text-xs font-medium px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                                                                    jestMoja
                                                                        ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold'
                                                                        : 'bg-slate-100 border-slate-200 text-slate-600'
                                                                }`}
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                                {odStr} - {doStr} ({jestMoja ? "Twoja rezerwacja" : `Zajęte (Klient #${idx + 1})`})
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Rezerwacje;