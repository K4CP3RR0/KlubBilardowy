import { useState } from 'react';
import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
import {useTitle} from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";

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
            navigate('/');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full px-4 py-12 flex-grow">
                <div className="bg-white border border-slate-150 rounded-3xl p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-slate-900">Witaj z powrotem</h2>
                        <p className="text-slate-500 text-sm mt-1">Zaloguj się do swojego konta</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email</label>
                            <input
                                id="email-1"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition"
                                name="email"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Hasło</label>
                            <input
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Hasło"
                                className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm transition"
                                type="password"
                                name="password"
                            />
                        </div>
                        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition">
                            Zaloguj się
                        </button>
                    </form>

                    <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                        <p className="text-slate-600 font-semibold text-xs">Nie masz konta?</p>
                        <a href="/rejestracja" className="inline-block mt-2 font-bold text-sm text-blue-600 hover:text-blue-800">
                            Zarejestruj się
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

}
export default Logowanie