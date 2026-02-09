
"use client";

// Data arrays for dynamic rendering
const navLinks = [
  { label: "Dashboard" },
  { label: "Reports" },
];
const courses = [
  { name: "Prototyping", count: 10 },
  { name: "Human-Computer...", count: 2 },
  { name: "Webflow Fundamentals" },
  { name: "Origami Studio" },
];
const assignments = [
  { name: "Navigating the Path...", color: "text-blue-400" },
];
const directMessages = [
  "Annette Black",
  "Marvin McKinney",
  "Robert Fox",
];
const gridUsers = [
  {
    type: "emoji",
    content: "👨🏽‍🎓",
    name: "Melody Onuocha",
    bg: "bg-pink-500",
    labelClass: "text-gray-200",
  },
  {
    type: "img",
    src: "https://via.placeholder.com/400x250",
    alt: "Darrell Stewart",
    name: "Darrell Steward",
    labelBg: "bg-orange-500",
  },
  {
    type: "img",
    src: "https://via.placeholder.com/400x250",
    alt: "Bessie Cooper",
    name: "Bessie Cooper",
    labelBg: "bg-red-500",
  },
  {
    type: "img",
    src: "https://via.placeholder.com/400x250",
    alt: "Esther Howard",
    name: "Esther Howard",
    labelBg: "bg-green-500",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-gray-800 flex-col justify-between shrink-0" aria-label="Sidebar">
        <div>
          <div className="p-4 border-b border-gray-700 text-green-400 font-bold">Virtual Huddle</div>
          <div className="p-4 text-sm text-gray-400">Web Conferencing</div>
          <nav className="mt-4" aria-label="Main navigation">
            <ul className="space-y-2 px-4">
              {navLinks.map((link) => (
                <li className="text-gray-300" key={link.label}>{link.label}</li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 px-4 text-sm text-gray-400">COURSES</div>
          <ul className="mt-2 space-y-1 px-4">
            {courses.map((course) => (
              <li className="flex justify-between text-white" key={course.name}>
                {course.name}
                {course.count && (
                  <span className="bg-red-600 text-xs px-2 rounded-full">{course.count}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 px-4 text-sm text-gray-400">Assignments</div>
          <ul className="mt-2 px-4">
            {assignments.map((a) => (
              <li className={a.color} key={a.name}>{a.name}</li>
            ))}
          </ul>

          <div className="mt-6 px-4 text-sm text-gray-400">DIRECT MESSAGES</div>
          <ul className="mt-2 px-4 space-y-1">
            {directMessages.map((name) => (
              <li className="text-white" key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 space-y-2 text-sm text-gray-300">
          <div>Settings</div>
          <div>Help</div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="p-3 sm:p-4 border-b border-gray-700 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-base sm:text-lg font-semibold truncate">Navigating the path to success.</h1>
          <div className="flex items-center space-x-4">
            <span className="text-red-400 text-sm">● Recording</span>
            <div className="w-8 h-8 rounded-full bg-pink-400 shrink-0" aria-hidden />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-6 min-h-0 overflow-auto">
          {gridUsers.map((user, idx) => (
            user.type === "emoji" ? (
              <div className="bg-gray-700 rounded-lg flex flex-col items-center justify-center" key={user.name}>
                <div className={`w-16 h-16 ${user.bg} rounded-full flex items-center justify-center text-2xl`} aria-label={user.name}>{user.content}</div>
                <div className={`mt-2 text-sm ${user.labelClass}`}>{user.name}</div>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden" key={user.name}>
                <img src={user.src} alt={user.alt} className="w-full h-full object-cover" />
                <div className={`absolute bottom-2 left-2 ${user.labelBg} text-sm px-2 py-1 rounded`}>{user.name}</div>
              </div>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 flex justify-center gap-2 sm:space-x-4 border-t border-gray-700 shrink-0">
          <button className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-gray-700 p-2 rounded-full" aria-label="Toggle microphone" aria-pressed="false">🎤</button>
          <button className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-gray-700 p-2 rounded-full" aria-label="Toggle camera" aria-pressed="false">🎥</button>
          <button className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-gray-700 p-2 rounded-full" aria-label="Open chat" aria-pressed="false">💬</button>
          <button className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-red-600 p-2 rounded-full" aria-label="Leave call">📞</button>
        </div>
      </main>
    </div>
  );
}
