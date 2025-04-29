import { useState, useEffect } from "react"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { getUserDetails, updateUsername } from "../../api/user"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export const AccountSettings = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails()
        if (response.status === "success") {
          setEmail(response.data.email)
          setUsername(response.data.username || "")
        }
        setFetchLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user details")
        setFetchLoading(false)
      }
    }

    fetchUserDetails()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username.trim()) {
      setError("Username cannot be empty")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await updateUsername(username)
      if (response.status === "success") {
        setUsername(response.data.username)
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update username")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar username={username} email={email} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header breadcrumbItems={[{ label: "Account Settings", path: "/account-settings" }]} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-6">
              <Link to="/projects" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Link>
              <h1 className="text-2xl font-bold text-purple-700 ml-4">Account Settings</h1>
            </div>

            {fetchLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                {success && (
                  <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    Account settings updated successfully!
                  </div>
                )}

                {error && <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {username ? username.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Profile Information</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Update your account's profile information and email address.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter your username"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                        <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-1">Subscriptions</h3>
                  <p className="text-gray-500 text-sm mb-4">Manage your subscription plan.</p>

                  <div className="bg-purple-50 border border-purple-200 rounded-md p-4 text-purple-700">
                    <p className="text-sm">
                      Oops! You don't have any active plans. <span className="font-medium">Upgrade now!</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
