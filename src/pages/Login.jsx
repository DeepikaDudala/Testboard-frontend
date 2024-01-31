import FormBack from "../components/FormBack";
import InputField from "../components/InputField";
import LoginLogo from "./../assets/LoginLogo.svg";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { getTests } from "../features/tests/testsSlice";
import { getAllResults } from "../features/results/resultsSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData((preFormData) => ({
      ...preFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  useEffect(() => {
    try {
      if (user.token) {
        navigate("/tests");
      }
    } catch (err) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormBack
      img={LoginLogo}
      heading="Login"
      form={
        <form className="mt-5 " onSubmit={handleSubmit}>
          <InputField
            type="email"
            place="Email"
            name="email"
            value={email}
            id="name"
            handleChange={handleChange}
          />
          <InputField
            type="password"
            place="Password"
            name="password"
            value={password}
            id="password"
            handleChange={handleChange}
          />
          <Link to="/" className="link-text">
            Create an account
          </Link>
          <Button text="Login" />
        </form>
      }
    />
  );
}

export default Login;
