import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, Settings, LogOut } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/client/dashboard', icon: <Home size={18} /> },
  { name: 'Reports', href: '/client/reports', icon: <BarChart2 size={18} /> },
  { name: 'Settings', href: '/client/settings', icon: <Settings size={18} /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold text-gray-800">WANAC Client Portal</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all 
              ${
                pathname === item.href
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full rounded-md">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  )
}
