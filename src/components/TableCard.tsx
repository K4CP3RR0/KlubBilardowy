import Popover from "./Popover.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const TableCard = ({ id, type, status, image }) => (

    <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden cursor-pointer hover:scale-95 transition-transform w-full shadow-sm hover:shadow-lg hover:border-blue-200 duration-300">
        <button popoverTarget={id} popoverTargetAction="show" className="w-full text-left outline-none">
            <div className="h-44 bg-slate-200 flex items-center justify-center p-4 border-b border-slate-100">
                <img src={image} alt={type} className="h-full max-w-full object-contain" />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-slate-900 font-bold text-lg">{type}</h3>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${status === 'Dostępny' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>{status}</span>
                </div>
                <p className="text-blue-600 font-bold text-xs">Kliknij aby sprawdzić rezerwacje</p>
            </div>
        </button>
        {<Popover id={id} type={type} status={status}/>}
    </div>

);
export default TableCard;