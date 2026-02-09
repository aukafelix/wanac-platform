"use client";
import { useState, useEffect } from "react";
import CoachSidebar from '../../../../components/dashboardcomponents/CoachSidebar';
import ClientTopbar from '../../../../components/dashboardcomponents/clienttopbar';
import { FaLightbulb, FaPaperclip, FaLink, FaTrash } from "react-icons/fa";

// Mock coaching tips data
const mockTips = [
  {
    id: 1,
    title: "Active Listening",
    description: "Focus fully on your client, reflect back what you hear, and avoid interrupting. This builds trust and understanding.",
    documents: [
      { name: "ActiveListeningGuide.pdf", url: "/docs/ActiveListeningGuide.pdf" },
      { name: "ListeningChecklist.docx", url: "/docs/ListeningChecklist.docx" }
    ],
    links: [
      { label: "Active Listening Article", url: "https://www.mindtools.com/CommSkll/ActiveListening.htm" },
      { label: "Listening Skills Video", url: "https://www.youtube.com/watch?v=6DlrqeWrczs" }
    ]
  },
  {
    id: 2,
    title: "Ask Powerful Questions",
    description: "Use open-ended questions to encourage deeper reflection and insight. Avoid yes/no questions when possible.",
    documents: [
      { name: "PowerfulQuestions.pdf", url: "/docs/PowerfulQuestions.pdf" }
    ],
    links: [
      { label: "Open-Ended Questions Resource", url: "https://coachingfederation.org/blog/asking-powerful-questions" }
    ]
  },
  {
    id: 3,
    title: "Set Clear Goals",
    description: "Work with your client to define specific, measurable, achievable, relevant, and time-bound (SMART) goals.",
    documents: [
      { name: "SMARTGoalsTemplate.docx", url: "/docs/SMARTGoalsTemplate.docx" }
    ],
    links: [
      { label: "SMART Goals Explained", url: "https://www.mindtools.com/pages/article/smart-goals.htm" }
    ]
  },
  {
    id: 4,
    title: "Provide Constructive Feedback",
    description: "Offer feedback that is specific, actionable, and focused on behaviors rather than personal traits.",
    documents: [
      { name: "FeedbackFramework.pdf", url: "/docs/FeedbackFramework.pdf" }
    ],
    links: [
      { label: "Giving Feedback Article", url: "https://www.ccl.org/articles/leading-effectively-articles/feedback-that-works/" }
    ]
  },
  {
    id: 5,
    title: "Encourage Accountability",
    description: "Help clients create action plans and check in on their progress regularly to foster accountability.",
    documents: [
      { name: "AccountabilityWorksheet.pdf", url: "/docs/AccountabilityWorksheet.pdf" }
    ],
    links: [
      { label: "Accountability in Coaching", url: "https://positivepsychology.com/accountability-coaching/" }
    ]
  }
];

export default function CoachingTipsPage() {
  const [user, setUser] = useState({ name: "Coach" });
  // Local state for uploaded files and reference links per tip
  const [tipFiles, setTipFiles] = useState({}); // { [tipId]: File }
  const [tipLinks, setTipLinks] = useState({}); // { [tipId]: [string] }
  const [newLinks, setNewLinks] = useState({}); // { [tipId]: string }

  useEffect(() => {
    // Optionally load user from localStorage for personalization
    const userData = localStorage.getItem('wanacUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser({ name: "Coach" });
      }
    }
  }, []);

  // Handle file upload for a specific tip
  const handleFileChange = (tipId, e) => {
    const file = e.target.files[0];
    if (file) {
      setTipFiles((prev) => ({ ...prev, [tipId]: file }));
    }
  };

  // Handle adding a new reference link for a specific tip
  const handleAddLink = (tipId) => {
    const link = newLinks[tipId]?.trim();
    if (link) {
      setTipLinks((prev) => ({ ...prev, [tipId]: [...(prev[tipId] || []), link] }));
      setNewLinks((prev) => ({ ...prev, [tipId]: "" }));
    }
  };

  // Handle removing a reference link
  const handleRemoveLink = (tipId, idx) => {
    setTipLinks((prev) => ({
      ...prev,
      [tipId]: prev[tipId].filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="h-screen flex bg-white font-body text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Sidebar */}
      <CoachSidebar />
      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full transition-all duration-300">
        {/* Top Bar */}
        <ClientTopbar user={user} />
        {/* Main Content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-8 py-4 md:py-6 bg-muted">
          <div className="max-w-4xl mx-auto">
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-2">

                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-heading" style={{ fontFamily: 'var(--font-heading)' }}>
                  Coaching Tips
                </h1>
              </div>
              <p className="text-gray-600 text-base md:text-lg">Boost your coaching impact with these practical tips and best practices.</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockTips.map((tip) => (
                <div key={tip.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md flex flex-col gap-2 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-1">
                    <FaLightbulb className="text-yellow-400" />
                    <h2 className="text-lg font-semibold text-heading" style={{ fontFamily: 'var(--font-heading)' }}>{tip.title}</h2>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{tip.description}</p>
                  {/* Provided by Admin section */}
                  {(tip.documents?.length > 0 || tip.links?.length > 0) && (
                    <div className="mb-2 p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-700 mb-1">Provided by Admin:</div>
                      {tip.documents?.length > 0 && (
                        <div className="mb-1">
                          <div className="text-xs font-medium">Documents:</div>
                          <ul className="list-disc pl-5">
                            {tip.documents.map((doc, idx) => (
                              <li key={idx}>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                                  {doc.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tip.links?.length > 0 && (
                        <div>
                          <div className="text-xs font-medium">Links:</div>
                          <ul className="list-disc pl-5">
                            {tip.links.map((link, idx) => (
                              <li key={idx}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Document upload/view */}
                  <div className="flex flex-col gap-2 mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-blue-600 cursor-pointer">
                      <FaPaperclip className="transition-colors duration-200 group-hover:text-blue-600" /> Upload/View Document:
                      <input
                        type="file"
                        className="ml-2 file:cursor-pointer file:text-blue-600 hover:file:bg-blue-50 transition-colors duration-200"
                        style={{ fontSize: 12 }}
                        onChange={(e) => handleFileChange(tip.id, e)}
                        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                      />
                    </label>
                    {tipFiles[tip.id] && (
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={URL.createObjectURL(tipFiles[tip.id])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-xs"
                        >
                          View/Download: {tipFiles[tip.id].name}
                        </a>
                      </div>
                    )}
                  </div>
                  {/* Reference links */}
                  <div className="flex flex-col gap-1 mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <FaLink /> Reference Links:
                    </label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        placeholder="Paste reference URL and press +"
                        className="border rounded px-2 py-1 text-xs flex-1"
                        value={newLinks[tip.id] || ""}
                        onChange={e => setNewLinks(prev => ({ ...prev, [tip.id]: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') handleAddLink(tip.id); }}
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white rounded px-2 py-1 text-xs font-bold"
                        onClick={() => handleAddLink(tip.id)}
                        title="Add link"
                      >+
                      </button>
                    </div>
                    {tipLinks[tip.id] && tipLinks[tip.id].length > 0 && (
                      <ul className="list-disc pl-5 mt-1">
                        {tipLinks[tip.id].map((link, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs">
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{link}</a>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveLink(tip.id, idx)}
                              title="Remove link"
                            >
                              <FaTrash />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
