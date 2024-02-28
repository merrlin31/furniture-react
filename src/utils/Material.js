import { bodyManufacturer, dvpManufacturer, frontManufacturer, materialDefaultValue, materialManufacturer1, 
   materialManufacturer10, materialManufacturer11, materialManufacturer12, materialManufacturer2, 
   materialManufacturer3, materialManufacturer4, materialManufacturer5, materialManufacturer6, materialManufacturer7, 
   materialManufacturer8, materialManufacturer9, materialType1, materialType2, materialType3, materialType4, tabletopManufacturer } from "./description";

let area = 5.3
const cutDvp = 30
const cutDsp = 40
export const materialType1Price = 2321.24
export const materialType1BoldEdgePrice = 23.22
export const materialType1ThinEdgePrice = 12.30
export const materialType2Price = 2342.88
export const materialType3Price = 849.6
export const materialType4Price = 3472.74
export const materialType4BoldEdgePrice = 88.5
export const materialType4ThinEdgePrice = 121.44

export class Material {
   constructor(materialCode, area, boldEdge, thinEdge, edging, material, price = 0, 
      boldEdgePrice = 0, thinEdgePrice = 0, manufacturer = materialManufacturer1, discountValue) {
      this.materialCode = materialCode;
      this.area = +area.toFixed(2);
      this.boldEdge = +boldEdge;
      this.thinEdge = +thinEdge;
      this.edging = +edging;
      this.material = material;
      this.price = +price;
      this.boldEdgePrice = +boldEdgePrice;
      this.thinEdgePrice = +thinEdgePrice;
      this.manufacturer = manufacturer
      this.discountValue = discountValue
   }

   get cutting() {
      let cut = (this.material === materialType3) ? cutDvp : cutDsp
      let cutting = this.area / area * cut
      return +cutting;
   }

   get discount() {
      let option = choiceOption(this.material, bodyManufacturerDiscount, frontManufacturerDiscount, dvpManufacturerDiscount, tabletopManufacturerDiscount)
      let discount = option[this.manufacturer]
      return discount
   }
}

export const bodyManufacturerName = {name: bodyManufacturer, id: bodyManufacturer, select: bodyManufacturer, options: [
   {value: materialManufacturer1, name: materialManufacturer1},
   {value: materialManufacturer2, name: materialManufacturer2},
   {value: materialManufacturer3, name: materialManufacturer3},
   {value: materialManufacturer4, name: materialManufacturer4},
   {value: materialManufacturer5, name: materialManufacturer5},
], defaulValue: materialDefaultValue};
export const frontManufacturerName = {name: frontManufacturer, id: frontManufacturer, select: frontManufacturer, options: [
   {value: materialManufacturer1, name: materialManufacturer1},
   {value: materialManufacturer2, name: materialManufacturer2},
   {value: materialManufacturer3, name: materialManufacturer3},
   {value: materialManufacturer4, name: materialManufacturer4},
   {value: materialManufacturer5, name: materialManufacturer5},
   {value: materialManufacturer6, name: materialManufacturer6},
   {value: materialManufacturer7, name: materialManufacturer7},
], defaulValue: materialDefaultValue};
export const tabletopManufacturerName = {name: tabletopManufacturer, id: tabletopManufacturer, select: tabletopManufacturer, options: [
   {value: materialManufacturer1, name: materialManufacturer1},
   {value: materialManufacturer2, name: materialManufacturer2},
   {value: materialManufacturer3, name: materialManufacturer3},
   {value: materialManufacturer8, name: materialManufacturer8},
   {value: materialManufacturer9, name: materialManufacturer9},
   {value: materialManufacturer10, name: materialManufacturer10},
   {value: materialManufacturer11, name: materialManufacturer11},
], defaulValue: materialDefaultValue};
export const dvpManufacturerName = {name: dvpManufacturer, id: dvpManufacturer, select: dvpManufacturer, options: [
   {value: materialManufacturer1, name: materialManufacturer1},
   {value: materialManufacturer12, name: materialManufacturer12},
], defaulValue: materialDefaultValue};

export const bodyManufacturerDiscount = {
   kronospan: 10,
   swisskrono: 0,
   egger: 9.5,
   cleaf: 0,
   saviola: 0,
}
export const frontManufacturerDiscount = {
   kronospan: 10,
   swisskrono: 0,
   egger: 9.5,
   cleaf: 0,
   saviola: 0,
   plow: 0,
   paunt: 0
}
export const tabletopManufacturerDiscount = {
   kronospan: 3,
   swisskrono: 0,
   egger: 18.5,
   luxeform: 3,
   arpa: 0,
   fenix: 0,
   ricci: 0
}
export const dvpManufacturerDiscount = {
   kronospan: 18,
   pfleiderer: 18,
}

export function choiceOption(material, option1 = bodyManufacturerName, option2 = frontManufacturerName, option3 = dvpManufacturerName, option4 = tabletopManufacturerName) {
   let option = {}
   switch (material) {
      case materialType1:
         option = option1
         break
      case materialType2:
         option = option2
         break
      case materialType3:
         option = option3
         break
      case materialType4:
         option = option4
         break
      default:
         option = option1
   }
   return option
}

