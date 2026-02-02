"use client";

import React from "react";

const PrivacyPage = () => {
  const lastUpdated = "February 2, 2026";

  const sections = [
    { id: "scope", title: "1. Scope and Application" },
    { id: "acceptance", title: "2. Acceptance of this Privacy Policy" },
    { id: "who-we-are", title: "3. Who We Are" },
    { id: "changes", title: "4. Changes to this Privacy Policy" },
    { id: "information-we-collect", title: "5. Information We Collect" },
    { id: "how-we-use", title: "6. How We Use Your Information" },
    { id: "when-we-share", title: "7. When We Share Your Information" },
    { id: "donations", title: "8. Donations and Financial Information" },
    { id: "communications", title: "9. Email, SMS, and Other Communications" },
    { id: "cookies", title: "10. Cookies and Online Tracking" },
    { id: "data-security", title: "11. Data Security" },
    { id: "data-retention", title: "12. Data Retention" },
    { id: "choices-rights", title: "13. Your Choices and Rights" },
    { id: "children", title: "14. Children's Privacy" },
    { id: "international", title: "15. International Users" },
    { id: "external-links", title: "16. External Links" },
    { id: "update-correct", title: "17. How to Update or Correct Your Information" },
    { id: "contact", title: "18. Contact Us" },
  ];

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero Section */}
      <header className="relative bg-[#002147] text-white min-h-[280px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: 'url("/community1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/95 via-[#002147]/90 to-[#ff5e1a/30" />
        <div className="relative z-10 py-14 px-4 w-full max-w-3xl mx-auto text-center">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WANAC Foundation Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-blue-100 font-medium drop-shadow">
            WANAC Foundation is committed to protecting the privacy and security of the individuals and organizations we serve.
          </p>
          <p className="text-sm text-blue-200/90 mt-2">Last updated: {lastUpdated}</p>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-6">
            WANAC Foundation (“WANAC,” “we,” “us,” or “our”) is committed to protecting the privacy and security of the individuals and organizations we serve, including service members, veterans, and their families. This Privacy Policy explains how we collect, use, share, and protect information when you interact with WANAC online or offline.
          </p>
          <p className="text-gray-700 leading-relaxed mb-10">
            By using our websites, applications, or services, or by providing information to us, you agree to the terms of this Privacy Policy.
          </p>

          {/* Table of contents */}
          <nav className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold text-[#002147] mb-4">In this policy</h2>
            <ul className="space-y-2 text-sm">
              {sections.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[#002147] hover:text-orange-500 underline transition-colors">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10 prose prose-gray max-w-none">
            <section id="scope">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">1. Scope and Application</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                This Privacy Policy applies when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Visit or use any WANAC website, landing page, or web application that links to this Privacy Policy (collectively, the “Sites”);</li>
                <li>Use our online forms, tools, or platforms for coaching, education, career, or entrepreneurship support;</li>
                <li>Interact with us through email, phone, text, or other communication channels;</li>
                <li>Make a donation to WANAC, whether online or through other methods;</li>
                <li>Connect with WANAC through third-party platforms and integrations (for example, LinkedIn sign-in or profile connections).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy does not apply to third-party websites, applications, or platforms that do not link to this policy. Those services are governed by their own privacy policies and terms.
              </p>
            </section>

            <section id="acceptance">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">2. Acceptance of this Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using the Sites, participating in WANAC programs, submitting information to us, or connecting via third-party platforms, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree with this Privacy Policy, you should not use the Sites or provide personal information to WANAC.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Your continued use of the Sites after changes to this Privacy Policy become effective will signify your acceptance of the revised policy (see Section 4).
              </p>
            </section>

            <section id="who-we-are">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">3. Who We Are</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                WANAC Foundation is a nonprofit organization focused on serving service members, veterans, and their families through programs that include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Education guidance and pathways;</li>
                <li>Career and employment support;</li>
                <li>Performance and coaching programs;</li>
                <li>Entrepreneurship and vetrepreneurship support;</li>
                <li>Related support services and resources.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All references to “WANAC” in this Privacy Policy refer solely to WANAC Foundation.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">4. Changes to this Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we do so, we will revise the “Last updated” date at the top of this page.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any changes will become effective when posted on the Sites. Your continued use of the Sites or continued provision of information after an update signifies your acceptance of the revised Privacy Policy.
              </p>
            </section>

            <section id="information-we-collect">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">5. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you interact with WANAC, we may collect two broad categories of information:
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">5.1 Personal Information</p>
              <p className="text-gray-700 leading-relaxed mb-3">
                “Personal Information” means information that identifies, relates to, describes, or could reasonably be linked to a particular individual. Depending on how you interact with WANAC, this may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li><strong>Contact information:</strong> Name, mailing address, email address, phone number.</li>
                <li><strong>Demographic and background information:</strong> Service branch, service status, rank, education history, career interests, program eligibility information, and other details relevant to transition and support services.</li>
                <li><strong>Account and profile information:</strong> Usernames, passwords, preferences, program enrollments, and participation history.</li>
                <li><strong>Application and intake information:</strong> Responses in forms or assessments related to education, employment, coaching, or entrepreneurship programs.</li>
                <li><strong>Donation and payment details:</strong> Donation amounts, transaction identifiers, limited payment details (handled through third-party payment processors), and related records.</li>
                <li><strong>Communications:</strong> Messages, emails, or other content you send to us, including feedback, survey responses, or stories you choose to share.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect Personal Information when you provide it voluntarily, such as when you complete a form, sign up for a program, create an account, make a donation, subscribe to communications, or otherwise interact with us.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">5.2 Non-Personal / Aggregate Information</p>
              <p className="text-gray-700 leading-relaxed mb-3">
                “Non-Personal Information” or “Aggregate Information” is information that does not identify you personally. This can include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
                <li>Browser type and version;</li>
                <li>Device type and operating system;</li>
                <li>IP address and general location information (e.g., city, region);</li>
                <li>Pages viewed, links clicked, and time spent on our Sites;</li>
                <li>Referring URLs and other usage statistics.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use this information in aggregate form to understand how our Sites are used, improve user experience, and enhance our programs and services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">5.3 Information from Third Parties and Integrations (including LinkedIn)</p>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may obtain information about you from third-party sources, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li><strong>LinkedIn or other professional platforms:</strong> If you choose to connect or sign in through LinkedIn or another third-party service, we may receive information such as your name, headline, profile URL, email address, and professional history, depending on the permissions you grant.</li>
                <li><strong>Partners and program collaborators:</strong> Educational institutions, employers, or veteran-serving organizations that partner with WANAC may share information with us in connection with specific programs, subject to applicable agreements and laws.</li>
                <li><strong>Publicly available sources:</strong> Information that you have made publicly available on professional or social platforms, where relevant to outreach or program eligibility.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control the information shared from third-party platforms (such as LinkedIn) through your settings on those platforms.
              </p>
            </section>

            <section id="how-we-use">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">6. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may use Personal Information and Non-Personal Information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li><strong>Program delivery and support:</strong> To provide, administer, and improve WANAC programs, coaching, workshops, and services, including eligibility review, scheduling, and ongoing support.</li>
                <li><strong>Communication:</strong> To respond to your inquiries, send updates, confirmations, reminders, newsletters, surveys, and other information related to WANAC programs, events, and opportunities.</li>
                <li><strong>Personalization:</strong> To better understand your background, goals, and preferences so that we can provide more tailored resources, recommendations, and support.</li>
                <li><strong>Donor and supporter relations:</strong> To process donations, issue acknowledgments and receipts, and communicate with donors about impact, campaigns, and opportunities to support WANAC.</li>
                <li><strong>Analytics and improvement:</strong> To analyze use of our Sites and services, assess program performance, and improve our offerings.</li>
                <li><strong>Security and compliance:</strong> To detect, investigate, and prevent fraud, abuse, or security incidents, and to comply with applicable laws, regulations, and reporting obligations.</li>
                <li><strong>Other purposes with your consent:</strong> For any other purpose that we disclose to you and to which you explicitly consent.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                We do not sell your Personal Information.
              </p>
            </section>

            <section id="when-we-share">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">7. When We Share Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the limited circumstances described below:
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">7.1 Service Providers</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share information with trusted third-party vendors and service providers who perform services on our behalf, such as: website hosting and maintenance; data storage and cloud services; email, messaging, and communication platforms; payment processing; analytics and reporting tools. These service providers are permitted to use your information only as necessary to provide services to WANAC and are expected to protect it appropriately.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">7.2 Program Partners</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In connection with specific programs, we may share relevant information with: educational institutions, scholarship or fellowship providers; employers or recruiting partners; veteran-serving organizations and nonprofits collaborating with WANAC. Such sharing occurs only where necessary to operate the program, fulfill your requests, or achieve the stated program purpose, and is subject to appropriate legal and contractual safeguards where required.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">7.3 Legal, Safety, and Corporate Matters</p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose information: if required to do so by law, regulation, legal process, or governmental request; to protect the rights, property, or safety of WANAC, our users, or others; to detect, prevent, or address fraud, security, or technical issues; in connection with a reorganization or similar transaction involving WANAC, to the extent permitted by law.
              </p>
              <p className="text-gray-700 leading-relaxed mb-2 font-semibold">7.4 Aggregated or De-Identified Information</p>
              <p className="text-gray-700 leading-relaxed">
                We may use and share aggregated or de-identified information (which cannot reasonably be used to identify you) for research, reporting, and program evaluation purposes.
              </p>
            </section>

            <section id="donations">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">8. Donations and Financial Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you make a donation or payment to WANAC, your financial information is typically processed by a third-party payment processor or service provider. Depending on the method used, this may involve:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Limited payment card details (usually tokenized and not stored by WANAC);</li>
                <li>Transaction identifiers and donation amounts;</li>
                <li>Billing contact information.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use this information to process your transaction, issue receipts, maintain accurate donation records, comply with legal obligations, and communicate with you about your support, unless you ask us not to.
              </p>
              <p className="text-gray-700 leading-relaxed">
                WANAC endeavors to use payment processors that maintain appropriate security standards for handling financial information.
              </p>
            </section>

            <section id="communications">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">9. Email, SMS, and Other Communications</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you provide us with your email address, phone number, or other contact details, we may use them to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Send program-related communications (onboarding, scheduling, reminders, updates);</li>
                <li>Share newsletters, impact reports, and opportunities to get involved;</li>
                <li>Invite you to provide feedback, participate in surveys, or attend events.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may opt out of receiving promotional or non-essential communications at any time by using the unsubscribe link in emails or by contacting us (see Section 18). Even if you opt out of promotional messages, we may still send you essential transactional or program-related communications.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If WANAC offers mobile messaging programs (such as SMS alerts), those programs may be subject to additional terms and privacy notices, which will be presented at the time you enroll.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">10. Cookies and Online Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our Sites may use “cookies” and similar technologies (such as pixels, tags, and local storage) to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Remember your preferences and settings;</li>
                <li>Enhance your experience on the Sites;</li>
                <li>Analyze usage and performance;</li>
                <li>Support certain features and functionality.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                You can typically configure your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Sites may not function properly if cookies are disabled.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may use third-party analytics providers (such as Google Analytics) that may collect information about your use of the Sites over time and across different websites. These third parties may set and access their own cookies, subject to their own privacy policies.
              </p>
            </section>

            <section id="data-security">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">11. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                WANAC uses reasonable administrative, technical, and physical safeguards designed to protect Personal Information against unauthorized access, use, alteration, and disclosure. These measures may include encryption in transit, access controls, and secure data storage practices.
              </p>
              <p className="text-gray-700 leading-relaxed">
                However, no method of data transmission or storage is completely secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of any credentials used to access WANAC services.
              </p>
            </section>

            <section id="data-retention">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">12. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We retain Personal Information for as long as reasonably necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Deliver programs and services;</li>
                <li>Maintain accurate records of participation and impact;</li>
                <li>Comply with legal, accounting, and reporting obligations;</li>
                <li>Resolve disputes and enforce our agreements;</li>
                <li>Support long-term outcomes and research, where permissible.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Where possible, we may de-identify or aggregate information so that it no longer reasonably identifies you, and retain that information for longer periods for analytical and reporting purposes.
              </p>
            </section>

            <section id="choices-rights">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">13. Your Choices and Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location and applicable law, you may have certain rights regarding your Personal Information, which may include the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-3">
                <li>Request access to the Personal Information we hold about you;</li>
                <li>Request correction or update of inaccurate or incomplete information;</li>
                <li>Request deletion of your Personal Information, subject to legal and program-related limitations;</li>
                <li>Object to or restrict certain processing activities;</li>
                <li>Withdraw consent where processing is based on your consent.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                To exercise these rights, please contact us using the information in Section 18. We may take steps to verify your identity before responding to your request.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Where applicable, you may also have rights under specific state or national privacy laws. WANAC will seek to honor valid requests consistent with its legal obligations and mission.
              </p>
            </section>

            <section id="children">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">14. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our programs and Sites are primarily intended for adults and older youth engaged in transition, education, career, or related support. WANAC does not knowingly collect Personal Information online from children under the age of 16 without appropriate consent or authorization, as required by law.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If we become aware that we have collected Personal Information from a child under 16 without appropriate consent, we will take reasonable steps to delete that information.
              </p>
            </section>

            <section id="international">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">15. International Users</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                WANAC is based in the United States, and the information we collect is processed and stored primarily in the United States. If you access the Sites or provide information from outside the United States, you understand that your information may be transferred to, stored in, and processed in the United States or other jurisdictions that may have different data protection laws than your country of residence.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Where required by law, we will take appropriate steps to ensure an adequate level of protection for cross-border data transfers.
              </p>
            </section>

            <section id="external-links">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">16. External Links</h2>
              <p className="text-gray-700 leading-relaxed">
                The Sites may contain links to third-party websites, resources, or services that are not controlled by WANAC. These links are provided for convenience and informational purposes only. WANAC is not responsible for the content, security, or privacy practices of such third parties, and this Privacy Policy does not apply to them. We encourage you to review the privacy policies of any third-party sites or services you visit.
              </p>
            </section>

            <section id="update-correct">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">17. How to Update or Correct Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                You may request that we update, correct, or modify certain Personal Information by contacting us using the information provided in Section 18. Where appropriate, you may also be able to update certain details directly through an online account or portal, if such functionality is provided.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-xl font-bold text-[#002147] mb-3 border-b border-orange-500 pb-2">18. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy, our data practices, or your rights, or if you wish to submit a privacy-related request, please contact us at:
              </p>
              <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-semibold text-[#002147]">WANAC Foundation</p>
                <p><strong>Email:</strong> <a href="mailto:privacy@wanac.org" className="text-orange-600 hover:text-orange-700 underline">privacy@wanac.org</a></p>
                <p><strong>Mailing Address:</strong> 400 Continental Dr Ste 6137, El Segundo, CA 90245</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-3">
                Please include sufficient detail in your inquiry for us to understand and address your question or request.
              </p>
            </section>
          </div>

          <p className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
