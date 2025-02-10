import instanceApi from '../http/http.js'

export const setFurniture = async (furniture) => {
      try {
         const response = await instanceApi.post('/admin/furniture', {furniture})
         console.log(response.data.message)
         
      } catch (e) {
         console.log(e.response?.data?.message)
      }
}

export const setService = async (service) => {
      try {
         const response = await instanceApi.post('/admin/service', {service})
         console.log(response.data.message)
         
      } catch (e) {
         console.log(e.response?.data?.message)
      }
}

export const setIndent = async (indent) => {
   try {
      const response = await instanceApi.post('/admin/indent', {indent})
      console.log(response.data.message)
   } catch (e) {
      console.log(e.response?.data?.message)
   }
}