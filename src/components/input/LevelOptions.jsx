import { useEffect, useState } from "react";
import { amountTypeClass, botTypeClass, levelAmount1, levelType1, levelType3, levelTypeClass, titleClass, topTypeClass } from "../../utils/description";
import { changeLevel, levelAmount, levelBottomOptions, levelName, levelTopOptions, section2 } from "../properties/inputProperties";
import { Title } from "../Title";
import { MySelect } from "../UI/MySelect/MySelect";

export const LevelOptions = ({className, value, setValue, title}) => {

   const [levelOptions, setLevelOptions] = useState({defaulValue: 'levelDefaulValue',
      options: []
   })

   useEffect(() => {
      if (value.topLevel === levelAmount1) {
         setLevelOptions({...levelOptions, options: changeLevel()})
         setValue({...value, heightMezzanineSection: 0})
            if (value.level === levelType3) {
               setValue({...value, heightMezzanineSection: 0, level: levelType1})
            }
      } else {
         setLevelOptions({...levelOptions, options: levelName})
         setValue({...value, heightMezzanineSection: 400})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.topLevel])

   return (
      <>
         <Title className={className + titleClass} title={title} />
         <div className={`${className}__${section2}`}>
            <MySelect className ={section2 + amountTypeClass} options={levelAmount} 
               value={value.topLevel} onChange={(v) => setValue({...value, topLevel: v})} />
            <MySelect className ={section2 + levelTypeClass} options={levelOptions} 
               value={value.level} onChange={(v) => setValue({...value, level: v})} />
            {value.level === levelType1
               ? <MySelect className ={section2 + botTypeClass} options={levelBottomOptions} 
               value={value.bottomType} onChange={(v) => setValue({...value, bottomType: v})} />
               : <MySelect className ={section2 + topTypeClass} options={levelTopOptions} 
               value={value.upperType} onChange={(v) => setValue({...value, upperType: v})} />
            }
         </div> 
      </>     
   );
}