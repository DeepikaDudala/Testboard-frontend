// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import ResultCard from "./components/ResultCard";
import Test from "./pages/Test";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import { getTests } from "./features/tests/testsSlice";
import { getAllResults } from "./features/results/resultsSlice";
import { useEffect } from "react";
import NewTestCreate from "./components/NewTestCreate";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getTests());
      dispatch(getAllResults());
    }
  }, [user]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {user && (
            <>
              <Route path="/tests" element={<Tests />} />
              <Route path="/results" element={<Results />} />
              <Route path="/results/:id" element={<ResultCard />} />
              <Route path="/tests/:id" element={<Test />} />
              <Route path="/tests/createTest" element={<NewTestCreate />} />
            </>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
