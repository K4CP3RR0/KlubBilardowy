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


        const {data: authData, error: authError} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return alert(authError.message);


        const {data: role, error: profileError} = await supabase
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
        <div className="">
        <form onSubmit={handleLogin} className="rounded-lg p-10 m-2 content-center w-3/4 bg-[#1a1a1b] shadow-md shadow-black">
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="mt-1">
                    <input id="email-1" onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           name="email"/>
                </div>
            </div>
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hasło</label>
                <div className="mt-1">
                    <input id="password" onChange={(e) => setPassword(e.target.value)} placeholder="Hasło"
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           type="password" name="password"/>
                </div>
            </div>
            <div className="mt-6 text-center p-2">
                <button className="rounded-md bg-[#0056b3] px-5 m-2 py-2.5 text-sm leading-5 font-semibold text-white hover:bg-[#0056d3]">Zaloguj się</button>
            </div>
        </form>
        <div className="mt-6 text-center p-2 col-span3 col-start-2">
            <p className="text-white font-bold">Nie masz konta? Zarejestruj się klikając przycisk poniżej.</p><br/>
            <a href="/rejestracja" className="rounded-md bg-[#0056f3] px-5 m-2 py-2.5 text-sm leading-5 font-semibold text-white hover:bg-[#0056b3] drop-shadow-xl ">Zarejestruj się</a>
        </div>
    </div>

    );

}
export default Logowanie