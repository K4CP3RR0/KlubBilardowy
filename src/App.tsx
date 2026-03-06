//import { supabase } from '../utils/supabase'
//import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


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
