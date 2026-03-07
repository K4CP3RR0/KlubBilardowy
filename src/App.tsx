//import { supabase } from '../utils/supabase'
//import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
//import Logout from './Logout';

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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <a className="navbar-brand" href="#">
                        <img src="/favicon.svg" alt="8bila" width="30" height="30"/>
                        <a className="navbar-brand" href="#">    Klub bilardowy</a>
                    </a>


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Strona główna

                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/cennik" className="nav-link active">Cennik
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/logowanie" className="nav-link active">Logowanie
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/rejestracja" className="nav-link active">Rejestracja
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/rezerwacje" className="nav-link active">Rezerwacje
                                </Link>
                            </li>


                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>

                            </form>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>


    )
}


export default App
