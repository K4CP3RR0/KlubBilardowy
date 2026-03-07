import {type JSX, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import  supabase  from './utils/supabase';

interface ProtectedRouteProps {
    children: JSX.Element;
    requiredRole?: number;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthAndRole = async () => {
            setLoading(true);
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            const { data: profile, error } = await supabase
                .from('uzytkownicy')
                .select('rola_id')
                .eq('id', session.user.id) // Mapowanie po UUID
                .single();

            if (error || !profile) {
                console.error("Błąd pobierania roli:", error);
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
                setUserRole(profile.rola_id);
            }

            setLoading(false);
        };

        void checkAuthAndRole();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event) => {
            if (_event === 'SIGNED_OUT') {
                setIsAuthenticated(false);
                setUserRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="text-white text-center mt-5">Weryfikacja uprawnień...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/logowanie" replace />;
    }

    if (requiredRole !== undefined && userRole !== requiredRole) {
        console.warn(`Brak uprawnień. Wymagana rola: ${requiredRole}, posiadasz: ${userRole}`);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;

