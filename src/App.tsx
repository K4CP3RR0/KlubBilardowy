//import { supabase } from '../utils/supabase'
//import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logout from './Logout';

function App() {
/*    const [, setTodos] = useState([])
    useEffect(() => {
        function getTodos() {
            //const { data: todos } = await supabase.from('todos').select()

            if (todos.length > 1) {
                setTodos(todos)
            }
        }

        getTodos()
    }, [])*/
    return (
      <div className="container">
            <h1 className="text-white text-center">Klub bilardowy</h1>
          <Link to="/kontakt">
              <button className="btn btn-primary">Kontakt</button>
          </Link>
          <Link to="/cennik">
              <button className="btn btn-success">Cennik</button>
          </Link>
          <Link to="/logowanie">
              <button className="btn btn-danger">Logowanie</button>
          </Link>
          <Link to="/rezerwacje">
              <button className="btn btn-warning">Rezerwacje</button>
          </Link>
          <Link to="/rejestracja">
              <button className="btn btn-secondary">Rejestracja</button>
          </Link>
          <button className="btn btn-dark">Wyloguj</button>
          <Logout />
        </div>

  )
}










export default App
