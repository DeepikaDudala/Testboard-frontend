import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import SignUpLogo from "../assets/SignUpLogo.svg";
import InputField from "../components/InputField";
import FormBack from "../components/FormBack";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { getTests } from "../features/tests/testsSlice";
import { getAllResults } from "../features/results/resultsSlice";
import { motion } from "framer-motion";
import { bouncy } from 'ldrs'

bouncy.register()


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      toast.success("Successfully Registered!!");
      navigate("/tests");
      dispatch(getTests());
      dispatch(getAllResults());
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, user, navigate]);

  useEffect(() => {
    if (user?.token) {
      navigate("/tests");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isLoading) {
    return <Spinner child={<l-bouncy
      size="45"
      speed="1.75" 
      color="black" 
    ></l-bouncy> } />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.5 } }}
    >
      <FormBack
        img={SignUpLogo}
        heading="Register"
        form={
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              place="Name"
              name="name"
              value={name}
              handleChange={handleChange}
            />
            <br />
            <InputField
              type="email"
              place="Email"
              name="email"
              value={email}
              handleChange={handleChange}
            />
            <br />
            <InputField
              type="password"
              place="Password"
              name="password"
              value={password}
              handleChange={handleChange}
            />
            <br />
            <InputField
              type="password"
              place="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              handleChange={handleChange}
            />
            <br />
            <Link to="/login" className="text-[#c92bd1] text-[10px] font-serif">
              Have an account? Sign In
            </Link>
            <br />
            <Button text="Sign Up" />
          </form>
        }
      />
    </motion.div>
  );
}

export default Register;
