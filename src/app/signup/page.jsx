"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api/auth.service";
import { toast } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleAuthService } from '@/services/api/google-auth.service';

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState("client");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    try {
      setSocialLoading(prev => ({ ...prev, google: true }));
      const response = await googleAuthService.loginWithGoogle(credentialResponse.credential);
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
        toast.success('Successfully signed in with Google!');
        router.push(userType === "client" ? "/client" : "/coach");
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
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
    
    if (currentStep === 1) {
      if (!form.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
      
      if (!form.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms and privacy policy.";
      }
    }
    
    if (currentStep === 2) {
      if (form.phone && !/^\+?[0-9\s\-()]{10,15}$/.test(form.phone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      
      if (userType === "coach" && !form.specialty) {
        newErrors.specialty = "Please specify your coaching specialty.";
      }
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      if (currentStep === 1) {
        setCurrentStep(2);
        window.scrollTo(0, 0);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Prepare registration data
        const registrationData = {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          role: userType.toUpperCase(),
          phone: form.phone?.trim() || undefined,
          timezone: form.timezone || undefined,
          bio: form.bio?.trim() || undefined,
          specialty: userType === "coach" ? form.specialty?.trim() : undefined,
          referralCode: form.referralCode?.trim() || undefined,
          preferredContact: form.preferredContact,
          profilePic: form.profilePic || undefined
        };

        // Call the registration API
        const response = await authService.register(registrationData);
        
        // Store the token and user preferences
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
          if (form.rememberMe) {
            localStorage.setItem('remember_me', 'true');
          }
          
          // Show success message
          toast.success('Registration successful! Welcome aboard!');
          
          // Redirect based on user type
          router.push(userType === "client" ? "/client" : "/coach");
        }
      } catch (error) {
        console.error("Registration error:", error);
        
        // Handle network errors
        if (!error.response) {
          toast.error('Network error. Please check your internet connection and try again.');
          setErrors(prev => ({ 
            ...prev, 
            submit: "Unable to connect to the server. Please check your internet connection." 
          }));
          return;
        }
        
        // Handle specific error cases
        if (error.response?.status === 409) {
          toast.error('This email is already registered. Please try logging in instead.');
          setErrors(prev => ({ 
            ...prev, 
            email: "This email is already registered. Please try logging in instead."
          }));
        } else if (error.response?.status === 400) {
          // Handle validation errors from the backend
          const backendErrors = error.response.data.errors;
          if (backendErrors) {
            setErrors(prev => ({
              ...prev,
              ...Object.keys(backendErrors).reduce((acc, key) => {
                acc[key] = backendErrors[key][0];
                return acc;
              }, {})
            }));
            toast.error('Please check the form for errors.');
          }
        } else {
          // Handle other error cases
          const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
          setErrors(prev => ({ 
            ...prev, 
            submit: errorMessage
          }));
          toast.error(errorMessage);
        }
        
        // If we're getting a server error, notify the user
        if (error.response?.status >= 500) {
          toast.error("We're experiencing technical difficulties. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Create an Account</h1>
          
          {/* User Type Selection */}
          <div className="flex mb-6 border bg-[#002147] rounded-md overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-2 text-center ${userType === "client" 
                ? "bg-brand-orange text-white" 
                : "bg-gray-100 text-brand-blue hover:bg-gray-200"}`}
              onClick={() => setUserType("client")}
              aria-pressed={userType === "client"}
            >
              Client
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-center ${userType === "coach" 
                ? "bg-brand-orange text-white" 
                : "bg-gray-100 text-brand-blue hover:bg-gray-200"}`}
              onClick={() => setUserType("coach")}
              aria-pressed={userType === "coach"}
            >
              Coach
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-brand-blue">Basic Info</span>
              <span className="text-xs text-brand-blue">Profile Details</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-brand-orange h-2.5 rounded-full transition-all duration-300" 
                style={{ width: currentStep === 1 ? "50%" : "100%" }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 ? (
              <>
                {/* Step 1: Basic Information */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-blue mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    aria-required="true"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                    }`}
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-blue mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-required="true"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-brand-blue mb-1">
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
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                      } pr-10`}
                      placeholder="Create a password"
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
                  
                  {/* Password strength meter */}
                  {form.password && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-brand-blue">Password Strength:</span>
                        <span className="text-xs font-medium">{getPasswordStrengthLabel()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`${getPasswordStrengthColor()} h-1.5 rounded-full`} 
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-blue mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      aria-required="true"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                      } pr-10`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-orange"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Terms and Privacy Policy */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={form.acceptTerms}
                      onChange={handleChange}
                      className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="acceptTerms" className="text-brand-blue">
                      I accept the <a href="/terms" className="text-brand-orange hover:underline">Terms of Service</a> and{" "}
                      <a href="/privacy" className="text-brand-orange hover:underline">Privacy Policy</a>
                    </label>
                    {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}
                  </div>
                </div>

                {/* Newsletter Opt-in */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      checked={form.newsletter}
                      onChange={handleChange}
                      className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="text-brand-blue">
                      Subscribe to our newsletter for tips and updates
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn w-full"
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                {/* Step 2: Additional Information */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-blue mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    We may use this for verification or important notifications
                  </p>
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-brand-blue mb-1">
                    Your Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={form.timezone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  >
                    <option value="">Select timezone...</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Central European Time (CET)</option>
                    <option value="Asia/Tokyo">Japan (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEST)</option>
                  </select>
                </div>

                {/* Profile Picture Upload */}
                <div>
                  <label htmlFor="profilePic" className="block text-sm font-medium text-brand-blue mb-1">
                    Profile Picture
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Upload a profile picture (max 5MB)
                  </p>
                  {errors.profilePic && (
                    <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-brand-blue mb-1">
                    Brief Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Tell us a little about yourself..."
                  />
                </div>

                {/* Coach-specific fields */}
                {userType === "coach" && (
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-brand-blue mb-1">
                      Coaching Specialty <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="specialty"
                      type="text"
                      name="specialty"
                      value={form.specialty}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.specialty ? "border-red-500 focus:ring-red-500" : "focus:ring-brand-orange"
                      }`}
                      placeholder="e.g., Career Coaching, Life Balance, etc."
                    />
                    {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
                  </div>
                )}

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-brand-blue mb-1">
                    Preferred Contact Method
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
                        className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300"
                      />
                      <label htmlFor="contact-email" className="ml-2 text-sm text-brand-blue">
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
                        className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300"
                      />
                      <label htmlFor="contact-phone" className="ml-2 text-sm text-brand-blue">
                        Phone
                      </label>
                    </div>
                  </div>
                </div>

                {/* Referral Code */}
                <div>
                  <label htmlFor="referralCode" className="block text-sm font-medium text-brand-blue mb-1">
                    Referral Code
                  </label>
                  <input
                    id="referralCode"
                    type="text"
                    name="referralCode"
                    value={form.referralCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    placeholder="Enter code if you have one"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="focus:ring-brand-orange h-4 w-4 text-brand-orange border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="rememberMe" className="text-brand-blue">
                      Remember me on this device
                    </label>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 py-2 px-4 border border-brand-blue text-brand-blue rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {currentStep === 1 && (
            <>
              <div className="mt-6 text-center space-y-3">
                <p className="text-sm text-brand-blue">Or sign up with</p>
                <div className="flex justify-center space-x-4">
                  <div className={`${socialLoading.google ? 'opacity-50' : ''}`}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      useOneTap
                      theme="outline"
                      shape="rectangular"
                      locale="en"
                      text="signup_with"
                      disabled={socialLoading.google}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={socialLoading.facebook}
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center px-4 py-2 border rounded-md text-brand-blue hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaFacebook className="mr-2 text-blue-600 text-xl" />
                    {socialLoading.facebook ? 'Connecting...' : 'Facebook'}
                  </button>
                </div>
              </div>

              <p className="text-sm text-center text-brand-blue mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-brand-orange hover:underline">
                  Log in
                </a>
              </p>
            </>
          )}
          
          {/* Social proof */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">Join over 5,000 members already on their wellness journey</p>
          </div>
          
          {/* Error message for form submission */}
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-500 text-sm">{errors.submit}</p>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
