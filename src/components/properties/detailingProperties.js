import { materialManufacturer1, materialType1, materialType2, materialType3, materialType4 } from "../../utils/description"
import { Detail } from "../../utils/Detail"
import { bodyManufacturerDiscount, choiceOption, dvpManufacturerDiscount, frontManufacturerDiscount, Material, 
   materialType1BoldEdgePrice, materialType1Price, materialType1ThinEdgePrice, materialType2Price, materialType3Price, 
   materialType4BoldEdgePrice, materialType4Price, materialType4ThinEdgePrice, tabletopManufacturerDiscount } from "../../utils/Material"
import { serviceItem1, serviceItem2, serviceItem3, serviceItem4, serviceItem5 } from "../../utils/services"

export const price1 = 'price'
export const price2 = 'boldEdgePrice'
export const price3 = 'thinEdgePrice'
export const notPrice = 'manufacturer'
export const plinthName = 'plinth'
export const tabletopName = 'tabletops'

function searchOption(materials, detail, item) {
   let material = materials.find(item => item.materialCode === detail.materialCode)
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
      service[serviceItem3] += cutting
   }
   if (detail.materialType === materialType1) {
      service[serviceItem1] += cutting
   }   
   if (detail.materialType === materialType4) {
      service[serviceItem4] += detail.scaleWidth
      if (detail.edge.bottom !== 0) service[serviceItem4] += detail.scaleHeight;
      service[serviceItem5] += material.edging
   } else {
      service[serviceItem2] += material.edging;
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
   let name, newDetail, bottomEdge, topEdge, leftEdge, rightEdge
   if (detail.materialType === materialType1) {
      bottomEdge = 1
      topEdge = 1
      leftEdge = 1
      rightEdge = 1
      name = plinthName
   }
   if (detail.materialType === materialType4) {
      bottomEdge = 0
      leftEdge = 2
      rightEdge = 2
      topEdge = 0
      name = tabletopName
      if (detail.width !== 600) bottomEdge = 2;
   }
   if (Object.keys(detail).length) {
      if (!arr.length) {
         newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, [topEdge, bottomEdge, leftEdge, rightEdge], detail.materialCode, detail.materialType)
         newDetail.id = name + '.' + detail.name
         arr.push(newDetail)
      } else {
         if (detail.height + arr[arr.length - 1].height > maxHeight || detail.materialCode !== arr[arr.length - 1].materialCode) {
            newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, [topEdge, bottomEdge, 1, 1], detail.materialCode, detail.materialType)
            newDetail.id = name + '.' + detail.name
            arr.push(newDetail)
         } else {
            arr[arr.length - 1].height += detail.height
         }
      }
   }   
}