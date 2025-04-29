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

export const getUserDetails = async () => {
  try {
    const response = await authAxios.get("/user/user-detail")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to fetch user details")
    }
    throw new Error("Network error occurred")
  }
}

export const updateUsername = async (username) => {
  try {
    const response = await authAxios.put("/user/update-username", {
      username,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Failed to update username")
    }
    throw new Error("Network error occurred")
  }
}
