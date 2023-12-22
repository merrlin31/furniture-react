export class ServiceItem {
   constructor (name, code, value = 0) {
      this.name = name;
      this.code = code;
      this.value = value;
   }
}

export const serviceItem1 = 'cutting'
export const serviceItem2 = 'edging'
export const serviceItem3 = 'dvpCutting'
export const serviceItem4 = 'tabletopCutting'
export const serviceItem5 = 'tabletopEdging'
export const serviceItem6 = "tabletopLock"
export const serviceItem7 = 'groove'
export const serviceItem8 = 'millingCut'
export const serviceItem9 = 'millingCutMin'
export const serviceItem10 = 'millingCutTabletop'
export const serviceItem11 = 'drilling'
export const serviceItem12 = 'drillingHinges'
export const serviceItem13 = 'delivery'
export const servicesItem14 = 'tabletopLength'
export const servicesItem14Value1 = 3050
export const servicesItem14Value2 = 4100
export const servicesItem15 = 'tabletopEdgeLenght'
export const serviceItem16 = 'gasoline'

export let allService = {
   [serviceItem1]: new ServiceItem(serviceItem1, 19026),
   [serviceItem2]: new ServiceItem(serviceItem2, 61768),
   [serviceItem3]: new ServiceItem(serviceItem3, 19025),
   [serviceItem4]: new ServiceItem(serviceItem4, 19031),
   [serviceItem5]: new ServiceItem(serviceItem5, 19005),
   [serviceItem6]: new ServiceItem(serviceItem6, 19033),
   [serviceItem7]: new ServiceItem(serviceItem7, 19016),
   [serviceItem8]: new ServiceItem(serviceItem8, 19049),
   [serviceItem9]: new ServiceItem(serviceItem9, 93808),
   [serviceItem10]: new ServiceItem(serviceItem10, 98035),
   [serviceItem11]: new ServiceItem(serviceItem11, '00011'),
   [serviceItem12]: new ServiceItem(serviceItem12, 51203),
}

export const initialServicesPrice = {
      [servicesItem14]: 3050,
      [servicesItem15]: 4.2,
      [serviceItem1]: 13.02,
      [serviceItem3]: 7.08,
      [serviceItem4]: 44.94,
      [serviceItem2]: 27.72,
      [serviceItem5]: 117.06,
      [serviceItem6]: 540.36,
      [serviceItem7]: 28.92,
      [serviceItem8]: 69.06,
      [serviceItem9]: 36.9,
      [serviceItem10]: 92.7,
      [serviceItem11]: 4.02,
      [serviceItem12]: 9.9,
      [serviceItem13]: 500,
      [serviceItem16]: 300,
}

export class Services {
   constructor() {
      this[serviceItem1] = 0;
      this[serviceItem2] = 0;
      this[serviceItem3] = 0;
      this[serviceItem4] = 0;
      this[serviceItem5] = 0;
      this[serviceItem6] = 0;
      this[serviceItem7] = 0;
      this[serviceItem8] = 0;
      this[serviceItem9] = 0;
      this[serviceItem10] = 0;
      this[serviceItem11] = 0;
      this[serviceItem12] = 0;
   }
}