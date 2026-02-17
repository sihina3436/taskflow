import loginImg from "../assets/login.jpg";
import { useState, type FormEvent } from "react";
import { useResetPasswordMutation } from "../redux/authentication/authApi";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !otp || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      await resetPassword({ email, otp, newPassword }).unwrap();
      alert("Password reset successful");
      navigate("/login");
    } catch {
      alert("Invalid OTP or expired");
    }
  };

  return (
    <div className="min-h-screen bg-primaryLight flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-light-background rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <div className="p-10 md:p-14 flex flex-col justify-center">

          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Reset Password
          </h1>

          <p className="text-gray-500 mb-8">
            Enter OTP and new password
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />

            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />

            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primaryDark transition duration-200 shadow-md"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
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
            alt="reset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-primaryDark/60"></div>
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
