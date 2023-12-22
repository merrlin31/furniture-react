import { drawers, furniture, FurnitureItem, furnitureItem1, furnitureItem10, furnitureItem11, furnitureItem13, furnitureItem14, 
   furnitureItem16, furnitureItem17, furnitureItem18, furnitureItem19, furnitureItem2, furnitureItem20, 
   furnitureItem23, furnitureItem24, furnitureItem25, furnitureItem26, furnitureItem27, furnitureItem28, 
   furnitureItem29, furnitureItem3, furnitureItem30, furnitureItem31, furnitureItem32, furnitureItem33, 
   furnitureItem34, furnitureItem4, furnitureItem5, furnitureItem6, furnitureItem7, furnitureItem8, furnitureItem9, hinges } from "./furniture";
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
   numberSelfTapping30Hook } from "./description";
import { allService, serviceItem10, serviceItem11, serviceItem12, serviceItem6, serviceItem7, serviceItem8, serviceItem9 } from "./services";

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
      let length = this.section.sectionWidth / scale
      let numberHinges = 0
      let opening = (this.section.frontOpening === frontOpeningType2) ? openingType1 : openingType2
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
      
      if (this.section.level === levelType1) {
         furnitures[furnitureItem4] = Object.assign({}, furniture[furnitureItem4])
         legs = (this.section.sectionWidth <= 600) ? legsAmount1 : legsAmount2;
         furnitures[furnitureItem4].value = legs
         furnitures[furnitureItem5] = Object.assign({}, furniture[furnitureItem5])
         furnitures[furnitureItem5].value = legs / 2
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
            switch(this.section.sectionType) {
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
            if (this.section.sectionType === sectionBottomType3) {
               let numberHingesNameSecond = opening + hingesType5
               let manufacturer = (this.section.frontOpening === frontOpeningType2) ? furnitureManufacturer1 : furnitureManufacturer2
               furnitures[numberHingesNameSecond] = new FurnitureItem(numberHingesNameSecond, hinges[opening][hingesType5], manufacturer, 1, numberHinges)
               numberHinges *= hingesAmount
            }
         } else {
            absorber = (this.section.frontOpening === frontOpeningType2) ? 0 : 1
            opening = (this.section.frontOpening === frontOpeningType2) ? openingType1 : openingType3
            numberLift = 1
            numberHinges = sectionFronts.numberHinges
            if (this.section.liftType === liftType1) {
               numberLift = 2
               let code = (this.section.frontOpening === frontOpeningType2) ? hinges[opening][hingesType4] : hinges[opening][hingesType4]
               numberHingesName = opening + hingesType4
               furnitures[numberHingesName] = new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges / numberFront)
               if (numberFront > 1) {
                  numberHingesName = opening + hingesType6
                  code = (this.section.frontOpening === frontOpeningType2) ? hinges[opening][hingesType6] : hinges[opening][hingesType6]
                  furnitures[numberHingesName] = new FurnitureItem(numberHingesName, code, furnitureManufacturer2, 1, numberHinges - numberHinges / numberFront)
               } 

            } else if (this.section.liftType === liftType2) {
               numberLift = 1
               services[serviceItem11].value += numberLiftDrill;
            } else if (this.section.liftType === liftType3) {
               numberLift = 1 / 2
               services[serviceItem11].value += numberLiftDrill;
            }
            
            furnitures[furnitureItem31] = Object.assign({}, furniture[furnitureItem31])
            furnitures[furnitureItem31].value = numberFront * numberLift
            furnitures[furnitureItem31].manufacturer = (this.section.liftType === liftType1) ? furnitureManufacturer2 : furnitureManufacturer3
         }   
         services[serviceItem11].value += sectionFronts.numberHinges * 2
      }
      if (this.section.checkboxes.visibleSide) {
         section.details[sixthDetail] = this.section.getVisibleSideDimensions();
      }
      if (!this.section.checkboxes.dishwasher) {
         let sectionDetails = this.section.getSectionDimensions()
         furnitures[furnitureItem16] = Object.assign({}, furniture[furnitureItem16])
         furnitures[furnitureItem16].value = 0
         for (let key in sectionDetails) {
            section.details[key] = sectionDetails[key];
            services[serviceItem11].value += numberConfirmatsDetail * 2;
            furnitures[furnitureItem16].value += numberConfirmatsDetail;
         }
         if (this.section.sectionType === sectionBottomType1 || this.section.sectionType === sectionBottomType2) {
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
         if (this.section.sectionType === sectionBottomType2) {
            let connectorDetail = this.section.getFalseDimensions();
            connectorDetail.name = tenthDetail;
            connectorDetail.width = this.section.constants.partition;
            connectorDetail.amount = (this.section.frontOpening === frontOpeningType1) ? numberConnectors1 : numberConnectors2;
            section.details[tenthDetail] = connectorDetail
         }
         if (this.section.shelves > 0) {
            section.details[fifthDetail] = this.section.getShelvesDimensions();
            furnitures[furnitureItem17] = Object.assign({}, furniture[furnitureItem17]);
            (this.section.sectionType === sectionBottomType2 || this.section.sectionType === sectionUpperType3) 
               ? furnitures[furnitureItem17].value = this.section[fifthDetail] * numbershelfHolderDrill1 
               : furnitures[furnitureItem17].value = this.section[fifthDetail] * numbershelfHolderDrill2;
               services[serviceItem11].value += furnitures.shelfHolder.value;
         }
         if (this.section.drawers > 0) {
            let drawersDetails = this.section.getDrawersDimensions();
            let drawersLenght = (this.section.drawersType !== drawerType4) 
               ? Math.round(drawersDetails[drawerFirstDetail].height / drawerScale) * drawerScale
               : Math.round(drawersDetails[drawerThirdDetail].height / drawerScale) * drawerScale
            let drawersName = opening + this.section.drawersType + '_' + drawersLenght
            let code = (this.section.drawersType !== drawerType4) 
               ? drawers[this.section.drawersType][opening][drawersLenght]
               : '' 
            furnitures[drawersName] = new FurnitureItem(drawersName, code, drawers[this.section.drawersType].manufacturer)
            furnitures[drawersName].value = this.section.drawers
            furnitures[drawersName].drawer = true
            for (let key in drawersDetails) {
                  section.details[key] = drawersDetails[key];    
            }
            if (this.section.drawersType === drawerType2 || this.section.drawersType === drawerType3) {
                     services[serviceItem11].value += this.section.drawers * numberHiddenBoxDrill;
                     furnitures[furnitureItem16].value += this.section.drawers * numberConfirmatsHiddenBox;
                  } else if (this.section.drawersType === drawerType1) {
                     services[serviceItem11].value += this.section.drawers * numberTelescopicBoxDrill;
                     furnitures[furnitureItem16].value += this.section.drawers * numberConfirmatsTelescopicBox;
                  } else {
                     services[serviceItem11].value += this.section.drawers * numberTandemBoxDrill;
                  }
         }
         if (this.section.sectionType === sectionBottomType2 || this.section.sectionType === sectionUpperType3) {
            section.details[seventhDetail] = this.section.getFalseDimensions();
            services[serviceItem11].value += numberFalseDrill;
            furnitures[furnitureItem16].value += numberConfirmatsFalse;
         }
         if (this.section.sectionType === sectionBottomType3) {
            let connectorDetail = this.section.getSectionDimensions()[fourthDetail];
            connectorDetail.name = tenthDetail;
            connectorDetail.height = this.section.sectionDepth - (this.section.prevDepth - this.section.constants.indentFrontBody) 
               - this.section.constants.materialWidth;
            connectorDetail.amount = 1;
            section.details[tenthDetail] = connectorDetail
            connectorDetail = this.section.getSectionDimensions()[fourthDetail];
            connectorDetail.name = ninthDetail;
            connectorDetail.height = this.section.sectionDepth - (this.section.prevDepth - this.section.constants.indentFrontBody) 
               - this.section.constants.materialWidth;
               connectorDetail.amount = 1;
            connectorDetail.edge.bottom = 1;
            section.details[ninthDetail] = connectorDetail
            services[serviceItem11].value += numberCornerBotDrill;
            furnitures[furnitureItem16].value += numberConfirmatsCornerBot;
         }
         if (this.section.sectionType === sectionBottomType4) {
            section.details[eighthDetail] = this.section.getCupboardPlinth();
            services[serviceItem7].value += this.section.kitchenHeight * 2 / scale
            if (this.section.checkboxes.oven || this.section.checkboxes.fridge) {
               furnitures[furnitureItem13] = Object.assign({}, furniture[furnitureItem13]);
               furnitures[furnitureItem13].value = 1
               services[serviceItem8].value += latticeMillLenght;
            }
         }
      }
      if (this.section.checkboxes.backlight) {
         furnitures[furnitureItem23] = Object.assign({}, furniture[furnitureItem23])
         furnitures[furnitureItem24] = Object.assign({}, furniture[furnitureItem24])
         furnitures[furnitureItem25] = Object.assign({}, furniture[furnitureItem25])
         furnitures[furnitureItem26] = Object.assign({}, furniture[furnitureItem26])
         furnitures[furnitureItem27] = Object.assign({}, furniture[furnitureItem27])
         furnitures[furnitureItem23].value = length
         furnitures[furnitureItem24].value = length
         furnitures[furnitureItem25].value = length
         furnitures[furnitureItem26].value = 1
         furnitures[furnitureItem27].value = 1
         services[serviceItem7].value += length * 6;
      }
      if (this.section.level !== levelType1) {
         hooks = 2
         furnitures[furnitureItem9] = Object.assign({}, furniture[furnitureItem9]);
         furnitures[furnitureItem10] = Object.assign({}, furniture[furnitureItem10]);
         furnitures[furnitureItem33] = Object.assign({}, furniture[furnitureItem33]);
         furnitures[furnitureItem34] = Object.assign({}, furniture[furnitureItem34]);
         furnitures[furnitureItem9].value = hooks / 2;
         furnitures[furnitureItem10].value = hooks / 2;
         furnitures[furnitureItem33].value = hooks / 2;
         furnitures[furnitureItem34].value = hooks / 2;

         furnitures[furnitureItem11] = Object.assign({}, furniture[furnitureItem11]);
         furnitures[furnitureItem11].value = length;
         (this.section.level === levelType2)
            ? services[serviceItem7].value += ((this.section.sectionUpHeight * 2 + this.section.sectionWidth)) / scale
            : services[serviceItem7].value += ((this.section.heightMezzanineSection * 2)) / scale
      }
      if (this.section.sectionType === sectionUpperType2) {
         (this.section.level === levelType2) 
            ? services[serviceItem8].value += hoodMillLenght + (this.section.shelves + 1) * hoodShelvesMillLenght
            : services[serviceItem8].value += (this.section.shelves + 2) * hoodShelvesMillLenght
      }
      if (this.section.checkboxes.dishwasher) {
         services[serviceItem8].value += length + dishHeightMillLenght
         numberHinges = 0;
         legs = 0
         furnitures[furnitureItem4].value = legs;
         services[serviceItem9].value = 0;
      }
      services[serviceItem12].value = numberHinges
      
      if (this.section.level === levelType1) {
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
         furnitures[furnitureItem8] = Object.assign({}, furniture[furnitureItem8]);
         furnitures[furnitureItem8].value = plinthSeal
      }
      if (this.section.checkboxes.hob) services[serviceItem10].value += hobMillLenght;
      if (this.section.frontOpening === frontOpeningType4) {
         services[serviceItem9].value = (this.section.drawers > 0) ? this.section.drawers * numberGolaMillMin : numberGolaMillMin;
         furnitures[furnitureItem29] = Object.assign({}, furniture[furnitureItem29]);
         furnitures[furnitureItem29].value = length;
      }
      if (this.section.frontOpening === frontOpeningType4 && this.section.drawers > 0) {
         furnitures[furnitureItem30] = Object.assign({}, furniture[furnitureItem30]);
         furnitures[furnitureItem30].value = length * (this.section.drawers - 1);
      }
      if (this.section.checkboxes.kargo) {
         furnitures[furnitureItem1] = Object.assign({}, furniture[furnitureItem1]);
         furnitures[furnitureItem1].value = 1
      }
      if (this.section.checkboxes.sink) {
         furnitures[furnitureItem2] = Object.assign({}, furniture[furnitureItem2]);
         furnitures[furnitureItem2].value = 1
         services[serviceItem10].value += sinkMillLenght;
      }
      if (this.section.checkboxes.dish) {
         furnitures[furnitureItem3] = Object.assign({}, furniture[furnitureItem3]);
         furnitures[furnitureItem3].value = 1
      }
      if (this.section.frontOpening === frontOpeningType1) {
         let divider = (this.section.liftType === liftType3) ? 2 : 1
         furnitures[furnitureItem28] = Object.assign({}, furniture[furnitureItem28]);
         furnitures[furnitureItem28].value = numberFront / divider
         let drill = numberFront * 2 / divider
         furnitures[furnitureItem20] = Object.assign({}, furniture[furnitureItem20]);
         furnitures[furnitureItem20].value = drill
         services[serviceItem11].value += drill;
      }
      if (this.section.frontOpening === frontOpeningType2) {
         push = numberFront - this.section.drawers
         furnitures[furnitureItem6] = Object.assign({}, furniture[furnitureItem6]);
         furnitures[furnitureItem7] = Object.assign({}, furniture[furnitureItem7]);
         furnitures[furnitureItem6].value = push;
         furnitures[furnitureItem7].value = push;
      }
      if (this.section.sectionType === sectionBottomType2 || this.section.sectionType === sectionBottomType3) {
         furnitures[furnitureItem32] = Object.assign({}, furniture[furnitureItem32]);
         furnitures[furnitureItem32].value = 3;
         services[serviceItem6].value = 1;
      }
      let kargo = (this.section.checkboxes.kargo) ? 1 : 0
      let clips = legs / 2
      let selfTapping15 = numberHinges * numberSelfTapping15Hinge + this.section.drawers * numberSelfTapping15Drawer + 
      kargo * numberSelfTapping15Kargo + legs * numberSelfTapping15Legs + clips * numberSelfTapping15Clips + 
      push * numberSelfTapping15Push + numberLift * numberSelfTapping15Lift
      if (selfTapping15 > 0) {
         furnitures[furnitureItem18] = Object.assign({}, furniture[furnitureItem18]);
         furnitures[furnitureItem18].value = selfTapping15
      }
      let selfTapping30 = this.section.drawers * numberSelfTapping30Drawer + hooks * numberSelfTapping30Hook + numberSelfTapping30JoinSection
      if (selfTapping30 > 0) {
         furnitures[furnitureItem19] = Object.assign({}, furniture[furnitureItem19]);
         furnitures[furnitureItem19].value = selfTapping30
      }

      if (absorber > 0) {
         furnitures[furnitureItem14] = Object.assign({}, furniture[furnitureItem14]);
         furnitures[furnitureItem14].value = absorber
      }

      let sectionDvps = this.section.getDvpDimension();
      for (let key in sectionDvps) {
         section.dvps[key] = sectionDvps[key]
      }
      console.log(section)
      return section
   }
}