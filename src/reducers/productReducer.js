import { initialItemAmount, initialValues } from "../components/properties/inputProperties";
import { Detail } from "../utils/Detail";

const ADD_SECTION = 'ADD_SECTION'
const EDIT_SECTION = 'EDIT_SECTION'
const DELETE_SECTION = 'DELETE_SECTION'
const INCREMETN_SECTION_COUNT = 'INCREMETN_SECTION_COUNT'
const DECREMENT_SECTION_COUNT = 'DECREMENT_SECTION_COUNT'
const ADD_FURNITURE = 'ADD_FURNITURE'
const ADD_SERVICE = 'ADD_SERVICE'
const EDIT_FURNITURE = 'EDIT_FURNITURE'
const EDIT_SERVICE = 'EDIT_SERVICE'
const CHANGE_INITIAL_VALUES = 'CHANGE_INITIAL_VALUES'
const CHANGE_MATERIAL_CODE = 'CHANGE_MATERIAL_CODE'
const CHANGE_MATERIAL_TYPE = 'CHANGE_MATERIAL_TYPE'
const ADD_VALUE_DIFFERENCE = 'ADD_VALUE_DIFFERENCE'
const CHANGE_VALUE_DIFFERENCE = 'CHANGE_VALUE_DIFFERENCE'
const SET_TOTAL_SUM = 'SET_TOTAL_SUM'
const CLEAR_PRODUCT = 'CLEAR_PRODUCT'
const LOAD_PRODUCT = 'LOAD_PRODUCT'

const defaultState = {
   product: [],
   sectionAmount: {...initialItemAmount},
   furnitures: [],
   services: [],
   initialValues: initialValues,
   valueDifference: [],
   totalSum: 0
}

export default function productReducer(state = defaultState, action) {
   switch (action.type) {
      case ADD_SECTION:
         return {...state, product: [...state.product, action.payload]}   
      case EDIT_SECTION:
         let detail = action.payload.detail
         let newDetail = {}
         if (detail) newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, 
            [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, detail.materialType);
         return {...state, product: state.product.map(section => {
            if (section.id === action.payload.sectionIndex) {
               return {...section, [action.payload.key]: section[action.payload.key].map(detail => {
                  if (detail.name === action.payload.detailName) {
                     return newDetail
                  }
                  return detail
               })}
            }
            return section
         })}  
      case DELETE_SECTION:
         return {...state, product: [...state.product.filter(item => item.id !== action.payload)]}   
      case INCREMETN_SECTION_COUNT:
         return {...state,  
            sectionAmount: {
               ...state.sectionAmount, allItem: ++state.sectionAmount.allItem, 
               [action.payload]: ++state.sectionAmount[action.payload]
            }
         }
      case DECREMENT_SECTION_COUNT:
         return {...state,  
            sectionAmount: {
               ...state.sectionAmount, allItem: --state.sectionAmount.allItem, 
               [action.payload]: --state.sectionAmount[action.payload]
            }
         }
      case ADD_FURNITURE:    
         return {...state, furnitures: [...state.furnitures.filter(item => item.name !== action.payload.name), action.payload]} 
      case EDIT_FURNITURE:    
         return {...state, furnitures: state.furnitures.map(item => {
            if(item.name === action.payload.name) {
               return action.payload
            }
            return item
         })}    
      case ADD_SERVICE:
         return {...state, services: [...state.services.filter(item => item.name !== action.payload.name), action.payload]}   
      case EDIT_SERVICE:
         return {...state, services: state.services.map(item => {
            if(item.name === action.payload.name) {
               return action.payload
            }
            return item
         })}   
      case CHANGE_INITIAL_VALUES:
         return {...state, initialValues:{...state.initialValues, ...action.payload}}   
      case ADD_VALUE_DIFFERENCE:
         return {...state, valueDifference:[...state.valueDifference.filter(item => item.code !== action.payload.code), action.payload]} 
      case CHANGE_VALUE_DIFFERENCE:
         return {...state, valueDifference: state.valueDifference.map(item => {
            if(item.materialCode === action.payload.materialCode) {
               return action.payload
            }
            return item
         })}  
      case CHANGE_MATERIAL_CODE: 
         return {...state, product: state.product.map(section => {
            return {
               ...section, 
               details: section.details.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], action.payload.newMaterialCode, detail.materialType)
                  }
                  return detail
               }),
               fronts: section.fronts.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], action.payload.newMaterialCode, detail.materialType)
                  }
                  return detail
               }),
               dvps: section.dvps.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], action.payload.newMaterialCode, detail.materialType)
                  }
                  return detail
               }),
               tabletops: section.tabletops.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], action.payload.newMaterialCode, detail.materialType)
                  }
                  return detail
               }),
               plinth: section.plinth.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], action.payload.newMaterialCode, detail.materialType)
                  }
                  return detail
               })
            }
         })}
      case CHANGE_MATERIAL_TYPE: 
         return {...state, product: state.product.map(section => {
            return {
               ...section, 
               details: section.details.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, action.payload.newType)
                  }
                  return detail
               }),
               fronts: section.fronts.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, action.payload.newType)
                  }
                  return detail
               }),
               dvps: section.dvps.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, action.payload.newType)
                  }
                  return detail
               }),
               tabletops: section.tabletops.map(detail =>{
                  if (detail.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, action.payload.newType)
                  }
                  return detail
               }),
               plinth: section.plinth.map(detail =>{
                  if (detail?.materialCode === action.payload.materialCode) {
                     return new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], detail.materialCode, action.payload.newType)
                  }
                  return detail
               })
            }
         })}
      case SET_TOTAL_SUM:
         return {...state, totalSum: action.payload}
      case CLEAR_PRODUCT:
         return defaultState
      case LOAD_PRODUCT:
         return action.payload
      default:
         return state
   }
}

export const addSectionObject = (section) => ({type: ADD_SECTION, payload: section})
export const editSectionObject = (key, sectionIndex, detailName, detail) => ({type: EDIT_SECTION, payload: {key, sectionIndex, detailName, detail}})
export const deleteSectionObject = (sectionId) => ({type: DELETE_SECTION, payload: sectionId})
export const addSectionCount = (sectionType) => ({type: INCREMETN_SECTION_COUNT, payload: sectionType})
export const subtractSectionCount = (sectionType) => ({type: DECREMENT_SECTION_COUNT, payload: sectionType})
export const addFurnitureItem = (furnitureItem) => ({type: ADD_FURNITURE, payload: furnitureItem})
export const addServiceItem = (serviceItem) => ({type: ADD_SERVICE, payload: serviceItem})
export const editFurnitureItem = (furnitureItem) => ({type: EDIT_FURNITURE, payload: furnitureItem})
export const editServiceItem = (serviceItem) => ({type: EDIT_SERVICE, payload: serviceItem})
export const changeValues = (data) => ({type: CHANGE_INITIAL_VALUES, payload: data})
export const changeMaterialCode = (materialCode, newMaterialCode) => ({type: CHANGE_MATERIAL_CODE, payload: {materialCode, newMaterialCode}})
export const changeMaterialType = (materialCode, newType) => ({type: CHANGE_MATERIAL_TYPE, payload: {materialCode, newType}})
export const addValueDifference = (item) => ({type: ADD_VALUE_DIFFERENCE, payload: item})
export const changeValueDifference = (item) => ({type: CHANGE_VALUE_DIFFERENCE, payload: item})
export const setTotalSum = (sum) => ({type: SET_TOTAL_SUM, payload: sum})

export const clearProduct = () => ({type: CLEAR_PRODUCT})
export const loadProduct = (state) => ({type: LOAD_PRODUCT, payload: state})