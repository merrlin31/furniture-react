import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addValueDifference } from "../../reducers/productReducer";
import { CUTTING, DVP_CUTTING, EDGING, TABLETOP_CUTTING, TABLETOP_EDGING } from "../../utils/services";
import { SpecificationRow } from "./SpecificationRow";

export const SpecificationTbody = ({content, editContent, price, translate, manufacturerOptions}) => {
   const dispatch = useDispatch()
   const valueDifference = useSelector(state => state.product.valueDifference)
   const {t} = useTranslation()

   const changeItem = (item, options) => {
      let searchDifference = valueDifference.find(obj => obj.code === options.code)
      let value = searchDifference?.value || 0
      let searchItem = content.find(obj => obj.name === item.name)
      let difference = (options.multiplicity) ? options.difference * options.multiplicity : options.difference;
      value += difference
      if (options.code !== item.code && searchDifference) searchDifference.code = item.code;
      searchItem.code = item.code
      searchItem.manufacturer = item.manufacturer
      dispatch(addValueDifference({code: searchItem.code, value}))
      dispatch(editContent(searchItem))
   }
   const deleteItem = (item) => {
      let value = 0
      let searchItem = content.find(obj => obj.name === item.name)
      if ([CUTTING, DVP_CUTTING, TABLETOP_CUTTING, EDGING, TABLETOP_EDGING].includes(item.name)) {
         value = -searchItem.value
      } else {
         searchItem.value = item.amount
      }
      dispatch(addValueDifference({code: searchItem.code, value}))
      dispatch(editContent(searchItem))
   }
   const setDescription = (item) => {
      let itemDescription
      if (item.description) {
         itemDescription = item.description
      } else {
         if (item.drawer) {
            let drawerName = item.name.split('_')
            itemDescription = t(translate + drawerName[0], {lenght: drawerName[1]})
         } else {
            itemDescription = t(translate + item.name)
         }
      }
      return itemDescription
   }
   
   return (
      <tbody>
         {content.map((item) => 
         item.value > 0 && 
            <SpecificationRow key={item.name} code={item.code} name={item.name} description={setDescription(item)}
               amount={item.amount} price={item.price} discount={item.discount} change={changeItem} 
               allPrice={price} multiplicity={item.multiplicity} deleteFunc={deleteItem} manufacturer={item.manufacturer} 
               manufacturerOptions={manufacturerOptions} totalPrice={item.totalPrice} totalSum={item.totalSum} />  
         )}
      </tbody>
   );
}