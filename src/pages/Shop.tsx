
import { useState } from "react";
import CycleCard from "../components/Shared/CycleCard";
import { useGetBicyclesQuery } from "../Redux/features/api/endpoints/bicycle";
import { Bicycle } from "../Types";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [availability, setAvailability] = useState(false);

  const { data: cycles} = useGetBicyclesQuery({searchTerm: "", value: ""})


  // Filtered cycles based on inputs
  const filteredCycles = cycles?.data?.filter((cycle: Bicycle) => {
    return (
      (cycle.name.toLowerCase().includes(search.toLowerCase()) ||
        cycle.brand?.toLowerCase().includes(search.toLowerCase())) &&
      (selectedBrand ? cycle.brand === selectedBrand : true) &&
      (selectedCategory ? cycle.type === selectedCategory : true) &&
      (cycle.price >= priceRange[0] && cycle.price <= priceRange[1]) &&
      (availability ? cycle.inStock === availability : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-100">

      {/* Main Section */}
      <div className="container mx-auto flex flex-col md:flex-row py-8 px-4 gap-8">
        {/* Filters */}
        <aside className="md:w-1/4 bg-white p-6 rounded-xl h-max shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Brand */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Brand</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {[...new Set(cycles?.data?.map((cycle: Bicycle) => cycle.brand as string))].map((brand,index) => (
                <option key={index} value={brand as string}>
                  {brand as string}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {[...new Set(cycles?.data?.map((cycle: Bicycle) => cycle.type as string))].map((type, index) => (
                <option key={index} value={type as string}>
                  {type as string}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block font-medium mb-2">Price Range</label>
            <input
              type="range"
              className="w-full"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            />
            <div className="flex justify-between text-sm">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={() => setAvailability(!availability)}
              className="mr-2"
            />
            <label htmlFor="availability" className="font-medium">
              Only Available
            </label>
          </div>
        </aside>

        {/* Cycle List */}
        <main className="md:w-3/4">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search by name or anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Cycle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCycles?.map((cycle: Bicycle) => (
              <CycleCard key={cycle._id} bike={cycle} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
