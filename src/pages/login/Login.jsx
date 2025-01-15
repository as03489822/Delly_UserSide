import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "./ResetPassword";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing auth state from Redux
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  let [reset, setReset] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (e) => {
    setForm((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  // Handling login with Redux thunk
  const handleLogin = (e) => {
    e.preventDefault();
    let loginUser =  createAsyncThunk(
        'auth/loginUser',
        async (formData, thunkAPI) => {
          try {
            const response = await axios.post('http://localhost:8080/user/auth/login', formData);
            localStorage.setItem('token', response.data.token); // Store token in localStorage
            return response.data; // Return user data
          } catch (error) {
            // Reject with a custom error message
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
          }
        }
      );
    dispatch(loginUser(form));
  };

  let navigateToSignup = () => {
    navigate('/signup');
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className="mb-[130px] h-[70vh] flex flex-col justify-center items-center">
      {reset ? (
        <div className="absolute top-10 z-10 w-[30%] h-[70%] bg-white rounded-lg border-[2px] border-[#013D29]">
          <ResetPassword reset={reset} setReset={setReset} />
        </div>
      ) : null}
      <h1 className="text-[24px] text-[#219653] outfit md:text-[40px] font-bold">Login</h1>
      <form onSubmit={handleLogin} className="w-[300px]">
        <div className="flex gap-1 outfit flex-col mt-4">
          <label htmlFor="emails">
            <b>Email</b>
          </label>
          <input
            id="emails"
            className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
            type="email"
            placeholder="email"
            onChange={handleOnChange}
            value={form.email}
            name="email"
            required
          />
          {error && <p className="rounded-full mt-1 text-[14px] bg-[#fcd2d2] pl-2 text-red font-semibold">{error}</p>}
        </div>
        <div className="flex outfit gap-1 flex-col mt-4">
          <label htmlFor="passwords">
            <b>Password</b>
          </label>
          <input
            id="passwords"
            className="border border-solid border-grey focus:outline-none py-2 pl-2 rounded-lg"
            type="password"
            placeholder="password"
            onChange={handleOnChange}
            value={form.password}
            name="password"
            required
          />
          {error && <p className="rounded-full mt-1 text-[14px] bg-[#fcd2d2] pl-2 text-red font-semibold">{error}</p>}
        </div>
        <button type="submit" className="mt-4 bg-[#013D29] outfit text-white py-2 px-4 rounded-full">
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {error ? (
        <p onClick={() => setReset(!reset)} className="cursor-pointer text-[#219653] font-bold h-[40px]">
          Reset Password
        </p>
      ) : null}
      <div className="my-5 outfit">
        <span className="text-12px text-[gray]">Don&apos;t have an account?</span>
        <span onClick={navigateToSignup} className="ml-2 cursor-pointer underline font-bold">
          Sign Up
        </span>
      </div>
    </div>
  );
}

export default Login;
