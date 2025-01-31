import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResult, remove as removeTest } from "../features/tests/testSlice";
import { getAllResults } from "../features/results/resultsSlice";
import useTimer from "../hooks/useTimer";

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
  
  return (
    <div className="grid grid-cols-12 gap-4 p-6 h-screen lexend-deca-regular">
      {/* Sidebar for question numbers */}
      <div className="col-span-2 bg-white p-4 shadow-lg rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Questions</h3>
        <div className="grid grid-cols-4 gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-full text-center font-bold ${
                selOp[i] !== null ? "bg-green-500 text-white" :
                visited.has(i) ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setCurrentQ(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question & Options */}
      <div className="col-span-8 p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
        <h4 className="text-xl font-bold mb-4">{`${currentQ + 1}. ${questions[currentQ].text}`}</h4>
        <div className="space-y-4">
          {questions[currentQ].options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer ${
                selOp[currentQ] === index ? "bg-green-200 border-green-500" : "bg-gray-100"
              }`}
              onClick={() => handleChange(currentQ, index)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
            onClick={handlePrev}
            disabled={currentQ === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleNext}
            disabled={currentQ === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      {/* Timer & Submit */}
      <div className="col-span-2 flex flex-col items-center justify-center bg-white p-4 shadow-lg rounded-lg">
        <div className="text-red-500 text-lg font-semibold mb-2">Timer: {formatTime()}</div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={handleSubmit}>
          Submit Test
        </button>
      </div>
    </div>
  );
}

export default Questions;
