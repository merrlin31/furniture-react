import { drawers, furniture, FurnitureItem, KARGO, HOOKS_LEFT, RAIL, LATTICE, ABSORBER, 
   CONFIRMATS, SHELF_HOLDER, SELF_TAPPING_15, SELF_TAPPING_30, SINK, SCREW_40, 
   LED_PROFILE, LED_DIFFUSER, LED_STRIP, POWER_UNIT, SWITCH, HANDLE, 
   GOLA_L, DISH, GOLA_C, LIFT, TABLETOP_CONNECTOR, HOOKS_RIGHT_CUP, 
   HOOKS_LEFT_CUP, LEGS, LEGS_CLIPS, PUSH, PUSH_BAR, PLINTH_SEAL, HOOKS_RIGHT, hinges } from "./furniture";
import { Section } from "./Section";
import { frontOpeningType2, furnitureManufacturer1, furnitureManufacturer2, furnitureManufacturer3, 
   hingesType1, hingesType2, hingesType3, hingesType4, hingesType5, legsAmount1, legsAmount2, 
   levelType1, liftType1, liftType2, liftType3, openingType1, openingType2, sectionBottomType2, 
   sectionBottomType3, sectionUpperType3, sectionUpperType4, sectionBottomType1, ninthDetail, tenthDetail, 
   frontOpeningType1, fifthDetail, numberLiftDrill, numberConfirmatsDetail, fourthDetail, 
   numberConnectors1, numberConnectors2, hingesType6, openingType3, numbershelfHolderDrill1, 
   numbershelfHolderDrill2, sectionBottomType4, drawerScale, drawerType4, 
   drawerFirstDetail, drawerThirdDetail, drawerType2, drawerType3, drawerType1, numberConfirmatsTelescopicBox, numberTelescopicBoxDrill, 
   numberConfirmatsHiddenBox, numberHiddenBoxDrill, numberTandemBoxDrill, numberFalseDrill, numberConfirmatsFalse, eighthDetail, 
   levelType2, sectionUpperType2, dishHeightMillLenght, hoodShelvesMillLenght, 
   hoodMillLenght, latticeMillLenght, hobMillLenght, frontOpeningType4, numberGolaMillMin, sinkMillLenght, numberConfirmatsCornerBot, 
   numberCornerBotDrill, numberSelfTapping15Drawer, numberSelfTapping15Kargo, numberSelfTapping15Hinge, numberSelfTapping15Clips, 
   numberSelfTapping15Push, numberSelfTapping15Legs, numberSelfTapping15Lift, numberSelfTapping30Drawer, numberSelfTapping30JoinSection, 
   numberSelfTapping30Hook, 
   frontOpeningType5,
   minCut} from "./description";
import { allService, MILLING_CUT_TABLETOP, DRILLING, DRILLING_HINGES, HANDLING_MILLING_CUT, TABLETOP_LOCK, GROOVE, MILLING_CUT, MILLING_CUT_MIN } from "./services";

export class CreateSection {
   constructor(section) {
      this.section = section
   }

   createDetailsDimensions() {
      
      let scale = 1000
      let section = new Section(this.section.sectionId)
      section.initialValues = this.section
      let furnitures = []
      let services = []
      let length = this.section.values.sectionWidth / scale
      let numberHinges = 0
      let opening = (this.section.values.frontOpening === frontOpeningType2) ? openingType1 : openingType2
      let numberFront = 0
      let legs = 0
      let push = 0
      let hooks = 0
      let absorber = 0
      let numberLift = 0

      for (let key in allService) {
         let item = {...allService[key]}
         item.value = 0 
         services.push(item)
      }
      const changeFurniture = (itemName) => furnitures.find(item => item.name === itemName)
      const changeService = (itemName) => services.find(item => item.name === itemName)
      
      if (this.section.values.level === levelType1) {
         furnitures = [...furnitures, {...furniture[LEGS]}]
         legs = (this.section.values.sectionWidth <= 600) ? legsAmount1 : legsAmount2;
         changeFurniture(LEGS).value = legs
         furnitures = [...furnitures, {...furniture[LEGS_CLIPS]}]
         changeFurniture(LEGS_CLIPS).value = legs / 2
         section.plinth = [...this.section.getPlinthDimensions()]
         section.tabletops = [...this.section.getTabletopDimension()]
      }
      let sectionFronts = this.section.getFrontDimensions();
      if (sectionFronts.fronts.length) {
         section.fronts = [...sectionFronts.fronts]
      }
      section.fronts.forEach(detail => {
         if (detail) numberFront += detail.amount;
      })
      
      if (sectionFronts.numberHinges > 0) {
         let numberHingesName
         
         if (!this.section.checkboxes.lift) {
            let hingesType
            let hingesAmount = 1
            switch(this.section.values.sectionType) {
               case sectionBottomType2:
               case sectionUpperType3:
                  hingesType = hingesType1
                  break
               case sectionUpperType4:
                  hingesType = hingesType2
                  break
               case sectionBottomType3:
                  hingesType = hingesType3
                  hingesAmount = 2
                  break
               default:
                  hingesType = hingesType4
                  break
            }
            numberHingesName = opening + hingesType
            numberHinges = sectionFronts.numberHinges / hingesAmount
            furnitures = [...furnitures, new FurnitureItem(numberHingesName, hinges[opening][hingesType], hinges.manufacturer, 1, numberHinges)]
            if (this.section.values.sectionType === sectionBottomType3) {
               let numberHingesNameSecond = opening + hingesType5
               let manufacturer = (this.section.values.frontOpening === frontOpeningType2) ? furnitureManufacturer1 : furnitureManufacturer2
               furnitures = [...furnitures, new FurnitureItem(numberHingesNameSecond, hinges[opening][hingesType5], manufacturer, 1, numberHinges)]
               numberHinges *= hingesAmount
            }
         } else {
            absorber = (this.section.values.frontOpening === frontOpeningType2) ? 0 : 1
            opening = (this.section.values.frontOpening === frontOpeningType2) ? openingType1 : openingType3
            numberLift = 1
            numberHinges = sectionFronts.numberHinges
            if (this.section.values.liftType === liftType1) {
               numberLift = 2
               let code = (this.section.values.frontOpening === frontOpeningType2) ? hinges[opening][hingesType4] : hinges[opening][hingesType4]
               numberHingesName = opening + hingesType4
               furnitures = [...furnitures, new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges / numberFront)]
               if (numberFront > 1) {
                  numberHingesName = opening + hingesType6
                  code = (this.section.values.frontOpening === frontOpeningType2) ? hinges[opening][hingesType6] : hinges[opening][hingesType6]
                  furnitures = [...furnitures, new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges - numberHinges / numberFront)]
               } 

            } else if (this.section.values.liftType === liftType2) {
               numberLift = 1
               changeService(DRILLING).value += numberLiftDrill;
            } else if (this.section.values.liftType === liftType3) {
               numberLift = 1 / 2
               changeService(DRILLING).value += numberLiftDrill;
            }
            
            furnitures = [...furnitures, {...furniture[LIFT]}]
            changeFurniture(LIFT).value = numberFront * numberLift
            changeFurniture(LIFT).manufacturer = (this.section.values.liftType === liftType1) ? furnitureManufacturer2 : furnitureManufacturer3
         }   
         changeService(DRILLING).value += sectionFronts.numberHinges * 2
      }
      if (this.section.checkboxes.visibleSide) {
         section.details = [...section.details, this.section.getVisibleSideDimensions()];
      }
      if (!this.section.checkboxes.dishwasher) {
         let sectionDetails = this.section.getSectionDimensions()
         furnitures = [...furnitures, {...furniture[CONFIRMATS]}]
         changeFurniture(CONFIRMATS).value = 0
         sectionDetails.forEach(() => {
            changeService(DRILLING).value += numberConfirmatsDetail * 2;
            changeFurniture(CONFIRMATS).value += numberConfirmatsDetail;
         })
         section.details = [...section.details, ...sectionDetails];
         if (this.section.values.sectionType === sectionBottomType1 || this.section.values.sectionType === sectionBottomType2) {
            const edgePartition = {
               top: 1, bottom: 1, left: 0, right: 0
            };
            let partitionDetail;
            if (!this.section.checkboxes.oven) {
               partitionDetail = this.section.getSectionDimensions().find(detail => detail.name === fourthDetail);
               partitionDetail.name = ninthDetail;
               if (!this.section.checkboxes.sink) partitionDetail.edge = edgePartition;
               section.details = [...section.details, partitionDetail]
            }
         }
         if (this.section.values.sectionType === sectionBottomType2) {
            let connectorDetail = this.section.getFalseDimensions();
            connectorDetail.name = tenthDetail;
            connectorDetail.width = this.section.constants.partition;
            connectorDetail.amount = (this.section.values.frontOpening === frontOpeningType1) ? numberConnectors1 : numberConnectors2;
            section.details = [...section.details, connectorDetail]
         }
         if (this.section.values.shelves > 0) {
            section.details = [...section.details, this.section.getShelvesDimensions()];
            furnitures = [...furnitures, {...furniture[SHELF_HOLDER]}];
            (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionUpperType3) 
               ? changeFurniture(SHELF_HOLDER).value = this.section.values[fifthDetail] * numbershelfHolderDrill1 
               : changeFurniture(SHELF_HOLDER).value = this.section.values[fifthDetail] * numbershelfHolderDrill2;
            changeService(DRILLING).value += changeFurniture(SHELF_HOLDER).value;
         }
         if (this.section.values.drawers > 0) {
            let drawersDetails = this.section.getDrawersDimensions();
            let drawersLenght = (this.section.values.drawersType !== drawerType4) 
               ? Math.round(drawersDetails.find(detail => detail.name === drawerFirstDetail).height / drawerScale) * drawerScale
               : Math.round(drawersDetails.find(detail => detail.name === drawerThirdDetail).height / drawerScale) * drawerScale  
            let drawersName = opening + this.section.values.drawersType + '_' + drawersLenght
            let code = (this.section.values.drawersType !== drawerType4) 
               ? drawers[this.section.values.drawersType][opening][drawersLenght]
               : '' 
            furnitures = [...furnitures, new FurnitureItem(drawersName, code, drawers[this.section.values.drawersType].manufacturer)]
            changeFurniture(drawersName).value = this.section.values.drawers
            changeFurniture(drawersName).drawer = true
            section.details = [...section.details, ...drawersDetails]
            if (this.section.values.drawersType === drawerType2 || this.section.values.drawersType === drawerType3) {
               changeService(DRILLING).value += this.section.values.drawers * numberHiddenBoxDrill;
               changeFurniture(CONFIRMATS).value += this.section.values.drawers * numberConfirmatsHiddenBox;
            } else if (this.section.values.drawersType === drawerType1) {
               changeService(DRILLING).value += this.section.values.drawers * numberTelescopicBoxDrill;
               changeFurniture(CONFIRMATS).value += this.section.values.drawers * numberConfirmatsTelescopicBox;
            } else {
               changeService(DRILLING).value += this.section.values.drawers * numberTandemBoxDrill;
            }
         }
         if (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionUpperType3) {
            section.details = [...section.details, this.section.getFalseDimensions()]
            changeService(DRILLING).value += numberFalseDrill;
            changeFurniture(CONFIRMATS).value += numberConfirmatsFalse;
         }
         if (this.section.values.sectionType === sectionBottomType3) {
            let connectorDetail = this.section.getSectionDimensions().find(detail => detail.name === fourthDetail);
            let height = this.section.values.sectionDepth - (this.section.prevDepth - this.section.constants.indentFrontBody) 
            - this.section.constants.materialWidth;
            connectorDetail.name = tenthDetail;
            connectorDetail.height = height
            connectorDetail.amount = 1;
            section.details = [...section.details, connectorDetail]
            connectorDetail = this.section.getSectionDimensions().find(detail => detail.name === fourthDetail);
            connectorDetail.name = ninthDetail;
            connectorDetail.height = height
               connectorDetail.amount = 1;
            connectorDetail.edge.bottom = 1;
            section.details = [...section.details, connectorDetail]
            changeService(DRILLING).value += numberCornerBotDrill;
            changeFurniture(CONFIRMATS).value += numberConfirmatsCornerBot;
         }
         if (this.section.values.sectionType === sectionBottomType4) {
            section.details = [...section.details, this.section.getCupboardPlinth()]
            changeService(GROOVE).value += this.section.values.kitchenHeight * 2 / scale
            if (this.section.checkboxes.oven || this.section.checkboxes.fridge) {
               furnitures = [...furnitures, {...furniture[LATTICE]}]
               changeFurniture(LATTICE).value = 1
               changeService(MILLING_CUT).value += latticeMillLenght;
            }
         }
      }
      if (this.section.checkboxes.backlight) {
         furnitures = [...furnitures, {...furniture[LED_PROFILE]}]
         furnitures = [...furnitures, {...furniture[LED_DIFFUSER]}]
         furnitures = [...furnitures, {...furniture[LED_STRIP]}]
         furnitures = [...furnitures, {...furniture[POWER_UNIT]}]
         furnitures = [...furnitures, {...furniture[SWITCH]}]
         changeFurniture(LED_PROFILE).value = length
         changeFurniture(LED_DIFFUSER).value = length
         changeFurniture(LED_STRIP).value = length
         changeFurniture(POWER_UNIT).value = 1
         changeFurniture(SWITCH).value = 1
         changeService(GROOVE).value += length * 6;
         changeService(MILLING_CUT_MIN).value += 2
      }
      if (this.section.values.level !== levelType1) {
         hooks = 2
         furnitures = [...furnitures, {...furniture[HOOKS_RIGHT]}]
         furnitures = [...furnitures, {...furniture[HOOKS_LEFT]}]
         furnitures = [...furnitures, {...furniture[HOOKS_RIGHT_CUP]}]
         furnitures = [...furnitures, {...furniture[HOOKS_LEFT_CUP]}]
         changeFurniture(HOOKS_RIGHT).value = hooks / 2;
         changeFurniture(HOOKS_LEFT).value = hooks / 2;
         changeFurniture(HOOKS_RIGHT_CUP).value = hooks / 2;
         changeFurniture(HOOKS_LEFT_CUP).value = hooks / 2;
         changeService(MILLING_CUT_MIN).value += hooks

         furnitures = [...furnitures, {...furniture[RAIL]}]
         changeFurniture(RAIL).value = length;
         (this.section.values.level === levelType2)
            ? changeService(GROOVE).value += ((this.section.values.sectionUpHeight * 2 + this.section.values.sectionWidth)) / scale
            : changeService(GROOVE).value += ((this.section.values.heightMezzanineSection * 2)) / scale
      }
      if (this.section.values.sectionType === sectionUpperType2) {
         if (this.section.values.level === levelType2) {
            changeService(MILLING_CUT).value += hoodMillLenght + (this.section.values.shelves + 1) * hoodShelvesMillLenght
            changeService(HANDLING_MILLING_CUT).value += 4
         } else {
            changeService(MILLING_CUT).value += (this.section.values.shelves + 2) * hoodShelvesMillLenght
         }
      }
      
      let plinthSeal = 0;
      for (let key in section.plinth) {
         if (Object.keys(section.plinth[key]).length) plinthSeal += section.plinth[key].height / scale
      }
      let cupboardPlinth = section.details.find(detail => detail.name === eighthDetail)
      if (cupboardPlinth) plinthSeal += cupboardPlinth.height / scale
      if (plinthSeal > 0) {
         furnitures = [...furnitures, {...furniture[PLINTH_SEAL]}]
         changeFurniture(PLINTH_SEAL).value = plinthSeal
      }
      if (this.section.checkboxes.hob) changeService(MILLING_CUT_TABLETOP).value += hobMillLenght;
      if (this.section.values.frontOpening === frontOpeningType4) {
         changeService(MILLING_CUT_MIN).value += numberGolaMillMin;
         changeService(HANDLING_MILLING_CUT).value += (this.section.values.sectionType === sectionBottomType4) ? numberGolaMillMin * 2 : numberGolaMillMin;
         furnitures = [...furnitures, {...furniture[GOLA_L]}]
         changeFurniture(GOLA_L).value = length;
      }
      if (this.section.values.frontOpening === frontOpeningType4 && this.section.values.drawers > 0) {
         changeService(MILLING_CUT_MIN).value += numberGolaMillMin * (this.section.values.drawers - 1);
         changeService(HANDLING_MILLING_CUT).value += numberGolaMillMin * (this.section.values.drawers - 1) * 2;
         furnitures = [...furnitures, {...furniture[GOLA_C]}]
         changeFurniture(GOLA_C).value = length * (this.section.values.drawers - 1);
      }
      if (this.section.checkboxes.dishwasher) {
         changeService(MILLING_CUT).value += length + dishHeightMillLenght
         numberHinges = 0;
         legs = 0
         changeFurniture(LEGS).value = legs;
         changeService(MILLING_CUT_MIN).value = 0;
         changeService(HANDLING_MILLING_CUT).value = 0;
      }
      changeService(DRILLING_HINGES).value = numberHinges
      if (this.section.checkboxes.kargo) {
         furnitures = [...furnitures, {...furniture[KARGO]}]
         changeFurniture(KARGO).value = 1
      }
      if (this.section.checkboxes.sink) {
         furnitures = [...furnitures, {...furniture[SINK]}]
         changeFurniture(SINK).value = 1
         changeService(MILLING_CUT_TABLETOP).value += sinkMillLenght;
      }
      if (this.section.checkboxes.dish) {
         furnitures = [...furnitures, {...furniture[DISH]}]
         changeFurniture(DISH).value = 1
      }
      if (this.section.values.frontOpening === frontOpeningType1) {
         let divider = (this.section.values.liftType === liftType3) ? 2 : 1
         furnitures = [...furnitures, {...furniture[HANDLE]}]
         changeFurniture(HANDLE).value = numberFront / divider
         let drill = numberFront * 2 / divider
         furnitures = [...furnitures, {...furniture[SCREW_40]}]
         changeFurniture(SCREW_40).value = drill
         changeService(DRILLING).value += drill;
      }
      if (this.section.values.frontOpening === frontOpeningType2) {
         push = numberFront - this.section.values.drawers
         furnitures = [...furnitures, {...furniture[PUSH]}]
         furnitures = [...furnitures, {...furniture[PUSH_BAR]}]
         changeFurniture(PUSH).value = push;
         changeFurniture(PUSH_BAR).value = push;
      }
      if (this.section.values.frontOpening === frontOpeningType5 && this.section.values.sectionType === sectionUpperType3) {
         const cut = (this.section.values.sectionWidth - (this.section.values.neighboringSectionWidth - 
            this.section.constants.indentUpFalseBack + this.section.constants.indentUpFalseFront) - 
            this.section.constants.materialWidth + this.section.constants.shorterBottom) / scale;
         (cut > minCut)
            ? changeService(MILLING_CUT).value += cut
            : changeService(MILLING_CUT_MIN).value += 1
      }
      if (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionBottomType3) {
         furnitures = [...furnitures, {...furniture[TABLETOP_CONNECTOR]}]
         changeFurniture(TABLETOP_CONNECTOR).value = 3;
         changeService(TABLETOP_LOCK).value = 1;
      }
      let kargo = (this.section.checkboxes.kargo) ? 1 : 0
      let clips = legs / 2
      let selfTapping15 = numberHinges * numberSelfTapping15Hinge + this.section.values.drawers * numberSelfTapping15Drawer + 
      kargo * numberSelfTapping15Kargo + legs * numberSelfTapping15Legs + clips * numberSelfTapping15Clips + 
      push * numberSelfTapping15Push + numberLift * numberSelfTapping15Lift
      if (selfTapping15 > 0) {
         furnitures = [...furnitures, {...furniture[SELF_TAPPING_15]}]
         changeFurniture(SELF_TAPPING_15).value = selfTapping15
      }
      let selfTapping30 = this.section.values.drawers * numberSelfTapping30Drawer + hooks * numberSelfTapping30Hook + numberSelfTapping30JoinSection
      if (selfTapping30 > 0) {
         furnitures = [...furnitures, {...furniture[SELF_TAPPING_30]}]
         changeFurniture(SELF_TAPPING_30).value = selfTapping30
      }
      if (absorber > 0) {
         furnitures = [...furnitures, {...furniture[ABSORBER]}]
         changeFurniture(ABSORBER).value = absorber
      }

      section.dvps = [...this.section.getDvpDimension()]
      section.furnitures = [...furnitures]
      section.services = [...services]
      console.log(section)
      return section
   }
}