import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { btnContainerClass, section4BtnClass, TblClass, titleClass } from "../../utils/description"
import { discount } from "../../utils/furniture"
import { Title } from "../Title"
import { SpecificationMaterials } from "./SpecificationMaterials"
import { SpecificationTbody } from "./SpecificationTbody"
import { SpecificationTfoot } from "./SpecificationTfoot"
import { SpecificationThead } from "./SpecificationThead"
import { ReactComponent as AddLogo } from "../../img/plus-solid.svg";
import { MyModal } from "../UI/MyModal/MyModal"
import { AddFurniture } from "../UI/AddFurniture"


export const SpecificationTable = (props) => {

   const table = useRef(null)
   const [modal, setModal] = useState(false)
   const sumColumn = 4
   const addedFurniture = 'addedFurniture'

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
      if (searchItem) {
         searchItem.value += furnitureItem.value

         let result = props.content.map(obj => 
            obj.code === furnitureItem.code
            ? searchItem
            : obj)
            props.setContent(result)

      } else {
         furnitureItem.name = addedFurniture + props.content.length
         props.setContent([...props.content, furnitureItem])
         props.object[furnitureItem.name] = furnitureItem
         props.setPrice({...props.price, [furnitureItem.name]: furnitureItem.price})
      } 
      setModal(false)     
   }

   return (
      <div className={props.class + TblClass}>
         <Title className={props.class + titleClass} title={props.title} />
         <table ref={table} className={props.class + props.tableClass}>
            <SpecificationThead />
            {props.materials && 
               <SpecificationMaterials materials={props.materials} setContent={props.setMaterials} />}
            <SpecificationTbody content={props.content} setContent={props.setContent} object={props.object} 
               price={props.price} discount={discount} setPrice={props.setPrice} translate={props.translate} />
            <SpecificationTfoot sum={props.sum} />
         </table>
         <div className={btnContainerClass}><AddLogo className={props.class + section4BtnClass} onClick={addItem} /></div>
         <MyModal visible={modal} setVisible={setModal}>
            <AddFurniture addFurniture={addFurniture} materials={props.materials} />
         </MyModal>
      </div>
   );
}