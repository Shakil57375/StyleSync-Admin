import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { useState } from "react";
import { toast } from "react-toastify";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    try {
      const email = data?.email;
      const password = data?.password;
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      console.log(response);
      if (response.data?.token) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful", { position: "top-center" } );
        // Redirect to dashboard
        navigate("/add");
      } else {
        console.error("Invalid response from server:", response.data);
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white ">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg group">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-red-500"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block group-hover:text-green-500 text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your password"
            />
            <div className="absolute top-7 right-2">
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
