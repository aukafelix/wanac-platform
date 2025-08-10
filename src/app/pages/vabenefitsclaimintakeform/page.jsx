'use client';

import React from 'react';
import Link from 'next/link';

const VABenefitsClaimIntakeForm = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-[#002147] text-white">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/landingpage1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-[#002147] opacity-75"></div>
        <div className="relative z-10 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">VSO Claim Support Program</h1>
          <p className="text-xl max-w-3xl mx-auto px-4">
            Expert, Free VA Claims Assistance for Transitioning Veterans
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="#get-started" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Schedule Your Free Consultation
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <section>
        <div className="relative w-full h-10 bg-[#002147] overflow-hidden flex items-center justify-center">
          <nav className="relative z-10 flex space-x-16 px-4">
            <a href="#why-wanac" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Why WANAC?</a>
            <a href="#services" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Services</a>
            <a href="#eligibility" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Eligibility</a>
            <a href="#process" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Process</a>
            <a href="#beyond-claims" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Beyond Claims</a>
            <a href="#faqs" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">FAQs</a>
            <a href="#contact" className="text-white hover:text-blue-300 transition-colors text-sm font-medium">Contact</a>
          </nav>
          <div 
            className="absolute inset-0 w-full" 
            style={{ animation: 'slide 20s linear infinite' }}
          >
            <div className="h-full bg-gradient-to-r from-blue-600 via-[#002147] to-blue-600 w-[200%]"></div>
          </div>
        </div>
      </section>

      {/* Why Choose WANAC Section */}
      <section id="why-wanac" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose WANAC for Your VA Claims?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002147]">Specialized Expertise</h3>
              <p className="text-gray-600">Our experienced VSOs specialize in complex claims like Disability Compensation, GI Bill Education Benefits, Pension Claims, Dependency Benefits, Vocational Rehabilitation (VR&amp;E), and Appeals.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002147]">Free &amp; Trusted Service</h3>
              <p className="text-gray-600">Our VA claims assistance is entirely free, reflecting our commitment to veterans' welfare. WANAC's VSOs are fully accredited and trusted by veterans nationwide.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#002147]">Personalized Approach</h3>
              <p className="text-gray-600">We assess your unique needs, guide you step-by-step, and provide personalized support tailored to your circumstances, ensuring a smooth, stress-free claims experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Our VSO Claim Services Include</h2>
          <ul className="space-y-4 text-lg">
            <li><strong>Disability Compensation Claims:</strong> Assistance filing initial claims and appeals.</li>
            <li><strong>GI Bill &amp; Education Benefits:</strong> Maximizing your education benefits.</li>
            <li><strong>Vocational Rehabilitation &amp; Employment:</strong> Personalized guidance through VR&amp;E claims.</li>
            <li><strong>Dependency &amp; Survivor Benefits:</strong> Helping family members secure entitled benefits.</li>
            <li><strong>Pension &amp; Supplemental Claims:</strong> Expert assistance navigating complex pension claims.</li>
            <li><strong>Appeals &amp; Reviews:</strong> Effective support for appeals, supplemental claims, and claim disputes.</li>
          </ul>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibility" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Eligibility for WANAC's VSO Support</h2>
          <ul className="list-disc list-inside mb-4 text-lg">
            <li>Service members transitioning within 12 months of separation.</li>
            <li>Veterans separated within the past 12 months.</li>
          </ul>
          <p className="text-gray-600">Veterans beyond this timeframe will be referred to trusted external VSOs to ensure continued quality support.</p>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">How Our VSO Process Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-lg">
            <li><strong>Initial Consultation:</strong> Complete our simple online intake form or contact our team directly.</li>
            <li><strong>Personalized Review:</strong> A WANAC VSO assesses your case details and eligibility.</li>
            <li><strong>Claim Filing &amp; Submission:</strong> Your dedicated VSO prepares and submits your claim to the VA.</li>
            <li><strong>Ongoing Support:</strong> Continuous follow-up, updates, and assistance with appeals if necessary.</li>
          </ol>
        </div>
      </section>

      {/* Beyond Claims Section */}
      <section id="beyond-claims" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Transition Beyond Your VA Claim</h2>
          <p className="mb-6 text-lg text-gray-700 text-center">WANAC doesn't just stop at claims support. Our programs seamlessly transition veterans into meaningful education, career, and coaching programs:</p>
          <ul className="grid md:grid-cols-2 gap-6 text-lg">
            <li><strong>Promise Land Career Accelerator (PLCA)</strong> – Career planning and employment assistance.</li>
            <li><strong>Promise Land Education Pathway (PLEP)</strong> – Educational counseling and support.</li>
            <li><strong>Peak Performance Coaching (PPC)</strong> – Personal growth and clarity coaching.</li>
            <li><strong>Vetrepreneurship Academy</strong> – Entrepreneurship training and business startup support.</li>
          </ul>
        </div>
      </section>

      {/* Get Started CTA Section */}
      <section id="get-started" className="py-16 bg-[#002147] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 text-lg max-w-2xl mx-auto">
            Ensure your transition is secure and stress-free. Connect with a WANAC VSO today and begin the process of securing the benefits you deserve.
          </p>
          <Link 
            href="#contact"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
          >
            Schedule Your Free Consultation Now
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#002147]">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002147]">Is WANAC's VSO support really free?</h3>
              <p className="text-gray-600">Yes! Our VSO services are entirely free for transitioning veterans and those within 12 months of separation.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002147]">Can WANAC help with my appeal?</h3>
              <p className="text-gray-600">Absolutely. Our VSOs are experienced in handling appeals and supplemental claims.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#002147]">What if I separated over 12 months ago?</h3>
              <p className="text-gray-600">If you're outside our eligibility window, we'll provide you with trusted external referrals to ensure your needs are met.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="mb-2 text-lg">Phone: [Insert Contact Number]</p>
          <p className="mb-2 text-lg">Email: [Insert Contact Email]</p>
          <p className="mb-6 text-lg">Office: [Insert Physical Address, if applicable]</p>
          <p className="font-bold text-[#002147]">WANAC – Empowering veterans beyond the uniform</p>
        </div>
      </section>
    </div>
  );
};

export default VABenefitsClaimIntakeForm;
