import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Logo } from "../assets/logo"
import { PlusCircle, HelpCircle, Layers, Radio, ArrowUpCircle, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { logout } from "../api/auth"
import { getUserDetails } from "../api/user"

export const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname
  const [collapsed, setCollapsed] = useState(false)
  const [username, setUsername] = useState("Username")
  const [email, setEmail] = useState("username@gmail.com")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails()
        if (response.status === "success" && response.data) {
          setUsername(response.data.username || "Username")
          setEmail(response.data.email || "username@gmail.com")
        }
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch user details:", error)
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [])

  const isActive = (route) => {
    return path.includes(route)
  }

  const handleLogout = () => {
    logout()
  }

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const handleUserProfileClick = () => {
    navigate("/account-settings")
  }

  return (
    <div
      className={`${collapsed ? "w-20" : "w-64"} h-screen bg-white border-r border-gray-200 flex flex-col relative transition-all duration-300`}
    >
      <div
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 cursor-pointer z-10"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </div>

      <div className="p-4 flex justify-center">
        <Link to="/projects" className="flex items-center">
          <div className={`text-purple-600 ${collapsed ? "w-10" : "w-32"}`}>
            <Logo />
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className={`${collapsed ? "px-2" : "px-4"} py-2`}>
          <ul className="space-y-1">
            <li>
              <Link
                to="/add-podcast"
                className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md ${isActive("/add-podcast") ? "text-purple-600 bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <PlusCircle className="w-5 h-5 min-w-5" />
                {!collapsed && <span className="ml-3">Add your Podcast(s)</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/create-repurpose"
                className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md ${isActive("/create-repurpose") ? "text-purple-600 bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Layers className="w-5 h-5 min-w-5" />
                {!collapsed && <span className="ml-3">Create & Repurpose</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/podcast-widget"
                className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md ${isActive("/podcast-widget") ? "text-purple-600 bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <Radio className="w-5 h-5 min-w-5" />
                {!collapsed && <span className="ml-3">Podcast Widget</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/upgrade"
                className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md ${isActive("/upgrade") ? "text-purple-600 bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <ArrowUpCircle className="w-5 h-5 min-w-5" />
                {!collapsed && <span className="ml-3">Upgrade</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`p-4 border-t border-gray-200 ${collapsed ? "items-center" : ""}`}>
        <Link
          to="/help"
          className={`flex items-center ${collapsed ? "justify-center" : ""} px-4 py-2 text-sm rounded-md ${isActive("/help") ? "text-purple-600 bg-purple-50" : "text-gray-700 hover:bg-gray-100"}`}
        >
          <HelpCircle className="w-5 h-5 min-w-5" />
          {!collapsed && <span className="ml-3">Help</span>}
        </Link>

        <div
          className={`mt-4 flex ${collapsed ? "justify-center" : ""} items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer`}
          onClick={handleUserProfileClick}
        >
          <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-semibold">
            {username.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="ml-2">
              <div className="text-sm font-medium">{username}</div>
              <div className="text-xs text-gray-500">{email}</div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`mt-4 flex ${collapsed ? "justify-center" : ""} items-center w-full px-4 py-2 text-sm rounded-md text-red-600 hover:bg-red-50`}
        >
          <LogOut className="w-5 h-5 min-w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  )
}
