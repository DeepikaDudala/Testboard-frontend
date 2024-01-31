import React from "react";
import notFoundImage from "../assets/404error.svg";

function NotFound() {
  return (
    <div className="text-center align-center">
      <h1 className="m-3">Page Not Found</h1>
      <img src={notFoundImage} width={"500px"} alt="404 Error" />
    </div>
  );
}

export default NotFound;
