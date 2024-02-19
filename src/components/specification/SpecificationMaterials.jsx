import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { editMaterial } from "../../reducers/detailReducer";
import { changeMaterial } from "../../reducers/productReducer";
import { edge1, edge2, materialType1, materialType1SheetArea, materialType3, materialType4 } from "../../utils/description";
import { SpecificationRow } from "./SpecificationRow";

export const SpecificationMaterials = ({materials}) => {

   const materialClass = 'material'
   const edgeDiscount = 7
   const dispatch = useDispatch()
   const tabletopLength = useSelector(state => state.setting.servicePrices.tabletopLength)

   const changeItem = (item) => {
      let index = item.name
      let searchItem = materials.find(obj => obj.materialCode === index)
      if (searchItem) dispatch(changeMaterial('ddd', item.name))
      if (item.description === t(edge1)) {
         searchItem.boldEdge = item.amount
      } else if (item.description === t(edge2)) {
         searchItem.thinEdge = item.amount
      } else {
         if (item.material === materialType1 || item.material === materialType3) {
            searchItem.area = item.amount * materialType1SheetArea
         } else if (item.material === materialType4) {
            searchItem.area = item.amount * tabletopLength
         } else {
            searchItem.area = item.amount
         }
      }
      dispatch(editMaterial(searchItem))
   }

   const setAmount = (material) => {
      let itemAmount = material.area
      if (material.material === materialType1 || material.material === materialType3) itemAmount = Math.ceil(itemAmount / materialType1SheetArea) 
      if (material.material === materialType4) itemAmount = Math.ceil(itemAmount / tabletopLength)
      return itemAmount
   }
   
   return (
      <>
         {materials.map(material => 
            <tbody key={material.materialCode} className={materialClass}>
               {material.area > 0 &&
                  <SpecificationRow name={material.materialCode} description={t(material.material)} code={material.materialCode}  amount={setAmount(material)} 
                     price={material.price} material={material.material} discount={material.discountValue} change={changeItem} />
               }
               {material.boldEdge > 0 && 
                  <SpecificationRow name={material.materialCode} description={t(edge1)} material={true}
                     amount={Math.ceil(material.boldEdge)} price={material.boldEdgePrice} discount={edgeDiscount} change={changeItem} />
               }
               {material.thinEdge > 0 &&
                  <SpecificationRow name={material.materialCode} description={t(edge2)} material={true}
                     amount={Math.ceil(material.thinEdge)} price={material.thinEdgePrice} discount={edgeDiscount} change={changeItem} />
               }
            </tbody>   
         )}
      </>
   );
}