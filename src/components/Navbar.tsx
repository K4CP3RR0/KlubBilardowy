import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase.ts';
import Logout from '../Logout.tsx';

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const fetchUserName = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data, error } = await supabase
                .from('uzytkownicy')
                .select('imie, rola_id')
                .eq('id', session.user.id)
                .single();

            if (!error && data) {
                setUserName(data.imie);
                setUserRole(data.rola_id);
            }
        } else {
            setUserName(null);
            setUserRole(null);
        }
    };

    useEffect(() => {
        const init = async () => {
            await fetchUserName();
        };
        void init();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') fetchUserName();
            if (event === 'SIGNED_OUT') setUserName(null); setUserRole(null);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm w-full transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <img className="h-8 w-8 object-contain" src="/favicon.svg" alt="8bila" />
                            <Link to="/" className="font-extrabold text-slate-900 text-lg tracking-tight hover:text-blue-600 transition-colors">
                                Klub Bilardowy
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex space-x-1 items-center">
                        <Link to="/cennik" className="font-semibold text-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-blue-600 transition">Cennik</Link>
                        <Link to="/rezerwacje" className="font-semibold text-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-blue-600 transition">Rezerwacje</Link>
                        <Link to="/kontakt" className="font-semibold text-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-blue-600 transition">Kontakt</Link>
                        <Link to="/regulamin" className="font-semibold text-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-blue-600 transition">Regulamin</Link>

                        {userRole === 1 && (
                            <Link to="/panel-pracownika" className="font-semibold text-blue-600 bg-blue-50/50 rounded-lg px-3 py-2 hover:bg-blue-50 transition">Panel pracownika</Link>
                        )}
                        {userRole === 2 && (
                            <Link to="/panel-uzytkownika" className="font-semibold text-emerald-600 bg-emerald-50/50 rounded-lg px-3 py-2 hover:bg-emerald-50 transition">Panel użytkownika</Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center">
                        {userName ? (
                            <div className="flex items-center bg-blue-50 border border-blue-100 text-slate-800 text-sm rounded-xl px-4 py-1.5 space-x-3">
                                <span>Zalogowano: <strong className="text-blue-700 font-extrabold">{userName}</strong></span>
                                <Logout />
                            </div>
                        ) : (
                            <a href="/logowanie" className="font-bold text-sm rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm hover:shadow-md">
                                Logowanie
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-slate-100`}>
                <div className="flex flex-col space-y-1 px-4 py-3">
                    <a href="/cennik" className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold">Cennik</a>
                    <a href="/rezerwacje" className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold">Rezerwacje</a>
                    <a href="/kontakt" className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-semibold">Kontakt</a>
                    {userRole === 1 && (
                        <a href="/panel-pracownika" className="font-bold rounded-lg px-3 py-2 text-blue-600 bg-blue-50">Panel pracownika</a>
                    )}
                    {userRole === 2 && (
                        <a href="/panel-uzytkownika" className="font-bold rounded-lg px-3 py-2 text-emerald-600 bg-emerald-50">Panel użytkownika</a>
                    )}
                    <hr className="border-slate-100 my-2" />

                    {userName ? (
                        <div className="px-3 py-2 bg-slate-50 rounded-xl">
                            <p className="text-sm text-slate-700 mb-2">Zalogowano: <b>{userName}</b></p>
                            <Logout />
                        </div>
                    ) : (
                        <a href="/logowanie" className="mx-3 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-center font-bold block hover:bg-blue-700">Logowanie</a>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;