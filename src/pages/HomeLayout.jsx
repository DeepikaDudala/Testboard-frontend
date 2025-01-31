import React, { useState } from "react";
import Navbar from "../components/Navbar";

const HomeLayout = ({ child }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex transition-all duration-300 lexend-deca-regular">
      
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-40 " : "md:ml-14"
        }`}
      >
        {child}
      </div>
    </div>
  );
};

export default HomeLayout;  // ✅ Default export
