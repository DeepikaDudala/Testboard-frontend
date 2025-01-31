import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResult, remove as removeTest } from "../features/tests/testSlice";
import { getAllResults } from "../features/results/resultsSlice";
import useTimer from "../hooks/useTimer";
import { Timer } from 'lucide-react'; 

function Questions({ testId, questions }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const duration = useSelector((state) => state.test.test.duration);
  
  const [selOp, setOp] = useState(new Array(questions.length).fill(null));
  const [currentQ, setCurrentQ] = useState(0);
  const [visited, setVisited] = useState(new Set());
  
  const handleChange = (qId, oId) => {
    const updated = [...selOp];
    updated[qId] = oId;
    setOp(updated);
  };

  const handleSubmit = async () => {
    await dispatch(createResult({ id: testId, answers: selOp }));
    dispatch(removeTest());
    dispatch(getAllResults());
    navigate("/results");
  };

  const handleNext = () => {
    setVisited(new Set([...visited, currentQ]));
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const { formatTime } = useTimer(60 * duration, 1000, handleSubmit);
  
  const answeredCount = selOp.filter((op) => op !== null).length;

  return (
    <div >

      <div className="items-center justify-around flex  flex-row  lexend-deca-regular">
        {/* Question & Options */}
        <div className="p-6 md:w-2/3 md:h-2/3 bg-white  rounded-lg flex flex-col justify-center">
          <h4 className="md:text-xl font-medium mb-8">{`${currentQ + 1}. ${questions[currentQ].text}`}</h4>
          <div className="space-y-4 flex items-center text-center justify-center flex-col">
            {questions[currentQ].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 md:w-2/3 w-9/12 border rounded-lg cursor-pointer  ${
                  selOp[currentQ] === index ? " border-black border-2 bg-gray-300" : "hover:bg-gray-200"
                }`}
                onClick={() => handleChange(currentQ, index)}
              >
                {option}
              </div>
            ))}
            <div className="flex justify-between space-x-20 mt-6">
              <button
                className={`px-4 py-2 rounded-lg ${currentQ === 0 ? 'cursor-not-allowed border-1' : 'bg-black text-white'}`}
                onClick={handlePrev}
                disabled={currentQ === 0}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${currentQ === questions.length - 1 ? 'cursor-not-allowed border-1' : 'bg-black text-white'}`}
                onClick={handleNext}
                disabled={currentQ === questions.length - 1}
              >
                Next
              </button>
            </div>
          </div>
          
        </div>

        {/* Sidebar for question numbers */}
        <div className="max-md:hidden bg-white w-1/4 mt-5 flex flex-col items-center justify-center rounded-lg border-1 border-gray-100 p-3 shadow-md shadow-gray-300">
          <div className=" flex items-center justify-center mb-4">
          <Timer className=" mr-2 mb-1" />
          <span className="">{formatTime()}</span>
        </div>
          <div className="grid grid-cols-4 gap-3 w-full items-center justify-center p-3 mb-8 place-items-center">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`w-9 h-9 border-1 rounded-full mb-3 text-center ${
                  selOp[i] !== null
                    ? "bg-blue-300 text-white"
                    : visited.has(i)
                    ? "bg-gray-300 text-white"
                    : ""
                }`}
                onClick={() => setCurrentQ(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Total Questions and Answered Count */}
          <div className="mb-4 text-left space-x-3.5 flex items-center justify-center ">
            <span className="font-sans text-sm text-gray-800">Total Questions: {questions.length}</span>
            <br />
            <span className="font-sans text-sm text-gray-800">Answered: {answeredCount}</span>
          </div>

          <button
            className="px-4 py-2 bg-red-600 w-1/2 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Submit Test
          </button>
        </div>

      </div>
    </div>
  );
}

export default Questions;
