import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAllEpisodes, createEpisode, deleteEpisode } from "../../api/projects"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { Upload, Rss, Youtube } from "lucide-react"

export const AddPodcast = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [episodes, setEpisodes] = useState([])
  const [projectName, setProjectName] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [episodeName, setEpisodeName] = useState("")
  const [transcript, setTranscript] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!projectId) return

      try {
        const response = await getAllEpisodes(projectId)
        setEpisodes(response.data)
        setProjectName(response.projectName)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch episodes")
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [projectId])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleOpenModal = (type) => {
    setModalType(type)
    setShowModal(true)
    setEpisodeName("")
    setTranscript("")
    setError("")
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!episodeName.trim() || !transcript.trim()) {
      setError("Name and transcript are required")
      return
    }

    if (!projectId) return

    setError("")
    setSubmitting(true)

    try {
      await createEpisode(projectId, episodeName, transcript)
      setSubmitting(false)
      setShowModal(false)

      // Refresh episodes list
      const response = await getAllEpisodes(projectId)
      setEpisodes(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create episode")
      setSubmitting(false)
    }
  }

  const handleViewEpisode = (episodeId) => {
    navigate(`/projects/${projectId}/episodes/${episodeId}`)
  }

  const handleDeleteEpisode = async (episodeId) => {
    if (!window.confirm("Are you sure you want to delete this episode?")) return
  
    setDeleteLoading(true)
    try {
      await deleteEpisode(projectId, episodeId)
  
      // Refresh episodes list
      const response = await getAllEpisodes(projectId)
      setEpisodes(response.data)
      setDeleteLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete episode")
      setDeleteLoading(false)
    }
  }
  

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          breadcrumbItems={[
            { label: projectName, path: `/projects/${projectId}` },
            { label: "Add your podcast", path: `/projects/${projectId}/add-podcast` },
          ]}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-purple-700 mb-8">Add Podcast</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                onClick={() => handleOpenModal("rss")}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">RSS Feed</h3>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                  <div className="text-orange-500">
                    <Rss className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleOpenModal("youtube")}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Youtube Video</h3>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                  <div className="text-red-500">
                    <Youtube className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleOpenModal("upload")}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload Files</h3>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit. Dolor lorem sit.</p>
                  </div>
                  <div className="text-purple-500">
                    <Upload className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Files</h2>

                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : episodes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No episodes yet. Add your first episode using one of the options above.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            No.
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Upload Date & Time
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {episodes.map((episode, index) => (
                          <tr key={episode._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {episode.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(episode.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewEpisode(episode._id)}
                                  className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded text-xs"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleDeleteEpisode(episode._id)}
                                  disabled={deleteLoading}
                                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded text-xs disabled:opacity-50"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleCloseModal}></div>

            <div className="relative bg-white rounded-lg max-w-md w-full p-6 overflow-hidden shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {modalType === "rss" && "Upload from RSS Feed"}
                  {modalType === "youtube" && "Upload from Youtube"}
                  {modalType === "upload" && "Upload Files"}
                </h3>
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="episode-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="episode-name"
                    value={episodeName}
                    onChange={(e) => setEpisodeName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="transcript" className="block text-sm font-medium text-gray-700 mb-1">
                    Transcript
                  </label>
                  <textarea
                    id="transcript"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">{error}</div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {submitting ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
