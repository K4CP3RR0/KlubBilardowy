import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Kontakt from "./Kontakt.tsx";
import Cennik from "./Cennik.tsx";
import Logowanie from "./Logowanie.tsx";
import Rezerwacje from "./Rezerwacje.tsx";
import PanelPracownika from "./PanelPracownika.tsx";
import PanelUzytkownika from "./PanelUzytkownika.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/kontakt" element={<Kontakt/>} />
              <Route path="/cennik" element={<Cennik/>} />
              <Route path="/logowanie" element={<Logowanie/>} />
              <Route path="/rezerwacje" element={<Rezerwacje/>} />
              <Route path="/panel-pracownika" element={<PanelPracownika/>} />
              <Route path="/panel-uzytkownika" element={<PanelUzytkownika/>} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
