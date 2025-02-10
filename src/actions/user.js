import instanceApi from '../http/http.js'
import { searchValue1 } from '../utils/description.js';
import { initialUser } from './utils.js';

export const getUser = (userId) => {
   return async dispatch => {
      try {
         const response = await instanceApi.get(`/user/${userId}`);
         dispatch(initialUser(response.data))
      } catch (e) {
         console.log(e.response?.data?.message)
      }
   }
}

export const createCustomer = async (userId, fullName, telephone = '', adress = '', ) => {
   try {
      const response = await instanceApi.post('/user/customers', {fullName, telephone, adress, userId})
      console.log(response.data.message)
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const getCustomers = async (userId, name='', page=1, limit=6) => {
   try {
      const response = await instanceApi.get(`/user/${userId}/customers?name=${name}&page=${page}&limit=${limit}`)
      return response.data
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const getCustomer = async (userId, customerId) => {
   try {
      const response = await instanceApi.get(`/user/${userId}/customers/${customerId}`)
      return response.data
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const saveProject = async (userId, customerId, projectName, totalPrice, usedCodes, product, adress = '') => {
   try {
      const response = await instanceApi.post('/user/projects', {projectName, adress, totalPrice, usedCodes, product, userId, customerId})
      console.log(response.data.message)
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const loadProject = async (userId, projectId) => {
   try {
      const response = await instanceApi.get(`/user/${userId}/projects/${projectId}`)
      return response.data
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const getProjects = async (userId, customerId='', name='', type=searchValue1, page=1, limit=6) => {
   try {
      const response = await instanceApi.get(`/user/${userId}/projects?name=${name}&type=${type}&page=${page}&limit=${limit}&customerId=${customerId}`)
      return response.data
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

export const refreshSetting = async (userId, arr, type) => {
   try {
      const response = await instanceApi.post(`/user/${userId}/refresh`, {arr, type})
      console.log(response.data.message)
   } catch (e) {
      console.log(e.response?.data?.message);
   }
}

