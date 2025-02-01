import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import {
  deleteResult,
  getResult,
  reset as resultReset,
} from "../features/results/resultSlice";
import DetailsComp from "./DetailsComp";
import BetterLuck from "../assets/BetterLuck.svg";
import GoodJob from "../assets/GoodJob.svg";

function ResultCard() {
  const { result, isLoading } = useSelector((state) => state.result);
  const [showAnswers, setShowAnswers] = useState(false)
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
  const handleShowAnswers = () => {
    setShowAnswers(!showAnswers)
  }
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
          <table className="table-auto border-separate border-spacing-2 border border-gray-300 w-full text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">S.No</th>
                <th className="px-4 py-2 border-b">Student Name</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Scored</th>
                <th className="px-4 py-2 border-b">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {result.results.map(
                ({ _id, studentName, percentage, total, scored }, i) => (
                  <tr key={_id}>
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">{studentName}</td>
                    <td className="px-4 py-2">{total}</td>
                    <td className="px-4 py-2">{scored}</td>
                    <td className="px-4 py-2">{parseInt(percentage)}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="flex justify-center my-5 gap-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    result && (
      <div className="mt-4 flex items-center justify-center">
        <div className="p-10 rounded-lg w-full">
  
          <div className="w-full text-center">
            {
              result.scored >= result.total 
                ? (
                  <>
                    <h2 className="text-3xl font-bold text-[#7B1481] mb-4">Good Job!</h2>
                    <img 
                      src={GoodJob} 
                      alt="Success" 
                      className="w-32 h-32 mx-auto mb-6" 
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-[#7B1481] mb-4">Better Luck Next Time!</h2>
                    <img 
                      src={BetterLuck} 
                      alt="Try Again" 
                      className="w-32 h-32 mx-auto mb-6" 
                    />
                  </>
                )
            }
  
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-xl text-center font-bold text-black mb-2">{result.testName}</h2>
  
              <div className="space-y-6 w-full max-w-md">
                <div className="flex justify-between text-black">
                  <span className="font-medium">Total Marks:</span>
                  <span>{result.total}</span>
                </div>
  
                <div className="flex justify-between text-black">
                  <span className="font-medium">Scored:</span>
                  <span>{result.scored}</span>
                </div>
  
                <div className="flex justify-between text-black">
                  <span className="font-medium">Percentage:</span>
                  <span>{parseInt(result.percentage)}%</span>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center md:space-x-7 space-x-4 ">
            <button className="border-black hover:bg-black hover:text-white border-1 text-black px-4 py-2 rounded-lg text-xs" onClick={handleBack}>Back</button>
            <button className="bg-[#7B1481] text-white hover:bg-white hover:text-[#7B1481] hover:border-2 px-4 py-2 rounded-lg text-xs" onClick={handleShowAnswers}>{`${showAnswers ? 'Hide': 'Show'} Answers`}</button>
          </div>
          
  {showAnswers && <DetailsComp result={result} />}
          </div>
        </div>
      </div>
    )
  );
  
  
}

export default ResultCard;
