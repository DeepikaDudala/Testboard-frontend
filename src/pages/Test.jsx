import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoData from "../assets/NoData.svg";
import { useEffect, useState } from "react";
import Instructions from "../components/Instructions";
import {
  getTest,
  remove as removeTest,
  deleteTest,
} from "../features/tests/testSlice";
import Questions from "../components/Questions";
import Spinner from "../components/Spinner";
import { getTests } from "../features/tests/testsSlice";
import { getAllResults } from "../features/results/resultsSlice";
import { deleteResult } from "../features/results/resultSlice";

function Test() {
  const { id } = useParams();
  const tests = useSelector((state) => state.tests.tests);
  const [takeTest, setTakeTest] = useState(false);
  const test = tests.find((test) => test._id === id);
  const questions = useSelector((state) => state.test.test.questions);
  const { isError, isLoading } = useSelector((state) => state.test);
  const { role } = useSelector((state) => state.auth.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      dispatch(removeTest());
    }
    if (takeTest) {
      dispatch(getTest(id));
    }
  }, [takeTest, isError, dispatch, id]);

  useEffect(() => {
    const deleteAndRedirect = async () => {
      if (test && window.confirm("Do you want to delete this test?")) {
        await dispatch(deleteTest(id));
        dispatch(deleteResult(id));
        await dispatch(getTests());
        if (role === "teacher") await dispatch(deleteResult(id));
        dispatch(getAllResults());
        navigate("/tests");
      }
    };
    if (role !== "student") deleteAndRedirect();
  }, [role, test, id, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className={` w-full bg-black text-white p-3  `}>
             
              <span className="text-xl font-bold">TestBoard</span>
            </div>
      {test ? (
        takeTest || questions ? (
          questions && <Questions testId={id} questions={questions} />
        ) : (
          role === "student" && (
            <div className="flex flex-col items-center">
              <Instructions test={test} setTakeTest={setTakeTest} />
            </div>
          )
        )
      ) : (
        <div className="flex flex-col items-center">
          <h4 className="text-red-600 text-lg font-semibold">Test Not Found</h4>
          <img src={NoData} alt="No Data" className="w-1/2 max-w-sm mt-4" />
        </div>
      )}
    </div>
  );
}

export default Test;
