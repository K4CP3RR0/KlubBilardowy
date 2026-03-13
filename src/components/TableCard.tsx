// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const TableCard = ({ id, type, status, image }) => (
  <div className="bg-gray-900 border-2 border-green-500 rounded-xl overflow-hidden cursor-pointer hover:scale-95 transition-transform w-full">
      <button popoverTarget={id} popoverTargetAction="show" className="w-full">
    <img src={image} alt={type} className="h-32 w-50% object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-bold">{type} {id}</h3>
        <span className="px-2 py-1 bg-green-900 text-green-400 text-xs rounded-full">{status}</span>
      </div>
       <p className="text-white font-bold">Kliknij aby sprawdzić rezerwacje</p>
    </div>
      </button>
      <div popover="auto" id={id} className="fixed inset-0 m-auto ml-10 flex-col items-center justify-center w-full h-70 rounded-md bg-[#03346E] box-content">
          <h2 className="text-center text-white font-bold mb-4">{type} #{id}</h2>
          <button popoverTarget={id} popoverTargetAction="hide" className="rounded-lg bg-green-500 text-white p-3 hover:bg-green-600 transition-colors">Wróć do panelu</button>
      </div>
    </div>


);
export default TableCard;