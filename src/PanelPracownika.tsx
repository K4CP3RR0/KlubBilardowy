// import {Link} from "react-router-dom";
import {useTitle} from "./hooks/useTitle.tsx";
import TableCard from "./components/TableCard.tsx";
function PanelPracownika() {
    useTitle("Panel Pracownika");
    return (
        <div>
            <div className="flex flex-col3 m-2 gap-2">
                <TableCard id="1" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="2" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="3" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="flex flex-col3 m-5 gap-2">
                <TableCard id="4" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="5" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="6" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="flex flex-col3 m-5 gap-2">
                <TableCard id="7" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="8" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="9" image="/pool-table.svg" type="Table" status="Dostępny" />
            </div>
            <div className="flex flex-col3 m-5 gap-2">
                <TableCard id="10" image="/pool-table.svg" type="Table" status="Dostępny" />
                <TableCard id="11" image="/dart.png" type="Dart" status="Dostępny" />
                <TableCard id="12" image="/dart.png" type="Dart" status="Dostępny" />
            </div>
        </div>

    )
}

export default PanelPracownika