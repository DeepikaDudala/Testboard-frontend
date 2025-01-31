import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as userReset } from "../features/auth/authSlice";
import { reset as resetTests } from "../features/tests/testsSlice";
import { reset as resetResults } from "../features/results/resultsSlice";
import { remove as removeTest } from "../features/tests/testSlice";
import { FiLogOut, FiUser, FiClipboard, FiFileText, FiMenu, FiX } from "react-icons/fi";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logoutUser = () => {
    navigate("/login");
    dispatch(logout());
    dispatch(userReset());
    dispatch(resetTests());
    dispatch(removeTest());
    dispatch(resetResults());
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full text-white bg-black shadow-xs shadow-gray-600 transition-all duration-300 ${
          isSidebarOpen ? "w-40" : "w-14 max-md:hidden"
        }  flex-col `}
      >
        <button
          className="p-4 focus:outline-none "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="flex flex-col flex-1 space-y-4 p-4 ">
          <span className="text-xl font-bold">{isSidebarOpen ? "TestBoard" : "TB"}</span>
        
            <div className="text-sm">
              <Link
                to="/tests"
                className="flex items-center space-x-2 hover:bg-gray-300 hover:text-[#7b1481] p-1 my-3 rounded"
              >
                <FiClipboard size={20} />
                {isSidebarOpen && <span>Tests</span>}
              </Link>
              <Link
                to="/results"
                className="flex items-center space-x-2 hover:bg-gray-300 hover:text-[#7b1481] p-1 my-3 rounded"
              >
                <FiFileText size={20} />
                {isSidebarOpen && <span>Results</span>}
              </Link>
              <button
                className="flex items-center space-x-2 w-full hover:bg-gray-300 hover:text-[#7b1481] p-1 my-3 rounded"
              
                onClick={logoutUser}
              >
                <FiLogOut size={20} />
                {isSidebarOpen && <span>Logout</span>}
              </button>
            </div>
          
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className={`md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-10 ${isSidebarOpen ? "hidden" : ""}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="focus:outline-none"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <span className="text-xl font-bold">TestBoard</span>
      </div>
    </>
  );
};

export default Navbar;
