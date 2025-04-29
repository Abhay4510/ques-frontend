import axios from "axios"
import Cookies from "js-cookie"

const API_URL = process.env.REACT_APP_API_URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    })

    if (response.data.token) {
      Cookies.set("token", response.data.token, { expires: 30, secure: true, sameSite: "strict" })
      Cookies.set("role", response.data.role, { expires: 30, secure: true, sameSite: "strict" })
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed")
    }
    throw new Error("Network error occurred")
  }
}

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      email,
      password,
    })

    if (response.data.token) {
      Cookies.set("token", response.data.token, { expires: 30, secure: true, sameSite: "strict" })
      Cookies.set("role", response.data.role, { expires: 30, secure: true, sameSite: "strict" })
    }

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Signup failed")
    }
    throw new Error("Network error occurred")
  }
}

export const logout = () => {
  Cookies.remove("token")
  Cookies.remove("role")
  window.location.href = "/"
}

export const isAuthenticated = () => {
  return Cookies.get("token") !== undefined
}

export const getToken = () => {
  return Cookies.get("token")
}
