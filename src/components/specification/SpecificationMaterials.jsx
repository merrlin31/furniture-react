import { t } from "i18next";
import { useContext } from "react";
import { MyContext } from "../../context";
import { edge1, edge2, materialType1, materialType1SheetArea, materialType3, materialType4 } from "../../utils/description";
import { SpecificationItem } from "./SpecificationItem";

export const SpecificationMaterials = ({materials, setContent}) => {

   const edgeDiscount = 7
   const {servicesPrice} = useContext(MyContext)
   

   const changeItem = (item) => {
      let index = item.name
      let searchItem = materials.find(obj => obj.materialCode === index)
      if (item.description === t(edge1)) {
         searchItem.boldEdge = item.amount
      } else if (item.description === t(edge2)) {
         searchItem.thinEdge = item.amount
      } else {
         if (item.material === materialType1 || item.material === materialType3) {
            searchItem.area = item.amount * materialType1SheetArea
         } else if (item.material === materialType4) {
            searchItem.area = item.amount * servicesPrice.tabletopLength
         } else {
            searchItem.area = item.amount
         }
      }
      let result = materials.map(obj => 
         obj.materialCode !== index
         ? obj
         : searchItem) 
      setContent(result)
   }

   const setAmount = (material) => {
      let itemAmount = material.area
      if (material.material === materialType1 || material.material === materialType3) itemAmount = Math.ceil(itemAmount / materialType1SheetArea) 
      if (material.material === materialType4) itemAmount = Math.ceil(itemAmount / servicesPrice.tabletopLength)
      return itemAmount
   }
   
   return (
      <>
         {materials.map(material => 
            <tbody key={material.materialCode}>
               {material.area > 0 &&
                  <SpecificationItem name={material.materialCode} description={t(material.material)} code={material.materialCode}  amount={setAmount(material)} 
                     price={material.price} material={material.material} discount={material.discountValue} change={changeItem} />
               }
               {material.boldEdge > 0 && 
                  <SpecificationItem name={material.materialCode} description={t(edge1)} material={true}
                     amount={Math.ceil(material.boldEdge)} price={material.boldEdgePrice} discount={edgeDiscount} change={changeItem} />
               }
               {material.thinEdge > 0 &&
                  <SpecificationItem name={material.materialCode} description={t(edge2)} material={true}
                     amount={Math.ceil(material.thinEdge)} price={material.thinEdgePrice} discount={edgeDiscount} change={changeItem} />
               }
            </tbody>   
         )}
      </>
   );
}