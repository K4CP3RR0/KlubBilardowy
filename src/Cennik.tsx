import {useTitle} from "./hooks/useTitle.tsx";
import  supabase  from './utils/supabase';
import {useEffect, useState} from "react";

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
        return <div className="text-center text-white mt-10">Ładowanie cennika</div>
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
        <div className="mb-10 text-white">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <table>
                <tbody>
                    {items.map((item) => {
                        const { timeLabel, taryfa } = getRowData(item);
                        const isSelected= checkIfActive(item);
                        return (
                            <tr key={item.id} className="border-b border-gray-700">
                                <td className="px-6 py-4">{dniTygodnia[item.dzien_tygodnia]}</td>
                                <td className={`px-6 py-4 flex items-center gap-2 ${isSelected ? 'bg-emerald-500/10 text-emerald-400' : ''}`}>
                                    {timeLabel}
                                    {isSelected && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    )}
                                </td>
                                <td className="px-6 py-4">{taryfa}</td>
                                <td className="px-6 py-4 font-bold">{item.cena_za_godzine} PLN</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <header className="mb-16 text-center text-white">
                    <h1 className="text-3xl font-light uppercase tracking-widest">Cennik Usług</h1>
                    <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                        <span className="text-3xl font-mono">{currentTime.toLocaleTimeString('pl-PL')}</span>
                    </div>
                </header>
                {renderPriceTable("Bilard", cennik.filter(i => i.typ_zasobu_id === 1))}
            </div>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Cennik usług</h1>
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
                <table className="min-w-full bg-gray-800 text-white">
                    <thead className="bg-gray-900">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dzień tygodnia</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Godziny</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cena za godzinę</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                    {cennik.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                {dniTygodnia[item.dzien_tygodnia] || "Nieznany"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.czas_od.slice(0, 5)} - {item.czas_do.slice(0, 5)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-bold text-green-400">
                                {item.cena_za_godzine} PLN
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-400">Dni powszednie</p>
                    <p className="text-xl font-bold text-white">30 - 35 PLN</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-400">Weekend</p>
                    <p className="text-xl font-bold text-white">40 - 45 PLN</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-400">Niedziela</p>
                    <p className="text-xl font-bold text-white">40 PLN (cały dzień)</p>
                </div>
            </div>

            {/*{renderPriceTable("Bilard", cennik.filter(i => i.typ_zasobu_id === 1))}*/}
            {/*{renderPriceTable("Dart", cennik.filter(i => i.typ_zasobu_id === 2))}*/}
        </div>

    );
};

export default Cennik;
