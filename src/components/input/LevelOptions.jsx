import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeValues } from "../../reducers/productReducer";
import { amountTypeClass, botTypeClass, levelAmount1, levelType1, levelType3, levelTypeClass, titleClass, topTypeClass } from "../../utils/description";
import { changeLevel, levelAmount, levelBottomOptions, levelName, levelTopOptions, section2 } from "../properties/inputProperties";
import { Title } from "../Title";
import { MySelect } from "../UI/MySelect/MySelect";

export const LevelOptions = ({className, value, title}) => {

   const dispatch = useDispatch()
   const [levelOptions, setLevelOptions] = useState({defaulValue: 'levelDefaulValue',
      options: []
   })

   useEffect(() => {
      if (value.topLevel === levelAmount1) {
         setLevelOptions({...levelOptions, options: changeLevel()})
         dispatch(changeValues({heightMezzanineSection: 0}))
            if (value.level === levelType3) {
               dispatch(changeValues({heightMezzanineSection: 0, level: levelType1}))
            }
      } else {
         setLevelOptions({...levelOptions, options: levelName})
         dispatch(changeValues({heightMezzanineSection: 400}))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [value.topLevel])
   
   return (
      <>
         <Title className={className + titleClass} title={title} />
         <div className={`${className}__${section2}`}>
            <MySelect className ={section2 + amountTypeClass} options={levelAmount} 
               value={value.topLevel} onChange={(v) => dispatch(changeValues({topLevel: v}))} />
            <MySelect className ={section2 + levelTypeClass} options={levelOptions} 
               value={value.level} onChange={(v) => dispatch(changeValues({level: v}))} />
            {value.level === levelType1
               ? <MySelect className ={section2 + botTypeClass} options={levelBottomOptions} 
               value={value.bottomType} onChange={(v) => dispatch(changeValues({bottomType: v}))} />
               : <MySelect className ={section2 + topTypeClass} options={levelTopOptions} 
               value={value.upperType} onChange={(v) => dispatch(changeValues({upperType: v}))} />
            }
         </div> 
      </>     
   );
}