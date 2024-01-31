import React, { useEffect, useState } from "react";
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
  }, [isError, isSuccess]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container mt-5">
      <form action="" className="form form-back p-5" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="testName" className="h6 me-2">
                Test Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="testName"
                id="testName"
                onChange={handleChange}
                value={testName}
                required
              />
            </div>
            {questions.map((_, index) => (
              <NewQuestions key={index} index={index} />
            ))}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <button
              className="circular-button btn-primary h4"
              onClick={handleAddQuestion}
            >
              +
            </button>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Create Test
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewTestCreate;
