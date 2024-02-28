import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeAddedDetailsCode, changeAddedDetailsType, editMaterial } from "../../reducers/detailReducer";
import { changeMaterialCode, addValueDifference, changeMaterialType } from "../../reducers/productReducer";
import { edge1, edge2, materialType1, materialType1SheetArea, materialType3, materialType4 } from "../../utils/description";
import { choiceOption } from "../../utils/Material";
import { SpecificationRow } from "./SpecificationRow";

export const SpecificationMaterials = ({sortMaterials}) => {

   const materialClass = 'material'
   const edgeManufacturer = 'rehau'
   const dispatch = useDispatch()
   const tabletopLength = useSelector(state => state.setting.servicePrices.tabletopLength)
   const valueDifference = useSelector(state => state.product.valueDifference)
   const materials = useSelector(state => state.detail.materials)

   const changeItem = (item, options) => {
      let searchValue = valueDifference.find(obj => obj.code === item.name)
      let value = searchValue?.value || 0
      let boldEdge = searchValue?.boldEdge || 0
      let thinEdge = searchValue?.thinEdge || 0
      let searchItem = materials.find(obj => obj.materialCode === item.name)
      if (options.code !== item.code) {
         dispatch(changeMaterialCode(options.code, item.code))
         dispatch(changeAddedDetailsCode(options.code, item.code))
         searchItem.materialCode = item.code
      }
      if (item.description === t(edge1)) {
         boldEdge += options.difference
         searchItem.boldEdgePrice = item.price
      } else if (item.description === t(edge2)) {
         thinEdge += options.difference
         searchItem.thinEdgePrice = item.price
      } else {
         if (options.material !== item.material) {
            dispatch(changeMaterialType(item.code, item.material))
            dispatch(changeAddedDetailsType(item.code, item.material))
            searchItem.material = item.material
         }
         searchItem.price = item.price
         searchItem.manufacturer = item.manufacturer
         if (item.material === materialType1 || item.material === materialType3) {
            value += options.difference * materialType1SheetArea
         } else if (item.material === materialType4) {
            value += options.difference * tabletopLength
         } else {
            value += options.difference
         }
      }
      dispatch(addValueDifference({code: searchItem.materialCode, value, boldEdge, thinEdge}))
      dispatch(editMaterial(searchItem))
   }
   const deleteItem = (item) => {
      let searchValue = valueDifference.find(obj => obj.code === item.name)
      let value = searchValue?.value || 0
      let boldEdge = searchValue?.boldEdge || 0
      let thinEdge = searchValue?.thinEdge || 0
      let searchItem = materials.find(obj => obj.materialCode === item.name)
      if (item.description === t(edge1)) {
         boldEdge = -searchItem.boldEdge
      } else if (item.description === t(edge2)) {
         thinEdge = -searchItem.thinEdge
      } else {
         value = -searchItem.area
      }
      dispatch(addValueDifference({code: searchItem.materialCode, value, boldEdge, thinEdge}))
      dispatch(editMaterial(searchItem))
   }
   
   return (
      <>
         {sortMaterials.map(material => 
            <tbody key={material.materialCode} className={materialClass}>
               {material.area > 0 &&
                  <SpecificationRow name={material.materialCode} description={t(material.material)} code={material.materialCode} deleteFunc={deleteItem} 
                     amount={material.amount} price={material.price} material={material.material} discount={material.discount} change={changeItem} 
                     manufacturer={material.manufacturer} manufacturerOptions={choiceOption(material.material)} totalPrice={material.totalPrice} totalSum={material.totalSum} />
               }
               {material.boldEdge > 0 && 
                  <SpecificationRow name={material.materialCode} description={t(edge1)} material={true} deleteFunc={deleteItem}
                     amount={material.boldEdge} price={material.boldEdgePrice} discount={material.boldEdgeDiscount} change={changeItem} 
                     manufacturer={edgeManufacturer} totalPrice={material.boldEdgeTotalPrice} totalSum={material.boldEdgeTotalSum} />
               }
               {material.thinEdge > 0 &&
                  <SpecificationRow name={material.materialCode} description={t(edge2)} material={true} deleteFunc={deleteItem}
                     amount={material.thinEdge} price={material.thinEdgePrice} discount={material.thinEdgeDiscount} change={changeItem} 
                     manufacturer={edgeManufacturer} totalPrice={material.thinEdgeTotalPrice} totalSum={material.thinEdgeTotalSum} />
               }
            </tbody>   
         )}
      </>
   );
}