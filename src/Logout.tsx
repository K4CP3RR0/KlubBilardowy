import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
const Logout= () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {navigate('/');}
    }
    return (
        <button className="font-bold rounded-lg px-3 ml-2 py-2 text-white bg-black hover:bg-black hover:text-blue-600" onClick={handleLogout}>Wyloguj się</button>
    );
}
export default Logout;

