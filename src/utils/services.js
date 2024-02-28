export class ServiceItem {
   constructor (name, code, value = 0) {
      this.name = name;
      this.code = code;
      this.value = value;
   }
}

export const CUTTING = 'cutting'
export const EDGING = 'edging'
export const DVP_CUTTING = 'dvpCutting'
export const TABLETOP_CUTTING = 'tabletopCutting'
export const TABLETOP_EDGING = 'tabletopEdging'
export const TABLETOP_LOCK = "tabletopLock"
export const GROOVE = 'groove'
export const MILLING_CUT = 'millingCut'
export const MILLING_CUT_MIN = 'millingCutMin'
export const MILLING_CUT_TABLETOP = 'millingCutTabletop'
export const DRILLING = 'drilling'
export const DRILLING_HINGES = 'drillingHinges'
export const DELIVERY = 'delivery'
export const TABLETOP_LENGTH = 'tabletopLength'
export const TABLETOP_LENGTH_VALUE_1 = 3050
export const TABLETOP_LENGTH_VALUE_2 = 4100
export const TABLETOP_EDGE_LENGHT = 'tabletopEdgeLenght'
export const GASOLINE = 'gasoline'
export const HANDLING_MILLING_CUT = 'handlingMillingCut'

export let allService = {
   [CUTTING]: new ServiceItem(CUTTING, 19026),
   [EDGING]: new ServiceItem(EDGING, 61768),
   [DVP_CUTTING]: new ServiceItem(DVP_CUTTING, 19025),
   [TABLETOP_CUTTING]: new ServiceItem(TABLETOP_CUTTING, 19031),
   [TABLETOP_EDGING]: new ServiceItem(TABLETOP_EDGING, 19005),
   [TABLETOP_LOCK]: new ServiceItem(TABLETOP_LOCK, 19033),
   [GROOVE]: new ServiceItem(GROOVE, 19016),
   [MILLING_CUT]: new ServiceItem(MILLING_CUT, 19049),
   [MILLING_CUT_MIN]: new ServiceItem(MILLING_CUT_MIN, 93808),
   [HANDLING_MILLING_CUT]: new ServiceItem(HANDLING_MILLING_CUT, 48296),
   [MILLING_CUT_TABLETOP]: new ServiceItem(MILLING_CUT_TABLETOP, 98035),
   [DRILLING]: new ServiceItem(DRILLING, '00011'),
   [DRILLING_HINGES]: new ServiceItem(DRILLING_HINGES, 51203),
}

export const initialServicesPrice = {
      [TABLETOP_LENGTH]: 3050,
      [TABLETOP_EDGE_LENGHT]: 4.2,
      [CUTTING]: 13.02,
      [DVP_CUTTING]: 7.08,
      [TABLETOP_CUTTING]: 44.94,
      [EDGING]: 27.72,
      [TABLETOP_EDGING]: 117.06,
      [TABLETOP_LOCK]: 540.36,
      [GROOVE]: 28.92,
      [MILLING_CUT]: 69.06,
      [MILLING_CUT_MIN]: 36.9,
      [MILLING_CUT_TABLETOP]: 92.7,
      [DRILLING]: 4.02,
      [DRILLING_HINGES]: 9.9,
      [DELIVERY]: 500,
      [GASOLINE]: 300,
      [HANDLING_MILLING_CUT]: 35.46,
}

export class Services {
   constructor() {
      this[CUTTING] = 0;
      this[EDGING] = 0;
      this[DVP_CUTTING] = 0;
      this[TABLETOP_CUTTING] = 0;
      this[TABLETOP_EDGING] = 0;
      this[TABLETOP_LOCK] = 0;
      this[GROOVE] = 0;
      this[MILLING_CUT] = 0;
      this[MILLING_CUT_MIN] = 0;
      this[MILLING_CUT_TABLETOP] = 0;
      this[DRILLING] = 0;
      this[DRILLING_HINGES] = 0;
      this[HANDLING_MILLING_CUT] = 0;
   }
}