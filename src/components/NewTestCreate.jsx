import React, { useEffect } from "react";
import NewQuestions from "./NewQuestions";
import { useDispatch, useSelector } from "react-redux";
import {
  onAddQuestion,
  onChange,
  reset as resetCreateTest,
  submitCreateTest,
} from "../features/tests/createTestSlice";
import Spinner from "./Spinner";
import { getTests } from "../features/tests/testsSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

function NewTestCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, testName, isLoading, isError, message, isSuccess } =
    useSelector((state) => state.createTest);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    dispatch(onAddQuestion());
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(onChange({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitTest = async () => {
      try {
        await dispatch(submitCreateTest({ testName, questions }));
      } catch (err) {
        console.log(err);
      }
    };
    submitTest();
  };

  useEffect(() => {
    if (isError) toast.error(message);
    else if (isSuccess) {
      dispatch(resetCreateTest());
      dispatch(getTests());
      navigate("/tests");
    }
  }, [isError, isSuccess, dispatch, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center lexend-deca-regular ">
      <form
        onSubmit={handleSubmit}
        className=" w-2/3  p-8 rounded-lg "
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create New Test
        </h2>
        <div className="mb-4 flex flex-row justify-evenly text-center items-center">
          <label
            htmlFor="testName"
            className="font-medium text-gray-700 "
          >
            Test Name:
          </label>
          <input
            type="text"
            id="testName"
            name="testName"
            value={testName}
            onChange={handleChange}
            required
            className="w-2/3 px-2 py-2 border-1 border-gray-400 rounded-md  focus:ring-black"
          />
        </div>
        {questions.map((_, index) => (
          <NewQuestions key={index} index={index} />
        ))}
        <div className="flex justify-between items-center text-sm mt-6">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-1/6 ml-4 py-2 hover:text-black hover:bg-gray-200  flex items-center rounded-md justify-center border border-black bg-gray-700 text-white "
            title="Add New Question"
          >
            Add Question 
          </button>
          <button
            type="submit"
            className="w-1/6 ml-4 py-2 bg-[#7B1481] text-white rounded-md hover:bg-[#691074] focus:outline-none focus:ring-2 focus:ring-[#7B1481]"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTestCreate;
