"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { handleValidationErrors } from "@/lib/error";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("client");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://wanac-api.kuzasports.com/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              role: userType,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          // Display API error message
          if (data?.errors) {
            handleValidationErrors(data.errors);
          } else if (data?.error) {
            toast.error(data.error);
          } else {
            toast.error("Login failed");
          }
          return;
        }

        // Store user data in localStorage
        localStorage.setItem(
          "wanacUser",
          JSON.stringify({
            ...data.user,
            userType: userType,
          })
        );
        localStorage.setItem("auth_token", data.token);
        toast.success(data.message);

        const dashboardPaths = {
          client: '/pages/client/dashboard',
          coach: '/coach',
          admin: '/pages/admin'
        };

        const dashboardPath = dashboardPaths[userType];
        if (!dashboardPath) {
          throw new Error("Invalid user type");
        }

        router.push(dashboardPath);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Store email in localStorage to pre-fill on password reset page
    if (form.email) {
      localStorage.setItem("resetEmail", form.email);
    }
    router.push("/reset-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-brand-navy mb-2">
          Welcome Back
        </h1>

        {/* User Type Selection */}
        <div className="flex mb-6 border bg-[#002147] rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-2 text-center ${
              userType === "client"
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-brand-blue hover:bg-gray-200"
            }`}
            onClick={() => setUserType("client")}
            aria-pressed={userType === "client"}
          >
            Client
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center ${
              userType === "coach"
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-brand-blue hover:bg-gray-200"
            }`}
            onClick={() => setUserType("coach")}
            aria-pressed={userType === "coach"}
          >
            Coach
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center ${
              userType === "admin"
                ? "bg-brand-orange text-white"
                : "bg-gray-100 text-brand-blue hover:bg-gray-200"
            }`}
            onClick={() => setUserType("admin")}
            aria-pressed={userType === "admin"}
          >
            Admin
          </button>
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-500 text-sm">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-brand-blue mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-brand-orange"
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-brand-blue mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-brand-orange"
                } pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-orange"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="text-red-500 text-sm mt-1"
                role="alert"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="remember"
              className="flex items-center text-sm text-brand-blue"
            >
              <input
                id="remember"
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300 rounded mr-2"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-brand-orange hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn w-full flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="/WANAC N 8 Old Glory.png"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        {/* Divider + Social Logins */}
        <div className="mt-6 text-center space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-brand-orange hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
