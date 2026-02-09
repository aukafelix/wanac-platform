"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { handleValidationErrors } from "@/lib/error";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleAuthService } from '@/services/api/google-auth.service';
import { jwtDecode } from "jwt-decode";

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
  const [socialLoading, setSocialLoading] = useState({ google: false });

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
          "https://api.wanac.org/api/v1/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              role: userType.toLowerCase(),
              social: false
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
          client: '/client/dashboard',
          coach: '/coach',
          admin: '/admin'
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setSocialLoading({ google: true });
    try {
      const googleUser = jwtDecode(credentialResponse.credential);
      const response = await fetch(
        "https://api.wanac.org/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: googleUser.email,
            role: userType.toLowerCase(),
            social: true,
            provider: "google",
            provider_id: googleUser.sub
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        if (data?.errors) {
          handleValidationErrors(data.errors);
        } else if (data?.error) {
          toast.error(data.error);
        } else {
          toast.error('Google login failed.');
        }
        return;
      }

      localStorage.setItem('wanacUser', JSON.stringify({ ...data.user, userType: response.user.role }));
      localStorage.setItem('auth_token', data.token);
      toast.success('Successfully signed in with Google!');
      const dashboardPaths = {
        client: '/client/dashboard',
        coach: '/coach',
        admin: '/admin',
      };
      const dashboardPath = dashboardPaths[response.user.role] || '/';
      router.push(dashboardPath);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
    } finally {
      setSocialLoading({ google: false });
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign in was unsuccessful. Please try again.');
    setSocialLoading({ google: false });
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen h-screen flex overflow-hidden">
        {/* Left Side - Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#002147] to-[#003875] p-8 flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <img 
              src="/WANAC-logo-white-orange.svg" 
              alt="WANAC Logo" 
              className="h-12 mb-8 w-auto"
            />
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              Take charge of your transition with WANAC
            </h1>
            <p className="text-white text-base leading-relaxed opacity-90 max-w-lg">
              WANAC simplifies transition coaching, career planning, and veteran support. 
              Seamlessly connect with coaches, track your progress, and access resources 
              tailored for military veterans and their families.
            </p>
          </div>
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/veterancommunity.png" 
              alt="Veterans Community" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-8 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <img 
                src="/WANAC N 8 Old Glory.png" 
                alt="WANAC Logo" 
                className="h-10 mb-4 lg:hidden"
              />
              <h2 className="text-2xl font-bold text-brand-navy mb-1">
                Sign in to your account
              </h2>
              <p className="text-gray-600 text-sm">
                Enter Details to Log in
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-brand-navy mb-2">
                Select User Type
              </label>
              <div className="flex border bg-[#002147] rounded-md overflow-hidden">
                <button
                  type="button"
                  className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                    userType === "client"
                      ? "bg-orange-500 text-white"
                      : "bg-transparent text-white hover:bg-orange-500"
                  }`}
                  onClick={() => setUserType("client")}
                  aria-pressed={userType === "client"}
                >
                  Client
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                    userType === "coach"
                      ? "bg-orange-500 text-white"
                      : "bg-transparent text-white hover:bg-orange-500"
                  }`}
                  onClick={() => setUserType("coach")}
                  aria-pressed={userType === "coach"}
                >
                  Coach
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 text-center text-sm font-medium transition-colors ${
                    userType === "admin"
                      ? "bg-orange-500 text-white"
                      : "bg-transparent text-white hover:bg-orange-500"
                  }`}
                  onClick={() => setUserType("admin")}
                  aria-pressed={userType === "admin"}
                >
                  Admin
                </button>
              </div>
            </div>

            {errors.submit && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-500 text-sm">{errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-navy mb-1.5"
                >
                  Email
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
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
                  className="block text-sm font-medium text-brand-navy mb-1.5"
                >
                  Password
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
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                    } pr-10`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-brand-orange"
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
                  className="flex items-center text-sm text-brand-navy"
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
                className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white font-medium py-2.5 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Signing in...
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
            </form>

            {/* Divider + Social Logins */}
            <div className="mt-5 text-center space-y-3">
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
                <div className={socialLoading.google ? 'opacity-50' : ''}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="outline"
                    shape="rectangular"
                    locale="en"
                    text="signin_with"
                    disabled={socialLoading.google}
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
                  Facebook
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-brand-orange hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}