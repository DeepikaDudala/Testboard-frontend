import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import ResultCard from "./components/ResultCard";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import NewTestCreate from "./components/NewTestCreate";
import { useDispatch, useSelector } from "react-redux";
import { getTests } from "./features/tests/testsSlice";
import { getAllResults } from "./features/results/resultsSlice";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HomeLayout from "./pages/HomeLayout";


function AnimatedRoutes() {
  const location = useLocation(); // Get current route location

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tests" element={<HomeLayout child={<Tests />}/>} />
        <Route path="/results" element={<HomeLayout child={<Results />}/>} />
        <Route path="/results/:id" element={<HomeLayout child={<ResultCard />}/>} />
        <Route path="/tests/:id" element={<Test />} />
        <Route path="/tests/createTest" element={<NewTestCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

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
        <AnimatedRoutes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
