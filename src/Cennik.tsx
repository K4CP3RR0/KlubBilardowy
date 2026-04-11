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
        <div className="mb-10 text-[#f5f5dc]">
            <h2 className="text-xl montserrat-extrabold mb-4">{title}</h2>
                <div className="bg-[#1A1A1B] border border-slate-800 rounded-xl overflow-hidden overflow-x-auto shadow-2xl">
                    <table className="min-w-1/2 w-full table-auto md:table-fixed border-collapse">
                        <thead className="bg-[#05070a] border-b border-slate-800">
                            <tr>
                                <th className="w-[25%] px-6 py-5 text-[11px] montserrat-extrabold text-[#f5f5dc] text-center uppercase">Dzień</th>
                                <th className="w-[30%] px-6 py-5 text-[11px] montserrat-extrabold text-[#f5f5dc] text-center uppercase">Przedział</th>
                                <th className="w-[20%] px-6 py-5 text-[11px] montserrat-extrabold text-[#f5f5dc] text-center uppercase">Status</th>
                                <th className="w-[25%] px-6 py-5 text-[11px] montserrat-extrabold text-[#f5f5dc] text-center uppercase">Cena / h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => {
                                const { timeLabel, taryfa } = getRowData(item);
                                const isSelected= checkIfActive(item);
                                const isNewDay = index === 0 || items[index - 1].dzien_tygodnia !== item.dzien_tygodnia;

                                return (
                                    <tr key={item.id} className={`border-b border-gray-700 montserrat-light ${isSelected ? 'bg-emerald-500/10 text-emerald-400' : ''}`}>
                                        <td className="px-2 md:px-6 py-4 text-center">
                                            {isNewDay ? dniTygodnia[item.dzien_tygodnia]:""}
                                        </td>
                                        <td className={`px-2 md:px-6 py-4 flex items-center justify-center gap-2 `}>{timeLabel}</td>
                                        <td className="px-2 md:px-6 py-4 text-center">{taryfa}</td>
                                        <td className="px-2 md:px-6 py-4 montserrat-extrabold text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {item.cena_za_godzine} PLN
                                                {isSelected && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
        <div>
        <div className="container mx-auto px-4 py-8">
            {renderPriceTable("Bilard", cennik.filter(i => i.typ_zasobu_id === 1))}
            {renderPriceTable("Dart", cennik.filter(i => i.typ_zasobu_id === 2))}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1A1A1B] p-4 rounded-lg border-l-4 border-[#00e5ff]">
                    <p className="text-sm text-gray-400">Dni powszednie</p>
                    <p className="text-xl montserrat-extrabold text-[#f5f5dc]">30 - 35 PLN</p>
                </div>
                <div className="bg-[#1A1A1B] p-4 rounded-lg border-l-4 border-[#00e5ff]">
                    <p className="text-sm text-gray-400">Weekend</p>
                    <p className="text-xl montserrat-extrabold text-[#f5f5dc]">40 - 45 PLN</p>
                </div>
                <div className="bg-[#1A1A1B] p-4 rounded-lg border-l-4 border-[#00e5ff]">
                    <p className="text-sm text-gray-400">Niedziela</p>
                    <p className="text-xl montserrat-extrabold text-[#f5f5dc]">40 PLN (cały dzień)</p>
                </div>
            </div>

        </div>
    <Footer/>
    </div>
    );
};

export default Cennik;
