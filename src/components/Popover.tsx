
import {useEffect, useState} from "react";
import supabase from "../utils/supabase.ts";
interface Rezerwacje{
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
    }[];}
    
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function Popover({ id, type, status}) {
    const [rezerwacje, setRezerwacje] = useState<Rezerwacje[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRezerwacje = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('rezerwacje')
                .select(`
                id,
                status,
                imie_goscia,
                telefon_goscia,
                zasoby_rezerwacji!inner (
                    id,
                    czas_od,
                    czas_do,
                    zasoby (
                        id,
                        nazwa,
                        status
                    )
                )
            `).eq('zasoby_rezerwacji.zasob_id', id);
            if (!error && data) {
                setRezerwacje(data as unknown as Rezerwacje[]);
            } else {
                console.error("Błąd pobierania:", error);
            }
            console.log(loading);
            setLoading(false);
        };
        if (id) {
            fetchRezerwacje();
        }
    }, [id]);

    return (
        <div popover="auto" id={id} className="fixed inset-0 m-auto w-80 h-fit min-h-64 p-6 rounded-2xl bg-[#03346E] border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center justify-between h-full gap-6">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-white">
                        {type} <span className="text-green-400">#{id}</span>
                    </h2>
                    <p className="text-blue-200 mt-1 uppercase text-xs font-bold tracking-widest">{status}</p>
                </div>
                <div className="w-full space-y-2">
                    <div className="bg-black/20 p-3 rounded-lg text-white text-sm">
                        {rezerwacje.map((rezerwacja)=>{
                            console.log(rezerwacja);
                            return(
                                <div>
                                    <p>{rezerwacja.id}</p>
                                    <p>{rezerwacja.status}</p>
                                </div>

                            );
                        })}
                    </div>
                </div>

                <button popoverTarget={id} popoverTargetAction="hide" className="w-full rounded-xl bg-green-500 hover:bg-green-600 text-white p-4 font-bold transition-all shadow-lg active:scale-95">
                    Wróć do panelu
                </button>
            </div>
        </div>
    );
};



export default Popover;