import axios from "axios"

export const apiUrl = 'http://localhost:5000/api'

const instanceApi = axios.create({
   withCredentials:true,
   baseURL: apiUrl
})

instanceApi.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
   return config
})

instanceApi.interceptors.response.use((config) => {
   return config
}, async (error) => {
   const originalRequest = error.config
   if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
         const response = await axios.get(`${apiUrl}/auth/refresh`, {withCredentials: true})
         localStorage.setItem('token', response.data.token)
         return instanceApi.request(originalRequest)
      } catch (e) {
         console.log('НЕ АВТОРИЗИРОВАН')
      }
   }
   throw error
})

export default instanceApi