import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center mt-4 w-1/2 border-2 border-gray-200 rounded-md p-1 bg-white">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search Tests..."
        className="w-full p-1 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
