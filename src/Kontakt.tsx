import {useTitle} from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


function Kontakt() {
    useTitle("Kontakt");
    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 mb-5">
                <div className="ml-10 mr-10 p-5 rounded-lg bg-[#1a1a1b] text-white montserrat-extrabold  drop-shadow-2xl ">
                    <h1 className="text-2xl">Klub bilardowy</h1>
                    <p className="mt-5 text-xl">Bydgoszcz, ul. Warszawska 25</p>
                    <p className="mt-5 text-xl">bilard@bydgoszcz.pl</p>
                    <p className="mt-5 text-xl">Telefon: +48 666 777 888</p>
                </div>
                <div className="col-span-2 m-5">
                    {/*<iframe width="100%" height="400" frameBorder="0" scrolling="no" className="rounded-lg drop-shadow-2xl "*/}
                    {/*        src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=pl&amp;q=Bydgoszcz,%20Warszawska%2025+(Klub%20bilardowy)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">*/}
                    {/*    <a href="https://www.mapsdirections.info/pl/mapa-populacji/">kalkulator liczby ludności na mapie</a>*/}
                    {/*</iframe>*/}
                    <Map
                        mapboxAccessToken={MAPBOX_TOKEN}
                        initialViewState={{
                            longitude: 17.9940432,
                            latitude: 53.1348037,
                            zoom: 17
                        }}
                        style={{width: '100%',height: '100%'}}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                    />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Kontakt