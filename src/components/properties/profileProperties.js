import { furniture } from "../../utils/furniture";
import { allService } from "../../utils/services";
import { indentOptions } from "./settingsProperties";

export function createFurnitureArr(price) {
   let arr = []
   Object.entries(furniture).forEach(([key, value]) => {
      let item = {
         name: value.name, 
         code: value.code, 
         manufacturer: value.manufacturer, 
         multiplicity: value.multiplicity, 
         price: price[key]
      }
      arr.push(item)
   });
   return arr
}

export function createServiceArr(price) {
   let arr = []
   Object.entries(allService).forEach(([key, value]) => {
      let item = {
         name: value.name, 
         code: value.code, 
         price: price[key]
      }
      arr.push(item)
   });
   return arr
}

export function createIndentArr(values) {
   let arr = []
   indentOptions.forEach(item => {
      let newItem = {
         name: item.name, 
         image: item.img, 
         value: values[item.name]
      }
      arr.push(newItem)
   })
   return arr
}

export function formatDate(date) {
   const [year, day, month] = date.split('-').map(Number);
   return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${String(year).slice(-2)}`
}