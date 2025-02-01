// App.js
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getTests } from "./features/tests/testsSlice";
import { getAllResults } from "./features/results/resultsSlice";
import { useEffect } from "react";
import AnimatedRoutes from "./AnimatedRoute";


function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getTests());
      dispatch(getAllResults());
    }
  }, [user, dispatch]);

  return (
    <>
      <Router>
        <AnimatedRoutes/>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
