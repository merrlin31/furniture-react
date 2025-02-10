import { indentOptions, servicesOptions } from '../components/properties/settingsProperties.js'
import { clearDetail, loadDetail } from '../reducers/detailReducer.js'
import { clearProduct, loadProduct } from '../reducers/productReducer.js'
import { clearSetting, FURNITURES, loadSetting, SERVICES, setAllIndent, setAllPrice } from '../reducers/settingReducer.js'
import { setEmptyUser, setUser } from '../reducers/userReducer.js'
import { furniture, FurnitureItem } from '../utils/furniture.js'
import { allService, ServiceItem, TABLETOP_EDGE_LENGHT, TABLETOP_EDGE_LENGTH_VALUE, TABLETOP_LENGTH, TABLETOP_LENGTH_VALUE_1 } from '../utils/services.js'

export function setInitialFurniture(furnitures) {
   let initialFurniturePrice = {}
   furnitures.forEach(item => {
      furniture[item.name] = new FurnitureItem(item.name, item.code, item.manufacturer, item.multiplicity)
      initialFurniturePrice[item.name] = item.price
   })
   return initialFurniturePrice
}
export function setInitialService(services) {
   let initialServicesPrice = {}
   services.forEach(item => {
      allService[item.name] = new ServiceItem(item.name, item.code)
      initialServicesPrice[item.name] = item.price
      let foundItem = servicesOptions.find((i) => i.name === item.name)
      let obj = {name: item.name, id: item.name}
      foundItem ? foundItem = obj : servicesOptions.push(obj)
   })
   initialServicesPrice[TABLETOP_LENGTH] = TABLETOP_LENGTH_VALUE_1
   initialServicesPrice[TABLETOP_EDGE_LENGHT] = TABLETOP_EDGE_LENGTH_VALUE
   return initialServicesPrice
}
export function setInitialIndent(indents) {
   let initialIndentValues = {};
   indentOptions.length = 0;
   indents.forEach(item => {
      indentOptions.push({name: item.name, id: item.name, img: item.image})
      initialIndentValues[item.name] = item.value
   })
   return initialIndentValues
}

export function getUserPrices(user, itemArray, price) {
   let arr = []
   itemArray.forEach((item) => {
         let id = user.currentUser.services.find((i) => i.name === item.name)?._id || null;
         let newItem = {
            name: item.name,
            code: item.code,
            price: price[item.name] || 0,
            _id: id || null
         }
         if (item.manufacturer && item.multiplicity) {
            newItem = Object.assign(newItem, {manufacturer: item.manufacturer, multiplicity: item.multiplicity})
         }
         arr.push(newItem)
      })
   return arr
}

export function getUserIndents(user, values) {
   let arr = []
      user.currentUser.indents.forEach((item) => {
         let obj = {...item, value: values[item.name]}
         arr.push(obj)
      })
   return arr
}

export const initialUser = (user) => {
   return dispatch => {
      user.id ? dispatch(setUser(user)) : dispatch(setEmptyUser(user))
      dispatch(setAllPrice(FURNITURES, setInitialFurniture(user.furnitures)))
      dispatch(setAllPrice(SERVICES, setInitialService(user.services)))
      dispatch(setAllIndent(setInitialIndent(user.indents)))
   }
}

export const setStore = (state) => {
   return dispatch => {
      dispatch(loadProduct(state.product))
      dispatch(loadDetail(state.detail))
      dispatch(loadSetting(state.setting))
   }
}

export const clearStore = () => {
   return dispatch => {
      dispatch(clearDetail())
      dispatch(clearSetting())
      dispatch(clearProduct())
   }
}