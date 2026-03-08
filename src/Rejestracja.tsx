import { useState } from 'react';
import  supabase  from './utils/supabase';
import {useTitle} from "./hooks/useTitle.tsx";

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
        <form onSubmit={handleSignUp} className="container d-flex flex-column gap-2 w-50">
            <input type="text" placeholder="Imię" onChange={e => setFormData({...formData, imie: e.target.value})} required />
            <input type="text" placeholder="Nazwisko" onChange={e => setFormData({...formData, nazwisko: e.target.value})} required />
            <input type="text" placeholder="Telefon" onChange={e => setFormData({...formData, telefon: e.target.value})} />
            <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
            <input type="password" placeholder="Hasło" onChange={e => setFormData({...formData, password: e.target.value})} required />
            <button type="submit" className="btn btn-success">Zarejestruj się</button>
        </form>
    );
}

export default Rejestracja;