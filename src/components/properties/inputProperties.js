import { drawers } from "../../utils/furniture"
import { drawerType2, frontOpeningType1, frontOpeningType2, frontOpeningType4, levelAmount1, levelAmount2, levelType1, levelType2, 
   levelType3, liftType1, liftType2, liftType3, localOption1, localOption2, localOption3, localOption4, localOption5, localOption6, 
   localOption7, localOption8, localOption9, materialType1, sectionBottomType1, sectionBottomType2, 
   sectionBottomType3, sectionBottomType4, sectionUpperType1, sectionUpperType2, sectionUpperType3, sectionUpperType4, sideType1 } from "../../utils/description"

export const section1 = 'global'
export const section2 = 'level'
export const section3 = 'local'
export const section4 = 'option'
export const section5 = 'items'

export const initialValues = {
   body: 27050,
   front: 27050,
   materialDvp: 28887,
   materialTabletop: 148271,
   tabletopThickness: 38,
   heightKitchen: 2500,
   heightDownSection: 900,
   heightUpSection: '',
   heightMezzanineSection: 0,
   plinth: 100,
   length: 3050,
   frontMaterial: materialType1,
   topLevel: levelAmount1,
   level: levelType1,
   bottomType: sectionBottomType1,
   upperType: sectionUpperType1,
   sectionType: sectionBottomType1,
   width: 600,
   depth: 600,
   frontAmount: 1,
   shelves: 0,
   neighboringWidth: 600,
   drawers: 0,
   frontOpening: frontOpeningType1,
   dishwasherSize: 600,
   side: sideType1,
   liftType: liftType1,
   drawersType: drawerType2,
}

export const initialCheckboxes = {
   sink: false,
   visibleSide: false,
   kargo: false,
   oven: false,
   microwave: false,
   hob: false,
   fridge: false,
   simpleFridge: false,
   dish: false,
   dishwasher: false,
   backlight:false,
   withoutFront: false,
   lift: false,
}

export const initialHides = {
   sink: false,
   visibleSide: false,
   kargo: false,
   oven: false,
   microwave: true,
   hob: false,
   fridge: true,
   simpleFridge: true,
   dish: true,
   dishwasher: false,
   backlight: true,
   neighboringWidth: true,
   drawers: false,
   drawersType: true,
   withoutFront: false,
   lift: true,
   liftType: true,
   shelves: false,
}

export const initialItemAmount = {
   allItem: 0,
   leftBottomItem: 0,
   leftCentralItem: 0,
   leftUpperItem: 0,
   centralBottomItem: 0,
   centralCentralItem: 0,
   centralUpperItem: 0,
   rightBottomItem: 0,
   rightCentralItem: 0,
   rightUpperItem: 0,
}

export const levelName = [
   {value: levelType1, name: levelType1},
   {value: levelType2, name: levelType2},
   {value: levelType3, name: levelType3},
]

export const changeLevel = () => {
   let level = []
   levelName.forEach(item => {
      if (item.value === levelType3) return
      level.push(item)
   })
   return level
}

export const levelTopOptions = {defaulValue: 'levelTypeDefaultValue',
   options: [
      {value: sectionUpperType1, name: sectionUpperType1},
      {value: sectionUpperType2, name: sectionUpperType2},
      {value: sectionUpperType3, name: sectionUpperType3},
      {value: sectionUpperType4, name: sectionUpperType4},
   ]
}

export const levelBottomOptions = {defaulValue: 'levelTypeDefaultValue',
   options: [
      {value: sectionBottomType1, name: sectionBottomType1},
      {value: sectionBottomType2, name: sectionBottomType2},
      {value: sectionBottomType3, name: sectionBottomType3},
      {value: sectionBottomType4, name: sectionBottomType4},
   ]
}

export const type = {}
levelName.forEach(item => type[item.value] = {name: item.name})
levelBottomOptions.options.forEach(item => type[levelType1][item.value] = {name: item.name})
levelTopOptions.options.forEach(item => type[levelType2][item.value] = {name: item.name})
levelTopOptions.options.forEach(item => type[levelType3][item.value] = {name: item.name})


export const levelAmount = {defaulValue: 'levelAmountDefaultValue', name: 'levelAmount',
options: [
   {value: levelAmount1, name: levelAmount1},
   {value: levelAmount2, name: levelAmount2},
   ]
}

export function createFrontOpeningList(value, item) {
   let opening = [
      {value: frontOpeningType1, name: frontOpeningType1},
      {value: frontOpeningType2, name: frontOpeningType2},
      {value: value, name: item}
   ]
   return opening
}

export const liftOptions = [
   {value: liftType1, name: liftType1},
   {value: liftType2, name: liftType2},
   {value: liftType3, name: liftType3},
]

export let drawersOptions = []
for (let key in drawers) {
   drawersOptions.push({value: key, name: drawers[key].name})
}

export const initialInputAtributes = [
   {id: localOption1, max: 1200, min: 0, readOnly:false},
   {id: localOption2, max: 600, min: 0, readOnly:false},
   {id: localOption3, max: 2, min: 1, readOnly:false},
   {id: localOption6, max: 6, min: 1, step: 1, readOnly:false},
   {id: localOption7, max: 600, readOnly:false},
   {id: localOption4, max: 6, min: 0, step: 1, readOnly:false},
   {id: localOption8, options: createFrontOpeningList(frontOpeningType4, frontOpeningType4)},
   {id: localOption9, options: liftOptions},
   {id: localOption5, options: drawersOptions},
]

function* idIterator() {
   let i = 1
   while (true) yield i++
}

export const detailId = idIterator() 
