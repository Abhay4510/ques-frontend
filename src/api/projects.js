import axios from "axios"
import { getToken } from "./auth"

const API_URL = "http://localhost:8800/api"

const authAxios = axios.create({
  baseURL: API_URL,
})

authAxios.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export const createProject = async (projectName) => {
  try {
    const response = await authAxios.post("/project/projects", {
      project: projectName,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to create project")
    }
    throw new Error("Network error occurred")
  }
}

export const getAllProjects = async () => {
  try {
    const response = await authAxios.get("/project/projects")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch projects")
    }
    throw new Error("Network error occurred")
  }
}

export const createEpisode = async (projectId, name, transcript) => {
  try {
    const response = await authAxios.post(`/project/projects/${projectId}/episodes`, {
      name,
      transcript,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to create episode")
    }
    throw new Error("Network error occurred")
  }
}

export const getAllEpisodes = async (projectId) => {
  try {
    const response = await authAxios.get(`/project/projects/${projectId}/episodes`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch episodes")
    }
    throw new Error("Network error occurred")
  }
}

export const getEpisodeById = async (projectId, episodeId) => {
  try {
    const response = await authAxios.get(`/project/projects/${projectId}/episodes/${episodeId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch episode")
    }
    throw new Error("Network error occurred")
  }
}

export const updateEpisodeTranscript = async (projectId, episodeId, transcript) => {
  try {
    const response = await authAxios.put(`/project/projects/${projectId}/episodes`, {
      episodeId,
      transcript,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to update transcript")
    }
    throw new Error("Network error occurred")
  }
}

export const deleteEpisode = async (projectId, episodeId) => {
  try {
    const response = await authAxios.delete(`/project/projects/${projectId}/episodes/${episodeId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to delete episode")
    }
    throw new Error("Network error occurred")
  }
}
