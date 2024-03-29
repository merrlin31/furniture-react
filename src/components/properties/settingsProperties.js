import { CUTTING, MILLING_CUT_TABLETOP, DRILLING, DRILLING_HINGES, DELIVERY, GASOLINE, EDGING, 
   DVP_CUTTING, TABLETOP_CUTTING, TABLETOP_EDGING, TABLETOP_LOCK, GROOVE, MILLING_CUT, MILLING_CUT_MIN, 
   TABLETOP_LENGTH, TABLETOP_LENGTH_VALUE_1, TABLETOP_LENGTH_VALUE_2, TABLETOP_EDGE_LENGHT } from "../../utils/services"
import indent1 from './../../img/indent/indent1.webp'
import indent2 from './../../img/indent/indent2.webp'
import indent3 from './../../img/indent/indent3.webp'
import indent4 from './../../img/indent/indent4.webp'
import indent5 from './../../img/indent/indent5.webp'
import indent6 from './../../img/indent/indent6.webp'
import indent7 from './../../img/indent/indent7.webp'
import indent8 from './../../img/indent/indent8.webp'
import indent9 from './../../img/indent/indent9.webp'
import indent10 from './../../img/indent/indent10.webp'
import indent11 from './../../img/indent/indent11.webp'
import indent12 from './../../img/indent/indent12.webp'
import indent13 from './../../img/indent/indent13.webp'
// import indent14 from './../../img/indent/indent14.webp'
// import indent15 from './../../img/indent/indent15.webp'
import indent16 from './../../img/indent/indent16.webp'
import indent17 from './../../img/indent/indent17.webp'
import indent18 from './../../img/indent/indent18.webp'
import indent19 from './../../img/indent/indent19.webp'
import indent20 from './../../img/indent/indent20.webp'
import indent21 from './../../img/indent/indent21.webp'
import indent22 from './../../img/indent/indent22.webp'
import indent23 from './../../img/indent/indent23.webp'
import indent24 from './../../img/indent/indent24.webp'
import indent25 from './../../img/indent/indent25.webp'

export const settingsSection1 = 'indent'
export const priceSection1 = 'materials'
export const priceSection2 = 'furniture'
export const priceSection3 = 'services'

const indentType1 = 'materialWidth'
const indentType2 = 'indentTabletop'
const indentType3 = 'indentFrontBody'
const indentType4 = 'indentShelve'
const indentType5 = 'indentWall'
const indentType6 = 'indentCornerSection'
const indentType7 = 'indentBotFalseBack'
const indentType8 = 'indentBotFalseFront'
const indentType9 = 'indentUpFalseBack'
const indentType10 = 'indentUpFalseFront'
const indentType11 = 'indentBotGola'
const indentType12 = 'indentUpGola'
const indentType13 = 'indentCupboard'
const indentType14 = 'indentHood'
const indentType15 = 'indentJoinSection'
const indentType16 = 'partition'
const indentType17 = 'indentFront'
const indentType18 = 'ovenHeight'
const indentType19 = 'microwaveHeight'
const indentType20 = 'ovenDrawer'
const indentType21 = 'indentBackside'
const indentType22 = 'dvpGrooveDepth'
const indentType23 = 'fridgeHeight'
const indentType24 = 'indentDvp'
const indentType25 = 'indentPlinth'
const indentType26 = 'shorterBottom'

export const indentOptions = [
   {name: indentType1, id: indentType1, img: indent1},
   {name: indentType2, id: indentType2, img: indent2},
   {name: indentType3, id: indentType3, img: indent3},
   {name: indentType4, id: indentType4, img: indent4},
   {name: indentType5, id: indentType5, img: indent5},
   {name: indentType6, id: indentType6, img: indent6},
   {name: indentType7, id: indentType7, img: indent7},
   {name: indentType8, id: indentType8, img: indent8},
   {name: indentType9, id: indentType9, img: indent9},
   {name: indentType10, id: indentType10, img: indent10},
   {name: indentType11, id: indentType11, img: indent11},
   {name: indentType12, id: indentType12, img: indent12},
   {name: indentType13, id: indentType13, img: indent13},
   {name: indentType14, id: indentType14, img: indent13},
   {name: indentType15, id: indentType15, img: indent13},
   {name: indentType16, id: indentType16, img: indent16},
   {name: indentType17, id: indentType17, img: indent17},
   {name: indentType18, id: indentType18, img: indent18},
   {name: indentType19, id: indentType19, img: indent19},
   {name: indentType20, id: indentType20, img: indent20},
   {name: indentType21, id: indentType21, img: indent21},
   {name: indentType22, id: indentType22, img: indent22},
   {name: indentType23, id: indentType23, img: indent23},
   {name: indentType24, id: indentType24, img: indent24},
   {name: indentType25, id: indentType25, img: indent25},
   {name: indentType26, id: indentType26, img: indent25},
]

export const servicesOptions = [
   {name: TABLETOP_LENGTH, id: TABLETOP_LENGTH, select: TABLETOP_LENGTH, options: [
      {value: TABLETOP_LENGTH_VALUE_1, name: TABLETOP_LENGTH_VALUE_1},
      {value: TABLETOP_LENGTH_VALUE_2, name: TABLETOP_LENGTH_VALUE_2},
   ], defaulValue: 'servicesType1DefaultValue'},
   {name: TABLETOP_EDGE_LENGHT, id: TABLETOP_EDGE_LENGHT},
   {name: CUTTING, id: CUTTING},
   {name: DVP_CUTTING, id: DVP_CUTTING},
   {name: TABLETOP_CUTTING, id: TABLETOP_CUTTING},
   {name: EDGING, id: EDGING},
   {name: TABLETOP_EDGING, id: TABLETOP_EDGING},
   {name: TABLETOP_LOCK, id: TABLETOP_LOCK},
   {name: GROOVE, id: GROOVE},
   {name: MILLING_CUT, id: MILLING_CUT},
   {name: MILLING_CUT_MIN, id: MILLING_CUT_MIN},
   {name: MILLING_CUT_TABLETOP, id: MILLING_CUT_TABLETOP},
   {name: DRILLING, id: DRILLING},
   {name: DRILLING_HINGES, id: DRILLING_HINGES},
   {name: DELIVERY, id: DELIVERY},
   {name: GASOLINE, id: GASOLINE},
]

export const initialIndentValues = {
   [indentType1]: 18,
   [indentType2]: 60,
   [indentType3]: 20,
   [indentType4]: 20,
   [indentType5]: 50,
   [indentType6]: 2,
   [indentType7]: 10,
   [indentType8]: 35,
   [indentType9]: 5,
   [indentType10]: 36,
   [indentType11]: 27,
   [indentType12]: 10,
   [indentType13]: 20,
   [indentType14]: 0,
   [indentType15]: 20,
   [indentType16]: 70,
   [indentType17]: 3,
   [indentType18]: 600,
   [indentType19]: 362,
   [indentType20]: 83,
   [indentType21]: 20,
   [indentType22]: 5,
   [indentType23]: 2000,
   [indentType24]: 2,
   [indentType25]: 5,
   [indentType26]: 20,
}

export const initialSum = {totalSum: 0, totalDiscount: 0, totalSumWithDiscount: 0}

export const initialPercentage = {mounting: 10, promout: 5, design: 10, profit:15}
