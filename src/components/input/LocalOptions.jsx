import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeValues } from "../../reducers/productReducer";
import { dimensionClass, itemClass, liftType3, localOption1, localOption2, localOption3, localOption4, localOption5, localOption6, 
   localOption7, localOption8, localOption9, sectionBottomType2, sectionBottomType3, sectionUpperType3 } from "../../utils/description";
import { section3, section4 } from "../properties/inputProperties";
import { MyInput } from "../UI/MyInput/MyInput";
import { MySelect } from "../UI/MySelect/MySelect";

export const LocalOptions = ({className, value, inputAtributes, hides, checkboxes}) => {

   const dispatch = useDispatch()
   const findObj = (id, attribute, array = inputAtributes) => { 
      return array.find(obj => obj.id === id)[attribute]
   }

   const localOptions = [
      {name: localOption1, id: localOption1, attribute: {max: findObj(localOption1, 'max'), min: findObj(localOption1, 'min'), readOnly: findObj(localOption1, 'readOnly')}},
      {name: localOption2, id: localOption2, attribute: {max: findObj(localOption2, 'max'), min: findObj(localOption2, 'min'), readOnly: findObj(localOption2, 'readOnly')}},
      {name: localOption3, id: localOption3, attribute: {max: findObj(localOption3, 'max'), min: findObj(localOption3, 'min'), readOnly: findObj(localOption3, 'readOnly')}},
      {name: localOption4, id: localOption4, attribute: {max: findObj(localOption4, 'max'), min: findObj(localOption4, 'min'), step: findObj(localOption4, 'step'), readOnly: findObj(localOption4, 'readOnly')}, className: true, hide: hides.drawers},
      {name: localOption5, select: localOption5, options: findObj(localOption5, 'options'), defaulValue: 'drawersDefaultValue', className: true, hide: hides.drawersType},
      {name: localOption6, id: localOption6, attribute: {max: findObj(localOption6, 'max'), min: findObj(localOption6, 'min'), step: findObj(localOption6, 'step'), readOnly: findObj(localOption6, 'readOnly')}, className: true, hide: hides.shelves},
      {name: localOption7, id: localOption7, attribute: {max: findObj(localOption7, 'max'), readOnly: findObj(localOption7, 'readOnly')}, className: true, hide: hides.neighboringWidth},
      {name: localOption8, select: localOption8, options: findObj(localOption8, 'options'), defaulValue: 'frontOpeningDefaultValue'},
      {name: localOption9, select: localOption9, options: findObj(localOption9, 'options'), defaulValue: 'liftDefaultValue', className: true, hide: hides.liftType},
   ]

   useEffect(() => {
      if (value.bottomType === sectionBottomType2 || value.bottomType === sectionBottomType3 || value.upperType === sectionUpperType3) {
      } else {
         if (value.width > 650 && !checkboxes.lift) {
            dispatch(changeValues({frontAmount: 2}))
         } else if (value.width > 600 && !checkboxes.lift && checkboxes.simpleFridge) {
            dispatch(changeValues({frontAmount: 1}))
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.width])

   useEffect(() => {
      if (value.liftType === liftType3) {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
         dispatch(changeValues({frontAmount: 2}))
      } else {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         dispatch(changeValues({frontAmount: 1}))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.liftType])

   return (
      <div className={`${className}${dimensionClass} ${section3}`}>
         {localOptions.map((option, index) => {
            let optionClass = (option.className) ? section4 : section3
            if (!option.hide && !option.select) {
               return <MyInput option={option} className={optionClass + itemClass}
               key={index} value={value[option.id]} onChange={e => dispatch(changeValues({[option.id]: +e.target.value}))} />
            } else if (!option.hide && option.select) {
               return <MySelect options={option} className={optionClass + itemClass}
               key={index} value={value[option.select]} onChange={(item) => dispatch(changeValues({[option.select]: item}))} />
            } else {
               return ''
            }
         })}
      </div>
   )
}