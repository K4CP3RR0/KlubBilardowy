import { useTitle } from "./hooks/useTitle.tsx";
import Footer from "./components/Footer.tsx";

function Regulamin() {
    useTitle("Regulamin Klubu");
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
                <div className="mb-12 border-b border-slate-200 pb-6 text-left">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                        / DOKUMENTY KLUBU
                    </p>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                        Regulamin <span className="text-blue-600">Rezerwacji i Korzystania</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 font-medium">
                        Ostatnia aktualizacja: Czerwiec 2026 r.
                    </p>
                </div>
                <div className="bg-white border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8 text-left text-slate-700 text-sm leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            § 1. Postanowienia Ogólne
                        </h2>
                        <p>
                            1. Niniejszy regulamin określa zasady korzystania ze stołów bilardowych, stanowisk dart oraz systemu rezerwacji online w klubie.
                        </p>
                        <p>
                            2. Każda osoba przebywająca na terenie klubu zobowiązana jest do przestrzegania regulaminu oraz poleceń obsługi.
                        </p>
                    </section>
                    <section className="space-y-3">
                        <h2 className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            § 2. Zasady Rezerwacji Online
                        </h2>
                        <p>
                            1. Rezerwacji stołów oraz stanowisk można dokonać za pośrednictwem systemu online dostępnego na stronie internetowej po uprzednim zalogowaniu.
                        </p>
                        <p>
                            2. Anulowanie rezerwacji przez klienta jest możliwe bezpośrednio w panelu użytkownika <b>najpóźniej do 15 minut przed czasem jej rozpoczęcia</b>. Próba anulowania rezerwacji po tym czasie zostanie zablokowana przez system.
                        </p>
                        <p>
                            3. W przypadku niestawienia się w klubie do 15 minut po planowanej godzinie rozpoczęcia rezerwacji bez wcześniejszego uprzedzenia, obsługa ma prawo anulować rezerwację i udostępnić stół innym klientom.
                        </p>
                    </section>
                    <section className="space-y-3">
                        <h2 className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            § 3. Korzystanie ze Sprzętu i Stołów
                        </h2>
                        <p>
                            1. Klienci zobowiązani są do szanowania mienia klubu, w szczególności sukna bilardowego, kijów oraz tarcz elektronicznych/sisalowych.
                        </p>
                        <p>
                            2. Zabrania się odkładania napojów, jedzenia oraz innych przedmiotów na bandy i sukno stołów bilardowych. Wszelkie napoje należy pozostawiać na dedykowanych stolikach pomocniczych.
                        </p>
                        <p>
                            3. Za wszelkie zniszczenia sprzętu lub sukna wynikające z nieprawidłowego użytkowania, pełną odpowiedzialność finansową ponosi osoba dokonująca rezerwacji.
                        </p>
                    </section>
                    <section className="space-y-3">
                        <h2 className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                            § 4. Porządek i Bezpieczeństwo
                        </h2>
                        <p>
                            1. Na terenie klubu obowiązuje bezwzględny zakaz wnoszenia własnego alkoholu oraz jedzenia.
                        </p>
                        <p>
                            2. Obsługa klubu ma prawo odmówić wstępu lub wyprosić osoby zachowujące się agresywnie bądź będące w stanie nietrzeźwości zagrażającym bezpieczeństwu innych gości.
                        </p>
                    </section>
                </div>
                <div className="mt-8 font-mono text-[11px] text-slate-400 text-center">
                    Przystąpienie do rezerwacji oznacza pełną akceptację powyższych punktów.
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Regulamin;