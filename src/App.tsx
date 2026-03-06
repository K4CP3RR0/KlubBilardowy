//import { supabase } from '../utils/supabase'
import { Link } from 'react-router-dom';


function App() {


    return (
      <div className="container">
            <h1 className="text-white text-center">Klub bilardowy</h1>
          <Link to="/kontakt">
              <button>Kontakt</button>
          </Link>
          <Link to="/cennik">
              <button>Cennik</button>
          </Link>
          <Link to="/logowanie">
              <button>Logowanie</button>
          </Link>
          <Link to="/rezerwacje">
              <button>Rezerwacje</button>
          </Link>
        </div>
  )
}

export default App
