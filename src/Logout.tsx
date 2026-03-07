import  supabase  from './utils/supabase';
import { useNavigate } from 'react-router-dom';
const Logout= () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (!error) {navigate('/');}
    }
    return (
        <button className="btn btn-danger" onClick={handleLogout}>Wyloguj się</button>
    );
}
export default Logout;

