import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResult, remove as removeTest } from "../features/tests/testSlice";
import { getAllResults } from "../features/results/resultsSlice";
import useTimer from "../hooks/useTimer";
import { Timer } from 'lucide-react';

// Popup Component
function Popup({ isOpen, onClose, onLeave }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-[#7B1481] mb-4">Warning</h2>
        <p className="text-gray-700 text-center mb-6">
          Are you sure you want to leave this page? Your progress may not be saved.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black hover:border-1"
          >
            Stay
          </button>
          <button
            onClick={onLeave}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
}

function Questions({ testId, questions }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const duration = useSelector((state) => state.test.test.duration);

  const [selOp, setOp] = useState(new Array(questions.length).fill(null));
  const [currentQ, setCurrentQ] = useState(0);
  const [visited, setVisited] = useState(new Set());
  const [isPopupOpen, setPopupOpen] = useState(false); // Controls popup visibility

  // Ref to control whether blocking is active
  const shouldBlock = useRef(true);

  const handleChange = (qId, oId) => {
    const updated = [...selOp];
    updated[qId] = oId;
    setOp(updated);
  };

  const handleSubmit = async () => {
    const resultAction = await dispatch(createResult({ id: testId, answers: selOp }));

    dispatch(removeTest());
    dispatch(getAllResults());
    if (createResult.fulfilled.match(resultAction)) {
      const result = resultAction.payload.result;
      const resultId = result._id;
      dispatch(removeTest());
      dispatch(getAllResults());
      navigate(`/results/${resultId}`);
    }
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

  // Intercept browser back button using a dummy history state
  useEffect(() => {
    // Push an extra state to the history stack so that the back button is intercepted.
    window.history.pushState({ preventBack: true }, "", window.location.href);

    const onPopState = (e) => {
      // If blocking is disabled, allow navigation normally.
      if (!shouldBlock.current) return;
      // Show the popup and push a dummy state back into history to block navigation.
      setPopupOpen(true);
      window.history.pushState({ preventBack: true }, "", window.location.href);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Called when user chooses to leave.
  const handleLeave = () => {
    // Disable our blocking so that the navigation can occur.
    shouldBlock.current = false;
    setPopupOpen(false);
    // Now navigate away – for example, redirect to home.
    window.location.href = "/";
  };

  return (
    <div>
      <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} onLeave={handleLeave} />

      <div className="items-center justify-around flex text-sm flex-row lexend-deca-regular">
        {/* Question & Options */}
        <div className="p-6 md:w-2/3 md:h-2/3 w-full bg-white rounded-lg flex flex-col items-center justify-center">
          <h4 className="md:text-xl font-medium mb-8">
            {`${currentQ + 1}. ${questions[currentQ].text}`}
          </h4>
          <div className="space-y-4 md:w-2/3 w-10/12 flex items-center text-center justify-center flex-col">
            {questions[currentQ].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 w-full border rounded-lg cursor-pointer ${
                  selOp[currentQ] === index
                    ? "border-black border-2 bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleChange(currentQ, index)}
              >
                {option}
              </div>
            ))}
            <div className="flex justify-between space-x-20 max-md:space-x-5 mt-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  currentQ === 0 ? "cursor-not-allowed border-1" : "bg-black text-white"
                }`}
                onClick={handlePrev}
                disabled={currentQ === 0}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  currentQ === questions.length - 1
                    ? "cursor-not-allowed border-1 max-md:hidden"
                    : "bg-black text-white"
                }`}
                onClick={handleNext}
                disabled={currentQ === questions.length - 1}
              >
                Next
              </button>
              <button
                className={`px-4 py-2 rounded-lg bg-[#7B1481] text-white ${
                  currentQ === questions.length - 1 ? "border-1 md:hidden" : "hidden"
                }`}
                onClick={handleSubmit}
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar for question numbers */}
        <div className="max-md:hidden bg-white w-1/4 mt-5 flex flex-col items-center justify-center rounded-lg border-1 border-gray-100 p-3 shadow-md shadow-gray-300">
          <div className="flex items-center justify-center mb-4">
            <Timer className="mr-2 mb-1" />
            <span>{formatTime()}</span>
          </div>
          <div className="grid grid-cols-4 gap-3 w-full items-center justify-center p-3 mb-8 place-items-center">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`w-9 h-9 border-1 rounded-full mb-3 text-center ${
                  selOp[i] !== null
                    ? "bg-gray-900 text-white"
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
          <div className="mb-4 text-left space-x-3.5 flex items-center justify-center">
            <span className="font-sans text-sm text-gray-800">Total Questions: {questions.length}</span>
            <br />
            <span className="font-sans text-sm text-gray-800">Answered: {answeredCount}</span>
          </div>

          <button
            className="px-2 my-2 py-1 bg-[#7B1481] w-1/2 text-white rounded-lg"
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
