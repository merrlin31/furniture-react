import { store } from "."
import { Detail } from "../utils/Detail"
import { Material } from "../utils/Material"

export const loadStore = () => {
   const initialState = localStorage.getItem('lastProject')
   if (!initialState) return {}
   let state = JSON.parse(initialState)
   let newState = {
      ...state,
      product: {
         ...state.product,
         product: [
            ...state.product.product.map(section => {
               return {
                  ...section,
                  details: section.details.map(detail => {
                     return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                        detail.materialCode, detail.materialType), {id: detail.id})
                  }),
                  fronts: section.fronts.map(detail => {
                     return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                        detail.materialCode, detail.materialType), {id: detail.id})
                  }),
                  dvps: section.dvps.map(detail => {
                     return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                        detail.materialCode, detail.materialType), {id: detail.id})
                  }),
                  tabletops: section.tabletops.map(detail => {
                     if (Object.keys(detail).length !== 0) return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                        detail.materialCode, detail.materialType), {id: detail.id})
                     return {}
                  }),
                  plinth: section.plinth.map(detail => {
                     if (Object.keys(detail).length !== 0) return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
                        [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
                        detail.materialCode, detail.materialType), {id: detail.id})
                     return {}
                  })
               }
               
            })
         ]
      },
      detail: {
         ...state.detail,
         addedDetails: state.detail.addedDetails.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), { id: detail.id, added: detail.added })
         }),
         details: state.detail.details.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), {id: detail.id})
         }),
         addedFronts: state.detail.addedFronts.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), { id: detail.id, added: detail.added })
         }),
         dvps: state.detail.dvps.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), {id: detail.id})
         }),
         addedDvps: state.detail.addedDvps.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), { id: detail.id, added: detail.added })
         }),
         fronts: state.detail.fronts.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), {id: detail.id})
         }),
         tabletop: state.detail.tabletop.map(detail => {
            return Object.assign(new Detail(detail.name, detail.height, detail.width, detail.amount, 
               [detail.edge.top, detail.edge.bottom, detail.edge.left, detail.edge.right], 
               detail.materialCode, detail.materialType), {id: detail.id})
         }),
         materials: state.detail.materials.map(material => {
            return new Material(material.materialCode, material.area, material.boldEdge, material.thinEdge, 
               material.edging, material.material, material.price, material.boldEdgePrice, 
               material.thinEdgePrice, material.manufacturer, material.discountValue)
         })
      }
   }
   return newState
}

export const saveStore = () => {
   localStorage.setItem('lastProject', JSON.stringify(store.getState()))
}