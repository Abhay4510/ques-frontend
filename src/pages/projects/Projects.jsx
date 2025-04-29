import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllProjects } from "../../api/projects"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { PlusCircle } from "lucide-react"

export const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects()
        setProjects(response.data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch projects")
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCreateProject = () => {
    navigate("/create-project")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header breadcrumbItems={[]} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-purple-700">Projects</h1>

              <button
                onClick={handleCreateProject}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Project
              </button>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-500 mb-6">Create your first project to get started</p>
                <button
                  onClick={handleCreateProject}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create New Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project._id}
                    to={`/projects/${project._id}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-orange-400 rounded-md flex items-center justify-center text-white font-bold text-lg">
                          {project.project.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{project.project}</h3>
                          <p className="text-sm text-gray-500">{project.totalEpisodes} Files</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Last edited {formatDate(project.updatedAt)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
