import {useTitle} from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";

function Rezerwacje() {
    useTitle("Rezerwacje");
    return (
      <div className="">
            <div className="m-6">
                <h1 className="text-6xl montserrat-extrabold text-center text-[#f5f5dc]">Strona w budowie</h1>
                <h1 className="text-6xl montserrat-extrabold text-center text-[#f5f5dc]">Rezerwacje</h1>
            </div>
          <Footer/>
        </div>
  )
}

export default Rezerwacje