
import loginImg from "../assets/login.jpg";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setUser} from "../redux/authentication/authSlice";
import { useRegisterMutation} from "../redux/authentication/authApi";




const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await register({ name, email, password }).unwrap();
      dispatch(setUser(userData.user));
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }
  return (
    <div className='min-h-screen bg-primaryLight flex items-center justify-center px-4'>
       <div className='w-full max-w-5xl bg-light-background rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2'>
            
                <div className='p-10 bg-light-background md:p-14 flex flex-col justify-center'>
                        <h1 className='text-3xl font-bold mb-2 text-gray-800'>Sign Up</h1>
                           <p className="text-gray-500 mb-8">
                                Sign up to your TaskFlow account
                            </p>
                    <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="relative group">
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
                    <div className="relative group">
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
                    <div className="relative group">
                        <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90" type="submit" disabled={isLoading}>
                        Register
                    </button>

                        <p className="text-sm text-center text-gray-500 mt-4">
                            You already have an account?{" "}
                            <span className="text-primary font-medium cursor-pointer">
                                Sign In
                            </span>
                        </p>

                    </form>
                </div>

            

        <div className="hidden md:block relative">

          <img
            src={loginImg}
            alt="login"
            className="h-full w-full object-cover"
          />

          {/* overlay gradient */}
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
  )
}

export default Register