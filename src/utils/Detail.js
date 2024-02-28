import { materialType1, materialType4 } from "./description";

let scale = 1000
const stockDspEdge = 0.093
const stockTabletopEdge = 0.078

export class Detail {
   constructor (name, height, width, amount, edge, materialCode, materialType = materialType1) {
      this.name = name;
      this.height = height;
      this.width = width;
      this.amount = amount;
      this.edge = {
         top: edge[0],
         bottom: edge[1],
         left: edge[2],
         right: edge[3]
      };
      this.materialCode = materialCode;
      this.materialType = materialType;
   }

   get area() {
      return this.height / scale * this.width / scale * this.amount
   }

   get scaleHeight() {
      return this.height / scale
   }

   get scaleWidth() {
      return this.width / scale
   }

   get heightEdge() {
      let stock = (this.materialType === materialType4) ? stockTabletopEdge : stockDspEdge
      return this.height / scale + stock
   }

   get widthEdge() {
      let stock = (this.materialType === materialType4) ? stockTabletopEdge : stockDspEdge
      return this.width / scale + stock
   }

   boldEdge() {
      let boldEdge = 0;
      if (this.edge.top === 2) boldEdge += this.heightEdge * this.amount;
      if (this.edge.bottom === 2) boldEdge += this.heightEdge * this.amount;
      if (this.edge.left === 2) boldEdge += this.widthEdge * this.amount;
      if (this.edge.right === 2) boldEdge += this.widthEdge * this.amount;
      return boldEdge
   }
   thinEdge() {
      let thinEdge = 0;
      if (this.edge.top === 1) thinEdge += this.heightEdge * this.amount;
      if (this.edge.bottom === 1) thinEdge += this.heightEdge * this.amount;
      if (this.edge.left === 1) thinEdge += this.widthEdge * this.amount;
      if (this.edge.right === 1) thinEdge += this.widthEdge * this.amount;
      return thinEdge
   }
   edging() {
      let edging = 0;
      if (this.edge.top !== 0) edging += this.height * this.amount / scale;
      if (this.edge.bottom !== 0) edging += this.height * this.amount / scale;
      if (this.edge.left !== 0) edging += this.width * this.amount / scale;
      if (this.edge.right !== 0) edging += this.width * this.amount / scale;
      return edging
   }

}