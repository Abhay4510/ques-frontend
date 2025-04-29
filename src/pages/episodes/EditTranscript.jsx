import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getEpisodeById, updateEpisodeTranscript } from "../../api/projects"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"
import { ArrowLeft } from "lucide-react"

export const EditTranscript = () => {
  const { projectId, episodeId } = useParams()
  const navigate = useNavigate()
  const [episode, setEpisode] = useState(null)
  const [projectName, setProjectName] = useState("")
  const [transcript, setTranscript] = useState("")
  const [originalTranscript, setOriginalTranscript] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!projectId || !episodeId) return

      try {
        const response = await getEpisodeById(projectId, episodeId)
        setEpisode(response.data)
        setTranscript(response.data.transcript)
        setOriginalTranscript(response.data.transcript)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch episode")
        setLoading(false)
      }
    }

    fetchEpisode()
  }, [projectId, episodeId])

  const handleBack = () => {
    navigate(`/projects/${projectId}/add-podcast`)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDiscard = () => {
    setTranscript(originalTranscript)
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!projectId || !episodeId) return

    setSaving(true)

    try {
      await updateEpisodeTranscript(projectId, episodeId, transcript)
      setOriginalTranscript(transcript)
      setIsEditing(false)
      setSaving(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update transcript")
      setSaving(false)
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
            <div className="flex items-center mb-6">
              <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Edit Transcript
              </button>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Edit
                </button>
              )}

              {isEditing && (
                <div className="ml-auto flex space-x-3">
                  <button
                    onClick={handleDiscard}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {error && <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-purple-600">Speaker</h3>
                </div>

                {isEditing ? (
                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px]"
                  ></textarea>
                ) : (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
