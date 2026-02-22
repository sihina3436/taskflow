import loginImg from "../assets/login.jpg";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/authentication/authSlice";
import { useLoginMutation } from "../redux/authentication/authApi";
import type { AppDispatch } from "../redux/store";
import { connectSocket } from "../util/socket";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userData = await login({ email, password }).unwrap();

      // Save token
      localStorage.setItem("token", userData.token);

      // Save user in redux
      dispatch(setUser(userData.user));
      connectSocket(userData.user._id);


      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-primaryLight flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-light-background rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        
        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome back to TaskFlow
          </h1>

          <p className="text-gray-500 mb-8">
            Login to your TaskFlow account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            
            <div className="relative group">
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition"></i>

              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

           
            <div className="relative group">
              <i className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition"></i>

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

           
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primaryDark transition duration-200 shadow-md disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

          
            <p className="text-sm text-center text-gray-500 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>

          </form>
        </div>

       
        <div className="hidden md:block relative">

          <img
            src={loginImg}
            alt="login"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-primaryDark/60"></div>

          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-2xl font-bold">TaskFlow</h2>
            <p className="text-sm opacity-90">
              Organize. Focus. Achieve.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
