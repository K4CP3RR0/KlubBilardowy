import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
const Logout= () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {navigate('/');}
    }

    return (
        <button className="font-bold rounded-xl px-4 py-2 text-sm text-rose-600 bg-rose-50 border-2 border-slate-200 hover:bg-rose-100 transition-colors duration-200" onClick={handleLogout}>
            Wyloguj się
        </button>
    );
}
export default Logout;

