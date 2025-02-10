import axios from 'axios'
import instanceApi, { apiUrl } from '../http/http.js'
import { deleteUser, setIsLoading } from '../reducers/userReducer.js'
import { initialUser } from './utils.js'

export const registration = async (email, userName, password) => {
   try {
      const response = await instanceApi.post('/auth/registration', {email, userName, password})
      localStorage.setItem('token', response.data.token)
      return response.data.user
   } catch (e) {
      console.log(e.response?.data?.message)
   }
}

export const login = async (email, password) => {
   try {
      const response = await instanceApi.post('/auth/login', {email, password});
      localStorage.setItem('token', response.data.token)
      return response.data.user
   } catch (e) {
      console.log(e.response?.data?.message)
      return e.response
   }
}

export const logout = () => {
   return async dispatch => {
      try {
         await instanceApi.post ('/auth/logout');
         dispatch(deleteUser())
         localStorage.removeItem('token')
      } catch (e) {
         console.log(e.response?.data?.message)
      }
   }
}

export const checkAuth = (token) => {
   return async dispatch => {
      dispatch(setIsLoading(true));
      try {
         let response
         if (token) {
            response = await axios.get(`${apiUrl}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.token);
         } else {
            response = await axios.get(`${apiUrl}/auth/getEmptyUser`)
         }
         dispatch(initialUser(response.data.user))
      } catch (e) {
         console.log(e.response?.data?.message);
      } finally {
         dispatch(setIsLoading(false));
      }
   }
}

