import { useState } from "react";
import { ReactComponent as EditLogo } from "../../img/pencil-solid.svg";
import { ReactComponent as DeleteLogo } from "../../img/trash-solid.svg";
import { ReactComponent as CheckLogo } from "../../img/circle-check-solid.svg";
import { ReactComponent as CancelLogo } from "../../img/xmark-solid.svg";
import { plinthName, tabletopName } from "../properties/detailingProperties";
import { iconsClass } from "../../utils/description";
import { useTranslation } from "react-i18next";
import { MyEditableInput } from "../UI/MyInput/MyInput";

export const DetailingItem = ({detail, edge, edit, delete1}) => {

   const {t} = useTranslation()
   const [editeble, setEditeble] = useState(false)
   const [updateDetail, setUpdateDetail] = useState(detail)
   let visibleIcons = true
   const details = 'details.'
   const searchItem = 'edge'
   const detailKey1 = 'materialCode'
   const detailKey2 = 'height'
   const detailKey3 = 'width'
   const detailKey4 = 'amount'
   const edgeId1 = 'edge.top'
   const edgeId2 = 'edge.bottom'
   const edgeId3 = 'edge.left'
   const edgeId4 = 'edge.right'
   
   const editItem = () => {
      setEditeble(true)
      
   }

   const deleteItem = () => {
      delete1(updateDetail)
   }

   const update = () => {
      setEditeble(false)
      edit(updateDetail)
   }

   const cancel = () => {
      setEditeble(false)
      setUpdateDetail(detail)
   }

   const change = (e) => {
      let name = e.target.id.split('.')
      if (name[0] !== searchItem) {
         setUpdateDetail({...updateDetail, [name[0]]: +e.target.value})
      } else {
         setUpdateDetail({...updateDetail, [name[0]]: {...updateDetail.edge, [name[1]]: +e.target.value}})
      }
   }
   let id = detail.id.split('.')
   let name
   if (detail.added) {
      name = id[1]
   } else {
      if (id[0] === plinthName || id[0] === tabletopName) {
         visibleIcons = false
         id[0] = t(details + id[0])
      }
      name = id[0] + ". " + t(details + id[1])
   }

   return (
      <>
      {!editeble
         ? <tr>
         <td>{name}</td>
         <td>{detail[detailKey1]}</td>
         <td>{detail[detailKey2]}</td>
         <td>{detail[detailKey3]}</td>
         <td>{detail[detailKey4]}</td>
         {!edge &&
            <>
               <td>{detail.edge.top}</td>
               <td>{detail.edge.bottom}</td>
               <td>{detail.edge.left}</td>
               <td>{detail.edge.right}</td>
            </>
         }
         <td>
            {visibleIcons &&
               <div className={iconsClass}>
                  <EditLogo onClick={editItem} />
                  <DeleteLogo onClick={deleteItem} />
               </div>
            }
         </td>
      </tr>

         : <tr>
         <td>{name}</td>
         <td><MyEditableInput id={detailKey1} value={updateDetail[detailKey1]} onChange={change} /></td>
         <td><MyEditableInput id={detailKey2} value={updateDetail[detailKey2]} onChange={change} /></td>
         <td><MyEditableInput id={detailKey3} value={updateDetail[detailKey3]} onChange={change} /></td>
         <td><MyEditableInput id={detailKey4} value={updateDetail[detailKey4]} onChange={change} /></td>
         {!edge &&
            <>
               <td><MyEditableInput id={edgeId1} value={updateDetail.edge.top} onChange={change} /></td>
               <td><MyEditableInput id={edgeId2} value={updateDetail.edge.bottom} onChange={change} /></td>
               <td><MyEditableInput id={edgeId3} value={updateDetail.edge.left} onChange={change} /></td>
               <td><MyEditableInput id={edgeId4} value={updateDetail.edge.right} onChange={change} /></td>
            </>
         }     
         <td>
            <div className={iconsClass}>
               <CheckLogo onClick={update} />
               <CancelLogo onClick={cancel} />
            </div>
         </td>  
      </tr>
      
      }
      </>
   );
}