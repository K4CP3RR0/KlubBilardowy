// import {Link} from "react-router-dom";
import {useTitle} from "./hooks/useTitle.tsx";
import TableCard from "./components/TableCard.tsx";
function PanelPracownika() {
    useTitle("Panel Pracownika");
    return (

        <div className="flex flex-col m-2">
            <TableCard id="1" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="2" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="3" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="4" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="5" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="6" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="7" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="8" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="9" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="10" image="/favicon.svg" type="Table" status="Dostępny" />
            <TableCard id="11" image="/favicon.svg" type="Dart" status="Dostępny" />
            <TableCard id="12" image="/favicon.svg" type="Dart" status="Dostępny" />
        </div>
    )
}

export default PanelPracownika