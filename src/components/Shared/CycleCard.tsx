import { useNavigate } from "react-router-dom";
import { Bicycle } from "../../Types";



const CycleCard = ({ bike }: { bike: Bicycle }) => {

  const navigate = useNavigate();
  return (
    <div
      key={bike._id}
      className="dark:bg-gray-800 bg-slate-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
    >
      <div className="w-full h-52 p-5">
        <img
          src={bike?.photos[0]?.url}
          alt={bike.name}
          className=" w-full "
        />
      </div>
      <div className="p-4 bg-white/10 backdrop-blur-sm ">
        <div className="flex justify-center items-center  gap-2">
          <h3 className="text-lg font-bold dark:text-white">{bike.name}</h3>
          <p className="text-sm text-gray-300 bg-gray-800 px-1 rounded-lg">{bike.type}</p>
        </div>
        <p className="text-sm dark:text-gray-300 text-gray-600">
          <span className="font-semibold">Brand:</span> {bike.brand}
        </p>

        <p className="text-sm dark:text-gray-300 text-gray-600">
          <span className="font-semibold">Price:</span> {bike.price}
        </p>
        <button onClick={() => navigate(`/shop/${bike._id}`)} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CycleCard;