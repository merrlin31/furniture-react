import { initialFurniturePrice } from "../utils/furniture";
import { initialServicesPrice } from "../utils/services";
import { initialIndentValues, initialPercentage } from "../components/properties/settingsProperties";

const EDIT_VALUE = 'EDIT_VALUE'
const SET_ALL_PRICE = 'SET_ALL_PRICE'
const SET_ALL_INDENT = 'SET_ALL_INDENT'
const EDIT_PERCENTAGE = 'EDIT_PERCENTAGE'
const SET_CODES = 'SET_CODES'
const CLEAR_SETTING = 'CLEAR_SETING'
const LOAD_SETTING = 'LOAD_SETING'

export const FURNITURES = 'furniturePrices'
export const SERVICES = 'servicePrices'
export const INDENTS = 'indentValues'

const defaultState = {
   furniturePrices: {...initialFurniturePrice, id: FURNITURES},
   servicePrices: {...initialServicesPrice, id: SERVICES},
   indentValues: {...initialIndentValues, id: INDENTS},
   percentage: initialPercentage,
   codes: []
}

export default function settingReducer(state = defaultState, action) {
   switch (action.type) {
      case EDIT_VALUE:
         return {...state, [action.payload.key]: {...state[action.payload.key], [action.payload.field]: action.payload.value}}     
      case SET_ALL_PRICE:
         return {...state, [action.payload.key]: {...action.payload.obj}}         
      case SET_ALL_INDENT:
         return {...state, indentValues: {...action.payload.obj}}     
      case EDIT_PERCENTAGE:
         return {...state, percentage: {...state.percentage, [action.payload.key]: action.payload.value}} 
      case SET_CODES:
         return {...state, codes: [...action.payload]} 
      case CLEAR_SETTING:
         return defaultState   
      case LOAD_SETTING:
         return {...action.payload}   
      default:
         return state
   }
}

export const editValue = (key, field, value) => ({type: EDIT_VALUE, payload: {key, field, value}})
export const setAllPrice = (key, obj) => ({type: SET_ALL_PRICE, payload: {key, obj}})
export const setAllIndent = (obj) => ({type: SET_ALL_INDENT, payload: {obj}})
export const editPercentage = (key, value) => ({type: EDIT_PERCENTAGE, payload: {key, value}})
export const setCodes = (codes) => ({type: SET_CODES, payload: codes})
export const clearSetting = () => ({type: CLEAR_SETTING})
export const loadSetting = (state) => ({type: LOAD_SETTING, payload: state})

export function setKey(id) {
   let obj = {
      [FURNITURES]: FURNITURES,
      [SERVICES]: SERVICES,
      [INDENTS]: INDENTS
   }   
   return obj[id]
}