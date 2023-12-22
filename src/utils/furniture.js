import { drawerType1, drawerType2, drawerType3, drawerType4, furnitureManufacturer1, 
   furnitureManufacturer10, furnitureManufacturer11, furnitureManufacturer12, furnitureManufacturer13, 
   furnitureManufacturer2, furnitureManufacturer3, furnitureManufacturer4, furnitureManufacturer5, furnitureManufacturer6, 
   furnitureManufacturer7, furnitureManufacturer8, furnitureManufacturer9, hingesName, hingesType1, hingesType2, hingesType3, 
   hingesType4, hingesType5, hingesType6, openingType1, openingType2, openingType3 } from "./description";

export class FurnitureItem {
   constructor (name, code, manufacturer, multiplicity = 1, value = 0) {
      this.name = name;
      this.code = code;
      this.manufacturer = manufacturer;
      this.multiplicity = multiplicity;
      this.value = value;
   }
}

export const furnitureItem1 = 'kargo'
export const furnitureItem2 = 'sink'
export const furnitureItem3 = 'dish'
export const furnitureItem4 = 'legs'
export const furnitureItem5 = 'legsClips'
export const furnitureItem6 = 'push'
export const furnitureItem7 = 'pushBar'
export const furnitureItem8 = 'plinthSeal'
export const furnitureItem9 = 'hooksRight'
export const furnitureItem10 = 'hooksLeft'
export const furnitureItem11 = 'rail'
export const furnitureItem12 = 'openingLimiter'
export const furnitureItem13 = 'lattice'
export const furnitureItem14 = 'absorber'
export const furnitureItem15 = 'connectionBar'
export const furnitureItem16 = 'confirmats'
export const furnitureItem17 = 'shelfHolder'
export const furnitureItem18 = 'selfTapping15'
export const furnitureItem19 = 'selfTapping30'
export const furnitureItem20 = 'screw40'
export const furnitureItem21 = 'minifix'
export const furnitureItem22 = 'minifixDowel'
export const furnitureItem23 = 'ledProfile'
export const furnitureItem24 = 'ledDiffuser'
export const furnitureItem25 = 'ledStrip'
export const furnitureItem26 = 'powerUnit'
export const furnitureItem27 = 'switch'
export const furnitureItem28 = 'handle'
export const furnitureItem29 = 'golaL'
export const furnitureItem30 = 'golaC'
export const furnitureItem31 = 'lift'
export const furnitureItem32 = 'tabletopConnector'
export const furnitureItem33 = 'hooksRightCup'
export const furnitureItem34 = 'hooksLeftCup'

export const initialFurniturePrice = {
   [furnitureItem1]: 1800,
   [furnitureItem2]: 5000,
   [furnitureItem3]: 498.84,
   [furnitureItem4]: 10.80,
   [furnitureItem5]: 5.82,
   [furnitureItem6]: 148.8,
   [furnitureItem7]: 15.96,
   [furnitureItem8]: 75.42,
   [furnitureItem9]: 35.1,
   [furnitureItem10]: 35.1,
   [furnitureItem11]: 141.96,
   [furnitureItem12]: 30.0,
   [furnitureItem13]: 164.52,
   [furnitureItem14]: 17.4,
   [furnitureItem15]: 48.06,
   [furnitureItem16]: 1.02,
   [furnitureItem17]: 0.42,
   [furnitureItem18]: 0.36,
   [furnitureItem19]: 0.54,
   [furnitureItem20]: 0.9,
   [furnitureItem21]: 2.4,
   [furnitureItem22]: 1.8,
   [furnitureItem23]: 211.98,
   [furnitureItem24]: 118.84,
   [furnitureItem25]: 153.24,
   [furnitureItem26]: 370.56,
   [furnitureItem27]: 29.58,
   [furnitureItem28]: 150.0,
   [furnitureItem29]: 900,
   [furnitureItem30]: 900,
   [furnitureItem31]: 150,
   [furnitureItem32]: 23.04,
   [furnitureItem33]: 6.96,
   [furnitureItem34]: 6.96
}

export let furniture = {
   [furnitureItem1]: new FurnitureItem(furnitureItem1, 98833, furnitureManufacturer2),
   [furnitureItem2]: new FurnitureItem(furnitureItem2, '', ''),
   [furnitureItem3]: new FurnitureItem(furnitureItem3, 60765, furnitureManufacturer8),
   [furnitureItem4]: new FurnitureItem(furnitureItem4, 57412, furnitureManufacturer4),
   [furnitureItem5]: new FurnitureItem(furnitureItem5, 87322, furnitureManufacturer4),
   [furnitureItem6]: new FurnitureItem(furnitureItem6, 13592, furnitureManufacturer2),
   [furnitureItem7]: new FurnitureItem(furnitureItem7, 13596, furnitureManufacturer2),
   [furnitureItem8]: new FurnitureItem(furnitureItem8, 81885, furnitureManufacturer5, 3),
   [furnitureItem9]: new FurnitureItem(furnitureItem9, 59642, furnitureManufacturer6),
   [furnitureItem10]: new FurnitureItem(furnitureItem10, 59640, furnitureManufacturer6),
   [furnitureItem11]: new FurnitureItem(furnitureItem11, 52680, furnitureManufacturer2, 2),
   [furnitureItem12]: new FurnitureItem(furnitureItem12, 31837, furnitureManufacturer7),
   [furnitureItem13]: new FurnitureItem(furnitureItem13, 87377, furnitureManufacturer9),
   [furnitureItem14]: new FurnitureItem(furnitureItem14, 80399, furnitureManufacturer8),
   [furnitureItem15]: new FurnitureItem(furnitureItem15, 82308, furnitureManufacturer8),
   [furnitureItem16]: new FurnitureItem(furnitureItem16, 52559, furnitureManufacturer8),
   [furnitureItem17]: new FurnitureItem(furnitureItem17, 52636, furnitureManufacturer8),
   [furnitureItem18]: new FurnitureItem(furnitureItem18, 11358, furnitureManufacturer2),
   [furnitureItem19]: new FurnitureItem(furnitureItem19, 11360, furnitureManufacturer2),
   [furnitureItem20]: new FurnitureItem(furnitureItem20, 52600, furnitureManufacturer8),
   [furnitureItem21]: new FurnitureItem(furnitureItem21, 61281, furnitureManufacturer1),
   [furnitureItem22]: new FurnitureItem(furnitureItem22, 57722, furnitureManufacturer1),
   [furnitureItem23]: new FurnitureItem(furnitureItem23, '', furnitureManufacturer11, 2),
   [furnitureItem24]: new FurnitureItem(furnitureItem24, '', furnitureManufacturer11, 2),
   [furnitureItem25]: new FurnitureItem(furnitureItem25, '', furnitureManufacturer10),
   [furnitureItem26]: new FurnitureItem(furnitureItem26, '', furnitureManufacturer12),
   [furnitureItem27]: new FurnitureItem(furnitureItem27, 86470, furnitureManufacturer10),
   [furnitureItem28]: new FurnitureItem(furnitureItem28, '', ''),
   [furnitureItem29]: new FurnitureItem(furnitureItem29, '', furnitureManufacturer4, 4),
   [furnitureItem30]: new FurnitureItem(furnitureItem30, '', furnitureManufacturer4, 4),
   [furnitureItem31]: new FurnitureItem(furnitureItem31, 12365, furnitureManufacturer2),
   [furnitureItem32]: new FurnitureItem(furnitureItem32, 52667, furnitureManufacturer8),
   [furnitureItem33]: new FurnitureItem(furnitureItem33, 59649, furnitureManufacturer6),
   [furnitureItem34]: new FurnitureItem(furnitureItem34, 59647, furnitureManufacturer6),
}

export class Furniture {
   constructor() {
      this[furnitureItem1] = 0;
      this[furnitureItem2] = 0;
      this[furnitureItem3] = 0;
      this[furnitureItem4] = 0;
      this[furnitureItem5] = 0;
      this[furnitureItem6] = 0;
      this[furnitureItem7] = 0;
      this[furnitureItem8] = 0;
      this[furnitureItem9] = 0;
      this[furnitureItem10] = 0;
      this[furnitureItem11] = 0;
      this[furnitureItem12] = 0;
      this[furnitureItem13] = 0;
      this[furnitureItem14] = 0;
      this[furnitureItem15] = 0;
      this[furnitureItem16] = 0;
      this[furnitureItem17] = 0;
      this[furnitureItem18] = 0;
      this[furnitureItem19] = 0;
      this[furnitureItem20] = 0;
      this[furnitureItem21] = 0;
      this[furnitureItem22] = 0;
      this[furnitureItem23] = 0;
      this[furnitureItem24] = 0;
      this[furnitureItem25] = 0;
      this[furnitureItem26] = 0;
      this[furnitureItem27] = 0;
      this[furnitureItem28] = 0;
      this[furnitureItem29] = 0;
      this[furnitureItem30] = 0;
      this[furnitureItem31] = 0;
      this[furnitureItem32] = 0;
      this[furnitureItem33] = 0;
      this[furnitureItem34] = 0;
   }
}

class DrawersCode {
   constructor (lenght600, lenght550, lenght500, lenght450, lenght400, lenght350) {
      this[600] = lenght600;
      this[550] = lenght550;
      this[500] = lenght500;
      this[450] = lenght450;
      this[400] = lenght400;
      this[350] = lenght350;
   }
}

export const drawers = {
   [drawerType1]: {
      [openingType1]: new DrawersCode('', 33553, 33552, 33551, 33550, 33549),
      [openingType2]: new DrawersCode('', 96091, 96090, 96089, 96088, ''),
      manufacturer: furnitureManufacturer2,
      name: drawerType1,
   },
   [drawerType2]: {
      [openingType1]: new DrawersCode(64147, 64146, 64145, 64144, 64143, 64142),
      [openingType2]: new DrawersCode(64141, 64140, 42137, 42136, 42135, 64139),
      manufacturer: furnitureManufacturer2,
      name: drawerType2,
   },
   [drawerType3]: {
      [openingType1]: new DrawersCode('', '', 78136, 78132, 78130, 78129),
      [openingType2]: new DrawersCode('', '', 78151, 78150, 78149, 78148),
      manufacturer: furnitureManufacturer1,
      name: drawerType3,
   },
   [drawerType4]: {
      manufacturer: furnitureManufacturer3,
      name: drawerType4,
   }
}


class HingesCode {
   constructor (overlayHinge, insetHinge, dualHinge, cornerHinge, transformer, bifolt) {
      this[hingesType4] = overlayHinge;
      this[hingesType2] = insetHinge;
      this[hingesType6] = dualHinge;
      this[hingesType1] = cornerHinge;
      this[hingesType5] = transformer;
      this[hingesType3] = bifolt;
   }
}

export const hinges = {
   [openingType1]: new HingesCode(125157, 125160, 125158, 54812, 147685, 96050),
   [openingType2]: new HingesCode(23913, 23915, 23914, 97747, 29717, 96050),
   [openingType3]: new HingesCode(96053, 96055, 96054, 96049, 97756, 96050),
   manufacturer: furnitureManufacturer2,
   name: hingesName,
}

export const discount = {
   [furnitureManufacturer1]: 20,
   [furnitureManufacturer2]: 15,
   [furnitureManufacturer3]: 0,
   [furnitureManufacturer4]: 1,
   [furnitureManufacturer5]: 15,
   [furnitureManufacturer6]: 15,
   [furnitureManufacturer7]: 9,
   [furnitureManufacturer8]: 25,
   [furnitureManufacturer9]: 18,
   [furnitureManufacturer10]: 20,
   [furnitureManufacturer11]: 10,
   [furnitureManufacturer12]: 18,
   [furnitureManufacturer13]: 25,
}

export const furnitureManufacturerList = Object.keys(discount)