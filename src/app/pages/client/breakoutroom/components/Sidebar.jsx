export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-4 fixed flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="text-2xl font-extrabold mb-10 tracking-tight flex items-center gap-2">
          <span className="inline-block">{/* You can replace this with an <img> if you have a logo */}
            <span className="text-black">FIRETEAM</span>
            
          </span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col space-y-4">
          <a href="#" className="text-blue-600 font-semibold flex items-center gap-2">
            <span>Home</span>
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center gap-2">
            <span>Notifications</span>
          </a>
        </nav>
      </div>
      {/* Bottom Links */}
      <div className="flex flex-col space-y-2 mb-2">
        <a href="#" className="text-gray-400 hover:text-blue-500 text-sm flex items-center gap-2">Help</a>
        <a href="#" className="text-gray-400 hover:text-blue-500 text-sm flex items-center gap-2">Settings</a>
        <a href="#" className="text-gray-400 hover:text-blue-500 text-sm flex items-center gap-2">Log out</a>
      </div>
    </aside>
  );
}