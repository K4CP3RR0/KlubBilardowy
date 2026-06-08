import { useTitle } from "./hooks/useTitle.tsx";
import TableCard from "./components/TableCard.tsx";
import Footer from "./components/Footer.tsx";
import { useEffect, useState } from "react";
import supabase from "./utils/supabase.ts";

interface Zasob {
    id: number;
    nazwa: string;
    status: string;
    typ_id: number;
    typy_zasobow: {
        nazwa: string;
    } | null;
}

function PanelUzytkownika() {
    useTitle("Panel Użytkownika");
    const [zasoby, setZasoby] = useState<Zasob[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchZasoby = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('zasoby').select('id,typ_id,nazwa,status');

            if (!error && data) {
                setZasoby(data as unknown as Zasob[]);
            } else {
                console.error(error);
            }
            setLoading(false);
        };
        fetchZasoby();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                <div className="mb-8 border-b border-slate-100 pb-5">
                    <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Panel Klienta</span>
                    <h1 className="text-4xl font-black text-slate-900 mt-3">Twoje Rezerwacje</h1>
                    <p className="text-slate-500 text-sm mt-1.5">Wybierz stół lub tarcze, sprawdź wolne godziny i dodaj rezerwację.</p>
                </div>

                {loading ? (
                    <div className="text-center text-slate-500 font-semibold py-20">Ładowanie zasobów...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {zasoby.map((zasob) => {
                            const typNazwa = zasob.nazwa;
                            const imagePath = zasob.typ_id === 2 ? '/dart.png' : '/pool-table.svg';
                            return (
                                <TableCard
                                    key={zasob.id}
                                    id={zasob.id.toString()}
                                    type={typNazwa}
                                    status={zasob.status}
                                    image={imagePath}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default PanelUzytkownika;