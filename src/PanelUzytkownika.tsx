import {useTitle} from "./hooks/useTitle.tsx";

function PanelUzytkownika() {
    useTitle("Panel Uzytkownika");
    return (
        <div className="container">
            <h1 className="text-white text-center">Panel Uzytkownika</h1>
        </div>
    )
}

export default PanelUzytkownika