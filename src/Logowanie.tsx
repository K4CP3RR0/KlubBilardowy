import { useState } from 'react';
import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
function Logowanie() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Logowanie do Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return alert(authError.message);

        // 2. Pobranie roli z tabeli profiles
        const { data: role, error: profileError } = await supabase
            .from('role')
            .select('nazwa')
            .eq('id', authData.user.id)
            .single();

        if (profileError) return console.error(profileError);

        // 3. Przekierowanie na podstawie roli
        if (role.nazwa === 'Pracownik') {
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