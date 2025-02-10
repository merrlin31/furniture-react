import { drawerType1, drawerType2, drawerType3, drawerType4, HETTICH, 
   LUMINE, LUMINE_PROF, LUMINE_PWR, UKRAINE, 
   MULLER, BLUM, SCILM, TERMOPLAST, CAMAR, 
   HAFELE, CHINA, POLAND, hingesName, hingesType1, hingesType2, hingesType3, 
   hingesType4, hingesType5, hingesType6, openingType1, openingType2, openingType3, FERRO_FIORI, CASCATA, drawerType5 } from "./description";

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
   [KARGO]: 2265.3,
   [SINK]: 4536,
   [DISH]: 493.62,
   [LEGS]: 11.28,
   [LEGS_CLIPS]: 6.12,
   [PUSH]: 158.1,
   [PUSH_BAR]: 15.42,
   [PLINTH_SEAL]: 79.14,
   [HOOKS_RIGHT]: 38.94,
   [HOOKS_LEFT]: 38.94,
   [RAIL]: 159.72,
   [OPENING_LIMITER]: 32.1,
   [LATTICE]: 180.9,
   [ABSORBER]: 19.08,
   [CONNECTION_BAR]: 64.2,
   [CONFIRMATS]: 1.86,
   [SHELF_HOLDER]: 0.3,
   [SELF_TAPPING_15]: 0.42,
   [SELF_TAPPING_30]: 0.6,
   [SCREW_40]: 1.32,
   [MINIFIX]: 2.76,
   [MINIFIX_DOWEL]: 2.04,
   [LED_PROFILE]: 230.76,
   [LED_DIFFUSER]: 121.8,
   [LED_STRIP]: 113.58,
   [POWER_UNIT]: 309.78,
   [SWITCH]: 32.52,
   [HANDLE]: 151.92,
   [GOLA_L]: 2221.44,
   [GOLA_C]: 2481.3,
   [LIFT]: 135.18,
   [TABLETOP_CONNECTOR]: 17.7,
   [HOOKS_RIGHT_CUP]: 7.92,
   [HOOKS_LEFT_CUP]: 7.92
}

export let furniture = {
   [KARGO]: new FurnitureItem(KARGO, 98833, MULLER),
   [SINK]: new FurnitureItem(SINK, 113944, CASCATA),
   [DISH]: new FurnitureItem(DISH, 60765, CHINA),
   [LEGS]: new FurnitureItem(LEGS, 57412, SCILM),
   [LEGS_CLIPS]: new FurnitureItem(LEGS_CLIPS, 87322, SCILM),
   [PUSH]: new FurnitureItem(PUSH, 13592, MULLER),
   [PUSH_BAR]: new FurnitureItem(PUSH_BAR, 13596, MULLER),
   [PLINTH_SEAL]: new FurnitureItem(PLINTH_SEAL, 81885, TERMOPLAST, 3),
   [HOOKS_RIGHT]: new FurnitureItem(HOOKS_RIGHT, 59642, CAMAR),
   [HOOKS_LEFT]: new FurnitureItem(HOOKS_LEFT, 59640, CAMAR),
   [RAIL]: new FurnitureItem(RAIL, 52680, MULLER, 2),
   [OPENING_LIMITER]: new FurnitureItem(OPENING_LIMITER, 31837, HAFELE),
   [LATTICE]: new FurnitureItem(LATTICE, 87377, POLAND),
   [ABSORBER]: new FurnitureItem(ABSORBER, 80399, CHINA),
   [CONNECTION_BAR]: new FurnitureItem(CONNECTION_BAR, 82308, CHINA),
   [CONFIRMATS]: new FurnitureItem(CONFIRMATS, 190250, CHINA),
   [SHELF_HOLDER]: new FurnitureItem(SHELF_HOLDER, 190093, CHINA),
   [SELF_TAPPING_15]: new FurnitureItem(SELF_TAPPING_15, 190256, MULLER),
   [SELF_TAPPING_30]: new FurnitureItem(SELF_TAPPING_30, 190253, MULLER),
   [SCREW_40]: new FurnitureItem(SCREW_40, 190082, CHINA),
   [MINIFIX]: new FurnitureItem(MINIFIX, 61281, HETTICH),
   [MINIFIX_DOWEL]: new FurnitureItem(MINIFIX_DOWEL, 57722, HETTICH),
   [LED_PROFILE]: new FurnitureItem(LED_PROFILE, 110167, LUMINE_PROF, 2),
   [LED_DIFFUSER]: new FurnitureItem(LED_DIFFUSER, 83995, LUMINE_PROF, 2),
   [LED_STRIP]: new FurnitureItem(LED_STRIP, 90718, LUMINE),
   [POWER_UNIT]: new FurnitureItem(POWER_UNIT, 97278, LUMINE_PWR),
   [SWITCH]: new FurnitureItem(SWITCH, 86470, LUMINE),
   [HANDLE]: new FurnitureItem(HANDLE, 124180, FERRO_FIORI),
   [GOLA_L]: new FurnitureItem(GOLA_L, 124650, SCILM, 4),
   [GOLA_C]: new FurnitureItem(GOLA_C, 124649, SCILM, 4),
   [LIFT]: new FurnitureItem(LIFT, 12365, MULLER),
   [TABLETOP_CONNECTOR]: new FurnitureItem(TABLETOP_CONNECTOR, 52667, CHINA),
   [HOOKS_RIGHT_CUP]: new FurnitureItem(HOOKS_RIGHT_CUP, 59649, CAMAR),
   [HOOKS_LEFT_CUP]: new FurnitureItem(HOOKS_LEFT_CUP, 59647, CAMAR),
}
// export let furniture = {}

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
      manufacturer: MULLER,
      name: drawerType1,
   },
   [drawerType5]: {
      manufacturer: BLUM,
      name: drawerType5,
   },
   [drawerType2]: {
      [openingType1]: new DrawersCode(64147, 64146, 64145, 64144, 64143, 64142),
      [openingType2]: new DrawersCode(64141, 64140, 42137, 42136, 42135, 64139),
      manufacturer: MULLER,
      name: drawerType2,
   },
   [drawerType3]: {
      [openingType1]: new DrawersCode('', '', 78136, 78132, 78130, 78129),
      [openingType2]: new DrawersCode('', '', 78151, 78150, 78149, 78148),
      manufacturer: HETTICH,
      name: drawerType3,
   },
   [drawerType4]: {
      manufacturer: BLUM,
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
   manufacturer: MULLER,
   name: hingesName,
}

export const discount = {
   [HETTICH]: 20,
   [MULLER]: 15,
   [BLUM]: 0,
   [SCILM]: 1,
   [TERMOPLAST]: 15,
   [CAMAR]: 15,
   [HAFELE]: 9,
   [CHINA]: 25,
   [POLAND]: 18,
   [LUMINE]: 20,
   [LUMINE_PROF]: 10,
   [LUMINE_PWR]: 18,
   [UKRAINE]: 25,
   [FERRO_FIORI]: 0,
   [CASCATA]: 0
}

export const furnitureManufacturerList = Object.keys(discount)