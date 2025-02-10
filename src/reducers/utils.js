import { store } from "."
import { Detail } from "../utils/Detail"
import { Material } from "../utils/Material"

const LAST_PROJECT = 'lastProject'

export const loadStoreFromStorage = () => {
   const initialState = localStorage.getItem(LAST_PROJECT)
   if (!initialState) return {}
   let state = JSON.parse(initialState)
   return loadState(state)
}

export const saveStore = () => {
   let jsonStore = JSON.stringify(store.getState())
   localStorage.setItem(LAST_PROJECT, jsonStore)
   return jsonStore
}

const createNewDetail = (detail) => {
   const obj = (detail.added) ? {id: detail.id, added: detail.added} : {id: detail.id}
   return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
      [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
      detail.materialCode, detail.materialType), obj)
}

const createNewMaterial = (material) => {
   return new Material(material.materialCode, material.area, material.boldEdge, material.thinEdge, 
      material.edging, material.material, material.price, material.boldEdgePrice, 
      material.thinEdgePrice, material.manufacturer, material.discountValue, material.pureSize)
}

export const loadState = (state) => {
   let newState = {
      ...state,
      product: {
         ...state.product,
         product: [
            ...state.product.product.map(section => {
               return {
                  ...section,
                  details: section.details.map(detail => {
                     return createNewDetail(detail)
                  }),
                  fronts: section.fronts.map(detail => {
                     return createNewDetail(detail)
                  }),
                  dvps: section.dvps.map(detail => {
                     return createNewDetail(detail)
                  }),
                  tabletops: section.tabletops.map(detail => {
                     if (Object.keys(detail).length !== 0) return createNewDetail(detail)
                     return {}
                  }),
                  plinth: section.plinth.map(detail => {
                     if (Object.keys(detail).length !== 0) return createNewDetail(detail)
                     return {}
                  })
               }
               
            })
         ]
      },
      detail: {
         ...state.detail,
         addedDetails: state.detail.addedDetails.map(detail => {
            return createNewDetail(detail)
         }),
         details: state.detail.details.map(detail => {
            return createNewDetail(detail)
         }),
         addedFronts: state.detail.addedFronts.map(detail => {
            return createNewDetail(detail)
         }),
         dvps: state.detail.dvps.map(detail => {
            return createNewDetail(detail)
         }),
         addedDvps: state.detail.addedDvps.map(detail => {
            return createNewDetail(detail)
         }),
         fronts: state.detail.fronts.map(detail => {
            return createNewDetail(detail)
         }),
         tabletop: state.detail.tabletop.map(detail => {
            return createNewDetail(detail)
         }),
         materials: state.detail.materials.map(material => {
            return createNewMaterial(material)
         })
      }
   }
   return newState
}