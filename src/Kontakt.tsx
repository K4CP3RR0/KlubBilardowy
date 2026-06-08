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
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    <div className="bg-white border border-slate-150 p-8 rounded-3xl shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
                        <div>
                            <span className="text-blue-600 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                Skontaktuj się z nami
                            </span>

                            <h1 className="text-3xl font-black text-slate-900 mt-5 tracking-tight">
                                Klub bilardowy
                            </h1>

                            <div className="mt-8 space-y-5">
                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium text-base">Bydgoszcz, ul. Warszawska 25</p>
                                </div>

                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8m-2 11H4a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-700 font-medium text-base">bilard@bydgoszcz.pl</p>
                                </div>

                                <div className="flex items-center gap-3.5 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <p className="text-blue-600 font-bold text-base tracking-wide">Telefon: +48 666 777 888</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                            <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1.5 text-blue-600">Godziny otwarcia:</p>
                            <p className="flex justify-between"><span>Poniedziałek - Czwartek:</span> <span className="font-semibold text-slate-800">14:00 - 24:00</span></p>
                            <p className="flex justify-between"><span>Piątek:</span> <span className="font-semibold text-slate-800">12:00 - 01:00</span></p>
                            <p className="flex justify-between"><span>Sobota:</span> <span className="font-semibold text-slate-800">12:00 - 02:00</span></p>
                            <p className="flex justify-between"><span>Niedziela:</span> <span className="font-semibold text-slate-800">12:00 - 24:00</span></p>
                        </div>
                    </div>

                    <div className="lg:col-span-2 h-[450px] rounded-3xl overflow-hidden border border-slate-150 shadow-sm bg-white p-2">
                        <Map
                            mapboxAccessToken={MAPBOX_TOKEN}
                            initialViewState={{
                                longitude: 17.9940432,
                                latitude: 53.1348037,
                                zoom: 17
                            }}
                            style={{width: '100%', height: '100%'}}
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Kontakt