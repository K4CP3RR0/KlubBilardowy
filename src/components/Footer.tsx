const Footer = () => {
    return (
        <footer className="w-full py-8 mt-auto bg-white border-t border-slate-150 shadow-inner">
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-slate-500 text-sm font-light montserrat-light">
                    Stworzone przez <span className="text-slate-800 font-bold montserrat-extrabold tracking-wide">Kacper Cichorski & Oliwier Chomski</span>
                </p>
                <p className="text-slate-400 font-medium montserrat-light text-[10px] uppercase tracking-widest">
                    © {new Date().getFullYear()} Wszystkie prawa zastrzeżone
                </p>
            </div>
        </footer>
    );
};

export default Footer;