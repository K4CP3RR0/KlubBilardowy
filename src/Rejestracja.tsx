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

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                // Te dane trafią do 'raw_user_meta_data' i zostaną przechwycone przez trigger SQL
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
        <div>
        <form onSubmit={handleSignUp} className="rounded-lg p-10 m-2 content-center w-3/4 bg-[#1a1a1b] shadow-md shadow-black">
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imię</label>
                <div className="mt-1">
                    <input id="imie" onChange={e => setFormData({...formData, imie: e.target.value})} required
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           name="imie" placeholder="Imię"/>
                </div>
            </div>
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nazwisko</label>
                <div className="mt-1">
                    <input id="nazwisko" onChange={e => setFormData({...formData, nazwisko: e.target.value})} required
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           name="nazwisko" placeholder="Nazwisko"/>
                </div>
            </div>
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telefon</label>
                <div className="mt-1">
                    <input id="phone" onChange={e => setFormData({...formData, telefon: e.target.value})} required
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           name="phone" placeholder="Telefon"/>
                </div>
            </div>
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <div className="mt-1">
                    <input id="email1" onChange={e => setFormData({...formData, email: e.target.value})} required placeholder="Email"
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           name="email"/>
                </div>
            </div>
            <div className="mt-6 m-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hasło</label>
                <div className="mt-1">
                    <input id="password" onChange={e => setFormData({...formData, password: e.target.value})} required placeholder="Hasło"
                           className="block w-full rounded-md border border-gray-300 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline focus:outline-sky-500 disabled:shadow-none sm:text-sm disabled:border-gray-700 disabled:bg-gray-800/20"
                           type="password" name="password"/>
                </div>
            </div>
            <div className="mt-6 text-center p-2">
                <button className="rounded-md bg-[#0056b3] px-5 m-2 py-2.5 text-sm leading-5 font-semibold text-white hover:bg-[#0056f6]">Zarejestruj się</button>
            </div>
        </form>
        <Footer/>
        </div>
    );
}

export default Rejestracja;