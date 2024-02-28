import { Detail } from "../utils/Detail"
import { Material } from "../utils/Material"

const ADD_DETAIL = 'ADD_DETAIL'
const ADD_TO_ADDED_DETAIL = 'ADD_TO_ADDED_DETAIL'
const EDIT_ADDED_DETAIL = 'EDIT_ADDED_DETAIL'
const DELETE_ADDED_DETAIL = 'DELETE_ADDED_DETAIL'
const CHANGE_ADDED_DETAIL_CODE = 'CHANGE_ADDED_DETAIL_CODE'
const CHANGE_ADDED_DETAIL_TYPE = 'CHANGE_ADDED_DETAIL_TYPE'
const ADD_MATERIALS = 'ADD_MATERIALS'
const EDIT_MATERIALS = 'EDIT_MATERIALS'
const CLEAR_DETAIL = 'CLEAR_DETAIL'
const LOAD_DETAIL = 'LOAD_DETAIL'


const defaultState = {
   details: [],
   addedDetails: [],
   fronts: [],
   addedFronts: [],
   dvps: [],
   addedDvps: [],
   tabletop: [],
   materials: []
}

export default function detailReducer(state = defaultState, action) {
   switch (action.type) {
      case ADD_DETAIL:
         return {...state, [action.payload.key]: [...action.payload.details]}        
      case ADD_TO_ADDED_DETAIL:
         return {...state, [action.payload.key]: [...state[action.payload.key], action.payload.detail]}        
      case EDIT_ADDED_DETAIL:
         let detail = action.payload.detail
         return {...state, [action.payload.key]: state[action.payload.key].map(item => {
            if(item.id === detail.id) {
               return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                  [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                  detail.materialCode, detail.materialType), { id: detail.id, added: detail.added })
            }
            return item
         })}
      case CHANGE_ADDED_DETAIL_CODE: 
         return {
            ...state, 
            addedDetails: state.addedDetails.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     action.payload.newMaterialCode, detail.materialType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
            addedFronts: state.addedFronts.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     action.payload.newMaterialCode, detail.materialType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
            addedDvps: state.addedDvps.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     action.payload.newMaterialCode, detail.materialType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
         }
      case CHANGE_ADDED_DETAIL_TYPE: 
         return {
            ...state, 
            addedDetails: state.addedDetails.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     detail.materialCode, action.payload.newType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
            addedFronts: state.addedFronts.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     detail.materialCode, action.payload.newType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
            addedDvps: state.addedDvps.map(detail =>{
               if (detail.materialCode === action.payload.materialCode) {
                  return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                     [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                     detail.materialCode, action.payload.newType), { id: detail.id, added: detail.added })
               }
               return detail
            }),
         }
      case DELETE_ADDED_DETAIL:
         return {...state, [action.payload.key]: [...state[action.payload.key].filter(item => item.id !== action.payload.detail.id)]}             
      case ADD_MATERIALS:
         return {...state, materials: [...action.payload]}             
      case EDIT_MATERIALS:
         let material = action.payload.material
         return {...state, materials: state.materials.map(item => {
            if(item.materialCode === material.materialCode) {
               return new Material(material.materialCode, material.area, material.boldEdge, material.thinEdge, 
                  material.edging, material.material, material.price, material.boldEdgePrice, 
                  material.thinEdgePrice, material.manufacturer, material.discountValue)
            }
            return item
         })}   
      case CLEAR_DETAIL:
         return defaultState           
      case LOAD_DETAIL:
         return {...action.payload}           
      default:
         return state
   }
}

export const addDetail = (key, details) => ({type: ADD_DETAIL, payload: {key, details}})
export const addToAddedDetail = (key, detail) => ({type: ADD_TO_ADDED_DETAIL, payload: {key, detail}})
export const editAddedDetail = (key, detail) => ({type: EDIT_ADDED_DETAIL, payload: {key, detail}})
export const deleteAddedDetail = (key, detail) => ({type: DELETE_ADDED_DETAIL, payload: {key, detail}})
export const addMaterials = (materials) => ({type: ADD_MATERIALS, payload: materials})
export const editMaterial = (material) => ({type: EDIT_MATERIALS, payload: material})
export const changeAddedDetailsCode = (materialCode, newMaterialCode) => ({type: CHANGE_ADDED_DETAIL_CODE, payload: {materialCode, newMaterialCode}})
export const changeAddedDetailsType = (materialCode, newType) => ({type: CHANGE_ADDED_DETAIL_TYPE, payload: {materialCode, newType}})

export const clearDetail = () => ({type: CLEAR_DETAIL})
export const loadDetail = (state) => ({type: LOAD_DETAIL, payload: state})


