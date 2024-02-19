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

export const KARGO = 'kargo'
export const SINK = 'sink'
export const DISH = 'dish'
export const LEGS = 'legs'
export const LEGS_CLIPS = 'legsClips'
export const PUSH = 'push'
export const PUSH_BAR = 'pushBar'
export const PLINTH_SEAL = 'plinthSeal'
export const HOOKS_RIGHT = 'hooksRight'
export const HOOKS_LEFT = 'hooksLeft'
export const RAIL = 'rail'
export const OPENING_LIMITER = 'openingLimiter'
export const LATTICE = 'lattice'
export const ABSORBER = 'absorber'
export const CONNECTION_BAR = 'connectionBar'
export const CONFIRMATS = 'confirmats'
export const SHELF_HOLDER = 'shelfHolder'
export const SELF_TAPPING_15 = 'selfTapping15'
export const SELF_TAPPING_30 = 'selfTapping30'
export const SCREW_40 = 'screw40'
export const MINIFIX = 'minifix'
export const MINIFIX_DOWEL = 'minifixDowel'
export const LED_PROFILE = 'ledProfile'
export const LED_DIFFUSER = 'ledDiffuser'
export const LED_STRIP = 'ledStrip'
export const POWER_UNIT = 'powerUnit'
export const SWITCH = 'switch'
export const HANDLE = 'handle'
export const GOLA_L = 'golaL'
export const GOLA_C = 'golaC'
export const LIFT = 'lift'
export const TABLETOP_CONNECTOR = 'tabletopConnector'
export const HOOKS_RIGHT_CUP = 'hooksRightCup'
export const HOOKS_LEFT_CUP = 'hooksLeftCup'

export const initialFurniturePrice = {
   [KARGO]: 1800,
   [SINK]: 5000,
   [DISH]: 498.84,
   [LEGS]: 10.80,
   [LEGS_CLIPS]: 5.82,
   [PUSH]: 148.8,
   [PUSH_BAR]: 15.96,
   [PLINTH_SEAL]: 75.42,
   [HOOKS_RIGHT]: 35.1,
   [HOOKS_LEFT]: 35.1,
   [RAIL]: 141.96,
   [OPENING_LIMITER]: 30.0,
   [LATTICE]: 164.52,
   [ABSORBER]: 17.4,
   [CONNECTION_BAR]: 48.06,
   [CONFIRMATS]: 1.02,
   [SHELF_HOLDER]: 0.42,
   [SELF_TAPPING_15]: 0.36,
   [SELF_TAPPING_30]: 0.54,
   [SCREW_40]: 0.9,
   [MINIFIX]: 2.4,
   [MINIFIX_DOWEL]: 1.8,
   [LED_PROFILE]: 211.98,
   [LED_DIFFUSER]: 118.84,
   [LED_STRIP]: 153.24,
   [POWER_UNIT]: 370.56,
   [SWITCH]: 29.58,
   [HANDLE]: 150.0,
   [GOLA_L]: 900,
   [GOLA_C]: 900,
   [LIFT]: 150,
   [TABLETOP_CONNECTOR]: 23.04,
   [HOOKS_RIGHT_CUP]: 6.96,
   [HOOKS_LEFT_CUP]: 6.96
}

export let furniture = {
   [KARGO]: new FurnitureItem(KARGO, 98833, furnitureManufacturer2),
   [SINK]: new FurnitureItem(SINK, '', ''),
   [DISH]: new FurnitureItem(DISH, 60765, furnitureManufacturer8),
   [LEGS]: new FurnitureItem(LEGS, 57412, furnitureManufacturer4),
   [LEGS_CLIPS]: new FurnitureItem(LEGS_CLIPS, 87322, furnitureManufacturer4),
   [PUSH]: new FurnitureItem(PUSH, 13592, furnitureManufacturer2),
   [PUSH_BAR]: new FurnitureItem(PUSH_BAR, 13596, furnitureManufacturer2),
   [PLINTH_SEAL]: new FurnitureItem(PLINTH_SEAL, 81885, furnitureManufacturer5, 3),
   [HOOKS_RIGHT]: new FurnitureItem(HOOKS_RIGHT, 59642, furnitureManufacturer6),
   [HOOKS_LEFT]: new FurnitureItem(HOOKS_LEFT, 59640, furnitureManufacturer6),
   [RAIL]: new FurnitureItem(RAIL, 52680, furnitureManufacturer2, 2),
   [OPENING_LIMITER]: new FurnitureItem(OPENING_LIMITER, 31837, furnitureManufacturer7),
   [LATTICE]: new FurnitureItem(LATTICE, 87377, furnitureManufacturer9),
   [ABSORBER]: new FurnitureItem(ABSORBER, 80399, furnitureManufacturer8),
   [CONNECTION_BAR]: new FurnitureItem(CONNECTION_BAR, 82308, furnitureManufacturer8),
   [CONFIRMATS]: new FurnitureItem(CONFIRMATS, 52559, furnitureManufacturer8),
   [SHELF_HOLDER]: new FurnitureItem(SHELF_HOLDER, 52636, furnitureManufacturer8),
   [SELF_TAPPING_15]: new FurnitureItem(SELF_TAPPING_15, 11358, furnitureManufacturer2),
   [SELF_TAPPING_30]: new FurnitureItem(SELF_TAPPING_30, 11360, furnitureManufacturer2),
   [SCREW_40]: new FurnitureItem(SCREW_40, 52600, furnitureManufacturer8),
   [MINIFIX]: new FurnitureItem(MINIFIX, 61281, furnitureManufacturer1),
   [MINIFIX_DOWEL]: new FurnitureItem(MINIFIX_DOWEL, 57722, furnitureManufacturer1),
   [LED_PROFILE]: new FurnitureItem(LED_PROFILE, '', furnitureManufacturer11, 2),
   [LED_DIFFUSER]: new FurnitureItem(LED_DIFFUSER, '', furnitureManufacturer11, 2),
   [LED_STRIP]: new FurnitureItem(LED_STRIP, '', furnitureManufacturer10),
   [POWER_UNIT]: new FurnitureItem(POWER_UNIT, '', furnitureManufacturer12),
   [SWITCH]: new FurnitureItem(SWITCH, 86470, furnitureManufacturer10),
   [HANDLE]: new FurnitureItem(HANDLE, '', ''),
   [GOLA_L]: new FurnitureItem(GOLA_L, '', furnitureManufacturer4, 4),
   [GOLA_C]: new FurnitureItem(GOLA_C, '', furnitureManufacturer4, 4),
   [LIFT]: new FurnitureItem(LIFT, 12365, furnitureManufacturer2),
   [TABLETOP_CONNECTOR]: new FurnitureItem(TABLETOP_CONNECTOR, 52667, furnitureManufacturer8),
   [HOOKS_RIGHT_CUP]: new FurnitureItem(HOOKS_RIGHT_CUP, 59649, furnitureManufacturer6),
   [HOOKS_LEFT_CUP]: new FurnitureItem(HOOKS_LEFT_CUP, 59647, furnitureManufacturer6),
}

export class Furniture {
   constructor() {
      this[KARGO] = 0;
      this[SINK] = 0;
      this[DISH] = 0;
      this[LEGS] = 0;
      this[LEGS_CLIPS] = 0;
      this[PUSH] = 0;
      this[PUSH_BAR] = 0;
      this[PLINTH_SEAL] = 0;
      this[HOOKS_RIGHT] = 0;
      this[HOOKS_LEFT] = 0;
      this[RAIL] = 0;
      this[OPENING_LIMITER] = 0;
      this[LATTICE] = 0;
      this[ABSORBER] = 0;
      this[CONNECTION_BAR] = 0;
      this[CONFIRMATS] = 0;
      this[SHELF_HOLDER] = 0;
      this[SELF_TAPPING_15] = 0;
      this[SELF_TAPPING_30] = 0;
      this[SCREW_40] = 0;
      this[MINIFIX] = 0;
      this[MINIFIX_DOWEL] = 0;
      this[LED_PROFILE] = 0;
      this[LED_DIFFUSER] = 0;
      this[LED_STRIP] = 0;
      this[POWER_UNIT] = 0;
      this[SWITCH] = 0;
      this[HANDLE] = 0;
      this[GOLA_L] = 0;
      this[GOLA_C] = 0;
      this[LIFT] = 0;
      this[TABLETOP_CONNECTOR] = 0;
      this[HOOKS_RIGHT_CUP] = 0;
      this[HOOKS_LEFT_CUP] = 0;
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