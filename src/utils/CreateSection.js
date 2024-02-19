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
   frontOpeningType1, fifthDetail, numberLiftDrill, sixthDetail, numberConfirmatsDetail, fourthDetail, 
   seventhDetail, numberConnectors1, numberConnectors2, hingesType6, openingType3, numbershelfHolderDrill1, 
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
import { allService, serviceItem10, serviceItem11, serviceItem12, serviceItem17, serviceItem6, serviceItem7, serviceItem8, serviceItem9 } from "./services";

export class CreateSection {
   constructor(section) {
      this.section = section
   }

   createDetailsDimensions() {
      
      let scale = 1000
      let section = new Section(this.section.sectionId)
      section.initialValues = this.section
      let furnitures = section.furnitures
      let services = section.services
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
         services[key] = Object.assign({}, allService[key])  
         services[key].value = 0
      }
      
      if (this.section.values.level === levelType1) {
         furnitures[LEGS] = Object.assign({}, furniture[LEGS])
         legs = (this.section.values.sectionWidth <= 600) ? legsAmount1 : legsAmount2;
         furnitures[LEGS].value = legs
         furnitures[LEGS_CLIPS] = Object.assign({}, furniture[LEGS_CLIPS])
         furnitures[LEGS_CLIPS].value = legs / 2
      }
      let sectionFronts = this.section.getFrontDimensions();
      for (let key in sectionFronts) {
         if (section.fronts[key]) {
            section.fronts[key] = sectionFronts[key]
         }
      }
      for (let key in section.fronts) {
         if (Object.keys(section.fronts[key]).length) { 
            numberFront += section.fronts[key].amount;
         }
      }
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
            furnitures[numberHingesName] = new FurnitureItem(numberHingesName, hinges[opening][hingesType], hinges.manufacturer, 1, numberHinges)
            if (this.section.values.sectionType === sectionBottomType3) {
               let numberHingesNameSecond = opening + hingesType5
               let manufacturer = (this.section.values.frontOpening === frontOpeningType2) ? furnitureManufacturer1 : furnitureManufacturer2
               furnitures[numberHingesNameSecond] = new FurnitureItem(numberHingesNameSecond, hinges[opening][hingesType5], manufacturer, 1, numberHinges)
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
               furnitures[numberHingesName] = new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges / numberFront)
               if (numberFront > 1) {
                  numberHingesName = opening + hingesType6
                  code = (this.section.values.frontOpening === frontOpeningType2) ? hinges[opening][hingesType6] : hinges[opening][hingesType6]
                  furnitures[numberHingesName] = new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges - numberHinges / numberFront)
               } 

            } else if (this.section.values.liftType === liftType2) {
               numberLift = 1
               services[serviceItem11].value += numberLiftDrill;
            } else if (this.section.values.liftType === liftType3) {
               numberLift = 1 / 2
               services[serviceItem11].value += numberLiftDrill;
            }
            
            furnitures[LIFT] = Object.assign({}, furniture[LIFT])
            furnitures[LIFT].value = numberFront * numberLift
            furnitures[LIFT].manufacturer = (this.section.values.liftType === liftType1) ? furnitureManufacturer2 : furnitureManufacturer3
         }   
         services[serviceItem11].value += sectionFronts.numberHinges * 2
      }
      if (this.section.checkboxes.visibleSide) {
         section.details[sixthDetail] = this.section.getVisibleSideDimensions();
      }
      if (!this.section.checkboxes.dishwasher) {
         let sectionDetails = this.section.getSectionDimensions()
         furnitures[CONFIRMATS] = Object.assign({}, furniture[CONFIRMATS])
         furnitures[CONFIRMATS].value = 0
         for (let key in sectionDetails) {
            section.details[key] = sectionDetails[key];
            services[serviceItem11].value += numberConfirmatsDetail * 2;
            furnitures[CONFIRMATS].value += numberConfirmatsDetail;
         }
         if (this.section.values.sectionType === sectionBottomType1 || this.section.values.sectionType === sectionBottomType2) {
            const edgePartition = {
               top: 1, bottom: 1, left: 0, right: 0
            };
            let partitionDetail;
            if (!this.section.checkboxes.oven) {
               partitionDetail = this.section.getSectionDimensions()[fourthDetail];
               partitionDetail.name = ninthDetail;
               if (!this.section.checkboxes.sink) partitionDetail.edge = edgePartition;
               section.details[ninthDetail] = partitionDetail
            }
         }
         if (this.section.values.sectionType === sectionBottomType2) {
            let connectorDetail = this.section.getFalseDimensions();
            connectorDetail.name = tenthDetail;
            connectorDetail.width = this.section.constants.partition;
            connectorDetail.amount = (this.section.values.frontOpening === frontOpeningType1) ? numberConnectors1 : numberConnectors2;
            section.details[tenthDetail] = connectorDetail
         }
         if (this.section.values.shelves > 0) {
            section.details[fifthDetail] = this.section.getShelvesDimensions();
            furnitures[SHELF_HOLDER] = Object.assign({}, furniture[SHELF_HOLDER]);
            (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionUpperType3) 
               ? furnitures[SHELF_HOLDER].value = this.section.values[fifthDetail] * numbershelfHolderDrill1 
               : furnitures[SHELF_HOLDER].value = this.section.values[fifthDetail] * numbershelfHolderDrill2;
               services[serviceItem11].value += furnitures.shelfHolder.value;
         }
         if (this.section.values.drawers > 0) {
            let drawersDetails = this.section.getDrawersDimensions();
            let drawersLenght = (this.section.values.drawersType !== drawerType4) 
               ? Math.round(drawersDetails[drawerFirstDetail].height / drawerScale) * drawerScale
               : Math.round(drawersDetails[drawerThirdDetail].height / drawerScale) * drawerScale
            let drawersName = opening + this.section.values.drawersType + '_' + drawersLenght
            let code = (this.section.values.drawersType !== drawerType4) 
               ? drawers[this.section.values.drawersType][opening][drawersLenght]
               : '' 
            furnitures[drawersName] = new FurnitureItem(drawersName, code, drawers[this.section.values.drawersType].manufacturer)
            furnitures[drawersName].value = this.section.values.drawers
            furnitures[drawersName].drawer = true
            for (let key in drawersDetails) {
                  section.details[key] = drawersDetails[key];    
            }
            if (this.section.values.drawersType === drawerType2 || this.section.values.drawersType === drawerType3) {
                     services[serviceItem11].value += this.section.values.drawers * numberHiddenBoxDrill;
                     furnitures[CONFIRMATS].value += this.section.values.drawers * numberConfirmatsHiddenBox;
                  } else if (this.section.values.drawersType === drawerType1) {
                     services[serviceItem11].value += this.section.values.drawers * numberTelescopicBoxDrill;
                     furnitures[CONFIRMATS].value += this.section.values.drawers * numberConfirmatsTelescopicBox;
                  } else {
                     services[serviceItem11].value += this.section.values.drawers * numberTandemBoxDrill;
                  }
         }
         if (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionUpperType3) {
            section.details[seventhDetail] = this.section.getFalseDimensions();
            services[serviceItem11].value += numberFalseDrill;
            furnitures[CONFIRMATS].value += numberConfirmatsFalse;
         }
         if (this.section.values.sectionType === sectionBottomType3) {
            let connectorDetail = this.section.getSectionDimensions()[fourthDetail];
            let height = this.section.values.sectionDepth - (this.section.prevDepth - this.section.constants.indentFrontBody) 
            - this.section.constants.materialWidth;
            connectorDetail.name = tenthDetail;
            connectorDetail.height = height
            connectorDetail.amount = 1;
            section.details[tenthDetail] = connectorDetail
            connectorDetail = this.section.getSectionDimensions()[fourthDetail];
            connectorDetail.name = ninthDetail;
            connectorDetail.height = height
               connectorDetail.amount = 1;
            connectorDetail.edge.bottom = 1;
            section.details[ninthDetail] = connectorDetail
            services[serviceItem11].value += numberCornerBotDrill;
            furnitures[CONFIRMATS].value += numberConfirmatsCornerBot;
         }
         if (this.section.values.sectionType === sectionBottomType4) {
            section.details[eighthDetail] = this.section.getCupboardPlinth();
            services[serviceItem7].value += this.section.values.kitchenHeight * 2 / scale
            if (this.section.checkboxes.oven || this.section.checkboxes.fridge) {
               furnitures[LATTICE] = Object.assign({}, furniture[LATTICE]);
               furnitures[LATTICE].value = 1
               services[serviceItem8].value += latticeMillLenght;
            }
         }
      }
      if (this.section.checkboxes.backlight) {
         furnitures[LED_PROFILE] = Object.assign({}, furniture[LED_PROFILE])
         furnitures[LED_DIFFUSER] = Object.assign({}, furniture[LED_DIFFUSER])
         furnitures[LED_STRIP] = Object.assign({}, furniture[LED_STRIP])
         furnitures[POWER_UNIT] = Object.assign({}, furniture[POWER_UNIT])
         furnitures[SWITCH] = Object.assign({}, furniture[SWITCH])
         furnitures[LED_PROFILE].value = length
         furnitures[LED_DIFFUSER].value = length
         furnitures[LED_STRIP].value = length
         furnitures[POWER_UNIT].value = 1
         furnitures[SWITCH].value = 1
         services[serviceItem7].value += length * 6;
         services[serviceItem9].value += 2
      }
      if (this.section.values.level !== levelType1) {
         hooks = 2
         furnitures[HOOKS_RIGHT] = Object.assign({}, furniture[HOOKS_RIGHT]);
         furnitures[HOOKS_LEFT] = Object.assign({}, furniture[HOOKS_LEFT]);
         furnitures[HOOKS_RIGHT_CUP] = Object.assign({}, furniture[HOOKS_RIGHT_CUP]);
         furnitures[HOOKS_LEFT_CUP] = Object.assign({}, furniture[HOOKS_LEFT_CUP]);
         furnitures[HOOKS_RIGHT].value = hooks / 2;
         furnitures[HOOKS_LEFT].value = hooks / 2;
         furnitures[HOOKS_RIGHT_CUP].value = hooks / 2;
         furnitures[HOOKS_LEFT_CUP].value = hooks / 2;
         services[serviceItem9].value += hooks

         furnitures[RAIL] = Object.assign({}, furniture[RAIL]);
         furnitures[RAIL].value = length;
         (this.section.values.level === levelType2)
            ? services[serviceItem7].value += ((this.section.values.sectionUpHeight * 2 + this.section.values.sectionWidth)) / scale
            : services[serviceItem7].value += ((this.section.values.heightMezzanineSection * 2)) / scale
      }
      if (this.section.values.sectionType === sectionUpperType2) {
         if (this.section.values.level === levelType2) {
            services[serviceItem8].value += hoodMillLenght + (this.section.values.shelves + 1) * hoodShelvesMillLenght
            services[serviceItem17].value += 4
         } else {
            services[serviceItem8].value += (this.section.values.shelves + 2) * hoodShelvesMillLenght
         }
      }
      
      if (this.section.values.level === levelType1) {
         let plinth = this.section.getPlinthDimensions();
         for (let key in plinth) {
            if (Object.keys(plinth[key]).length && plinth[key].height !== 0) section.plinth[key] = plinth[key]
         }
         let tabletop = this.section.getTabletopDimension();
         for (let key in tabletop) {
            if (Object.keys(tabletop[key]).length && tabletop[key].height !== 0) section.tabletops[key] = tabletop[key];
         }
      }
      
      let plinthSeal = 0;
      for (let key in section.plinth) {
         if (Object.keys(section.plinth[key]).length) plinthSeal += section.plinth[key].height / scale
      }
      if (Object.keys(section.details[eighthDetail]).length) plinthSeal += section.details[eighthDetail].height / scale
      if (plinthSeal > 0) {
         furnitures[PLINTH_SEAL] = Object.assign({}, furniture[PLINTH_SEAL]);
         furnitures[PLINTH_SEAL].value = plinthSeal
      }
      if (this.section.checkboxes.hob) services[serviceItem10].value += hobMillLenght;
      if (this.section.values.frontOpening === frontOpeningType4) {
         services[serviceItem9].value += numberGolaMillMin;
         services[serviceItem17].value += (this.section.values.sectionType === sectionBottomType4) ? numberGolaMillMin * 2 : numberGolaMillMin;
         furnitures[GOLA_L] = Object.assign({}, furniture[GOLA_L]);
         furnitures[GOLA_L].value = length;
      }
      if (this.section.values.frontOpening === frontOpeningType4 && this.section.values.drawers > 0) {
         services[serviceItem9].value += numberGolaMillMin * (this.section.values.drawers - 1);
         services[serviceItem17].value += numberGolaMillMin * (this.section.values.drawers - 1) * 2;
         furnitures[GOLA_C] = Object.assign({}, furniture[GOLA_C]);
         furnitures[GOLA_C].value = length * (this.section.values.drawers - 1);
      }
      if (this.section.checkboxes.dishwasher) {
         services[serviceItem8].value += length + dishHeightMillLenght
         numberHinges = 0;
         legs = 0
         furnitures[LEGS].value = legs;
         services[serviceItem9].value = 0;
         services[serviceItem17].value = 0;
      }
      services[serviceItem12].value = numberHinges
      if (this.section.checkboxes.kargo) {
         furnitures[KARGO] = Object.assign({}, furniture[KARGO]);
         furnitures[KARGO].value = 1
      }
      if (this.section.checkboxes.sink) {
         furnitures[SINK] = Object.assign({}, furniture[SINK]);
         furnitures[SINK].value = 1
         services[serviceItem10].value += sinkMillLenght;
      }
      if (this.section.checkboxes.dish) {
         furnitures[DISH] = Object.assign({}, furniture[DISH]);
         furnitures[DISH].value = 1
      }
      if (this.section.values.frontOpening === frontOpeningType1) {
         let divider = (this.section.values.liftType === liftType3) ? 2 : 1
         furnitures[HANDLE] = Object.assign({}, furniture[HANDLE]);
         furnitures[HANDLE].value = numberFront / divider
         let drill = numberFront * 2 / divider
         furnitures[SCREW_40] = Object.assign({}, furniture[SCREW_40]);
         furnitures[SCREW_40].value = drill
         services[serviceItem11].value += drill;
      }
      if (this.section.values.frontOpening === frontOpeningType2) {
         push = numberFront - this.section.values.drawers
         furnitures[PUSH] = Object.assign({}, furniture[PUSH]);
         furnitures[PUSH_BAR] = Object.assign({}, furniture[PUSH_BAR]);
         furnitures[PUSH].value = push;
         furnitures[PUSH_BAR].value = push;
      }
      if (this.section.values.frontOpening === frontOpeningType5 && this.section.values.sectionType === sectionUpperType3) {
         const cut = (this.section.values.sectionWidth - (this.section.values.neighboringSectionWidth - 
            this.section.constants.indentUpFalseBack + this.section.constants.indentUpFalseFront) - 
            this.section.constants.materialWidth + this.section.constants.shorterBottom) / scale;
         (cut > minCut)
            ? services[serviceItem8].value += cut
            : services[serviceItem9].value += 1
      }
      if (this.section.values.sectionType === sectionBottomType2 || this.section.values.sectionType === sectionBottomType3) {
         furnitures[TABLETOP_CONNECTOR] = Object.assign({}, furniture[TABLETOP_CONNECTOR]);
         furnitures[TABLETOP_CONNECTOR].value = 3;
         services[serviceItem6].value = 1;
      }
      let kargo = (this.section.checkboxes.kargo) ? 1 : 0
      let clips = legs / 2
      let selfTapping15 = numberHinges * numberSelfTapping15Hinge + this.section.values.drawers * numberSelfTapping15Drawer + 
      kargo * numberSelfTapping15Kargo + legs * numberSelfTapping15Legs + clips * numberSelfTapping15Clips + 
      push * numberSelfTapping15Push + numberLift * numberSelfTapping15Lift
      if (selfTapping15 > 0) {
         furnitures[SELF_TAPPING_15] = Object.assign({}, furniture[SELF_TAPPING_15]);
         furnitures[SELF_TAPPING_15].value = selfTapping15
      }
      let selfTapping30 = this.section.values.drawers * numberSelfTapping30Drawer + hooks * numberSelfTapping30Hook + numberSelfTapping30JoinSection
      if (selfTapping30 > 0) {
         furnitures[SELF_TAPPING_30] = Object.assign({}, furniture[SELF_TAPPING_30]);
         furnitures[SELF_TAPPING_30].value = selfTapping30
      }

      if (absorber > 0) {
         furnitures[ABSORBER] = Object.assign({}, furniture[ABSORBER]);
         furnitures[ABSORBER].value = absorber
      }

      let sectionDvps = this.section.getDvpDimension();
      for (let key in sectionDvps) {
         section.dvps[key] = sectionDvps[key]
      }
      console.log(section)
      return section
   }
}