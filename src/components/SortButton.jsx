import { useState } from "react";
import { FaSort } from "react-icons/fa";

function SortButton({ setSortType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-200 text-gray-700 mt-4 ml-2 p-2 rounded-md flex items-center"
      >
        <FaSort className="" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-md text-xs rounded-md p-2 w-40">
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={() => {
              setSortType("duration-asc");
              setIsOpen(false);
            }}
          >
            Duration: Low to High
          </button>
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={() => {
              setSortType("duration-desc");
              setIsOpen(false);
            }}
          >
            Duration: High to Low
          </button>
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={() => {
              setSortType("marks-asc");
              setIsOpen(false);
            }}
          >
            Marks: Low to High
          </button>
          <button
            className="block w-full text-left p-2 hover:bg-gray-100"
            onClick={() => {
              setSortType("marks-desc");
              setIsOpen(false);
            }}
          >
            Marks: High to Low
          </button>
        </div>
      )}
    </div>
  );
}

export default SortButton;
