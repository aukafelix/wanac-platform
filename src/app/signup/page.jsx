"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api/auth.service";
import { toast } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleValidationErrors } from "@/lib/error";
import { jwtDecode } from "jwt-decode";

const AUTH_API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.wanac.org";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false
  });
  const [userType, setUserType] = useState("client");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    timezone: "",
    profilePic: null,
    bio: "",
    specialty: "",
    acceptTerms: false,
    newsletter: false,
    referralCode: "",
    preferredContact: "email",
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});

  // Auto-detect timezone
  useEffect(() => {
    try {
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setForm(prev => ({ ...prev, timezone: detectedTimezone }));
    } catch (error) {
      console.error("Could not detect timezone:", error);
    }
  }, []);

  // Calculate password strength
  useEffect(() => {
    if (!form.password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (form.password.length >= 8) strength += 1;
    if (/\d/.test(form.password)) strength += 1;
    if (/[a-z]/.test(form.password)) strength += 1;
    if (/[A-Z]/.test(form.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [form.password]);

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength >= 4) return "bg-green-500";
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePic: "File size should be less than 5MB"
        }));
        e.target.value = ''; // Reset file input
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profilePic: "Please upload an image file"
        }));
        e.target.value = ''; // Reset file input
        return;
      }

      // Convert to base64 for API submission
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(prev => ({ ...prev, [provider]: true }));
    try {
      if (provider === 'google') {
        // Google login is handled by the GoogleLogin component
        return;
      }
      toast.error(`${provider} login is not yet implemented`);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast.error(`${provider} login failed. Please try again.`);
    } finally {
      setSocialLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setSocialLoading(prev => ({ ...prev, google: true }));
    try {
      const googleUser = jwtDecode(credentialResponse.credential);
      const response = await fetch(
        `${AUTH_API_BASE}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: googleUser.name ?? googleUser.email?.split("@")[0],
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
          toast.error("Google sign up failed.");
        }
        return;
      }

      const role = data.user?.role ?? userType;
      localStorage.setItem("wanacUser", JSON.stringify({ ...data.user, userType: role }));
      localStorage.setItem("auth_token", data.token);
      toast.success(data.message ?? "Successfully signed up with Google!");
      const dashboardPaths = {
        client: "/client/dashboard",
        coach: "/coach",
        admin: "/admin",
      };
      const dashboardPath = dashboardPaths[role] || "/";
      router.push(dashboardPath);
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.error("Failed to sign up with Google. Please try again.");
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign in was unsuccessful. Please try again.');
    setSocialLoading(prev => ({ ...prev, google: false }));
  };

  const validate = () => {
    const newErrors = {};
    
    // Basic validation
    if (!form.name) newErrors.name = "Full name is required.";
    
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    
    if (!form.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password.";
    } else if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }
    
    if (!form.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and privacy policy.";
    }
    
    if (form.phone && !/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    
    if (userType === "coach" && !form.specialty) {
      newErrors.specialty = "Please specify your coaching specialty.";
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
        // Prepare registration data
        const registrationData = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          password_confirmation: form.password_confirmation,
          role: userType.toLowerCase(),
          social: false,
          phone: form.phone ? (form.phone.startsWith('+') ? form.phone : `+${form.phone}`)?.trim() : undefined,
          timezone: form.timezone === 'Eastern Time (ET)' ? 'America/New_York' : form.timezone,
          bio: form.bio?.trim() || undefined,
          specialty: userType === "coach" ? form.specialty?.trim() : undefined,
          referralCode: form.referralCode?.trim() || undefined,
          preferredContact: form.preferredContact,
          profilePic: form.profilePic || undefined
        };

        // Call the registration API
        const response = await authService.register(registrationData);
        toast.success(response.message || 'Registration successful! Please log in.');
        // Redirect to login after a short delay for user to see the toast
        setTimeout(() => {
          router.push("/login");
        }, 1200);

      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response?.data?.errors) {
            handleValidationErrors(error.response.data.errors);
          }
          if (error.response?.data?.error) {
            toast.error(error.response.data.error);
          }
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || "";
  const hasGoogleAuth = !!googleClientId;

  const content = (
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
              Start your journey with WANAC
            </h1>
            <p className="text-white text-base leading-relaxed opacity-90 max-w-lg mb-6">
              Join thousands of veterans and military families transforming their lives through personalized coaching, 
              career planning, and community support. Your transition starts here.
            </p>
            <div className="space-y-3 text-white text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connect with certified coaches
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Track your progress and goals
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access exclusive resources
              </div>
            </div>
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

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center bg-white px-4 py-4 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="mb-3">
              <img 
                src="/WANAC N 8 Old Glory.png" 
                alt="WANAC Logo" 
                className="h-8 mb-2 lg:hidden"
              />
              <h2 className="text-xl font-bold text-brand-navy mb-0.5">Create an Account</h2>
              <p className="text-gray-600 text-xs">
                Fill in your details below to get started
              </p>
            </div>

          
            {/* User Type Selection */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-brand-navy mb-1.5">
                I want to sign up as
              </label>
              <div className="flex border bg-[#002147] rounded-md overflow-hidden">
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-center text-xs font-medium transition-colors ${
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
                  className={`flex-1 py-1.5 text-center text-xs font-medium transition-colors ${
                    userType === "coach"
                      ? "bg-orange-500 text-white"
                      : "bg-transparent text-white hover:bg-orange-500"
                  }`}
                  onClick={() => setUserType("coach")}
                  aria-pressed={userType === "coach"}
                >
                  Coach
                </button>
              </div>
            </div>
          
            {/* Section Title */}
            <div className="mb-3 pb-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-brand-navy">Registration Info</h3>
              <p className="text-xs text-gray-500">All fields marked with * are required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
                  {/* Basic Information */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-brand-navy mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                        errors.name 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                      }`}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-brand-navy mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                        errors.email 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-medium text-brand-navy mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.password}
                        className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.password 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                        } pr-8`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 hover:text-brand-orange text-sm"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  
                    {/* Password strength meter */}
                    {form.password && (
                      <div className="mt-1">
                        <div className="flex justify-between mb-0.5">
                          <span className="text-xs text-gray-600">Strength:</span>
                          <span className="text-xs font-medium text-brand-navy">{getPasswordStrengthLabel()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`${getPasswordStrengthColor()} h-1 rounded-full transition-all duration-300`} 
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  
                    {errors.password && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="password_confirmation" className="block text-xs font-medium text-brand-navy mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.password_confirmation}
                        className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.password_confirmation 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                        } pr-8`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 hover:text-brand-orange text-sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password_confirmation && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.password_confirmation}</p>}
                  </div>

                  {/* Terms and Privacy Policy */}
                  <div className="flex items-start">
                    <div className="flex items-center h-4">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={form.acceptTerms}
                        onChange={handleChange}
                        className="focus:ring-brand-orange h-3.5 w-3.5 text-brand-orange border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-1.5 text-xs">
                      <label htmlFor="acceptTerms" className="text-gray-700">
                        I accept the <a href="/terms" className="text-brand-orange hover:underline font-medium">Terms</a> and{" "}
                        <a href="/privacy" className="text-brand-orange hover:underline font-medium">Privacy Policy</a>
                      </label>
                      {errors.acceptTerms && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.acceptTerms}</p>}
                    </div>
                  </div>

                  {/* Newsletter Opt-in */}
                  <div className="flex items-start">
                    <div className="flex items-center h-4">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={form.newsletter}
                        onChange={handleChange}
                        className="focus:ring-brand-orange h-3.5 w-3.5 text-brand-orange border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-1.5 text-xs">
                      <label htmlFor="newsletter" className="text-gray-700">
                        Subscribe to newsletter for updates
                      </label>
                    </div>
                  </div>

                  {/* Two-column layout for compact fields */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-brand-navy mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.phone 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="timezone" className="block text-xs font-medium text-brand-navy mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        name="timezone"
                        value={form.timezone}
                        onChange={handleChange}
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange"
                      >
                        <option value="">Select...</option>
                        <option value="America/New_York">Eastern (ET)</option>
                        <option value="America/Chicago">Central (CT)</option>
                        <option value="America/Denver">Mountain (MT)</option>
                        <option value="America/Los_Angeles">Pacific (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">CET</option>
                        <option value="Asia/Tokyo">Japan (JST)</option>
                        <option value="Australia/Sydney">Sydney</option>
                      </select>
                    </div>
                  </div>

                  {/* Profile Picture Upload */}
                  <div>
                    <label htmlFor="profilePic" className="block text-xs font-medium text-brand-navy mb-1">
                      Profile Picture (Optional)
                    </label>
                    <input
                      id="profilePic"
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-brand-orange file:text-white hover:file:bg-[#0052A3] file:cursor-pointer"
                    />
                    {errors.profilePic && (
                      <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.profilePic}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label htmlFor="bio" className="block text-xs font-medium text-brand-navy mb-1">
                      Brief Bio (Optional)
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {/* Coach-specific fields */}
                  {userType === "coach" && (
                    <div>
                      <label htmlFor="specialty" className="block text-xs font-medium text-brand-navy mb-1">
                        Coaching Specialty <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="specialty"
                        type="text"
                        name="specialty"
                        value={form.specialty}
                        onChange={handleChange}
                        className={`w-full px-2.5 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 ${
                          errors.specialty 
                            ? "border-red-500 focus:ring-red-500" 
                            : "border-gray-300 focus:ring-brand-orange focus:border-brand-orange"
                        }`}
                        placeholder="e.g., Career Coaching"
                      />
                      {errors.specialty && <p className="text-red-500 text-xs mt-0.5" role="alert">{errors.specialty}</p>}
                    </div>
                  )}

                  {/* Two-column layout for compact fields */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-medium text-brand-navy mb-1">
                        Preferred Contact
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            id="contact-email"
                            name="preferredContact"
                            type="radio"
                            value="email"
                            checked={form.preferredContact === "email"}
                            onChange={handleChange}
                            className="focus:ring-brand-orange h-3 w-3 text-brand-orange border-gray-300"
                          />
                          <label htmlFor="contact-email" className="ml-1 text-xs text-gray-700">
                            Email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="contact-phone"
                            name="preferredContact"
                            type="radio"
                            value="phone"
                            checked={form.preferredContact === "phone"}
                            onChange={handleChange}
                            className="focus:ring-brand-orange h-3 w-3 text-brand-orange border-gray-300"
                          />
                          <label htmlFor="contact-phone" className="ml-1 text-xs text-gray-700">
                            Phone
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="referralCode" className="block text-xs font-medium text-brand-navy mb-1">
                        Referral Code
                      </label>
                      <input
                        id="referralCode"
                        type="text"
                        name="referralCode"
                        value={form.referralCode}
                        onChange={handleChange}
                        className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-start">
                    <div className="flex items-center h-4">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={form.rememberMe}
                        onChange={handleChange}
                        className="focus:ring-brand-orange h-3.5 w-3.5 text-brand-orange border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-1.5 text-xs">
                      <label htmlFor="rememberMe" className="text-gray-700">
                        Remember me on this device
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
            </form>

            {/* Divider + Social Logins */}
            <div className="mt-3 text-center space-y-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className={socialLoading.google ? "opacity-50" : ""}>
                  {hasGoogleAuth ? (
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap={false}
                      theme="outline"
                      shape="rectangular"
                      locale="en"
                      text="signup_with"
                      disabled={socialLoading.google}
                      size="medium"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => toast.error("Add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env to enable Google sign-up.")}
                      className="flex items-center justify-center w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FcGoogle className="h-4 w-4 mr-1" />
                      Sign up with Google
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  disabled={socialLoading.facebook}
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex items-center justify-center w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaFacebook className="h-4 w-4 mr-1 text-blue-600" />
                  {socialLoading.facebook ? 'Connecting...' : 'Facebook'}
                </button>
              </div>
            </div>

            {/* Sign In Link */}
            <p className="mt-3 text-center text-xs text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-brand-orange hover:underline font-medium">
                Sign In
              </a>
            </p>
          
            {/* Social proof */}
            <div className="mt-2 text-center pb-2">
              <p className="text-xs text-gray-500">Join over 5,000 members on their wellness journey</p>
            </div>
          
            {/* Error message for form submission */}
            {errors.submit && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-500 text-xs" role="alert">{errors.submit}</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );

  return hasGoogleAuth ? (
    <GoogleOAuthProvider clientId={googleClientId}>
      {content}
    </GoogleOAuthProvider>
  ) : (
    content
  );
}
