import {type JSX, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import  supabase  from './utils/supabase';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);

        };

        void checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);



        });

        return () => subscription.unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return <div className="text-white text-center mt-5">Ładowanie...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/logowanie" replace />;
    }

    return children;
};

export default ProtectedRoute;

