import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { btnContainerClass, detailingTableResponsive, section4BtnClass, TblClass, titleClass } from "../../utils/description"
import { discount } from "../../utils/furniture"
import { Title } from "../Title"
import { SpecificationMaterials } from "./SpecificationMaterials"
import { SpecificationTbody } from "./SpecificationTbody"
import { SpecificationTfoot } from "./SpecificationTfoot"
import { SpecificationThead } from "./SpecificationThead"
import { ReactComponent as AddLogo } from "../../img/plus-solid.svg";
import { MyModal } from "../UI/MyModal/MyModal"
import { AddFurniture } from "../UI/AddFurniture"
import { useDispatch } from "react-redux"
import { editValue, setKey } from "../../reducers/settingReducer"


export const SpecificationTable = (props) => {

   const table = useRef(null)
   const [modal, setModal] = useState(false)
   const sumColumn = 4
   const addedFurniture = 'addedFurniture'
   const dispatch = useDispatch()
   let key = setKey(props.price.id)

   useEffect(() => {
      if (table.current) {
      let totalSum = 0
      let totalDiscount = 0
      let totalSumWithDiscount = 0
      for (let i = 1; i < table.current.rows.length - 1; i++) {
         let tr = table.current.rows[i]
         totalSum += +tr.cells[sumColumn].textContent
         totalDiscount += +tr.cells[sumColumn + 1].textContent
         totalSumWithDiscount += +tr.cells[sumColumn + 2].textContent  
      }
      props.setSum({totalSum:totalSum, totalDiscount:totalDiscount, totalSumWithDiscount:totalSumWithDiscount})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.content, props.materials, props.price])

   const addItem = () => {
      setModal(true)
   }

   const addFurniture = (furnitureItem) => {
      let searchItem = props.content.find((item) => item.code === furnitureItem.code)
      if (!searchItem) {
         furnitureItem.name = addedFurniture + Object.keys(props.object).length
         props.object[furnitureItem.name] = furnitureItem
         dispatch(props.addContent(furnitureItem))
         dispatch(editValue(key, furnitureItem.name, furnitureItem.price))
      } else {
         return alert('Such item has already existed')
      } 
      setModal(false)     
   }

   return (
      <div className={props.class + TblClass}>
         <Title className={props.class + titleClass} title={props.title} />
         <div className={props.class + detailingTableResponsive}>
            <table ref={table} className={props.class + props.tableClass}>
               <SpecificationThead />
               {props.materials && 
                  <SpecificationMaterials materials={props.materials} />}
               <SpecificationTbody content={props.content} editContent={props.editContent}
                  price={props.price} discount={discount} translate={props.translate} />
               <SpecificationTfoot sum={props.sum} />
            </table>
         </div>   
         <div className={btnContainerClass}><AddLogo className={props.class + section4BtnClass} onClick={addItem} /></div>
         <MyModal visible={modal} setVisible={setModal}>
            <AddFurniture addFurniture={addFurniture} materials={props.materials} />
         </MyModal>
      </div>
   );
}