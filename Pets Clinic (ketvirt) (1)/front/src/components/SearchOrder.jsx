import { useState } from "react";

const SearchOrder = ({
  setSortKey,
  sortOrder,
  setSortOrder,
  searchTerm,
  setSearchTerm,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = (key) => {
    setSortKey(key);
  };

  const handleOrderChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="w-1/2 grid place-self-center">
      <div className="flex justify-center items-center mb-4">
        {/* Paieškos laukelis */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 border-gray-400 w-1/2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Rūšiavimo dropdown meniu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-purple-600 text-white px-4 py-2"
          >
            Sort by ▼
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 bg-white border shadow-md mt-2 rounded-md w-40">
              <p className="px-4 py-2 font-bold text-gray-600">Sort by</p>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-black"
                onClick={() => {
                  handleSortChange("pet_name");
                  setIsDropdownOpen(false);
                }}
              >
                Pet Name
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-black"
                onClick={() => {
                  handleSortChange("date");
                  setIsDropdownOpen(false);
                }}
              >
                Date
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-black"
                onClick={() => {
                  handleSortChange("owner");
                  setIsDropdownOpen(false);
                }}
              >
                Owner
              </button>

              <hr />

              <p className="px-4 py-2 font-bold text-gray-600">Order</p>
              <button
                className={`block px-4 py-2 w-full text-left text-black ${
                  sortOrder === "asc" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  handleOrderChange("asc");
                  setIsDropdownOpen(false);
                }}
              >
                Asc
              </button>
              <button
                className={`block px-4 py-2 w-full text-left text-black ${
                  sortOrder === "desc" ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  handleOrderChange("desc");
                  setIsDropdownOpen(false);
                }}
              >
                Desc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;
