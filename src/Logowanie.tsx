import { useState } from 'react';
import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
import {useTitle} from "./hooks/useTitle.tsx";

function Logowanie() {
    useTitle("Logowanie");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();


        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return alert(authError.message);


        const { data: role, error: profileError } = await supabase
            .from('uzytkownicy')
            .select('rola_id')
            .eq('id', authData.user.id)
            .single();

        if (profileError) return console.error(profileError);


        if (role.rola_id === 1) {
            navigate('/panel-pracownika');
        } else {
            navigate('/panel-uzytkownika');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
            <button type="submit">Zaloguj się</button>

        </form>
    );
}

export default Logowanie