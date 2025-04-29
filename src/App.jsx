import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { Login } from "./pages/auth/Login"
import { Signup } from "./pages/auth/Signup"
import { Projects } from "./pages/projects/Projects"
import { CreateProject } from "./pages/projects/CreateProject"
import { AddPodcast } from "./pages/episodes/AddPodcast"
import { EditTranscript } from "./pages/episodes/EditTranscript"
import { AccountSettings } from "./pages/settings/AccountSettings"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (isLoggedIn) {
    return <Navigate to="/projects" replace />
  }

  return <>{children}</>
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <ProtectedRoute>
            <AddPodcast />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId/add-podcast"
        element={
          <ProtectedRoute>
            <AddPodcast />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:projectId/episodes/:episodeId"
        element={
          <ProtectedRoute>
            <EditTranscript />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account-settings"
        element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}

export default App
