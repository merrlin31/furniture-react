import { drawerFirstDetail, drawerSecondDetail, drawerThirdDetail, eighthDetail, 
   fifthDetail, firstDetail, firstDvp, firstFront, firstSideDetail, fourthDetail, 
   ninthDetail, secondDetail, secondDvp, secondFront, secondSideDetail, seventhDetail, 
   sixthDetail, tenthDetail, thirdDetail, thirdSideDetail } from "./description";

export class Section {
   constructor(id) {
      this.id = id;
      this.details = {
         [firstDetail]: {},
         [secondDetail]: {},
         [thirdDetail]: {},
         [fourthDetail]: {},
         [ninthDetail]: {},
         [seventhDetail]: {},
         [tenthDetail]: {},
         [fifthDetail]: {},
         [drawerFirstDetail]: {},
         [drawerSecondDetail]: {},
         [drawerThirdDetail]: {},
         [sixthDetail]: {},
         [eighthDetail]: {},
      };
      this.fronts = {
         [firstFront]: {},
         [secondFront]: {},
      };
      this.dvps = {
         [firstDvp]: {},
         [secondDvp]: {},
      };
      this.tabletops = {
         [firstSideDetail]: {},
         [secondSideDetail]: {},
         [thirdSideDetail]: {},
      };
      this.plinth = {
         [firstSideDetail]: {},
         [secondSideDetail]: {},
         [thirdSideDetail]: {},
      };
      this.furnitures = {};
      this.services = {};
      this.initialValues = {}
   }
}
