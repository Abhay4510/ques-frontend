import { Bell, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { Breadcrumb } from "./Breadcrumb"

export const Header = ({ breadcrumbItems }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
        </button>
        <Link to="/account-settings" className="text-gray-500 hover:text-gray-700">
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}
