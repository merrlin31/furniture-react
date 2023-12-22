import { dimensionClass, globalOption1, globalOption10, globalOption11, globalOption2, globalOption3, globalOption4, 
   globalOption5, globalOption6, globalOption7, globalOption8, globalOption9, itemClass, materialType1, materialType2, titleClass } from "../../utils/description";
import { section1 } from "../properties/inputProperties";
import { Title } from "../Title";
import { MyInput } from "../UI/MyInput/MyInput";
import { MySelect } from "../UI/MySelect/MySelect";

export const GlobalOptions = ({className, value, setValue, title}) => {

   const globalOptions = [
      {name: globalOption1, id: globalOption1},
      {name: globalOption2, id: globalOption2},
      {name: globalOption3, select: globalOption3, 
         options: [
            {value: materialType1, name: materialType1},
            {value: materialType2, name: materialType2},
         ], defaulValue: 'materialTypeDefaultValue'},
      {name: globalOption4, id: globalOption4},
      {name: globalOption5, id: globalOption5},
      {name: globalOption6, id: globalOption6},
      {name: globalOption7, id: globalOption7},
      {name: globalOption8, id: globalOption8},
      {name: globalOption9, id: globalOption9},
      {name: globalOption10, id: globalOption10, attribute: {readOnly: true}},
      {name: globalOption11, id: globalOption11},
   ]

   return (
      <>
         <Title className={className + titleClass} title={title} />
         <div className={`${className}${dimensionClass} ${section1}`}>
            {globalOptions.map((option, index) => 
               !option.select 
               ? <MyInput option={option} className={section1 + itemClass}  
                  key={index} value={value[option.id]} onChange={e => setValue({...value, [option.id]: +e.target.value})} />
               : <MySelect options={option} className={section1 + itemClass}
                  key={index} value={value[option.select]} onChange={(item) => setValue({...value, [option.select]: item})} />   
            )}
         </div>
      </>
   );
}