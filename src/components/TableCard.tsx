// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const TableCard = ({ id, type, status, image }) => (
  <div className="bg-gray-900 border-2 border-green-500 rounded-xl overflow-hidden cursor-pointer hover:scale-95 transition-transform">
    <img src={image} alt={type} className="h-32 w-50% object-cover" />
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-bold">{type} #{id}</h3>
        <span className="px-2 py-1 bg-green-900 text-green-400 text-xs rounded-full">{status}</span>
      </div>
      <p className="text-gray-400 text-sm mt-2">Click to view today's schedule</p>
    </div>
  </div>
);
export default TableCard;