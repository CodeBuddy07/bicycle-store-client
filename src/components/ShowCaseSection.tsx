import { useState } from "react";
import Title from "./Shared/Title";
import { useNavigate } from "react-router-dom";
import { useGetBicyclesQuery } from "../Redux/features/api/endpoints/bicycle";
import { Bicycle } from "../Types";
import CycleCard from "./Shared/CycleCard";

const ShowcaseSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");


  const queryParams = activeTab === "All" 
  ? { searchTerm: "", value: "" }  
  : { searchTerm: "type", value: activeTab }; 

  const { data: bicycles, isLoading } = useGetBicyclesQuery(queryParams);

  const tabs = ["All", "BMX", "Road", "Hybrid", "Electric"];

  return (
    <div
      className="bg-cover bg-center py-20 text-white dark:bg-gray-900"
      style={{ backgroundImage: 'url("/section3.png")' }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Title Section */}
        <Title
          title="OUR PRODUCTS"
          description="Choose Your Desired Bike from Our Wide Range of Collections"
        />

        {/* Tabs Section */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-nowrap rounded-md text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-700 text-gray-300 dark:bg-gray-800 dark:text-gray-400"
                } hover:bg-blue-500 hover:text-white`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : bicycles?.data?.length ? (
            bicycles.data.slice(0, 4).map((bike: Bicycle) => (
              <CycleCard key={bike._id} bike={bike} />
            ))
          ) : (
            <p className="text-center text-lg">No Bicycles Found</p>
          )}
        </div>

        {/* See All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
