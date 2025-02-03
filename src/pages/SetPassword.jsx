import { motion } from "framer-motion";
import FormBack from "../components/FormBack";
import InputField from "../components/InputField";
import passwordUpdate from "./../assets/passwordUpdate.svg";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {  reset, setPassword } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { leapfrog } from 'ldrs'
leapfrog.register()



const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
  };
  

function SetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password, confirmPassword } = formData;
  const {  isLoading, isError, message, isSetPasswordSuccess } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSetPasswordSuccess) {
      toast.success("Password Updated Successfully");
      dispatch(reset());
      navigate("/login");
    }
    dispatch(reset());
  }, [dispatch, isError, isSetPasswordSuccess]);

  const handleChange = (e) => {
    setFormData((preFormData) => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        dispatch(setPassword({  email, password }));
      }
    };



  if (isLoading) {
    return <Spinner child={<l-leapfrog
      size="50"
      speed="2.5" 
      color="black" 
    ></l-leapfrog>}/>
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <FormBack
        img={passwordUpdate}
        heading="Update Password"
        form={
          <form className="mt-5" onSubmit={handleSubmit}>
            <InputField
              type="email"
              place="Email"
              name="email"
              value={email}
              id="name"
              handleChange={handleChange}
            />
            <br />
            <InputField
              type="password"
              place="Password"
              name="password"
              value={password}
              id="password"
              handleChange={handleChange}
            />
            <InputField
              type="password"
              place="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              handleChange={handleChange}
            />
            <br />
            <div className=" flex flex-row items-center justify-center space-x-2">
            <Link to="/" className="text-[#c92bd1] text-[11px] ">
              <span className="text-black">Don't have an account? </span>Signup
            </Link>
            
            <Link to="/" className="text-[#c92bd1] text-[11px]  ">
              <span className="text-black">Remember Password? </span> Login
            </Link>
            </div>
            <Button text="Update Password" />
          </form>
        }
      />
    </motion.div>
  );
}

export default SetPassword;
