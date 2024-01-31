import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createResult,
  remove as removeTest,
} from "../features/tests/testSlice";
import { getAllResults } from "../features/results/resultsSlice";
import useTimer from "../hooks/useTimer";

function Questions({ testId, questions }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const duration = useSelector((state) => state.test.test.duration);

  const [selOp, setOp] = useState(
    new Array(questions.length).fill(questions.length)
  );

  const handleChange = (qId, oId) => {
    const updated = [...selOp];
    updated[qId] = oId;
    setOp(updated);
  };
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("You switched the tab ");
        alert("test is submitted");
        handleSubmit();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  const handleSubmit = async () => {
    await dispatch(createResult({ id: testId, answers: selOp }));
    dispatch(removeTest());
    dispatch(getAllResults());
    navigate("/results");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  const { formatTime } = useTimer(60 * duration, 1000, handleSubmit);

  return (
    <div className="container mt-5 bg-light">
      <form onSubmit={handleFormSubmit}>
        {questions.map((question, i) => (
          <div className="box" key={question._id}>
            <h6 className="m-3">{`${i + 1}. ${question.text}`}</h6>

            {question.options.map((option, index) => (
              <div className="ms-4 mb-2" key={`${question._id}-${index}`}>
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  id={`${question._id}-${index}`}
                  value={option}
                  onChange={() => handleChange(i, index)}
                />
                <label className="ms-2" htmlFor={`${question._id}-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <div className="position-fixed p-3 m-3 bottom-0 end-0">
          <div className="text-danger">Timer : {formatTime()}</div>
          <button type="submit" className="btn btn-primary">
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questions;
