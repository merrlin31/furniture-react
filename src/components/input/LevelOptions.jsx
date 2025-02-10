import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { amountTypeClass, botTypeClass, globalOption9, levelAmount1, levelOption1, levelType1, levelType3, levelTypeClass, minMezzanineSectionHeight1Level, minMezzanineSectionHeight2Level, titleClass, topTypeClass } from "../../utils/description";
import { changeLevel, levelAmount, levelName, section2 } from "../properties/inputProperties";
import { Title } from "../Title";
import { MySelect1 } from "../UI/MySelect/MySelect";

export const LevelOptions = ({className, value, title, levelBottomOptions, levelTopOptions}) => {
   const { register, setValue } = useFormContext();
   
   const defaultValue = 'levelDefaulValue'
   const [levelOptions, setLevelOptions] = useState({defaultValue: defaultValue, select: levelOption1,
      options: []
   })

   useEffect(() => {
      if (value.topLevel === levelAmount1) {
         setLevelOptions({...levelOptions, options: changeLevel()})
         setValue(globalOption9, minMezzanineSectionHeight2Level)
            if (value.level === levelType3) {
               setValue(levelOption1, levelType1)
               setValue(globalOption9, minMezzanineSectionHeight2Level)
               setValue(globalOption9, minMezzanineSectionHeight2Level)
            }
      } else {
         setLevelOptions({...levelOptions, options: levelName})
         setValue(globalOption9, minMezzanineSectionHeight1Level)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.topLevel])
   
   return (
      <>
         <Title className={className + titleClass} title={title} />
         <div className={`${className}__${section2}`}>
            <MySelect1 className ={section2 + amountTypeClass} options={levelAmount} 
               register={register} />
            <MySelect1 className ={section2 + levelTypeClass} options={levelOptions} 
               register={register} />
            {value.level === levelType1
               ? <MySelect1 className ={section2 + botTypeClass} options={levelBottomOptions} 
               register={register} />
               : <MySelect1 className ={section2 + topTypeClass} options={levelTopOptions} 
               register={register} />
            }
         </div> 
      </>     
   );
}


