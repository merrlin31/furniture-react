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
const CHANGE_MATERIAL = 'CHANGE_MATERIAL'

const defaultState = {
   product: [],
   sectionAmount: initialItemAmount,
   furnitures: [],
   services: [],
   initialValues: initialValues,
}

export default function productReducer(state = defaultState, action) {
   switch (action.type) {
      case ADD_SECTION:
         return {...state, product: [...state.product, action.payload]}   
      case EDIT_SECTION:
         let detail = action.payload.detail
         let newDetail = {}
         if (detail) {
            let edge = detail.edge
            newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [edge.top, edge.bottom, edge.left, edge.right], detail.materialCode, detail.materialType)
         }
         return {...state, product: state.product.map(section => {
            if(section.id === action.payload.sectionIndex) {
               return {...section, [action.payload.key]: {...section[action.payload.key], 
                  [action.payload.detailName]: newDetail}
               }
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
export const changeMaterial = (materialCode, newMaterialCode) => ({type: CHANGE_MATERIAL, payload: {materialCode, newMaterialCode}})