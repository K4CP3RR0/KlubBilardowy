import {useTitle} from "./hooks/useTitle.tsx";
import  supabase  from './utils/supabase';
import {useEffect, useState} from "react";
import Footer from "./components/Footer.tsx";

interface CennikItem {
    id: number;
    typ_zasobu_id: number;
    dzien_tygodnia: number;
    czas_od: string;
    czas_do: string;
    cena_za_godzine: number;
}

const dniTygodnia: Record<number, string> = {
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "Piątek",
    6: "Sobota",
    7: "Niedziela",
};

const Cennik = () => {
    useTitle("Cennik");
    const [cennik, setCennik] = useState<CennikItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchCennik = async () => {
            const { data, error } = await supabase
                .from('cenniki')
                .select('*')
                .order('dzien_tygodnia',{ascending: true})
                .order('czas_od',{ascending: true});
            if (!error && data){
                setCennik(data);
            }
            setLoading(false);
        };
        fetchCennik();
    },[]);

    if (loading) {
        return <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center">
            <div className="text-slate-600 font-bold text-lg animate-pulse">
                Ładowanie cennika...
            </div>
        </div>
    }

    const getRowData = (item: CennikItem) => {
        const isSunday = item.dzien_tygodnia === 7;
        const isEvening = item.czas_od.startsWith("18");
        return {
            timeLabel: isSunday ? "Cały dzień" : (isEvening ? "Po 18:00" : "Przed 18:00"),
            taryfa: isEvening ? "WIECZORNA" : "DZIENNA",
            isEvening
        };
    };

    const checkIfActive = (item: CennikItem) => {
        const currentDay = currentTime.getDay() === 0 ? 7 : currentTime.getDay();
        const currentHour = currentTime.getHours();
        if (item.dzien_tygodnia !== currentDay) return false;
        const isEveningTariff = item.czas_od.startsWith("18");
        if (currentDay === 7) return true;
        return isEveningTariff ? currentHour >= 18 : currentHour < 18;
    };

    const renderPriceTable = (title: string, items: CennikItem[]) => (
        <div className="mb-10 text-slate-900">
            <h2 className="text-xl montserrat-extrabold mb-4">{title}</h2>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="min-w-1/2 w-full table-auto md:table-fixed border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="w-[25%] px-6 py-5 text-[11px] montserrat-extrabold text-slate-500 text-center uppercase">Dzień</th>
                        <th className="w-[30%] px-6 py-5 text-[11px] montserrat-extrabold text-slate-500 text-center uppercase">Przedział</th>
                        <th className="w-[20%] px-6 py-5 text-[11px] montserrat-extrabold text-slate-500 text-center uppercase">Status</th>
                        <th className="w-[25%] px-6 py-5 text-[11px] montserrat-extrabold text-slate-500 text-center uppercase">Cena / h</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => {
                        const { timeLabel, taryfa } = getRowData(item);
                        const isSelected = checkIfActive(item);
                        const isNewDay = index === 0 || items[index - 1].dzien_tygodnia !== item.dzien_tygodnia;

                        // Co drugi wiersz (taryfa wieczorna) dostaje mocniejszą linię oddzielającą dni tygodnia
                        const czyKoniecDnia = index % 2 === 1;

                        return (
                            <tr
                                key={item.id}
                                className={`text-slate-700 hover:bg-slate-50/50 transition montserrat-light 
                                            ${czyKoniecDnia ? 'border-b-2 border-slate-200' : 'border-b border-slate-100'} 
                                            ${isSelected ? 'bg-emerald-500/20 text-emerald-800 font-semibold' : ''}`}
                            >
                                <td className="px-6 py-4 text-center font-medium text-slate-900">
                                    {isNewDay ? dniTygodnia[item.dzien_tygodnia] : ""}
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center gap-2">{timeLabel}</td>
                                <td className="px-6 py-4 text-center">{taryfa}</td>
                                <td className="px-6 py-4 montserrat-extrabold text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {item.cena_za_godzine} PLN
                                        {isSelected && (
                                            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
                <div className="mb-8 border-b border-slate-200 pb-5">
                <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Cennik usług klubu
                </span>
                    <h1 className="text-4xl font-black text-slate-900 mt-3">Przejrzyste Taryfy</h1>
                    <p className="text-slate-500 text-sm mt-1.5">
                        Aktualne stawki godzinowe za wynajem stołów bilardowych oraz stanowisk dart.
                    </p>
                </div>

                {renderPriceTable("Bilard", cennik.filter(i => i.typ_zasobu_id === 1))}
                {renderPriceTable("Dart", cennik.filter(i => i.typ_zasobu_id === 2))}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Dni powszednie</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">30 - 35 PLN</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Weekend</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">40 - 45 PLN</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                        <p className="text-xs text-slate-500 uppercase font-semibold">Niedziela</p>
                        <p className="text-2xl font-black text-slate-900 mt-1">40 PLN (cały dzień)</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cennik;
