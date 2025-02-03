import { useNavigate } from "react-router-dom";
import { reset as resetTest } from "../features/tests/testSlice";
import { useDispatch } from "react-redux";
import Instruct from "../assets/Instruct.svg";

function Instructions({ test, setTakeTest }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetTest());
    navigate("/tests");
  };

  const handleContinue = () => {
    setTakeTest(true);
  };

  return (
    <div className="mt-4 ">
      
      <div className="bg-white p-10 rounded-lg  w-full max-w-4xl  items-start">
        <div className="flex flex-row">
        <img src={Instruct} alt="Instructions" className="max-md:hidden w-60 mr-12" />
        <div className="w-full text-left">
          <h2 className="text-left text-3xl font-bold text-[#7B1481] mb-6">Instructions</h2>
          <div className="mb-6 ">
            <p className="font-semibold">Test Name: <span className="font-sans text-gray-700">{test.testName}</span></p>
            <p className="font-semibold">Total Marks: <span className="font-sans text-gray-700">{test.totalMarks} Marks</span></p>
            <p className="font-semibold">Duration: <span className="font-sans text-gray-700">{test.duration} Minutes</span></p>
          </div>
          <div className="text-gray-600 text-sm space-y-2">
            <p><span>1.</span> Ensure you have a stable internet connection.</p>
            <p><span>2.</span> Read all questions carefully before answering.</p>
            <p><span>3.</span> Do not refresh or close the browser during the test.</p>
            <p><span>4.</span> <span className="text-gray-900 font-medium">Switching tabs is prohibited.</span></p>
            <p><span>5.</span> <span className="text-gray-900 font-medium">The test will be auto-submitted upon timeout.</span></p>
          </div>
        </div>
        </div>
          <div className="mt-10 flex justify-evenly ">
            <button className="border-black hover:bg-black hover:text-white border-1 text-black px-4 py-2 rounded-lg text-xs" onClick={handleCancel}>Cancel</button>
            <button className="bg-[#7B1481] text-white hover:bg-white hover:text-[#7B1481] hover:border-2 px-4 py-2 rounded-lg text-xs" onClick={handleContinue}>Start Test</button>
          </div>
      </div>
    </div>
  );
}

export default Instructions;
