import loginImg from "../assets/login.jpg";
import { useState, type FormEvent } from "react";
import { useForgotPasswordMutation } from "../redux/authentication/authApi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      alert("OTP sent to your email");
    } catch {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen bg-primaryLight flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-light-background rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Forgot Password
          </h1>

          <p className="text-gray-500 mb-8">
            Enter your email to receive OTP
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primaryDark transition duration-200 shadow-md"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>

            <p className="text-sm text-center text-gray-500 mt-4">
              Back to{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>

        <div className="hidden md:block relative">
          <img
            src={loginImg}
            alt="forgot"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-primaryDark/60"></div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
