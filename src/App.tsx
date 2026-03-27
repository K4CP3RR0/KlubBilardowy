//import { supabase } from '../utils/supabase'
//import { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom';
//import Logout from './Logout';
import pictureOne from  './assets/images/picture1.jpg'
import Footer from "./components/Footer.tsx";

function App() {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-2 col-start-2 m-5">
                    <img src={pictureOne} className="rounded-lg drop-shadow-2xl "/>
                </div>
            </div>
            <Footer/>
        </div>


    )
}


export default App
