import loginImg from "../assets/login.jpg";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUser } from "../redux/authentication/authSlice";
import { useRegisterMutation } from "../redux/authentication/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !gender) {
      alert("Please fill all fields");
      return;
    }

    try {
      const userData = await register({
        name,
        email,
        password,
        gender,
      }).unwrap();

      dispatch(setUser(userData.user));
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primaryLight flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-light-background rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Sign Up
          </h1>

          <p className="text-gray-500 mb-8">
            Create your TaskFlow account
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="relative">
              <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Select Gender
              </label>

              <div className="grid grid-cols-2 gap-4">

                
                <label
                  className={`
                    flex items-center justify-center gap-2
                    cursor-pointer
                    border rounded-xl py-3
                    transition-all duration-200
                    ${
                      gender === "male"
                        ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="hidden"
                  />
                  <i className="ri-user-3-line text-lg"></i>
                  <span className="text-sm font-medium">Male</span>
                </label>

                
                <label
                  className={`
                    flex items-center justify-center gap-2
                    cursor-pointer
                    border rounded-xl py-3
                    transition-all duration-200
                    ${
                      gender === "female"
                        ? "bg-primary text-white border-primary shadow-md scale-[1.02]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="hidden"
                  />
                  <i className="ri-women-line text-lg"></i>
                  <span className="text-sm font-medium">Female</span>
                </label>

              </div>
            </div>

            
            <button
              className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center text-gray-500 mt-4">
              You already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>

          </form>
        </div>

        
        <div className="hidden md:block relative">
          <img
            src={loginImg}
            alt="register"
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

export default Register;
