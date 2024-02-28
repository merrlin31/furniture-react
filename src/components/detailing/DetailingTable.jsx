import { useState } from "react";
import { btnContainerClass, detailClass, detailingTableResponsive, detailInputClass, detailType4, edge1, edge2, section3BtnClass, titleClass } from "../../utils/description";
import { DetailingItem } from ".././detailing/DetailingItem";
import { Title } from "../Title";
import { AddDetail } from "../UI/AddDetail";
import { MyModal } from "../UI/MyModal/MyModal";
import { DetailingThead, sort1 } from "./DetailingThead";
import { ReactComponent as AddLogo } from "../../img/plus-solid.svg";
import { Detail } from "../../utils/Detail";
import { detailId } from "../properties/inputProperties";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { editSectionObject } from "../../reducers/productReducer";
import { addToAddedDetail, deleteAddedDetail, editAddedDetail } from "../../reducers/detailReducer";

export const DetailingTable = ({className, title, parent, details, type, edge, addedDetails = [], typeAddedDetails}) => {

   const [modal, setModal] = useState(false)
   const [selectedSort, setSelectedSort] = useState('')
   const dispatch = useDispatch()

   const editItem = (detail) => {
      let index = detail.id.split('.')
      dispatch(editSectionObject(type, +index[0], index[1], detail))
   }
   const editNewItem = (detail) => {
      dispatch(editAddedDetail(typeAddedDetails, detail))
   }
   const deleteItem = (detail) => {
      let index = detail.id.split('.')
      dispatch(editSectionObject(type, +index[0], index[1]))
   }
   const deleteNewItem = (detail) => {
      dispatch(deleteAddedDetail(typeAddedDetails, detail))
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
      newDetail.id = typeAddedDetails + (detailId.next().value) + '.' + detail.name
      newDetail.added = true
      dispatch(addToAddedDetail(typeAddedDetails, newDetail))
      setModal(false)   
   }
   const addItem = () => {
      setModal(true)
   }

   const sort = useMemo(() => {
      const sortArray = [...details, ...addedDetails]
      if(selectedSort === sort1) return sortArray
      if(selectedSort) {
         return sortArray.sort((a,b) => b[selectedSort] - a[selectedSort])
      }
      return sortArray
   }, [selectedSort, details, addedDetails])
   
   return (
      <div className={className}>
         <Title className={parent + titleClass} title={title} />
         <div className={parent + detailingTableResponsive}>
            <table className={parent + detailClass}>
               <DetailingThead edge={edge} sort={setSelectedSort} />
               <tbody className={parent + detailInputClass}>
                  {sort.map((detail) => 
                     !detail.added 
                        ? <DetailingItem detail={detail} key={detail.id} edge={edge} edit={editItem} deleteDetail={deleteItem} /> 
                        : <DetailingItem detail={detail} key={detail.id} edge={edge} edit={editNewItem} deleteDetail={deleteNewItem} />
                  )}
               </tbody>  
            </table>
         </div>
         { type !== detailType4 && 
            <div className={btnContainerClass}><AddLogo className={parent + section3BtnClass} onClick={addItem} /></div>}
         <MyModal visible={modal} setVisible={setModal}>
            <AddDetail addDetail={addDetail} type={type} />
         </MyModal>
      </div>
   );
}