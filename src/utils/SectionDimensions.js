import { CreateSection } from "./CreateSection";
import { BodyDetail, Detail } from "./Detail";
import { boldEdge, drawerFirstDetail, drawerSecondDetail, drawerThirdDetail, 
   drawerType1, drawerType2, drawerType3, drawerType4, eighthDetail, fifthDetail, 
   firstDetail, firstDvp, firstFront, firstSideDetail, fourthDetail, frontMaxWidth, 
   frontMaxWidthFridge, frontOpeningType1, frontOpeningType3, frontOpeningType4, levelType1, 
   levelType2, levelType3, materialType1, materialType3, materialType4, maxSectionDepth, secondDetail, 
   secondDvp, secondFront, secondSideDetail, sectionBottomType1, sectionBottomType2, sectionBottomType3, 
   sectionBottomType4, sectionUpperType1, sectionUpperType2, sectionUpperType3, seventhDetail, sideType1, 
   sideType2, sideType3, sixthDetail, tandemHeight1, tandemHeight2, tandemHeight3, tandemLenghtIndent, 
   tandemWidthIndent, thinEdge, thirdDetail, thirdSideDetail, withoutEdge } from "./description";

export class SectionDimensions {
   constructor(values, checkboxes, constants, prevDepth, sectionId) {
      this.body = +values.body;
      this.front = +values.front;
      this.dvp = +values.materialDvp;
      this.tabletop = +values.materialTabletop;
      this.kitchenHeight = +values.heightKitchen;
      this.sectionHeight = values.heightDownSection - values.tabletopThickness - values.plinth;
      this.heightMezzanineSection = +values.heightMezzanineSection;
      this.sectionUpHeight = +values.heightUpSection;
      this.sectionWidth = +values.width;
      this.sectionDepth = +values.depth;
      this.neighboringSectionWidth = +values.neighboringWidth;
      this.plinth = +values.plinth
      this.sectionType = values.sectionType;
      this.side = values.side;
      this.material = values.frontMaterial;
      this.level = values.level;
      this.frontAmount = +values.frontAmount;
      this.shelves = +values.shelves;
      this.drawers = +values.drawers;
      this.drawersType = values.drawersType
      this.frontOpening = values.frontOpening;
      this.liftType = values.liftType;
      this.prevDepth = +prevDepth
      this.checkboxes = checkboxes;
      this.constants = constants;
      this.sectionId = sectionId;
   }
   getSectionDimensions() {
      let washEdge = (this.checkboxes.sink) ? thinEdge : withoutEdge;
      let oven = this.checkboxes.oven ? this.sectionDepth - this.constants.indentTabletop : this.constants.partition;
      let amount = 1;
      let details

      switch(this.level) {
         case levelType1:
            switch(this.sectionType) {
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
            switch(this.sectionType) {
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
            switch(this.sectionType) {
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
      let numberShelves = +this.shelves;
      if (this.checkboxes.oven) ++numberShelves;
      if (this.checkboxes.microwave) ++numberShelves;
      let edge = [thinEdge, washEdge, washEdge, washEdge]
      let detailHeight = this.sectionWidth - this.constants.materialWidth * 2
      let detailWidth = this.sectionDepth - this.constants.indentTabletop - this.constants.indentShelve
      if (this.sectionType === sectionBottomType2) {
         detailHeight -= this.constants.indentWall
         detailWidth = this.sectionDepth - this.constants.indentTabletop - this.constants.indentCornerSection
      }
      if (this.sectionType === sectionBottomType3) {
         detailHeight -= (this.constants.indentTabletop + this.constants.indentFrontBody)
         detailWidth = this.prevDepth - this.constants.indentTabletop - this.constants.indentShelve
      }
      if (this.level !== levelType1) {
         detailWidth = (this.sectionType === sectionUpperType3) 
            ? this.sectionDepth - this.constants.indentCornerSection - this.constants.indentBackside
            : this.sectionDepth - this.constants.indentShelve - this.constants.indentBackside
      }

      return new Detail(fifthDetail, (detailHeight), (detailWidth), numberShelves, edge, this.body)

   }
   getDrawersDimensions() {
      let indentLenth, indentGuide, indentWidth, indentBottom, edge
      let detail = {}
      let drawerLenghtRounding = 50
      let drawerHeightRounding = 0.65
      switch(this.drawersType) {
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
      
      let sideHeight = Math.floor((this.sectionDepth - this.constants.indentTabletop - indentLenth) / drawerLenghtRounding) * drawerLenghtRounding - indentGuide
      let backHeight = this.sectionWidth - this.constants.materialWidth * 2 - indentWidth
      if (this.drawersType === drawerType4) {
         edge = [thinEdge, thinEdge, thinEdge, thinEdge];
         let widthDetailSide = (!this.checkboxes.oven) 
         ? (this.drawers > 0 && this.drawers < 4)
            ? tandemHeight1
            : tandemHeight2
         : tandemHeight3;
         detail.back = new Detail(drawerSecondDetail, backHeight, widthDetailSide, this.drawers, edge, this.body)
         detail.drawerBottom = new Detail(drawerThirdDetail, (sideHeight - tandemLenghtIndent), +(backHeight + tandemWidthIndent), this.drawers, edge, this.body)
      } else {
         let widthDetailSide = (!this.checkboxes.oven) 
         ? Math.round((this.sectionHeight - this.constants.materialWidth) / this.drawers * drawerHeightRounding) 
         : this.constants.ovenDrawer;
         detail.side = new Detail(drawerFirstDetail, sideHeight, widthDetailSide, (this.drawers * 2), [thinEdge, thinEdge, withoutEdge, thinEdge], this.body)
         detail.back = new Detail(drawerSecondDetail, backHeight, (widthDetailSide - indentBottom), (this.drawers * 2), [thinEdge, thinEdge, withoutEdge, withoutEdge], this.body)
         detail.drawerBottom = new Detail(drawerThirdDetail, (sideHeight - this.constants.materialWidth * 2), backHeight, this.drawers, 
            [withoutEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      }   
      return detail
   }
   getVisibleSideDimensions() {
      let plinth = +this.plinth
      let amount = 1
      return new Detail(sixthDetail, (this.sectionHeight + plinth), this.sectionDepth, amount, [boldEdge, thinEdge, thinEdge, thinEdge], this.body)
   }
   getFalseDimensions() {
      let detail;
      let amount = 1
      let edge = [thinEdge, thinEdge, thinEdge, withoutEdge]
      let heightDetail = (this.level === levelType2) ? this.sectionUpHeight : this.heightMezzanineSection
      if (this.sectionType === sectionBottomType2) {
         detail = new Detail(seventhDetail, this.sectionHeight, (this.neighboringSectionWidth - this.constants.indentTabletop - 
            this.constants.indentBotFalseBack + this.constants.indentBotFalseFront), amount, edge, this.body) 
      } else if (this.sectionType === sectionUpperType3) {
         detail = new Detail(seventhDetail, heightDetail, (this.neighboringSectionWidth - 
            this.constants.indentUpFalseBack + this.constants.indentUpFalseFront), amount, edge, this.body) 
      } else if (this.sectionType === sectionBottomType3) {
         detail = new Detail(seventhDetail, this.sectionHeight - this.constants.materialWidth, 
            this.neighboringSectionWidth - this.constants.indentTabletop, amount, edge, this.body)
      }
      return detail
   }
   getFrontDimensions() {
      let edge = (this.material === materialType1) ? [boldEdge, boldEdge, boldEdge, boldEdge] : [withoutEdge, withoutEdge, withoutEdge, withoutEdge];
      let divider, numberFront, widthFront, heightFront, microwave;
      let gola = (this.frontOpening === frontOpeningType4) 
         ? this.constants.indentBotGola 
         : (this.frontOpening === frontOpeningType3) ? this.constants.indentUpGola : 0;
      let oven = (this.checkboxes.oven && this.sectionType !== sectionBottomType4) ? this.constants.ovenHeight : 0
      let falsePanel = (this.sectionType === sectionBottomType2) 
         ? (this.neighboringSectionWidth - this.constants.indentTabletop - this.constants.indentBotFalseBack + 
            this.constants.indentBotFalseFront) + this.constants.indentWall
         : (this.sectionType === sectionUpperType3) 
            ? (this.neighboringSectionWidth + this.constants.indentUpFalseFront) 
            : 0

      if (this.drawers > 0 || this.checkboxes.lift) {
         divider = 1;
      } else {
         divider = this.frontAmount
         if (this.sectionWidth - falsePanel > frontMaxWidth && !this.checkboxes.lift) divider = 2;
      }

      widthFront = (this.sectionWidth - falsePanel) / divider - this.constants.indentFront

      if (this.sectionType === sectionBottomType3) widthFront = this.sectionWidth - 
      (this.neighboringSectionWidth - this.constants.indentTabletop) - this.constants.indentTabletop + this.constants.indentFrontBody - 
      this.constants.materialWidth - this.constants.indentFront

      if (this.drawers > 0 ) {
         divider = this.drawers
      } else if (this.checkboxes.lift) {
         divider = this.frontAmount
      } else {
         divider = 1
      } 
      
      heightFront = (this.level === levelType2 || this.level === levelType3) 
         ? (this.level === levelType2)
            ? (this.sectionUpHeight + gola) / divider - this.constants.indentFront
            : (this.heightMezzanineSection + gola) / divider - this.constants.indentFront
         : Math.round((this.sectionHeight - this.constants.indentFront) / divider) - this.constants.indentFront - gola - oven;

      if (this.drawers > 0 ) {
         numberFront = this.drawers
      } else if (this.sectionType === sectionBottomType3) {
         numberFront = 1
      } else if (this.sectionWidth - falsePanel > frontMaxWidth && !this.checkboxes.lift) {
         numberFront = 2
      } else {
         numberFront = this.frontAmount
      }

      if (this.checkboxes.fridge) {
         numberFront = 2
         heightFront = (this.constants.fridgeHeight + 1.5 * this.constants.materialWidth) / numberFront - this.constants.indentFront
      }
      
      let detail = {}
      detail.firstFront = new Detail(firstFront, heightFront, widthFront, numberFront, edge, this.front, this.material)
      if (this.checkboxes.withoutFront || this.checkboxes.simpleFridge) detail.firstFront = {}

      this.checkboxes.lift 
         ? detail.numberHinges = this.getHinges(widthFront)
         : detail.numberHinges = this.getHinges(heightFront)
      if (this.drawers > 0) {
         detail.numberHinges = 0
      }
      if (this.sectionType === sectionBottomType4) {
         oven = (this.checkboxes.oven) ? this.constants.ovenHeight : 0
         microwave = (this.checkboxes.microwave) ? this.constants.microwaveHeight : 0
         let numberSecondFront
         if (this.sectionWidth > frontMaxWidthFridge && !this.checkboxes.lift) {
            numberSecondFront = 2
         } else if (this.sectionWidth > frontMaxWidth && !this.checkboxes.lift) {
            (this.checkboxes.simpleFridge) 
               ? numberSecondFront = this.frontAmount
               : numberSecondFront = 2
         } else {
            numberSecondFront = this.frontAmount
         }
         let heightSecondFront = this.kitchenHeight - this.plinth - heightFront - this.constants.indentFront * 2 - oven - microwave;
         if (this.checkboxes.fridge) heightSecondFront = this.kitchenHeight - (heightFront + this.constants.indentFront) * 2 - this.plinth - this.constants.indentFront
         divider = (!this.checkboxes.lift) ? 1 : this.frontAmount
         if (this.checkboxes.simpleFridge) heightSecondFront = (this.kitchenHeight - this.constants.fridgeHeight) / divider - this.constants.indentFront
         divider = (this.checkboxes.lift) ? 1 : this.frontAmount
         if (this.checkboxes.lift) {
            divider = 1
         } else {
            divider = numberSecondFront
         }
         let widthSecondFront = (this.sectionWidth / divider - this.constants.indentFront);

         this.checkboxes.lift 
         ? detail.numberHinges += this.getHinges(widthSecondFront)
         : detail.numberHinges += this.getHinges(heightSecondFront)
         detail.secondFront = new Detail(secondFront, heightSecondFront, widthSecondFront, numberSecondFront, edge, this.front, this.material)
      }

      if (this.sectionType === sectionBottomType3) {
         let numberSecondFront = 1
         let heightSecondFront = heightFront
         let widthSecondFront = this.sectionDepth - this.prevDepth + this.constants.indentFrontBody - this.constants.materialWidth - this.constants.indentFront;

         detail.numberHinges += this.getHinges(heightSecondFront)
         detail.secondFront = new Detail(secondFront, heightSecondFront, widthSecondFront, numberSecondFront, edge, this.front, this.material)
      }
      if (this.checkboxes.withoutFront) {
         detail.numberHinges = 0
         detail.secondFront = {}
      }
      return detail;
   }
   getPlinthDimensions() {
      let detail = {};
      let cornerIndent = (this.sectionType === sectionBottomType2 || this.sectionType === sectionBottomType3) 
         ? this.neighboringSectionWidth - this.constants.indentFrontBody - this.constants.indentPlinth - this.constants.materialWidth 
         : 0;
      const edge = [thinEdge, thinEdge, withoutEdge, withoutEdge]
      let heightSecondPlinth = 0
      let handleIndent = 0
      let amount = 1
      if (this.frontOpening === frontOpeningType1) handleIndent = this.constants.materialWidth
      if (this.sectionType === sectionBottomType3) heightSecondPlinth = this.sectionDepth - this.prevDepth + this.constants.indentPlinth;
      if (this.sectionType === sectionBottomType2) heightSecondPlinth = this.constants.materialWidth * 2 + this.constants.indentPlinth + handleIndent;

      let heightPlinth = this.sectionWidth - cornerIndent;
      if (this.sectionType === sectionBottomType4) heightPlinth = 0;
      if (this.side === sideType3)  {
         detail.rightSection = new Detail(thirdSideDetail, heightPlinth, this.plinth, amount, edge, this.body);
         detail.centralSection = {};
         detail.leftSection = {};
      } else if (this.side === sideType1) {
         detail.leftSection = new Detail(firstSideDetail, heightPlinth, this.plinth, amount, edge, this.body);
         detail.centralSection = new Detail(secondSideDetail, heightSecondPlinth, this.plinth, amount, edge, this.body);
         detail.rightSection = {};
      } else {
         detail.leftSection = {};
         detail.centralSection = new Detail(secondSideDetail, heightPlinth, this.plinth, amount, edge, this.body);
         detail.rightSection = new Detail(thirdSideDetail, heightSecondPlinth, this.plinth, amount, edge, this.body);
      }
      return detail
   }
   getCupboardPlinth() {
      return new Detail(eighthDetail, (this.sectionWidth - this.constants.materialWidth * 2), this.plinth, 1, 
         [thinEdge, thinEdge, thinEdge, thinEdge], this.body)
   }
   getTabletopDimension() {
      let detail = {};
      let topEdge = (this.sectionDepth < maxSectionDepth) ? boldEdge : withoutEdge;
      let widthTabletop = this.sectionDepth;
      let edge = [topEdge, boldEdge, withoutEdge, withoutEdge];
      let heightTabletop = this.sectionWidth;
      let handleIndent = 0
      let amount = 1
      if (this.sectionType === sectionBottomType4) heightTabletop = 0;
      let heightSecondTabletop = 0;
      if (this.frontOpening === frontOpeningType1) handleIndent = this.constants.materialWidth
      if (this.sectionType === sectionBottomType2) heightSecondTabletop = this.constants.materialWidth * 2 - this.constants.indentFrontBody + handleIndent;
      if (this.sectionType === sectionBottomType3) {
         heightSecondTabletop = this.sectionDepth - this.prevDepth;
         widthTabletop = this.prevDepth;
      }
      if (this.side === sideType1) {
         detail.leftSection = new Detail(firstSideDetail, heightTabletop, widthTabletop, amount, edge, this.tabletop, materialType4);
         detail.centralSection = new Detail(secondSideDetail, heightSecondTabletop, this.neighboringSectionWidth, amount, edge, this.tabletop, materialType4);
         detail.rightSection = {};
      } else if (this.side === sideType2) {
         detail.centralSection = new Detail(secondSideDetail, heightTabletop, widthTabletop, amount, edge, this.tabletop, materialType4);
         detail.rightSection = new Detail(thirdSideDetail, heightSecondTabletop, this.neighboringSectionWidth, amount, edge, this.tabletop, materialType4);
         detail.leftSection = {};
      } else {
         detail.rightSection = new Detail(thirdSideDetail, heightTabletop, widthTabletop, amount, edge, this.tabletop, materialType4);
         detail.leftSection = {};
         detail.centralSection = {}
      }
      return detail
   }
   getDvpDimension() {
      let dvpHeight, dvpUpHeight, dvpWidth, dvpUpWidth;
      let amount = 1;
      let edge = [withoutEdge, withoutEdge, withoutEdge, withoutEdge]
      let detail = {}
      if (this.level === levelType1) {
         dvpHeight = this.sectionHeight - this.constants.indentDvp;
         dvpWidth = this.sectionWidth - this.constants.indentDvp;
         if (this.sectionType === sectionBottomType3) {
            dvpWidth = this.sectionWidth - this.constants.indentTabletop + this.constants.indentFrontBody - this.constants.indentDvp
            dvpUpWidth = this.sectionDepth - this.prevDepth + this.constants.materialWidth - this.constants.indentDvp + this.constants.indentFrontBody
         }
         dvpUpHeight = this.kitchenHeight - this.plinth - dvpHeight - this.constants.indentDvp * 2;
         if (this.sectionType === sectionBottomType2) dvpWidth -= this.constants.indentWall;
         if (this.checkboxes.oven) {
            (this.sectionType === sectionBottomType4) 
            ? dvpUpHeight -= this.constants.ovenHeight
            : dvpHeight -= this.constants.ovenHeight;
         }
         if (this.checkboxes.microwave) dvpUpHeight -= this.constants.microwaveHeight;

         (this.checkboxes.sink || this.checkboxes.dishwasher || this.checkboxes.fridge || this.checkboxes.simpleFridge) 
            ? detail.firstDvp = {} 
            : detail.firstDvp = new Detail(firstDvp, dvpHeight, dvpWidth, amount, edge, this.dvp, materialType3);
         if (this.checkboxes.fridge) dvpUpHeight = this.kitchenHeight - this.constants.fridgeHeight - this.constants.indentDvp - this.plinth - this.constants.materialWidth;
         if (this.checkboxes.simpleFridge) dvpUpHeight = this.kitchenHeight - this.constants.fridgeHeight - this.constants.indentDvp;
         if (this.sectionType === sectionBottomType3) {
            dvpUpHeight = dvpHeight;
            dvpWidth = dvpUpWidth;
         }
         if (this.sectionType === sectionBottomType4 || this.sectionType === sectionBottomType3) 
            detail.secondDvp = new Detail(secondDvp, dvpUpHeight, dvpWidth, amount, edge, this.dvp, materialType3);
      } else {
         dvpHeight = this.sectionUpHeight - this.constants.indentDvp
         if (this.level === levelType2) dvpHeight -= (this.constants.materialWidth - this.constants.dvpGrooveDepth);
         dvpWidth = this.sectionWidth - this.constants.materialWidth * 2 + this.constants.dvpGrooveDepth * 2 - this.constants.indentDvp;
         detail.firstDvp = new Detail(firstDvp, dvpHeight, dvpWidth, amount, edge, this.dvp, materialType3)
      } 

      return detail
   }
   getHinges(height) {
      let numberHinges = 0;
      if (height <= 900) {
         numberHinges = 2 * this.frontAmount;
      } else if (height <= 1400) {
         numberHinges = 3 * this.frontAmount;
      } else if (height <= 2000) {
         numberHinges = 4 * this.frontAmount;
      } else if (height <= 2400) {
         numberHinges = 5 * this.frontAmount;
      }
      return numberHinges
   }

   getBotType1Dimensions(washEdge, amount, oven) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionHeight - this.constants.materialWidth, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.body),
         new Detail(secondDetail, this.sectionHeight - this.constants.materialWidth, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, oven, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getBotType2Dimensions(washEdge, amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionHeight - this.constants.materialWidth, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.body),
         new Detail(secondDetail, this.sectionHeight - this.constants.materialWidth, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.indentWall, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2 - this.constants.indentWall, this.constants.partition, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getBotType3Dimensions(washEdge, amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionHeight - this.constants.materialWidth, this.prevDepth - this.constants.indentTabletop, amount * 2, 
            [thinEdge, washEdge, withoutEdge, withoutEdge], this.body),
         new Detail(secondDetail, this.sectionHeight - this.constants.materialWidth, this.neighboringSectionWidth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.indentTabletop + this.constants.indentFrontBody, 
            this.sectionDepth - this.constants.indentTabletop + this.constants.indentFrontBody, amount, 
            [thinEdge, washEdge, thinEdge, thinEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2 - this.constants.indentTabletop + this.constants.indentFrontBody, 
            this.constants.partition, amount * 2, [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getBotType4Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.kitchenHeight, this.sectionDepth - this.constants.indentCupboard, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.kitchenHeight, this.sectionDepth - this.constants.indentCupboard, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentTabletop, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }

   getUpType1Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionUpHeight, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.sectionUpHeight, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getUpType2Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionUpHeight - this.constants.indentHood, this.sectionDepth, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.sectionUpHeight - this.constants.indentHood, this.sectionDepth, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getUpType3Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionUpHeight, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.sectionUpHeight, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getUpType4Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.sectionUpHeight, this.sectionDepth + this.constants.indentJoinSection, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.sectionUpHeight, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth, amount, 
            [thinEdge, thinEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }

   getMezType1Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getMezType2Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getMezType3Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }
   getMezType4Dimensions(amount) {
      return new BodyDetail(
         new Detail(firstDetail, this.heightMezzanineSection, this.sectionDepth + this.constants.indentJoinSection, amount, 
            [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(secondDetail, this.heightMezzanineSection, this.sectionDepth, amount, [thinEdge, thinEdge, thinEdge, thinEdge], this.body),
         new Detail(thirdDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body),
         new Detail(fourthDetail, this.sectionWidth - this.constants.materialWidth * 2, this.sectionDepth - this.constants.indentBackside, amount, 
            [thinEdge, withoutEdge, withoutEdge, withoutEdge], this.body)
      )
   }

   createSection() {
      let createSection = new CreateSection(this);
      return createSection.createDetailsDimensions();
   }
}