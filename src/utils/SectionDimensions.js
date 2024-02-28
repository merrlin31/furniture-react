import { CreateSection } from "./CreateSection";
import { Detail } from "./Detail";
import { boldEdge, drawerFirstDetail, drawerSecondDetail, drawerThirdDetail, 
   drawerType1, drawerType2, drawerType3, drawerType4, eighthDetail, fifthDetail, 
   firstDetail, firstDvp, firstFront, firstPlinthDetail, firstTabletopDetail, fourthDetail, frontMaxWidth, 
   frontMaxWidthFridge, frontOpeningType1, frontOpeningType3, frontOpeningType4, frontOpeningType5, levelType1, 
   levelType2, levelType3, materialType1, materialType3, materialType4, maxSectionDepth, secondDetail, 
   secondDvp, secondFront, secondPlinthDetail, secondTabletopDetail, sectionBottomType1, sectionBottomType2, sectionBottomType3, 
   sectionBottomType4, sectionUpperType1, sectionUpperType2, sectionUpperType3, seventhDetail, sideType1, 
   sideType2, sideType3, sixthDetail, tandemHeight1, tandemHeight2, tandemHeight3, tandemLenghtIndent, 
   tandemWidthIndent, thinEdge, thirdDetail, thirdPlinthDetail, thirdTabletopDetail, withoutEdge } from "./description";

export class SectionDimensions {
   constructor(values, checkboxes, constants, prevDepth, sectionId) {
      this.values = values
      this.values.body = +values.body;
      this.values.front = +values.front;
      this.values.dvp = +values.materialDvp;
      this.values.tabletop = +values.materialTabletop;
      this.values.kitchenHeight = +values.heightKitchen;
      this.values.sectionHeight = values.heightDownSection - values.tabletopThickness - values.plinth;
      this.values.heightMezzanineSection = +values.heightMezzanineSection;
      this.values.sectionUpHeight = +values.heightUpSection;
      this.values.sectionWidth = +values.width;
      this.values.sectionDepth = +values.depth;
      this.values.neighboringSectionWidth = +values.neighboringWidth;
      this.values.plinth = +values.plinth
      this.values.sectionType = values.sectionType;
      this.values.side = values.side;
      this.values.material = values.frontMaterial;
      this.values.level = values.level;
      this.values.frontAmount = +values.frontAmount;
      this.values.shelves = +values.shelves;
      this.values.drawers = +values.drawers;
      this.values.drawersType = values.drawersType
      this.values.frontOpening = values.frontOpening;
      this.values.liftType = values.liftType;
      this.prevDepth = +prevDepth
      this.checkboxes = checkboxes;
      this.constants = constants;
      this.sectionId = sectionId;
   }
   getSectionDimensions() {
      let washEdge = (this.checkboxes.sink) ? thinEdge : withoutEdge;
      let oven = this.checkboxes.oven ? this.values.sectionDepth - this.constants.indentTabletop : this.constants.partition;
      let amount = 1;
      let details

      switch(this.values.level) {
         case levelType1:
            switch(this.values.sectionType) {
               case sectionBottomType1:
                  details = this.getBotType1Dimensions(washEdge, amount, oven)
               break
               case sectionBottomType2:
                  details = this.getBotType2Dimensions(washEdge, amount)
               break
               case sectionBottomType3:
                  details = this.getBotType3Dimensions(washEdge, amount)
               break
               default:
                  details = this.getBotType4Dimensions(amount)
               break
            }
         break
         case levelType2:
            switch(this.values.sectionType) {
               case sectionUpperType1:
                  details = this.getUpType1Dimensions(amount)
               break
               case sectionUpperType2:
                  details = this.getUpType2Dimensions(amount)
               break
               case sectionUpperType3:
                  details = this.getUpType3Dimensions(amount)
               break
               default:
                  details = this.getUpType4Dimensions(amount)
               break
            }
         break
         default:
            switch(this.values.sectionType) {
               case sectionUpperType1:
                  details = this.getMezType1Dimensions(washEdge, amount)
               break
               case sectionUpperType2:
                  details = this.getMezType2Dimensions(washEdge, amount)
               break
               case sectionUpperType3:
                  details = this.getMezType3Dimensions(washEdge, amount)
               break
               default:
                  details = this.getMezType4Dimensions(amount)
               break
            }
         break
      }
      return details
   }
   getShelvesDimensions() {
      let washEdge = (this.checkboxes.sink) ? thinEdge : withoutEdge;
      let numberShelves = +this.values.shelves;
      if (this.checkboxes.oven) ++numberShelves;
      if (this.checkboxes.microwave) ++numberShelves;
      let edge = [thinEdge, washEdge, washEdge, washEdge]
      let detailHeight = this.values.sectionWidth - this.constants.materialWidth * 2
      let detailWidth = this.values.sectionDepth - this.constants.indentTabletop - this.constants.indentShelve
      if (this.values.sectionType === sectionBottomType2) {
         detailHeight -= this.constants.indentWall
         detailWidth = this.values.sectionDepth - this.constants.indentTabletop - this.constants.indentCornerSection
      }
      if (this.values.sectionType === sectionBottomType3) {
         detailHeight -= (this.constants.indentTabletop + this.constants.indentFrontBody)
         detailWidth = this.prevDepth - this.constants.indentTabletop - this.constants.indentShelve
      }
      if (this.values.level !== levelType1) {
         detailWidth = (this.values.sectionType === sectionUpperType3) 
            ? this.values.sectionDepth - this.constants.indentCornerSection - this.constants.indentBackside
            : this.values.sectionDepth - this.constants.indentShelve - this.constants.indentBackside
      }

      return new Detail(fifthDetail, (detailHeight), (detailWidth), numberShelves, edge, this.values.body)

   }
   getDrawersDimensions() {
      let indentLenth, indentGuide, indentWidth, indentBottom, edge
      let detail = []
      let drawerLenghtRounding = 50
      let drawerHeightRounding = 0.65
      switch(this.values.drawersType) {
         case drawerType1:
            indentLenth = 5;
            indentGuide = 0;
            indentWidth = +(this.constants.materialWidth * 2 + 26);
            indentBottom = 0;
            break
         case drawerType2:
            indentLenth = 3;
            indentGuide = 10;
            indentWidth = 50;
            indentBottom = 12;
            break
         case drawerType3:
            indentLenth = 13;
            indentGuide = 0;
            indentWidth = 46;
            indentBottom = 12;
            break
         default:
            indentLenth = 0;
            indentGuide = 0;
            indentWidth = 87;
            indentBottom = 0;
            break
      }
      
      let sideHeight = Math.floor((this.values.sectionDepth - this.constants.indentTabletop - indentLenth) / drawerLenghtRounding) * drawerLenghtRounding - indentGuide
      let backHeight = this.values.sectionWidth - this.constants.materialWidth * 2 - indentWidth
      if (this.values.drawersType === drawerType4) {
         edge = [thinEdge, thinEdge, thinEdge, thinEdge];
         let widthDetailSide = (!this.checkboxes.oven) 
         ? (this.values.drawers > 0 && this.values.drawers < 4)
            ? tandemHeight1
            : tandemHeight2
         : tandemHeight3;
         detail.push(new Detail(drawerSecondDetail, backHeight, widthDetailSide, this.values.drawers, edge, this.values.body))
         detail.push(new Detail(drawerThirdDetail, (sideHeight - tandemLenghtIndent), +(backHeight + tandemWidthIndent), this.values.drawers, edge, this.values.body))
      } else {
         let widthDetailSide = (!this.checkboxes.oven) 
         ? Math.round((this.values.sectionHeight - this.constants.materialWidth) / this.values.drawers * drawerHeightRounding) 
         : this.constants.ovenDrawer;
         detail.push(new Detail(drawerFirstDetail, sideHeight, widthDetailSide, (this.values.drawers * 2), [thinEdge, thinEdge, withoutEdge, thinEdge], this.values.body))
         detail.push(new Detail(drawerSecondDetail, backHeight, (widthDetailSide - indentBottom), (this.values.drawers * 2), 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.values.body))
         detail.push(new Detail(drawerThirdDetail, (sideHeight - this.constants.materialWidth * 2), backHeight, this.values.drawers, 
            [withoutEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body))
      }   
      return detail
   }
   getVisibleSideDimensions() {
      let plinth = +this.values.plinth
      let amount = 1
      return new Detail(sixthDetail, (this.values.sectionHeight + plinth), this.values.sectionDepth, amount, [boldEdge, thinEdge, thinEdge, thinEdge], this.values.body)
   }
   getFalseDimensions() {
      let detail;
      let amount = 1
      let edge = [thinEdge, thinEdge, thinEdge, withoutEdge]
      let heightDetail = (this.values.level === levelType2) ? this.values.sectionUpHeight : this.values.heightMezzanineSection
      if (this.values.sectionType === sectionBottomType2) {
         detail = new Detail(seventhDetail, this.values.sectionHeight, (this.values.neighboringSectionWidth - this.constants.indentTabletop - 
            this.constants.indentBotFalseBack + this.constants.indentBotFalseFront), amount, edge, this.values.body) 
      } else if (this.values.sectionType === sectionUpperType3) {
         detail = new Detail(seventhDetail, heightDetail, (this.values.neighboringSectionWidth - 
            this.constants.indentUpFalseBack + this.constants.indentUpFalseFront), amount, edge, this.values.body) 
      } else if (this.values.sectionType === sectionBottomType3) {
         detail = new Detail(seventhDetail, this.values.sectionHeight - this.constants.materialWidth, 
            this.values.neighboringSectionWidth - this.constants.indentTabletop, amount, edge, this.values.body)
      }
      return detail
   }
   getFrontDimensions() {
      let edge = (this.values.material === materialType1) ? [boldEdge, boldEdge, boldEdge, boldEdge] : [withoutEdge, withoutEdge, withoutEdge, withoutEdge];
      let divider, numberFront, widthFront, heightFront, microwave;
      let gola = (this.values.frontOpening === frontOpeningType4) 
         ? this.constants.indentBotGola 
         : (this.values.frontOpening === frontOpeningType3) ? this.constants.indentUpGola : 0;
      let oven = (this.checkboxes.oven && this.values.sectionType !== sectionBottomType4) ? this.constants.ovenHeight : 0
      let falsePanel = (this.values.sectionType === sectionBottomType2) 
         ? (this.values.neighboringSectionWidth - this.constants.indentTabletop - this.constants.indentBotFalseBack + 
            this.constants.indentBotFalseFront) + this.constants.indentWall
         : (this.values.sectionType === sectionUpperType3) 
            ? (this.values.neighboringSectionWidth + this.constants.indentUpFalseFront) 
            : 0

      if (this.values.drawers > 0 || this.checkboxes.lift) {
         divider = 1;
      } else {
         divider = this.values.frontAmount
         if (this.values.sectionWidth - falsePanel > frontMaxWidth && !this.checkboxes.lift) divider = 2;
      }

      widthFront = (this.values.sectionWidth - falsePanel) / divider - this.constants.indentFront

      if (this.values.sectionType === sectionBottomType3) widthFront = this.values.sectionWidth - 
      (this.values.neighboringSectionWidth - this.constants.indentTabletop) - this.constants.indentTabletop + this.constants.indentFrontBody - 
      this.constants.materialWidth - this.constants.indentFront

      if (this.values.drawers > 0 ) {
         divider = this.values.drawers
      } else if (this.checkboxes.lift) {
         divider = this.values.frontAmount
      } else {
         divider = 1
      } 
      
      heightFront = (this.values.level === levelType2 || this.values.level === levelType3) 
         ? (this.values.level === levelType2)
            ? (this.values.sectionUpHeight + gola) / divider - this.constants.indentFront
            : (this.values.heightMezzanineSection + gola) / divider - this.constants.indentFront
         : Math.round((this.values.sectionHeight - this.constants.indentFront) / divider) - this.constants.indentFront - gola - oven;

      if (this.values.drawers > 0 ) {
         numberFront = this.values.drawers
      } else if (this.values.sectionType === sectionBottomType3) {
         numberFront = 1
      } else if (this.values.sectionWidth - falsePanel > frontMaxWidth && !this.checkboxes.lift) {
         numberFront = 2
      } else {
         numberFront = this.values.frontAmount
      }

      if (this.checkboxes.fridge) {
         numberFront = 2
         heightFront = (this.constants.fridgeHeight + 1.5 * this.constants.materialWidth) / numberFront - this.constants.indentFront
      }
      
      let detail = {fronts: [], numberHinges: 0}
      detail.fronts.push(new Detail(firstFront, heightFront, widthFront, numberFront, edge, this.values.front, this.values.material))
      if (this.checkboxes.withoutFront || this.checkboxes.simpleFridge) detail.fronts = []

      this.checkboxes.lift 
         ? detail.numberHinges = this.getHinges(widthFront)
         : detail.numberHinges = this.getHinges(heightFront)
      if (this.values.drawers > 0) {
         detail.numberHinges = 0
      }
      if (this.values.sectionType === sectionBottomType4) {
         oven = (this.checkboxes.oven) ? this.constants.ovenHeight : 0
         microwave = (this.checkboxes.microwave) ? this.constants.microwaveHeight : 0
         let numberSecondFront
         if (this.values.sectionWidth > frontMaxWidthFridge && !this.checkboxes.lift) {
            numberSecondFront = 2
         } else if (this.values.sectionWidth > frontMaxWidth && !this.checkboxes.lift) {
            (this.checkboxes.simpleFridge) 
               ? numberSecondFront = this.values.frontAmount
               : numberSecondFront = 2
         } else {
            numberSecondFront = this.values.frontAmount
         }
         let heightSecondFront = this.values.kitchenHeight - this.values.plinth - heightFront - this.constants.indentFront * 2 - oven - microwave;
         if (this.checkboxes.fridge) heightSecondFront = this.values.kitchenHeight - (heightFront + this.constants.indentFront) * 2 - this.values.plinth - this.constants.indentFront
         divider = (!this.checkboxes.lift) ? 1 : this.values.frontAmount
         if (this.checkboxes.simpleFridge) heightSecondFront = (this.values.kitchenHeight - this.constants.fridgeHeight) / divider - this.constants.indentFront
         divider = (this.checkboxes.lift) ? 1 : this.values.frontAmount
         if (this.checkboxes.lift) {
            divider = 1
         } else {
            divider = numberSecondFront
         }
         let widthSecondFront = (this.values.sectionWidth / divider - this.constants.indentFront);

         this.checkboxes.lift 
         ? detail.numberHinges += this.getHinges(widthSecondFront)
         : detail.numberHinges += this.getHinges(heightSecondFront)
         detail.secondFront = new Detail(secondFront, heightSecondFront, widthSecondFront, numberSecondFront, edge, this.values.front, this.values.material)
      }

      if (this.values.sectionType === sectionBottomType3) {
         let numberSecondFront = 1
         let heightSecondFront = heightFront
         let widthSecondFront = this.values.sectionDepth - this.prevDepth + this.constants.indentFrontBody - this.constants.materialWidth - this.constants.indentFront;

         detail.numberHinges += this.getHinges(heightSecondFront)
         detail.fronts.push(new Detail(secondFront, heightSecondFront, widthSecondFront, numberSecondFront, edge, this.values.front, this.values.material))
      }
      if (this.checkboxes.withoutFront) {
         detail.numberHinges = 0
         detail.fronts = []
      }
      return detail;
   }
   getPlinthDimensions() {
      let detail = [];
      let cornerIndent = (this.values.sectionType === sectionBottomType2 || this.values.sectionType === sectionBottomType3) 
         ? this.values.neighboringSectionWidth - this.constants.indentFrontBody - this.constants.indentPlinth - this.constants.materialWidth 
         : 0;
      const edge = [thinEdge, thinEdge, withoutEdge, withoutEdge]
      let heightSecondPlinth = 0
      let handleIndent = 0
      let amount = 1
      if (this.values.frontOpening === frontOpeningType1) handleIndent = this.constants.materialWidth
      if (this.values.sectionType === sectionBottomType3) heightSecondPlinth = this.values.sectionDepth - this.prevDepth + this.constants.indentPlinth;
      if (this.values.sectionType === sectionBottomType2) heightSecondPlinth = this.constants.materialWidth * 2 + this.constants.indentPlinth + handleIndent;

      let heightPlinth = this.values.sectionWidth - cornerIndent;
      if (this.values.sectionType === sectionBottomType4) heightPlinth = 0;
      if (this.values.side === sideType3)  {
         detail = [new Detail(thirdPlinthDetail, heightPlinth, this.values.plinth, amount, edge, this.values.body), {}, {}]
      } else if (this.values.side === sideType1) {
         detail = [
            new Detail(firstPlinthDetail, heightPlinth, this.values.plinth, amount, edge, this.values.body), 
            new Detail(secondPlinthDetail, heightSecondPlinth, this.values.plinth, amount, edge, this.values.body), 
            {}
         ]
      } else {
         detail = [
            {},
            new Detail(secondPlinthDetail, heightPlinth, this.values.plinth, amount, edge, this.values.body),
            new Detail(thirdPlinthDetail, heightSecondPlinth, this.values.plinth, amount, edge, this.values.body)
         ]
      }
      return detail
   }
   getCupboardPlinth() {
      return new Detail(eighthDetail, (this.values.sectionWidth - this.constants.materialWidth * 2), this.values.plinth, 1, 
         [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body)
   }
   getTabletopDimension() {
      let detail = [];
      let topEdge = (this.values.sectionDepth < maxSectionDepth) ? boldEdge : withoutEdge;
      let widthTabletop = this.values.sectionDepth;
      let edge = [topEdge, boldEdge, withoutEdge, withoutEdge];
      let heightTabletop = this.values.sectionWidth;
      let handleIndent = 0
      let amount = 1
      if (this.values.sectionType === sectionBottomType4) heightTabletop = 0;
      let heightSecondTabletop = 0;
      if (this.values.frontOpening === frontOpeningType1) handleIndent = this.constants.materialWidth
      if (this.values.sectionType === sectionBottomType2) heightSecondTabletop = this.constants.materialWidth * 2 - this.constants.indentFrontBody + handleIndent;
      if (this.values.sectionType === sectionBottomType3) {
         heightSecondTabletop = this.values.sectionDepth - this.prevDepth;
         widthTabletop = this.prevDepth;
      }
      if (this.values.side === sideType1) {
         detail = [
            new Detail(firstTabletopDetail, heightTabletop, widthTabletop, amount, edge, this.values.tabletop, materialType4),
            new Detail(secondTabletopDetail, heightSecondTabletop, this.values.neighboringSectionWidth, amount, edge, this.values.tabletop, materialType4),
            {}
         ]
      } else if (this.values.side === sideType2) {
         detail = [
            {},
            new Detail(secondTabletopDetail, heightTabletop, widthTabletop, amount, edge, this.values.tabletop, materialType4),
            new Detail(thirdTabletopDetail, heightSecondTabletop, this.values.neighboringSectionWidth, amount, edge, this.values.tabletop, materialType4)
         ]
      } else {
         detail = [{}, {}, new Detail(thirdTabletopDetail, heightTabletop, widthTabletop, amount, edge, this.values.tabletop, materialType4)]
      }
      return detail
   }
   getDvpDimension() {
      let dvpHeight, dvpUpHeight, dvpWidth, dvpUpWidth;
      let amount = 1;
      let edge = [withoutEdge, withoutEdge, withoutEdge, withoutEdge]
      let detail = []
      if (this.values.level === levelType1) {
         dvpHeight = this.values.sectionHeight - this.constants.indentDvp;
         dvpWidth = this.values.sectionWidth - this.constants.indentDvp;
         if (this.values.sectionType === sectionBottomType3) {
            dvpWidth = this.values.sectionWidth - this.constants.indentTabletop + this.constants.indentFrontBody - this.constants.indentDvp
            dvpUpWidth = this.values.sectionDepth - this.prevDepth + this.constants.materialWidth - this.constants.indentDvp + this.constants.indentFrontBody
         }
         dvpUpHeight = this.values.kitchenHeight - this.values.plinth - dvpHeight - this.constants.indentDvp * 2;
         if (this.values.sectionType === sectionBottomType2) dvpWidth -= this.constants.indentWall;
         if (this.checkboxes.oven) {
            (this.values.sectionType === sectionBottomType4) 
            ? dvpUpHeight -= this.constants.ovenHeight
            : dvpHeight -= this.constants.ovenHeight;
         }
         if (this.checkboxes.microwave) dvpUpHeight -= this.constants.microwaveHeight;

         if (!(this.checkboxes.sink || this.checkboxes.dishwasher || this.checkboxes.fridge || this.checkboxes.simpleFridge)) { 
            detail.push(new Detail(firstDvp, dvpHeight, dvpWidth, amount, edge, this.values.dvp, materialType3));
         }
         if (this.checkboxes.fridge) dvpUpHeight = this.values.kitchenHeight - this.constants.fridgeHeight - this.constants.indentDvp - this.values.plinth - this.constants.materialWidth;
         if (this.checkboxes.simpleFridge) dvpUpHeight = this.values.kitchenHeight - this.constants.fridgeHeight - this.constants.indentDvp;
         if (this.values.sectionType === sectionBottomType3) {
            dvpUpHeight = dvpHeight;
            dvpWidth = dvpUpWidth;
         }
         if (this.values.sectionType === sectionBottomType4 || this.values.sectionType === sectionBottomType3) 
            detail.push(new Detail(secondDvp, dvpUpHeight, dvpWidth, amount, edge, this.values.dvp, materialType3));
      } else {
         dvpHeight = this.values.sectionUpHeight - this.constants.indentDvp
         if (this.values.level === levelType2) dvpHeight -= (this.constants.materialWidth - this.constants.dvpGrooveDepth);
         dvpWidth = this.values.sectionWidth - this.constants.materialWidth * 2 + this.constants.dvpGrooveDepth * 2 - this.constants.indentDvp;
         detail.push(new Detail(firstDvp, dvpHeight, dvpWidth, amount, edge, this.values.dvp, materialType3))
      } 

      return detail
   }
   getHinges(height) {
      let numberHinges = 0;
      if (height <= 900) {
         numberHinges = 2 * this.values.frontAmount;
      } else if (height <= 1400) {
         numberHinges = 3 * this.values.frontAmount;
      } else if (height <= 2000) {
         numberHinges = 4 * this.values.frontAmount;
      } else if (height <= 2400) {
         numberHinges = 5 * this.values.frontAmount;
      }
      return numberHinges
   }

   getBotType1Dimensions(washEdge, amount, oven) {
      return [
         new Detail(firstDetail, this.values.sectionHeight - this.constants.materialWidth, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionHeight - this.constants.materialWidth, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, oven, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getBotType2Dimensions(washEdge, amount) {
      return [
         new Detail(firstDetail, this.values.sectionHeight - this.constants.materialWidth, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionHeight - this.constants.materialWidth, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.indentWall, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2 - this.constants.indentWall, this.constants.partition, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getBotType3Dimensions(washEdge, amount) {
      return [
         new Detail(firstDetail, this.values.sectionHeight - this.constants.materialWidth, this.prevDepth - this.constants.indentTabletop, amount * 2, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionHeight - this.constants.materialWidth, this.values.neighboringSectionWidth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.indentTabletop + this.constants.indentFrontBody, 
            this.values.sectionDepth - this.constants.indentTabletop + this.constants.indentFrontBody, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2 - this.constants.indentTabletop + this.constants.indentFrontBody, 
            this.constants.partition, amount * 2, [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getBotType4Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.kitchenHeight, this.values.sectionDepth - this.constants.indentCupboard, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.kitchenHeight, this.values.sectionDepth - this.constants.indentCupboard, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }

   getUpType1Dimensions(amount) {
      let subtract = (this.values.frontOpening === frontOpeningType5) ? this.constants.shorterBottom : 0
      return [
         new Detail(firstDetail, this.values.sectionUpHeight, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionUpHeight, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - subtract, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getUpType2Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.sectionUpHeight - this.constants.indentHood, this.values.sectionDepth, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionUpHeight - this.constants.indentHood, this.values.sectionDepth, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getUpType3Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.sectionUpHeight, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionUpHeight, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getUpType4Dimensions(amount) {
      let subtract = (this.values.frontOpening === frontOpeningType5) ? this.constants.shorterBottom : 0
      return [
         new Detail(firstDetail, this.values.sectionUpHeight, this.values.sectionDepth + this.constants.indentJoinSection, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.sectionUpHeight, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - subtract, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }

   getMezType1Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getMezType2Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getMezType3Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }
   getMezType4Dimensions(amount) {
      return [
         new Detail(firstDetail, this.values.heightMezzanineSection, this.values.sectionDepth + this.constants.indentJoinSection, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(secondDetail, this.values.heightMezzanineSection, this.values.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.values.body),
         new Detail(thirdDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body),
         new Detail(fourthDetail, this.values.sectionWidth - this.constants.materialWidth * 2, this.values.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.values.body)
      ]
   }

   createSection() {
      let createSection = new CreateSection(this);
      return createSection.createDetailsDimensions();
   }
}