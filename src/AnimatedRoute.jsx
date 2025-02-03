// AnimatedRoutes.js
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import ResultCard from "./components/ResultCard";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import NewTestCreate from "./components/NewTestCreate";
import HomeLayout from "./pages/HomeLayout";
import PrivateRoute from "./PrivateRoute";
import SetPassword from "./pages/SetPassword";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setPassword" element={<SetPassword />} />
        <Route
          path="/tests"
          element={<PrivateRoute element={<HomeLayout child={<Tests />} />} />}
        />
        <Route
          path="/results"
          element={<PrivateRoute element={<HomeLayout child={<Results />} />} />}
        />
        <Route
          path="/results/:id"
          element={<PrivateRoute element={<HomeLayout child={<ResultCard />} />} />}
        />
        <Route
          path="/tests/:id"
          element={<PrivateRoute element={<Test />} />}
        />
        <Route
          path="/tests/createTest"
          element={<PrivateRoute element={<HomeLayout child={<NewTestCreate/>}/>} />}
        />
        <Route path="*" element={<Navigate to='/login'/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
