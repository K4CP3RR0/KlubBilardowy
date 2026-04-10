import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
const Logout= () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {navigate('/');}
    }
    return (
        <button className="montserrat-extrabold rounded-lg px-3 ml-2 py-2 bg-[#1a1a1d] text-[#f5f5dc] hover:bg-[#1a1a1f] hover:text-gray-300" onClick={handleLogout}>Wyloguj się</button>
    );
}
export default Logout;

