import { useState } from "react";
import { btnContainerClass, detailClass, detailInputClass, detailType4, edge1, edge2, section3BtnClass, titleClass } from "../../utils/description";
import { DetailingItem } from ".././detailing/DetailingItem";
import { Title } from "../Title";
import { AddDetail } from "../UI/AddDetail";
import { MyModal } from "../UI/MyModal/MyModal";
import { DetailingThead } from "./DetailingThead";
import { ReactComponent as AddLogo } from "../../img/plus-solid.svg";
import { Detail } from "../../utils/Detail";
import { detailId } from "../properties/inputProperties";

export const DetailingTable = ({className, title, parent, details, sections, editSection, type, edge, addedDetails = [], setAddedDetails}) => {

   const [modal, setModal] = useState(false)

   const editItem = (detail) => {
      let index = detail.id.split('.')
      let section = Object.assign({}, sections.find(obj => obj.id === +index[0]))
      for (let item in detail) {
         if (detail[item] !== section[type][index[1]][item])
         section[type][index[1]][item] = detail[item]
      }
      editSection(section, +index[0])
   }
   const editNewItem = (detail) => {
      let adeedDetail = addedDetails.find(obj => obj.id === detail.id)
      for (let item in detail) {
         if (detail[item] !== adeedDetail[item])
         adeedDetail[item] = detail[item]
      }
      let result = addedDetails.map(item => 
         item.id !== detail.id
         ? item
         : adeedDetail)
      setAddedDetails(result)
   }
   const deleteItem = (detail) => {
      let index = detail.id.split('.')
      let section = Object.assign({}, sections.find(obj => obj.id === +index[0]))
      section[type][index[1]] = {}
      editSection(section, +index[0])
   }
   const deleteNewItem = (detail) => {
      setAddedDetails(addedDetails.filter(obj => obj.id !== detail.id))
   }
   function edgeSelector(edge) {
      switch(edge) {
         case edge1:
            return 2
         case edge2: 
            return 1
         default:
            return 0
      }
   }
   const addDetail = (detail) => {
      let newDetail = new Detail(detail.name, detail.height, detail.width, detail.amount, 
         [edgeSelector(detail.topEdge), edgeSelector(detail.bottomEdge), edgeSelector(detail.leftEdge), edgeSelector(detail.rightEdge)], 
         detail.materialCode, detail.materialType)

      newDetail.id = (detailId.next().value) + '.' + detail.name
      newDetail.added = true
      setAddedDetails([...addedDetails, newDetail])
      setModal(false)   
   }
   const addItem = () => {
      setModal(true)
   }
   
   return (
      <div className={className}>
         <Title className={parent + titleClass} title={title} />
         <table className={parent + detailClass}>
            <DetailingThead edge={edge}/>
            <tbody className={parent + detailInputClass}>
               {details.map((detail) =>
                  <DetailingItem detail={detail} key={detail.id} edge={edge} edit={editItem} delete1={deleteItem} />
               )}
               {addedDetails.map((detail) =>
                  <DetailingItem detail={detail} key={detail.id} edge={edge} edit={editNewItem} delete1={deleteNewItem} />
               )}
            </tbody>
         </table>
         { type !== detailType4 && 
            <div className={btnContainerClass}><AddLogo className={parent + section3BtnClass} onClick={addItem} /></div>}
         <MyModal visible={modal} setVisible={setModal}>
            <AddDetail addDetail={addDetail} type={type} />
         </MyModal>
      </div>
   );
}