import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from './utils/supabase';
import Logout from './Logout';

const Navbar = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<number | null>(null);

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
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/favicon.svg" alt="8bila" width="30" height="30" className="me-2"/>
                    Klub bilardowy
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link to="/" className="nav-link">Strona główna</Link></li>
                        <li className="nav-item"><Link to="/cennik" className="nav-link">Cennik</Link></li>
                        <li className="nav-item"><Link to="/rezerwacje" className="nav-link">Rezerwacje</Link></li>

                        {userRole === 1 && (
                            <li className="nav-item">
                                <Link to="/panel-pracownika" className="nav-link fw-bold text-danger">Panel Pracownika</Link>
                            </li>
                        )}

                        {userRole === 2 && (
                            <li className="nav-item">
                                <Link to="/panel-uzytkownika" className="nav-link fw-bold text-primary">Moje rezerwacje</Link>
                            </li>
                        )}

                    </ul>



                    <div className="d-flex align-items-center">
                        {userName ? (
                            <div className="d-flex align-items-center">
                                <span className="me-3 text-secondary">
                                    Zalogowano jako: <strong className="text-dark">{userName}</strong>
                                </span>
                                <Logout />
                            </div>
                        ) : (
                            <div className="gap-2 d-flex">
                                <Link to="/logowanie" className="btn btn-outline-primary btn-sm">Logowanie</Link>
                                <Link to="/rejestracja" className="btn btn-primary btn-sm">Rejestracja</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;