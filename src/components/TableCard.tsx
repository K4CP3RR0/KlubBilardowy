import Popover from "./Popover.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const TableCard = ({ id, type, status, image }) => (

  <div className="bg-[#750E21] border-2 border-green-500 rounded-xl overflow-hidden cursor-pointer hover:scale-95 transition-transform w-full shadow-lg">
      <button popoverTarget={id} popoverTargetAction="show" className="w-full text-left outline-none">
    <img src={image} alt={type} className="h-40 w-50% object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold">{type} {id}</h3>
        <span className="px-2 py-1 bg-green-900 text-green-400 text-xs rounded-full">{status}</span>
      </div>
       <p className="text-white font-bold">Kliknij aby sprawdzić rezerwacje</p>
    </div>
      </button>
      {<Popover id={id} type={type} status={status}/>}
  </div>



);
export default TableCard;