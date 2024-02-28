import { firstPlinthDetail, materialManufacturer1, materialType1, materialType2, materialType3, materialType4, secondPlinthDetail, thirdPlinthDetail } from "../../utils/description"
import { Detail } from "../../utils/Detail"
import { bodyManufacturerDiscount, choiceOption, dvpManufacturerDiscount, frontManufacturerDiscount, Material, 
   materialType1BoldEdgePrice, materialType1Price, materialType1ThinEdgePrice, materialType2Price, materialType3Price, 
   materialType4BoldEdgePrice, materialType4Price, materialType4ThinEdgePrice, tabletopManufacturerDiscount } from "../../utils/Material"
import { CUTTING, EDGING, DVP_CUTTING, TABLETOP_CUTTING, TABLETOP_EDGING } from "../../utils/services"

export const price1 = 'price'
export const price2 = 'boldEdgePrice'
export const price3 = 'thinEdgePrice'
export const notPrice = 'manufacturer'
export const plinthName = 'plinth'
export const tabletopName = 'tabletops'

function searchOption(materials, detail, item) {
   let material = materials.find(material => material.materialCode === detail.materialCode)
   let defaultPrice = 0
   switch (detail.materialType) {
      case materialType1:
         if (item === price1) {
            defaultPrice = materialType1Price
         } else if (item === price2) {
            defaultPrice = materialType1BoldEdgePrice
         } else if (item === price3) {
            defaultPrice = materialType1ThinEdgePrice
         }
         break;
      case materialType2:
         if (item === price1) defaultPrice = materialType2Price;
         break;
      case materialType3:
         if (item === price1) defaultPrice = materialType3Price;
         break;
      case materialType4:
         if (item === price1) {
            defaultPrice = materialType4Price
         } else if (item === price2) {
            defaultPrice = materialType4BoldEdgePrice
         } else if (item === price3) {
            defaultPrice = materialType4ThinEdgePrice
         }
         break;
      default:
         console.log('wrong materialType')
         break;
   }
   
   let manufacturer = (item === notPrice) ? materialManufacturer1 : defaultPrice
   let option = (material) 
      ? material[item]
      : manufacturer
   return option
}

export function addMaterial(detail, allMaterials, service, materials) {
   let materialPrice = searchOption(materials, detail, price1)
   let boldEdgePrice = searchOption(materials, detail, price2)
   let thinEdgePrice = searchOption(materials, detail, price3)
   let manufacturer = searchOption(materials, detail, notPrice)
   
   let option = choiceOption(detail.materialType, bodyManufacturerDiscount, frontManufacturerDiscount, dvpManufacturerDiscount, tabletopManufacturerDiscount)
   let discount = option[manufacturer]

   let amount = detail.area
   if (detail.materialType === materialType4) amount = detail.height

   
   let material = new Material(detail.materialCode, amount, detail.boldEdge(), detail.thinEdge(), 
      detail.edging(), detail.materialType, materialPrice, boldEdgePrice, thinEdgePrice, manufacturer, discount)
   
   let duplicateMaterial = allMaterials.find(item => item.materialCode === detail.materialCode)
   if (duplicateMaterial) {
         duplicateMaterial.area += material.area;
         duplicateMaterial.boldEdge += material.boldEdge;
         duplicateMaterial.thinEdge += material.thinEdge;
         addServices(detail, service, material)        
   } else {
      allMaterials.push(material);
      addServices(detail, service, material)
   }
}

const addServices = (detail, service, material) => {
   let cutting = material.cutting
   if (detail.materialType === materialType2 || detail.materialType === materialType4) cutting = 0
   if (detail.materialType === materialType3) {
      service[DVP_CUTTING] += cutting
   }
   if (detail.materialType === materialType1) {
      service[CUTTING] += cutting
   }   
   if (detail.materialType === materialType4) {
      service[TABLETOP_CUTTING] += detail.scaleWidth
      if (detail.edge.bottom !== 0) service[TABLETOP_CUTTING] += detail.scaleHeight;
      service[TABLETOP_EDGING] += material.edging
   } else {
      service[EDGING] += material.edging;
   }
} 

export const fillArr = (arr, obj, section = {}) => {
   for (let detail in obj) {
      if (Object.keys(obj[detail]).length) {
         if (section.id) obj[detail].id = section.id + '.' + obj[detail].name
         arr.push(obj[detail])
      }
   }
}

export const addToArr = (detail, arr, maxHeight) => {
   if (!detail) return
   if (detail.height === 0) return;
   let newDetail
   let [bottomEdge, topEdge, leftEdge, rightEdge] = [0, 0, 0, 0]
   let name = ([firstPlinthDetail, secondPlinthDetail, thirdPlinthDetail].includes(detail.name)) 
      ? plinthName
      : tabletopName
   if (detail.materialType === materialType1) {
      bottomEdge = 1
      topEdge = 1
      leftEdge = 1
      rightEdge = 1
   }
   if (detail.materialType === materialType4) {
      bottomEdge = 0
      leftEdge = 2
      rightEdge = 2
      topEdge = 0
      if (detail.width !== 600) bottomEdge = 2;
   }
   if (Object.keys(detail).length) {
      if (!arr.length) {
         newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, [topEdge, bottomEdge, leftEdge, rightEdge], detail.materialCode, detail.materialType)
         newDetail.id = name + '.' + detail.name + '.' + (arr.length + 1)
         arr.push(newDetail)
      } else {
         if (detail.height + arr[arr.length - 1].height > maxHeight || detail.materialCode !== arr[arr.length - 1].materialCode) {
            newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, [topEdge, bottomEdge, 1, 1], detail.materialCode, detail.materialType)
            newDetail.id = name + '.' + detail.name + '.' + (arr.length + 1)
            arr.push(newDetail)
         } else {
            arr[arr.length - 1].height += detail.height
         }
      }
   }   
}

export const selectMaterialType = {defaulValue: 'materialTypeDefaultValue',
options: [
   {value: materialType1, name: materialType1},
   {value: materialType2, name: materialType2},
   {value: materialType3, name: materialType3},
   {value: materialType4, name: materialType4},
]
}