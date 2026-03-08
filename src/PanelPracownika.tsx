import {Link} from "react-router-dom";
import {useTitle} from "./hooks/useTitle.tsx";
function PanelPracownika() {
    useTitle("Panel Pracownika");
    return (

        <div className="container text-center">
            <div className="row px-2 column-gap-3">


                <div className="card mb-3 w-25">
                    <Link to="/">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="Brak"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                       <h5 className="card-title">Table 1</h5>
                    </div>
                </div>
            </div>
                </Link>
            </div>

            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 2</h5>
                    </div>
                </div>
            </div>
        </div>
            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 3</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
            < br/>
            <div className="row px-2 column-gap-3">
        <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="Brak"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 4</h5>
                    </div>
                </div>
            </div>
        </div>
            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 5</h5>
                    </div>
                </div>
            </div>
        </div>
            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 6</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
            <br/>
            <div className="row px-2 column-gap-3">
        <div className="card mb-3 w-25 ">
            <div className="row g-0 ">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="Brak"/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 7</h5>
                    </div>
                </div>
            </div>
        </div>
            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 8</h5>
                    </div>
                </div>
            </div>
        </div>
            <div className="card mb-3 w-25">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="./assets/images/poolv1.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Table 9 </h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default PanelPracownika