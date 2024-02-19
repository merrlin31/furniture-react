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

export const SpecificationRow = ({name, description, code, amount, price = 0, material, discount, change, allPrice}) => {

   const dispatch = useDispatch()
   const [editeble, setEditeble] = useState(false)
   let key = setKey(allPrice?.id)
   const id1 = 'amount'
   const id2 = 'price'
   const id3 = 'code'

   let initialItem = {name, code, amount, material, description}
   const [item, setItem] = useState(initialItem)
   const totalPrice = amount * price
   
   const editItem = () => {
      setEditeble(true) 
   }

   const deleteItem = () => {
      change({...item, amount: 0})
   }

   const update = () => {
      change(item)
      setEditeble(false)
   }

   const cancel = () => {
      setItem(initialItem)
      setEditeble(false)
   }

   const updatePrice = (e) => {
      dispatch(editValue(key, item.name, +e.target.value))
   }
   
   const onChange = (e) => {
      setItem({...item, [e.target.id]: +e.target.value})
   }

   useEffect(() => {
      setItem(initialItem)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [amount])

   return (
      <tr>
         <td>{description}</td>
         {!editeble
            ? <td>{code}</td>
            : material
               ? <td>{code}</td>
               : <td><MyEditableInput id={id3} value={item.code} onChange={onChange} /></td>
         }
         {!editeble
            ? <td>{amount}</td>
            : <td><MyEditableInput id={id1} value={item.amount} onChange={onChange} /></td>
         }
         {!editeble
            ? <td>{+price.toFixed(2)}</td>
            : material
               ? <td>{+price.toFixed(2)}</td>
               : <td><MyEditableInput id={id2} value={price} 
                  onChange={updatePrice} /></td>
         }
         <td>{+(totalPrice).toFixed(2)}</td>
         <td>{+(totalPrice * discount / 100).toFixed(2)}</td>
         <td>{+(totalPrice - totalPrice * discount / 100).toFixed(2)}</td>
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