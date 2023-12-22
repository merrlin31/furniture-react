import { t } from "i18next";
import { SpecificationItem } from "./SpecificationItem";

export const SpecificationTbody = ({content, setContent, object, price, discount, setPrice, translate}) => {

   const changeItem = (item) => {
      let index = item.name
      let searchItem = content.find(obj => obj.name === index)
      searchItem.value = item.amount
      searchItem.code = item.code
      let result = content.map(obj => 
         obj.name !== index
         ? obj
         : searchItem)
      setContent(result)
      object[item.name].value = item.amount
   }

   const setAmount = (item) => {
      let itemAmount = +item.value.toFixed(2)
      if (item.multiplicity) {
         itemAmount = Math.ceil(item.value / item.multiplicity)
      }     
      return itemAmount
   }
   const setDiscount = (item) => {
      let itemDiscount = (discount[item.manufacturer])
         ? discount[item.manufacturer]
         : 0
      return itemDiscount
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
            <SpecificationItem key={item.name} code={item.code} name={item.name} description={setDescription(item)}
               amount={setAmount(item)} price={price[item.name]} discount={setDiscount(item)} change={changeItem} 
               allPrice={price} setPrice={setPrice} />  
         )}
      </tbody>
   );
}