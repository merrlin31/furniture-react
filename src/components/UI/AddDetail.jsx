import { useState } from "react";
import { addDetailBtnColor, detailType1, detailType3, edge1, edge2, edge3, 
   materialType1, materialType2, materialType3 } from "../../utils/description";
import { MyButton } from "./MyButton/MyButton";
import { MyInput } from "./MyInput/MyInput";
import { MySelect } from "./MySelect/MySelect";

export const AddDetail = (props) => {
   
   const translate = 'addDetail.'
   const inputType = 'text'
   const option1 = 'name'
   const option2 = 'height'
   const option3 = 'width'
   const option4 = 'amount'
   const option5 = 'topEdge'
   const option6 = 'bottomEdge'
   const option7 = 'leftEdge'
   const option8 = 'rightEdge'
   const option9 = 'materialCode'
   const option10 = 'materialType'
   const inputClass = 'addFurnitureItem'
   const furnitureModalContainerClass = 'furnitureModalContainer'
   const edge = [edge3, edge2, edge1]
   const materialType = [materialType1, materialType2]
   let initialDetailProperties = {
      [option1]: '',
      [option2]: '',
      [option3]: '',
      [option4]: 1,
      [option5]: edge3,
      [option6]: edge3,
      [option7]: edge3,
      [option8]: edge3,
      [option9]: '',
      [option10]: materialType1,
   }
   if (props.type === detailType3) initialDetailProperties[option10] = materialType3
   const [detail, setDetail] = useState(initialDetailProperties)
   const addDetail = () => {
      props.addDetail(detail)
   }
   const changeValue = (e) => {
      if (e.target.id !== option1) {
         setDetail({...detail, [e.target.id]: +e.target.value})
      } else {
         setDetail({...detail, [e.target.id]: e.target.value})
      }
   }

   const edgeElement = (edgeSide) => ({name: edgeSide, select: edgeSide, 
         options: edge.map(item => ({value: item, name: item}))
         , defaulValue: 'choiseEdgeDefaultValue'})
   

   const options = [
      {name: option1, id: option1, type:inputType},
      {name: option10, select: option10, 
         options: materialType.map(item => ({value: item, name: item}))
         , defaulValue: 'materialTypeDefaultValue'},
      {name: option9, id: option9,},
      {name: option4, id: option4,},
      {name: option2, id: option2,},
      {name: option3, id: option3,},
      edgeElement(option5),
      edgeElement(option6),
      edgeElement(option7),
      edgeElement(option8),
   ]

   if (props.type === detailType3) {
      options.splice(1, 2)
      options.splice(-4, 4)
      options.push({name: option9, id: option9,})
   } else if (props.type === detailType1) {
      options.splice(1, 2)
      options.push({name: option9, id: option9,})
   }

   return (
      <div>
         <div className={furnitureModalContainerClass}>
            {options.map((option) =>
               !option.select  
                  ? <MyInput key={option.name} className={inputClass} option={option} value={detail[option.name]} 
                     onChange={changeValue} translate={translate} />
                  : <MySelect key={option.name} className={inputClass} options={option} value={detail[option.select]} 
                     onChange={(item) => setDetail({...detail, [option.select]: item})} translate={translate} />
            )}
         </div>
         <MyButton color={addDetailBtnColor} onClick={addDetail}>Додати</MyButton>
      </div>
   );
}