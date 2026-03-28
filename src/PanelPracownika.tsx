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
            const { data, error } = await supabase.from('zasoby').select('*');

            if (!error && data) { //rzutowanie typu, dane pasuja do interfejsu
                setZasoby(data as unknown as Zasob[]);
            } else {
                console.error(error);
            }
            setLoading(false);
        };
        fetchZasoby();
    },[]);

    return (
        <div>
            <div className="p-6 min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {zasoby.map((zasob) => {
                        const typNazwa = zasob.typy_zasobow?.nazwa || "Table";
                        const imagePath = typNazwa === 'Dart' ? '/dart.png' : '/pool-table.svg';
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