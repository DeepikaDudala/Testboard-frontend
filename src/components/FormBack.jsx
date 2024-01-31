import React from "react";

function FormBack({ heading, img, form }) {
  return (
    <>
      <div className=" p-3 m-5 text-center">
        <div className="row">
          <div className="col-md-5 d-none d-md-inline">
            <img src={img} alt="Login Logo" />
          </div>
          <div className="col-md-7 ">
            <h4 className="text-primary">{heading}</h4>
            {form}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormBack;
