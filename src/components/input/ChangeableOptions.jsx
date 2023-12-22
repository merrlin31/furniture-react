import { bigDishwasher, changeableOption1, changeableOption10, changeableOption11, changeableOption12, changeableOption13, changeableOption14, changeableOption2, changeableOption3, changeableOption4, changeableOption5, changeableOption6, changeableOption7, changeableOption8, changeableOption9, dishwasherClass, itemClass, smallDishwasher } from "../../utils/description";
import { section4 } from "../properties/inputProperties";
import { MyInput, MyInputWithSelect } from "../UI/MyInput/MyInput";

export const ChangeableOptions = ({className, value, onChange, selectChange, hides, checkboxes}) => {

   const inputType = 'checkbox'
   const changeableOptions = [
      {name: changeableOption1, type: inputType, id: changeableOption1, hide: hides[changeableOption1], attribute: {checked: checkboxes[changeableOption1]}},
      {name: changeableOption2, type: inputType, id: changeableOption2, hide: hides[changeableOption2], attribute: {checked: checkboxes[changeableOption2]}},
      {name: changeableOption3, type: inputType, id: changeableOption3, hide: hides[changeableOption3], attribute: {checked: checkboxes[changeableOption3]}},
      {name: changeableOption4, type: inputType, id: changeableOption4, hide: hides[changeableOption4], attribute: {checked: checkboxes[changeableOption4]}},
      {name: changeableOption5, type: inputType, id: changeableOption5, hide: hides[changeableOption5], attribute: {checked: checkboxes[changeableOption5]}},
      {name: changeableOption6, type: inputType, id: changeableOption6, hide: hides[changeableOption6], attribute: {checked: checkboxes[changeableOption6]}},
      {name: changeableOption7, type: inputType, id: changeableOption7, hide: hides[changeableOption7], attribute: {checked: checkboxes[changeableOption7]}},
      {name: changeableOption8, type: inputType, id: changeableOption8, hide: hides[changeableOption8], attribute: {checked: checkboxes[changeableOption8]}},
      {name: changeableOption9, type: inputType, id: changeableOption9, hide: hides[changeableOption9], attribute: {checked: checkboxes[changeableOption9]}},
      {name: changeableOption10, type: inputType, id: changeableOption10, hide: hides[changeableOption10], attribute: {checked: checkboxes[changeableOption10]}},
      {name: changeableOption11, type: inputType, id: changeableOption11, hide: hides[changeableOption11], attribute: {checked: checkboxes[changeableOption11]}, 
         bind: {select: changeableOption12, options: [
            {value: bigDishwasher, name: bigDishwasher},
            {value: smallDishwasher, name: smallDishwasher},
         ], defaulValue: 'dishwasherDefaultValue', className: dishwasherClass, hide: false} },
      {name: changeableOption13, type: inputType, id: changeableOption13, hide: hides[changeableOption13], attribute: {checked: checkboxes[changeableOption13]}},  
      {name: changeableOption14, type: inputType, id: changeableOption14, hide: hides[changeableOption14], attribute: {checked: checkboxes[changeableOption14]}},  
   ]

   return (
      <div className={`${className}__${section4}`}>
      {changeableOptions.map((option) => {
         if (!option.hide && option.bind) {
            return <MyInputWithSelect option={option} key={option.id} value={value} onChange={onChange} selectChange={selectChange} className={section4 + itemClass} />
         } else if (!option.hide && !option.bind) {
            return <MyInput option={option} key={option.id} onChange={onChange} className={section4 + itemClass} />
         } else {
            return ''
         }
      })}
   </div>
   );
}