import { useState } from 'react';
import  supabase  from './utils/supabase';
import {useTitle} from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";

function Rejestracja() {
    useTitle("Rejestracja");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        imie: '',
        nazwisko: '',
        telefon: ''
    });
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const phoneRegex = /^(?:\+48)?\d{9}$/;
        const cleanPhone = formData.telefon.replace(/\s+/g, '');

        if (!phoneRegex.test(cleanPhone)) {
            setPhoneError("Niepoprawny format. Wpisz 9 cyfr (np. 500600700)");
            return;
        }

        setPhoneError(null);
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    imie: formData.imie,
                    nazwisko: formData.nazwisko,
                    telefon: formData.telefon
                }
            }
        });

        if (error) {
            alert("Błąd: " + error.message);
        } else {
            alert("Rejestracja pomyślna! Sprawdź skrzynkę e-mail, aby potwierdzić konto.");
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full px-4 py-8 flex-grow">
                <div className="bg-white border border-slate-150 rounded-3xl p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-black text-slate-900">Załóż konto</h2>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Imię</label>
                                <input
                                    id="imie"
                                    onChange={e => setFormData({...formData, imie: e.target.value})}
                                    required
                                    className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 text-sm transition outline-none"
                                    placeholder="Imię"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Nazwisko</label>
                                <input
                                    id="nazwisko"
                                    onChange={e => setFormData({...formData, nazwisko: e.target.value})}
                                    required
                                    className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 text-sm transition outline-none"
                                    placeholder="Nazwisko"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Telefon</label>
                            <input
                                id="phone"
                                onChange={e => {
                                    setFormData({...formData, telefon: e.target.value});
                                    if (phoneError) setPhoneError(null);
                                }}
                                required
                                className={`block w-full mt-1.5 rounded-xl border px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 text-sm transition outline-none ${
                                    phoneError
                                        ? 'border-rose-400 focus:ring-rose-500/10'
                                        : 'border-slate-200 focus:ring-blue-500/20'
                                }`}
                                placeholder="Telefon"
                            />
                            {phoneError && (
                                <p className="text-xs text-rose-600 font-medium mt-1.5 pl-1">{phoneError}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Email</label>
                            <input
                                id="email1"
                                onChange={e => setFormData({...formData, email: e.target.value})}
                                required
                                placeholder="Email"
                                className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 text-sm transition outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide">Hasło</label>
                            <input
                                id="password"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                required
                                placeholder="Hasło"
                                className="block w-full mt-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 text-sm transition outline-none"
                                type="password"
                                name="password"
                            />
                        </div>
                        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition">
                            Zarejestruj się
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Rejestracja;