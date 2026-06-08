import  supabase  from './utils/supabase';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
//import Logout from './Logout';
import pictureOne from  './assets/images/picture1.jpg'
import Footer from "./components/Footer.tsx";

function App() {
    const [userRole, setUserRole] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data, error } = await supabase
                    .from('uzytkownicy')
                    .select('rola_id')
                    .eq('id', session.user.id)
                    .single();

                if (!error && data) {
                    setUserRole(data.rola_id);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        };

        void checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') void checkUser();
            if (event === 'SIGNED_OUT') {
                setUserRole(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const getReservationLink = () => {
        if (loading) return '#';
        if (userRole === 1) return '/panel-pracownika';
        if (userRole === 2) return '/panel-uzytkownika';
        return '/logowanie';
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

                    <div className="lg:col-span-5 space-y-8 text-left">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                                / EST. 2016 / BYDGOSZCZ
                            </p>
                            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                MAXIMUS <br />
                                <span className="text-blue-600">BILARD & DART</span>
                            </h1>
                        </div>

                        <div className="border-l-2 border-slate-900 pl-4 space-y-2">
                            <p className="text-slate-700 text-sm font-medium leading-relaxed">
                                Dziewięć stołów turniejowych, profesjonalne tarcze sizalowe do darta i rzemieślnicze piwo. Rezerwujesz stanowisko bezpośrednio przez system, bez zbędnego dzwonienia.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link
                                to={getReservationLink()}
                                className={`text-center font-bold px-6 py-4 rounded-lg tracking-wide transition-colors duration-200 text-xs uppercase ${
                                    loading
                                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        : 'bg-slate-900 hover:bg-blue-600 text-white'
                                }`}
                                onClick={(e) => loading && e.preventDefault()}
                            >
                                {loading ? 'Sprawdzanie...' : 'Zarezerwuj stół'}
                            </Link>
                            <Link
                                to="/cennik"
                                className="bg-transparent border border-slate-300 text-slate-800 text-center hover:border-slate-900 font-bold px-6 py-4 rounded-lg tracking-wide transition-colors duration-200 text-xs uppercase"
                            >
                                Stawki godzinowe
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-slate-200 font-mono text-[11px] text-slate-500 space-y-1">
                            <div className="flex justify-between max-w-xs">
                                <span>PON - CZW:</span>
                                <span className="text-slate-900 font-bold">14:00 - 24:00</span>
                            </div>
                            <div className="flex justify-between max-w-xs">
                                <span>PT:</span>
                                <span className="text-slate-900 font-bold">12:00 - 01:00</span>
                            </div>
                            <div className="flex justify-between max-w-xs">
                                <span>SOB:</span>
                                <span className="text-slate-900 font-bold">12:00 - 02:00</span>
                            </div>
                            <div className="flex justify-between max-w-xs">
                                <span>NIE:</span>
                                <span className="text-slate-900 font-bold">12:00 - 24:00</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
                        <div className="bg-white p-4 rounded-none border border-slate-200 shadow-sm w-full max-w-2xl">
                            <img
                                src={pictureOne}
                                className="rounded-none w-full object-cover aspect-[16/10] filter grayscale-[10%] contrast-[110%]"
                                alt="Wnętrze klubu"
                            />
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default App
