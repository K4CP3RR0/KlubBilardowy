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

    const renderPriceTable = (title: string, items: CennikItem[]) => (
        <div className="mb-10 text-white">
            <h2>{title}</h2>
            <table>
                {items.map((item) => {
                    const { timeLabel, taryfa } = getRowData(item);
                    return (
                        <tr key={item.id}>
                            <td>{dniTygodnia[item.dzien_tygodnia]}</td>
                            <td>{timeLabel}</td>
                            <td>{taryfa}</td>
                            <td>{item.cena_za_godzine} PLN</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
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
            {renderPriceTable("Bilard", cennik.filter(i => i.typ_zasobu_id === 1))}
            {renderPriceTable("Dart", cennik.filter(i => i.typ_zasobu_id === 2))}
        </div>
    );
};

export default Cennik;
