import {useTitle} from "./hooks/useTitle.tsx";
import TableCard from "./components/TableCard.tsx";
//import { useState } from 'react';
//import  supabase  from './utils/supabase';
function PanelPracownika() {


    useTitle("Panel Pracownika");
    return (

        <div className="p-6 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <TableCard id="1" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="2" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="3" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <TableCard id="4" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="5" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="6" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <TableCard id="7" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="8" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="9" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <TableCard id="10" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="11" image="/dart.png" type="Dart" status="Dostępny" />
                <TableCard id="12" image="/dart.png" type="Dart" status="Dostępny" />
            </div>
        </div>

    )
}

export default PanelPracownika