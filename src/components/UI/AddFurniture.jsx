import { useState } from "react";
import { addFurnitureBtnColor } from "../../utils/description";
import { furnitureManufacturerList } from "../../utils/furniture";
import { MyButton } from "./MyButton/MyButton";
import { MyInput } from "./MyInput/MyInput";
import { MySelect } from "./MySelect/MySelect";

export const AddFurniture = (props) => {
   
   const translate = 'addFurniture.'
   const inputType = 'text'
   const option1 = 'description'
   const option2 = 'code'
   const option3 = 'value'
   const option4 = 'price'
   const option5 = 'manufacturer'
   const option6 = 'multiplicity'
   const servicesManufacturer = 'servicesManufacturer'
   const inputClass = 'addFurnitureItem'
   const furnitureModalContainerClass = 'furnitureModalContainer'
   let initialFurnitureItem = {
      [option1]: '',
      [option2]: '',
      [option4]: '',
      [option5]: furnitureManufacturerList[0],
      [option3]: 1,
      [option6]: 1
   }
   if (props.materials) initialFurnitureItem[option5] = servicesManufacturer
   const [funitureItem, setFurnitureItem] = useState(initialFurnitureItem)
   const addFurniture = () => {
      props.addFurniture(funitureItem)
   }
   const changeValue = (e) => {
      if (e.target.id !== option1) {
         setFurnitureItem({...funitureItem, [e.target.id]: +e.target.value})
      } else {
         setFurnitureItem({...funitureItem, [e.target.id]: e.target.value})
      }
   }

   const options = [
      {name: option1, id: option1, type:inputType},
      {name: option2, id: option2,},
      {name: option3, id: option3,},
      {name: option4, id: option4,},
      {name: option5, select: option5, 
         options: furnitureManufacturerList.map(item => ({value: item, name: item}))
         , defaulValue: 'furnitureManufacturerDefaultValue'},
      {name: option6, id: option6,},
   ]
   if (props.materials) {
      options.map((item) => 
         item.select
            ? item.options = [{value: servicesManufacturer, name: servicesManufacturer}]
            : item
      )
   }

   return (
      <div>
         <div className={furnitureModalContainerClass}>
            {options.map((option) =>
               !option.select  
                  ? <MyInput key={option.name} className={inputClass} option={option} value={funitureItem[option.name]} 
                     onChange={changeValue} translate={translate} />
                  : <MySelect key={option.name} className={inputClass} options={option} value={funitureItem[option.select]} 
                     onChange={(item) => setFurnitureItem({...funitureItem, [option.select]: item})} translate={translate} />
            )}
         </div>
         <MyButton color={addFurnitureBtnColor} onClick={addFurniture}>Додати</MyButton>
      </div>
   );
}