import { Link, useLocation } from "react-router-dom"
import { SidebarLogo } from "../assets/SidebarLogo"
import { PlusCircle, HelpCircle, Layers, Radio, ArrowUpCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { logout } from "../api/auth"
import { useState } from "react"

export const Sidebar = ({ username = "Username", email = "username@gmail.com" }) => {
  const location = useLocation()
  const path = location.pathname

  const [collapsed, setCollapsed] = useState(false)

  const isActive = (route) => {
    return path.includes(route)
  }

  const handleLogout = () => {
    logout()
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      className={`${collapsed ? "w-16" : "w-64"} h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-80 bg-purple-600 border border-purple-700 rounded-full p-1 shadow-sm z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>
      <div className="p-4">
        <Link to="/projects" className="flex items-center">
          <div className={`${collapsed ? "w-8" : "w-full"}`}>
            {collapsed ? (
              <div className="w-8 h-8 bg-[#7E22CE] rounded-md flex items-center justify-center text-white font-bold">
                Q
              </div>
            ) : (
              <SidebarLogo />
            )}
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/add-podcast"
                className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive("/add-podcast") ? "text-[#7E22CE] bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                {!collapsed && <span>Add your Podcast(s)</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/create-repurpose"
                className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive("/create-repurpose") ? "text-[#7E22CE] bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Layers className="w-5 h-5 mr-3" />
                {!collapsed && <span>Create & Repurpose</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/podcast-widget"
                className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive("/podcast-widget") ? "text-[#7E22CE] bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Radio className="w-5 h-5 mr-3" />
                {!collapsed && <span>Podcast Widget</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/upgrade"
                className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive("/upgrade") ? "text-[#7E22CE] bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <ArrowUpCircle className="w-5 h-5 mr-3" />
                {!collapsed && <span>Upgrade</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/help"
          className={`flex items-center px-4 py-2 text-sm rounded-md ${isActive("/help") ? "text-[#7E22CE] bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          {!collapsed && <span>Help</span>}
        </Link>

        <Link to="/account-settings" className="mt-4 flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-semibold">
            {username.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="ml-2">
              <div className="text-sm font-medium">{username}</div>
              <div className="text-xs text-gray-500">{email}</div>
            </div>
          )}
        </Link>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center w-full px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-5 h-5 mr-3" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}
