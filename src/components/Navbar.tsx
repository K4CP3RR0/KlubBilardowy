import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
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
        <nav className="bg-[#03346E] p-2 m-2 rounded-lg text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">


                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white hover:text-gray-300 focus:outline-none"
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                        <img className="h-8 w-8" src="/favicon.svg" alt="8bila"/>
                        <a href="/" className="font-bold text-white text-lg whitespace-nowrap transition hover:text-gray-300">Klub Bilardowy</a>
                    </div>
                </div>


                <div className="hidden md:flex space-x-4 items-center">
                    <div className="flex items-center justify-center space-x-3 py-2">
                        <img src="/favicon.svg" alt="8bila" className="h-8 w-8 object-contain"/>
                        <a href="/" className="text-white font-bold text-lg hover:text-gray-300 transition-colors">Klub bilardowy</a>
                    </div>
                    <a href="/cennik" className="font-bold rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition">Cennik</a>
                    <a href="/rezerwacje" className="font-bold rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition">Rezerwacje</a>
                    <a href="/kontakt" className="font-bold rounded-lg px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition">Kontakt</a>

                    {userRole === 1 && (
                        <a href="/panel-pracownika" className="font-bold rounded-lg px-3 py-2 text-red-400 hover:bg-gray-100 hover:text-gray-900">Panel pracownika</a>
                    )}
                    {userRole === 2 && (
                        <a href="/panel-uzytkownika" className="font-bold rounded-lg px-3 py-2 text-red-400 hover:bg-gray-100 hover:text-gray-900">Panel użytkownika</a>
                    )}
                </div>


                <div className="hidden md:flex items-center">
                    {userName ? (
                        <div className="flex items-center bg-gray-100 text-gray-900 font-bold rounded-lg px-3 py-2 space-x-2">
                            <span>Zalogowano jako: <strong className="text-blue-900">{userName}</strong></span>
                            <Logout />
                        </div>
                    ) : (
                        <a href="/logowanie" className="font-bold rounded-lg px-3 py-2 text-blue-600 bg-white hover:bg-gray-200">
                            Logowanie
                        </a>
                    )}
                </div>
            </div>


            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-2 pb-4 border-t border-blue-800`}>
                <div className="flex flex-col space-y-2 pt-4">
                    <a href="/cennik" className="px-3 py-2 rounded-md hover:bg-blue-700">Cennik</a>
                    <a href="/rezerwacje" className="px-3 py-2 rounded-md hover:bg-blue-700">Rezerwacje</a>
                    <a href="/kontakt" className="px-3 py-2 rounded-md hover:bg-blue-700">Kontakt</a>
                    {userRole === 1 && (
                        <a href="/panel-pracownika" className="font-bold rounded-md px-3 py-2 text-red-400 hover:bg-blue-700 hover:text-gray-100">Panel pracownika</a>
                    )}
                    {userRole === 2 && (
                        <a href="/panel-uzytkownika" className="font-bold rounded-md px-3 py-2 text-red-400 hover:bg-blue-700 hover:text-gray-100">Panel użytkownika</a>
                    )}
                    <hr className="border-blue-800" />

                    {userName ? (
                        <div className="px-3 py-2">
                            <p className="mb-2">Zalogowano: <b>{userName}</b></p>
                            <Logout />
                        </div>
                    ) : (
                        <a href="/logowanie" className="mx-3 px-3 py-2 bg-white text-blue-600 rounded-lg text-center font-bold">Logowanie</a>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;