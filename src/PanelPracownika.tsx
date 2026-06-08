import {useTitle} from "./hooks/useTitle.tsx";
import TableCard from "./components/TableCard.tsx";
import Footer from "./components/Footer.tsx";
import {useEffect, useState} from "react";
import supabase from "./utils/supabase.ts";
//import { useState } from 'react';
//import  supabase  from './utils/supabase';

interface Zasob{
    id: number;
    nazwa: string;
    status: string;
    typ_id: number;
    typy_zasobow: {
        nazwa: string;
    } | null;
}

function PanelPracownika() {
    useTitle("Panel Pracownika");

    const [zasoby, setZasoby] = useState<Zasob[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchZasoby = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('zasoby').select('id,typ_id,nazwa,status');

            if (!error && data) { //rzutowanie typu, dane pasuja do interfejsu
                setZasoby(data as unknown as Zasob[]);
            } else {
                console.error(error);
            }
            console.log(loading);
            setLoading(false);
        };
        fetchZasoby();
    },[]);

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
                <div className="mb-8 border-b border-slate-100 pb-5">
                    <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Panel Pracownika</span>
                    <h1 className="text-4xl font-black text-slate-900 mt-3">Panel Obsługi Klienta</h1>
                    <p className="text-slate-500 text-sm mt-1.5">Zarządzaj rezerwacjami, sprawdzaj grafik i zmieniaj statusy stołów klubowych.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {zasoby.map((zasob) => {
                        const typNazwa = zasob.nazwa;
                        const imagePath = zasob.typ_id === 2 ? '/dart.png' : '/pool-table.svg';
                        console.log("Id: " + zasob.id + " Typ Id: " + zasob.typ_id + " Nazwa: "+zasob.nazwa);
                        return (
                            <TableCard
                                key={zasob.id}
                                id={zasob.id.toString()}
                                type={typNazwa}
                                status={zasob.status}
                                image={imagePath}
                            />
                        );
                    })}
                </div>

                {zasoby.length === 0 && (
                    <div className="text-center text-slate-500 mt-20">
                        Brak aktywnych zasobów w systemie.
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );


}

export default PanelPracownika