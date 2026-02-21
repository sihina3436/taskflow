import { useState } from "react";
import Layout from "../Layout";
import { useUpdatePasswordMutation } from "../../redux/authentication/authApi";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [updatePassword, { isLoading }] =
    useUpdatePasswordMutation();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await updatePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      setMessage(res.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong");
      console.error("Update password error:", err);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10">

        <div className="bg-white/70 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-lg p-8">

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Update Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Change your password securely
          </p>

          {/* SUCCESS */}
          {message && (
            <div className="mb-4 bg-green-50 text-green-600 text-sm px-4 py-2 rounded-xl">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* CURRENT PASSWORD */}
            <div>
              <label className="text-sm text-gray-600 font-medium block mb-2">
                Current Password
              </label>

              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
                  placeholder="Enter current password"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={
                      showCurrent
                        ? "ri-eye-off-line"
                        : "ri-eye-line"
                    }
                  />
                </button>
              </div>
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="text-sm text-gray-600 font-medium block mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  required
                  className="w-full border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
                  placeholder="Enter new password"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <i
                    className={
                      showNew
                        ? "ri-eye-off-line"
                        : "ri-eye-line"
                    }
                  />
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-3 rounded-2xl
                bg-primary text-white
                font-medium
                hover:opacity-90
                transition
                disabled:opacity-60
              "
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePassword;