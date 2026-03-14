// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Popover = ({ id, type, status}) => (
<div popover="auto" id={id} className="fixed inset-0 m-auto w-80 h-fit min-h-64 p-6 rounded-2xl bg-[#03346E] border border-white/20 shadow-2xl">
    <div className="flex flex-col items-center justify-between h-full gap-6">
        <div className="text-center">
            <h2 className="text-2xl font-black text-white">
                {type} <span className="text-green-400">#{id}</span>
            </h2>
            <p className="text-blue-200 mt-1 uppercase text-xs font-bold tracking-widest">{status}</p>
        </div>
        <div className="w-full space-y-2">
            <div className="bg-black/20 p-3 rounded-lg text-white text-sm">
                Brak rezerwacji na dzisiaj.
            </div>
        </div>

        <button popoverTarget={id} popoverTargetAction="hide" className="w-full rounded-xl bg-green-500 hover:bg-green-600 text-white p-4 font-bold transition-all shadow-lg active:scale-95">
            Wróć do panelu
        </button>
    </div>
    </div>
);
export default Popover;