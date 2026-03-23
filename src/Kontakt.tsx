import {useTitle} from "./hooks/useTitle.tsx";


function Kontakt() {
    useTitle("Kontakt");
    return (
        <div className="grid grid-cols-3 mt-5">
            <div className="ml-10 mr-5 p-5 rounded-lg bg-[#03346E] text-white font-bold">
                <h1 className="text-2xl">Klub bilardowy</h1>
                <p className="mt-5 text-xl">Bydgoszcz, ul. Warszawska 25</p>
                <p className="mt-5 text-xl">bilard@bydgoszcz.pl</p>
                <p className="mt-5 text-xl">Telefon: +48 666 777 888</p>
            </div>
            <div className="col-span-2 mr-10">
                <iframe width="100%" height="400" frameBorder="0" scrolling="no" className="rounded-lg"
                        src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=pl&amp;q=Bydgoszcz,%20Warszawska%2025+(Klub%20bilardowy)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    <a href="https://www.mapsdirections.info/pl/mapa-populacji/">kalkulator liczby ludności na mapie</a>
                </iframe>
            </div>

        </div>
    )
}

export default Kontakt