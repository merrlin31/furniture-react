import { useFormContext } from "react-hook-form";
import { dimensionClass, globalOption1, globalOption10, globalOption11, globalOption2, globalOption3, globalOption4, 
   globalOption5, globalOption6, globalOption7, globalOption8, globalOption9, itemClass, levelAmount1, materialType1, materialType2,
   maxKitchenHeight, maxPlinthHeight, maxSectionHeight, maxTabletopThickness, MAX_LENGTH_2, MAX_LENGTH_4,
   MAX_LENGTH_6, minKitchenHeight, minMezzanineSectionHeight1Level, minMezzanineSectionHeight2Level, minPlinthHeight, minTabletopThickness, 
   minUpSectionHeight, 
   MIN_LENGTH, MIN_LENGTH_1, REQUIRED_HEIGHT, REQUIRED_MATERIAL, REQUIRED_THICKNESS, titleClass } from "../../utils/description";
import { section1 } from "../properties/inputProperties";
import { Title } from "../Title";
import { MyFormInput } from "../UI/MyInput/MyInput";
import { MySelect1 } from "../UI/MySelect/MySelect";

export const GlobalOptions = ({className, title, value}) => {
   const { register, formState: { errors } } = useFormContext();

   const defaultValue = 'materialTypeDefaultValue'
   const MAX = 'max'
   const MIN = 'min'
   const minCodeLenght = 3
   const maxCodeLenght = 6
   const minMezzanineHeight = (value.topLevel === levelAmount1) ? minMezzanineSectionHeight2Level : minMezzanineSectionHeight1Level
   const editableMezzanineHeight = (value.topLevel === levelAmount1) ? true : false
   const globalOptions = [
      {description: globalOption1, id: globalOption1, validate: {
         required: REQUIRED_MATERIAL, 
         minLength: {value: minCodeLenght, message: MIN_LENGTH},
         maxLength: {value: maxCodeLenght, message: MAX_LENGTH_6}
      }},
      {description: globalOption2, id: globalOption2, validate: {
         required: REQUIRED_MATERIAL, 
         minLength: {value: minCodeLenght, message: MIN_LENGTH},
         maxLength: {value: maxCodeLenght, message: MAX_LENGTH_6}
      }},
      {description: globalOption3, select: globalOption3, 
         options: [
            {value: materialType1, name: materialType1},
            {value: materialType2, name: materialType2},
         ], defaultValue: defaultValue},
      {description: globalOption4, id: globalOption4, validate: {
         required: REQUIRED_MATERIAL, 
         minLength: {value: minCodeLenght, message: MIN_LENGTH},
         maxLength: {value: maxCodeLenght, message: MAX_LENGTH_6}
      }},
      {description: globalOption5, id: globalOption5, validate: {
         required: REQUIRED_MATERIAL, 
         minLength: {value: minCodeLenght, message: MIN_LENGTH},
         maxLength: {value: maxCodeLenght, message: MAX_LENGTH_6}
      }},
      {description: globalOption6, id: globalOption6, validate: {
         required: REQUIRED_THICKNESS, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 2, message: MAX_LENGTH_2},
         max: {value: maxTabletopThickness, message: MAX},
         min: {value: minTabletopThickness, message: MIN},
      }, attribute: {max: maxTabletopThickness, min: minTabletopThickness, step: 1}},
      {description: globalOption7, id: globalOption7, validate: {
         required: REQUIRED_HEIGHT, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         max: {value: maxKitchenHeight, message: MAX},
         min: {value: minKitchenHeight, message: MIN},
      }, attribute: {max: maxKitchenHeight, min: minKitchenHeight, step: 1}},
      {description: globalOption8, id: globalOption8, validate: {
         required: REQUIRED_HEIGHT, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         max: {value: maxSectionHeight, message: MAX},
         min: {value: minKitchenHeight, message: MIN},
      }, attribute: {max: maxSectionHeight, min: minKitchenHeight, step: 1}},
      {description: globalOption9, id: globalOption9, validate: {
         required: REQUIRED_HEIGHT, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         max: {value: maxSectionHeight, message: MAX},
         min: {value: minMezzanineHeight, message: MIN},
      }, attribute: {max: maxSectionHeight, min: minMezzanineHeight, step: 1, readOnly: editableMezzanineHeight}},
      {description: globalOption10, id: globalOption10, validate: {
         required: REQUIRED_HEIGHT,
         min: {value: minUpSectionHeight, message: MIN},
      }, attribute: {min: minUpSectionHeight, readOnly: true}},
      {description: globalOption11, id: globalOption11, validate: {
         required: REQUIRED_HEIGHT, 
         minLength: {value: 1, message: MIN_LENGTH_1},
         maxLength: {value: 4, message: MAX_LENGTH_4},
         max: {value: maxPlinthHeight, message: MAX},
         min: {value: minPlinthHeight, message: MIN},
      }, attribute: {max: maxPlinthHeight, min: minPlinthHeight, step: 1}},
   ]

   return (
      <>
         <Title className={className + titleClass} title={title} />
         <div className={`${className}${dimensionClass} ${section1}`}>
            {globalOptions.map((option, index) => 
               !option.select 
               ? <MyFormInput key={index} className={section1 + itemClass} 
                  option={option} register={register} errors={errors[option.id]} />
               : <MySelect1 key={index} className={section1 + itemClass}
                  options={option} register={register} />   
            )}
         </div>
      </>
   );
}