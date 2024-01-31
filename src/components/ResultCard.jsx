import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import {
  deleteResult,
  getResult,
  reset as resultReset,
} from "../features/results/resultSlice";
import DetailsComp from "./DetailsComp";

function ResultCard() {
  const { result, isLoading } = useSelector((state) => state.result);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleBack = () => {
    navigate("/results");
    dispatch(resultReset());
  };
  const handleDelete = () => {
    if (window.confirm("Do you want to delete test result")) {
      dispatch(deleteResult(id));
      navigate("/results");
    }
  };
  useEffect(() => {
    dispatch(getResult(id));
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (result.testName && result.results) {
    return (
      <>
        <div className="my-5 p-3 text-center">
          <h4 className="text-primary mb-5">{result.testName}</h4>
          <table className="table border">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Student Name</th>
                <th scope="col">Total</th>
                <th scope="col">Scored</th>
                <th scope="col">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {result.results.map(
                ({ _id, studentName, percentage, total, scored }) => (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{studentName}</td>
                    <td>{total}</td>
                    <td>{scored}</td>
                    <td>{parseInt(percentage)}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="row justify-content-center my-5">
            <div className="col-3 ">
              <button className="btn btn-primary" onClick={handleBack}>
                Back
              </button>
            </div>
            <div className="col-3 ">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    result && (
      <div className="container ">
        <div className="row justify-content-center ">
          <div className="col-8 text-center ">
            <div className="card mt-5" style={{ backgroundColor: "#e7f7fd" }}>
              <div className="card-body">
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Test Name :</p>
                  <p className="col-8">{result.testName}</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Total Marks :</p>
                  <p className="col-8">{result.total} Marks</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Scored :</p>
                  <p className="col-8">{result.scored} Marks</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Percentage :</p>
                  <p className="col-8">{parseInt(result.percentage)} %</p>
                </div>
                <button className="btn btn-primary me-3" onClick={handleBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className=" col-8">
            <DetailsComp result={result} />
          </div>{" "}
        </div>
      </div>
    )
  );
}

export default ResultCard;
