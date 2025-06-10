"use client";

import React, { useState } from "react";
import Link from "next/link";

const RANKS = [
  ...Array.from({ length: 9 }, (_, i) => `E-${i + 1}`),
  ...Array.from({ length: 6 }, (_, i) => `O-${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `W-${i + 1}`),
];

const BRANCHES = [
  "Marines",
  "Army",
  "Navy",
  "Air Force",
  "Coast Guard",
  "Space Force",
];

const EDUCATION_LEVELS = [
  "GED",
  "High School Diploma",
  "Some College",
  "Bachelor's Degree (BA/BS)",
  "Graduate Degree",
];

const TRANSITION_GOALS = [
  "Employment / Job Placement",
  "Education (College, Vocational Training, Certification)",
  "Entrepreneurship / Business Ownership",
  "Personal Growth & Coaching",
  "Coaching Certification (helping others)",
];

const WANAC_PROGRAMS = [
  "Promise Land Career Accelerator (PLCA)",
  "Promise Land Education Pathway (PLEP)",
  "Peak Performance Coaching (PPC)",
  "Certified Peak Performance Coach (CPPC)",
  "Vetrepreneurship Academy",
];

const GENDERS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
];

const RACES = [
  "White",
  "Black/African American",
  "Hispanic/Latino",
  "Asian",
  "Native American",
  "Pacific Islander",
  "Other",
  "Prefer not to say",
];

const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
];

export default function ProgramIntakeForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "email",
    branch: "",
    rank: "",
    unit: "",
    eas: "",
    meb: "",
    education: "",
    transitionGoals: [],
    wanacPrograms: [],
    resume: null,
    gender: "",
    race: [],
    maritalStatus: "",
    mentalWellness: "",
    consentContact: false,
    consentPrivacy: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "transitionGoals") {
      setForm((prev) => {
        const newArr = prev.transitionGoals.includes(value)
          ? prev.transitionGoals.filter((v) => v !== value)
          : [...prev.transitionGoals, value];
        return { ...prev, transitionGoals: newArr };
      });
    } else if (type === "checkbox" && name === "wanacPrograms") {
      setForm((prev) => {
        const newArr = prev.wanacPrograms.includes(value)
          ? prev.wanacPrograms.filter((v) => v !== value)
          : [...prev.wanacPrograms, value];
        return { ...prev, wanacPrograms: newArr };
      });
    } else if (type === "checkbox" && name === "race") {
      setForm((prev) => {
        const newArr = prev.race.includes(value)
          ? prev.race.filter((v) => v !== value)
          : [...prev.race, value];
        return { ...prev, race: newArr };
      });
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required.";
    if (!form.email) newErrors.email = "Email Address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.phone) newErrors.phone = "Phone Number is required.";
    if (!form.eas) newErrors.eas = "End of Active Service (EAS) Date is required.";
    if (!form.consentContact) newErrors.consentContact = "Consent to be contacted is required.";
    if (!form.consentPrivacy) newErrors.consentPrivacy = "You must agree to the Privacy Policy.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Here you would handle the actual submission (API call, etc.)
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#002147]">Thank you!</h2>
          <p className="mb-4">Your Program Intake Form has been submitted. We will contact you soon.</p>
          <Link href="/" className="btn w-full">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#002147]">Program Intake Form</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Personal Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#002147]">1. Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name <span className="text-red-500">*</span></label>
                <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Preferred Contact Method</label>
                <div className="flex gap-6 mt-1">
                  {['email', 'phone', 'text'].map((method) => (
                    <label key={method} className="inline-flex items-center gap-2">
                      <input type="radio" name="preferredContact" value={method} checked={form.preferredContact === method} onChange={handleChange} className="accent-[#002147]" />
                      <span className="capitalize">{method === 'text' ? 'Text Message' : method.charAt(0).toUpperCase() + method.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Military Service Details */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#002147]">2. Military Service Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Branch of Service</label>
                <select name="branch" value={form.branch} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]">
                  <option value="">Select branch</option>
                  {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rank</label>
                <select name="rank" value={form.rank} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]">
                  <option value="">Select rank</option>
                  {RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="unit">Unit <span className="text-gray-400 text-xs">(optional)</span></label>
                <input type="text" id="unit" name="unit" value={form.unit} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="eas">End of Active Service (EAS) Date <span className="text-red-500">*</span></label>
                <input type="date" id="eas" name="eas" value={form.eas} onChange={handleChange} className={`w-full p-3 rounded-lg border ${errors.eas ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-[#002147]`} />
                {errors.eas && <p className="text-red-500 text-xs mt-1">{errors.eas}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Are you currently going through a Medical Evaluation Board (MEB)?</label>
                <div className="flex gap-6 mt-1">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="inline-flex items-center gap-2">
                      <input type="radio" name="meb" value={option} checked={form.meb === option} onChange={handleChange} className="accent-[#002147]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Highest Education Level Completed</label>
                <select name="education" value={form.education} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]">
                  <option value="">Select education level</option>
                  {EDUCATION_LEVELS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Transition Goals & Program Interests */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#002147]">3. Transition Goals & Program Interests</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Primary Transition Goals <span className="text-gray-400 text-xs">(select all that apply)</span></label>
              <div className="grid md:grid-cols-2 gap-2">
                {TRANSITION_GOALS.map((goal) => (
                  <label key={goal} className="inline-flex items-center gap-2">
                    <input type="checkbox" name="transitionGoals" value={goal} checked={form.transitionGoals.includes(goal)} onChange={handleChange} className="accent-[#002147]" />
                    {goal}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">WANAC Programs Interested In <span className="text-gray-400 text-xs">(select all that apply)</span></label>
              <div className="grid md:grid-cols-2 gap-2">
                {WANAC_PROGRAMS.map((program) => (
                  <label key={program} className="inline-flex items-center gap-2">
                    <input type="checkbox" name="wanacPrograms" value={program} checked={form.wanacPrograms.includes(program)} onChange={handleChange} className="accent-[#002147]" />
                    {program}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="resume">Upload Resume <span className="text-gray-400 text-xs">(optional)</span></label>
              <input type="file" id="resume" name="resume" onChange={handleChange} className="w-full" />
              {form.resume && <p className="text-xs mt-1 text-gray-600">Selected: {form.resume.name}</p>}
            </div>
          </section>

          {/* Section 4: Demographic Information (Optional) */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#002147]">4. Demographic Information <span className="text-gray-400 text-sm">(Optional)</span></h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gender Identity</label>
                <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]">
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Race/Ethnicity <span className="text-gray-400 text-xs">(select all that apply)</span></label>
                <div className="grid grid-cols-1 gap-1">
                  {RACES.map((race) => (
                    <label key={race} className="inline-flex items-center gap-2">
                      <input type="checkbox" name="race" value={race} checked={form.race.includes(race)} onChange={handleChange} className="accent-[#002147]" />
                      {race}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marital Status</label>
                <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#002147]">
                  <option value="">Select status</option>
                  {MARITAL_STATUSES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interest in Mental Wellness Support</label>
                <div className="flex gap-6 mt-1">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="inline-flex items-center gap-2">
                      <input type="radio" name="mentalWellness" value={option} checked={form.mentalWellness === option} onChange={handleChange} className="accent-[#002147]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Consent & Agreement */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#002147]">5. Consent & Agreement</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentContact" checked={form.consentContact} onChange={handleChange} className="accent-[#002147] mt-1" />
                <span>I consent to be contacted by WANAC about program opportunities and support services. <span className="text-red-500">*</span></span>
              </label>
              {errors.consentContact && <p className="text-red-500 text-xs ml-6">{errors.consentContact}</p>}
              <label className="flex items-start gap-2">
                <input type="checkbox" name="consentPrivacy" checked={form.consentPrivacy} onChange={handleChange} className="accent-[#002147] mt-1" />
                <span>I agree to WANAC's <Link href="/privacy" className="text-orange-500 underline hover:text-orange-700" target="_blank">Privacy Policy</Link> <span className="text-red-500">*</span></span>
              </label>
              {errors.consentPrivacy && <p className="text-red-500 text-xs ml-6">{errors.consentPrivacy}</p>}
            </div>
          </section>

          <div className="pt-4">
            <button type="submit" className="btn w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
