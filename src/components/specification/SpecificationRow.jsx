import { useState } from "react"
import { ReactComponent as EditLogo } from "../../img/pencil-solid.svg";
import { ReactComponent as DeleteLogo } from "../../img/trash-solid.svg";
import { ReactComponent as CheckLogo } from "../../img/circle-check-solid.svg";
import { ReactComponent as CancelLogo } from "../../img/xmark-solid.svg";
import { useEffect } from "react";
import { iconsClass } from "../../utils/description";
import { MyEditableInput } from "../UI/MyInput/MyInput";
import { useDispatch } from "react-redux";
import { editValue, setKey } from "../../reducers/settingReducer";
import { MyEditableSelect } from "../UI/MySelect/MySelect";
import { useTranslation } from "react-i18next";
import { selectMaterialType } from "../properties/detailingProperties";

export const SpecificationRow = ({material, change, allPrice, multiplicity, deleteFunc, manufacturer, manufacturerOptions, 
   name, description, code, amount, price = 0, totalPrice, discount, totalSum}) => {

   const dispatch = useDispatch()
   const [editeble, setEditeble] = useState(false)
   const {t} = useTranslation()
   let key = setKey(allPrice?.id)
   const id1 = 'amount'
   const id2 = 'price'
   const id3 = 'code'
   const id4 = 'manufacturer'
   const id5 = 'material'

   let initialItem = {name, code, amount, material, description, price, manufacturer}
   const [item, setItem] = useState(initialItem)

   const editItem = () => {
      setEditeble(true) 
   }
   const deleteItem = () => {
      deleteFunc({...item, amount: 0})
   }
   const update = () => {
      change(item, {difference: item.amount - amount, code, multiplicity, material})
      setEditeble(false)
   }
   const cancel = () => {
      setItem(initialItem)
      setEditeble(false)
   }
   const updatePrice = (e) => {
      setItem({...item, [e.target.id]: +e.target.value})
      if (!material) dispatch(editValue(key, item.name, +e.target.value));
   }
   const onChange = (e) => {
      setItem({...item, [e.target.id]: +e.target.value})
   }
   useEffect(() => {
      setItem(initialItem)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [amount, manufacturer, price, code, material, description])

   return (
      <tr>
         {!editeble
            ? <td>{description}</td>
            : code && material
               ? <td><MyEditableSelect id={id5} options={selectMaterialType} value={item.material} onChange={v => setItem({...item, material: v, description: v})} /></td>
               : <td>{description}</td>
         }  
         {!editeble
            ? <td>{t(manufacturer)}</td>
            : !code && material
               ? <td>{t(manufacturer)}</td>
               : <td><MyEditableSelect id={id4} options={manufacturerOptions} value={item.manufacturer} onChange={v => setItem({...item, manufacturer: v})} /></td>
         }
         {!editeble
            ? <td>{code}</td>
            : !code && material
               ? <td>{code}</td>
               : <td><MyEditableInput id={id3} value={item.code} onChange={onChange} /></td>
         }
         {!editeble
            ? <td>{amount}</td>
            : <td><MyEditableInput id={id1} value={item.amount} onChange={onChange} /></td>
         }
         {!editeble
            ? <td>{+price.toFixed(2)}</td>
            : <td><MyEditableInput id={id2} value={item.price} onChange={updatePrice} /></td>
         }
         <td>{+(totalPrice).toFixed(2)}</td>
         <td>{+(discount).toFixed(2)}</td>
         <td>{+(totalSum).toFixed(2)}</td>
         <td>
            {!editeble
               ? <div className={iconsClass}>
                     <EditLogo onClick={editItem} />
                     <DeleteLogo onClick={deleteItem} />
               </div>
               : <div className={iconsClass}>
                     <CheckLogo onClick={update} />
                     <CancelLogo onClick={cancel} />
               </div>
            }
         </td>
      </tr>        
   );
}