const Footer = () => {
    return (
        <footer className="w-full py-6 mt-auto bg-[#1a1a1b] border-t drop-shadow-2xl sticky bottom-0">
            <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-[#a9a9a9] text-sm montserrat-light">
                    Stworzone przez <span className="text-[#a9a9a9] montserrat-extrabold tracking-wide">Kacper Cichorski & Oliwier Chomski</span>
                </p>
                <p className="text-[#a9a9a9] montserrat-light text-[10px] uppercase tracking-widest">
                    © {new Date().getFullYear()} Wszystkie prawa zastrzeżone</p>
            </div>
        </footer>
);
}
export default Footer;