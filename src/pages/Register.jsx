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
      toast.success("Successfully logged in!!");
      navigate("/tests");
      dispatch(getTests());
      dispatch(getAllResults());
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, user]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      toast.success("Successfully Registered!!");
      navigate("/tests");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, user]);

  useEffect(() => {
    try {
      if (user.token) {
        navigate("/tests");
      }
    } catch (err) {
      navigate("/");
    }
  }, [user, navigate]);
  const handleChange = (e) => {
    setFormData((preFormData) => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) toast.error("Password do not match");
    else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <FormBack
        img={SignUpLogo}
        heading="Register"
        form={
          <form className="d-flex flex-column mt-5" onSubmit={handleSubmit}>
            <InputField
              type="name"
              place="Name"
              name="name"
              value={name}
              handleChange={handleChange}
            />
            <InputField
              type="email"
              place="Email"
              name="email"
              value={email}
              handleChange={handleChange}
            />
            <InputField
              type="password"
              place="Password"
              name="password"
              value={password}
              handleChange={handleChange}
            />
            <InputField
              type="password"
              place="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              handleChange={handleChange}
            />
            <Link to="/login" className="link-text ">
              I am already registered
            </Link>
            <Button text="Register" />
          </form>
        }
      />
    </>
  );
}

export default Register;
