import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { dimensionClass, frontMaxWidth, frontMaxWidthFridge, itemClass, liftType3, localOption1, localOption2, localOption3, localOption4, localOption5, localOption6, 
   localOption7, localOption8, localOption9, MAX_LENGTH_1, MAX_LENGTH_4, MIN_LENGTH_1, REQUIRED_DEPTH, REQUIRED_DRAWERS, REQUIRED_FRONT, 
   REQUIRED_SHELVES, REQUIRED_WIDTH, sectionBottomType2, sectionBottomType3, sectionUpperType3 } from "../../utils/description";
import { section3, section4 } from "../properties/inputProperties";
import { MyFormInput } from "../UI/MyInput/MyInput";
import { MySelect1 } from "../UI/MySelect/MySelect";

export const LocalOptions = ({className, value, inputAtributes, hides, checkboxes}) => {
   const { register, setValue, formState: { errors } } = useFormContext();

   const MAX = 'max'
   const MIN = 'min'
   const READ_ONLY = 'readOnly'
   const STEP = 'step'
   const OPTIONS = 'options'
   const drawersDefaultValue = 'drawersDefaultValue'
   const frontOpeningDefaultValue = 'frontOpeningDefaultValue'
   const liftDefaultValue = 'liftDefaultValue'
   const findObj = (id, attribute, array = inputAtributes) => { 
      return array.find(obj => obj.id === id)[attribute]
   }

   const validateMinMax = (id) => (value) => {
      if (value < findObj(id, MIN)) return MIN;
      if (value > findObj(id, MAX)) return MAX;
      return true;
   };

   const localOptions = [
      {name: localOption1, id: localOption1, validate: {
         valueAsNumber: true,
         required: REQUIRED_WIDTH, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         validate: {validateMinMax: validateMinMax(localOption1)},
      }, attribute: {max: findObj(localOption1, MAX), min: findObj(localOption1, MIN), readOnly: findObj(localOption1, READ_ONLY)}},
      {name: localOption2, id: localOption2, validate: {
         valueAsNumber: true,
         required: REQUIRED_DEPTH, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         validate: {validateMinMax: validateMinMax(localOption2)},
      }, attribute: {max: findObj(localOption2, MAX), min: findObj(localOption2, MIN), readOnly: findObj(localOption2, READ_ONLY)}},
      {name: localOption3, id: localOption3, validate: {
         valueAsNumber: true,
         required: REQUIRED_FRONT, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 1, message: MAX_LENGTH_1},
         validate: {validateMinMax: validateMinMax(localOption3)},
      }, attribute: {max: findObj(localOption3, MAX), min: findObj(localOption3, MIN), readOnly: findObj(localOption3, READ_ONLY)}},
      {name: localOption4, id: localOption4, validate: {
         valueAsNumber: true,
         required: REQUIRED_DRAWERS, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 1, message: MAX_LENGTH_1},
         validate: {validateMinMax: validateMinMax(localOption4)},
      }, attribute: {max: findObj(localOption4, MAX), min: findObj(localOption4, MIN), step: findObj(localOption4, STEP), readOnly: findObj(localOption4, READ_ONLY)}, className: true, hide: hides.drawers},
      {name: localOption5, select: localOption5, options: findObj(localOption5, OPTIONS), defaultValue: drawersDefaultValue, className: true, hide: hides.drawersType},
      {name: localOption6, id: localOption6, validate: {
         valueAsNumber: true,
         required: REQUIRED_SHELVES, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 1, message: MAX_LENGTH_1},
         validate: {validateMinMax: validateMinMax(localOption6)},
      }, attribute: {max: findObj(localOption6, MAX), min: findObj(localOption6, MIN), step: findObj(localOption6, STEP), readOnly: findObj(localOption6, READ_ONLY)}, className: true, hide: hides.shelves},
      {name: localOption7, id: localOption7, validate: {
         valueAsNumber: true,
         required: REQUIRED_DEPTH, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         validate: {validateMinMax: validateMinMax(localOption7)},
      }, attribute: {max: findObj(localOption7, MAX), readOnly: findObj(localOption7, READ_ONLY)}, className: true, hide: hides.neighboringWidth},
      {name: localOption8, select: localOption8, options: findObj(localOption8, OPTIONS), defaultValue: frontOpeningDefaultValue},
      {name: localOption9, select: localOption9, options: findObj(localOption9, OPTIONS), defaultValue: liftDefaultValue, className: true, hide: hides.liftType},
   ]

   useEffect(() => {
      if (value.bottomType === sectionBottomType2 || value.bottomType === sectionBottomType3 || value.upperType === sectionUpperType3) {
      } else {
         if (value.width > frontMaxWidthFridge && !checkboxes.lift) {
            setValue(localOption3, 2)
         } else if (value.width > frontMaxWidth && !checkboxes.lift && checkboxes.simpleFridge) {
            setValue(localOption3, 1)
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.width])

   useEffect(() => {
      if (value.liftType === liftType3) {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = true
         setValue(localOption3, 2)
      } else {
         inputAtributes.find(obj => obj.id === localOption3).readOnly = false
         setValue(localOption3, 1)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.liftType])

   return (
      <div className={`${className}${dimensionClass} ${section3}`}>
         {localOptions.map((option, index) => {
            let optionClass = (option.className) ? section4 : section3
            if (!option.hide && !option.select) {
               return <MyFormInput key={index} className={optionClass + itemClass}
               option={option} register={register} errors={errors[option.id]} />
            } else if (!option.hide && option.select) {
               return <MySelect1 key={index} className={optionClass + itemClass}
               options={option} register={register} />
            } else {
               return ''
            }
         })}
      </div>
   )
}