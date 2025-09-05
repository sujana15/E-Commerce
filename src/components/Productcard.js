export default function Productcard({ title, price, image }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-red-600 font-bold mb-4">₹{price}</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
