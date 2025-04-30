import { Bell, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { Breadcrumb } from "./Breadcrumb"
import { useAuth } from "../context/AuthContext"

export const Header = ({ breadcrumbItems }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100">
          <Bell className="w-5 h-5" />
        </button>
        <button 
          onClick={handleLogout} 
          className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}