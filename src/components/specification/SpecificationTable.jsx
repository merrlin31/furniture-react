import { useEffect, useMemo, useState } from "react"
import { btnContainerClass, detailingTableResponsive, materialType1, materialType1SheetArea, materialType3, 
   materialType4, section4BtnClass, serviceManufacturer, TblClass, titleClass } from "../../utils/description"
import { discount } from "../../utils/furniture"
import { Title } from "../Title"
import { SpecificationMaterials } from "./SpecificationMaterials"
import { SpecificationTbody } from "./SpecificationTbody"
import { SpecificationTfoot } from "./SpecificationTfoot"
import { sort1, sort2, SpecificationThead } from "./SpecificationThead"
import { ReactComponent as AddLogo } from "../../img/plus-solid.svg";
import { MyModal } from "../UI/MyModal/MyModal"
import { AddItem } from "../UI/AddItem"
import { useDispatch, useSelector } from "react-redux"
import { editValue, FURNITURES, setKey } from "../../reducers/settingReducer"

export const SpecificationTable = (props) => {
   const [modal, setModal] = useState(false)
   const [selectedSort, setSelectedSort] = useState('')
   const edgeDiscount = 7
   const addedFurniture = 'addedFurniture'
   const addedService = 'addedService'
   const dispatch = useDispatch()
   const tabletopLength = useSelector(state => state.setting.servicePrices.tabletopLength)
   const valueDifference = useSelector(state => state.product.valueDifference)
   let key = setKey(props.price.id)

   useEffect(() => {
      let totalSum = finalItems.reduce((acc, item) => acc + item.totalPrice, 0)
      let totalDiscount = finalItems.reduce((acc, item) => acc + item.discount, 0)
      let totalSumWithDiscount = finalItems.reduce((acc, item) => acc + item.totalSum, 0)
      if (props.materials) {
         totalSum += finalMaterials.reduce((acc, material) => acc + material.totalPrice + material.boldEdgeTotalPrice + material.thinEdgeTotalPrice, 0)
         totalDiscount += finalMaterials.reduce((acc, material) => acc + material.discount + material.boldEdgeDiscount + material.thinEdgeDiscount, 0)
         totalSumWithDiscount += finalMaterials.reduce((acc, material) => acc + material.totalSum + material.boldEdgeTotalSum + material.thinEdgeTotalSum, 0)
      }
      props.setSum({totalSum:totalSum, totalDiscount:totalDiscount, totalSumWithDiscount:totalSumWithDiscount})
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [props.content, props.materials, props.price])

   const addItem = () => {
      setModal(true)
   }
   const addNewItem = (newItem) => {
      let searchItem = props.content.find((item) => item.code === newItem.code)
      if (!searchItem) {
         let obj = {code: newItem.code, value: newItem.value, description: newItem.description}
         if (key === FURNITURES) {
            obj.name = addedFurniture + Object.keys(props.object).length
            obj.manufacturer = newItem.manufacturer
            obj.multiplicity = newItem.multiplicity
         } else {
            obj.name = addedService + Object.keys(props.object).length
         }
         props.object[obj.name] = obj
         dispatch(props.addContent(obj))
         dispatch(editValue(key, obj.name, newItem.price))
      } else {
         return alert('Such item has already existed')
      } 
      setModal(false)     
   }
   
   let finalMaterials, finalItems
   if (props.materials) {
      finalMaterials = props.materials.map(material => {
         let dif = valueDifference.find(obj => obj.code === material.materialCode)
         let value = dif?.value || 0
         let boldEdgeValue = dif?.boldEdge || 0
         let thinEdgeValue = dif?.thinEdge || 0
         let amount = +(material.area + value).toFixed(2)
         if (material.material === materialType1 || material.material === materialType3) amount = Math.ceil(amount / materialType1SheetArea) 
         if (material.material === materialType4) amount = Math.ceil(amount / tabletopLength)
         if (amount < 0) amount = 0
         let boldEdge = Math.ceil(material.boldEdge + boldEdgeValue)
         let thinEdge = Math.ceil(material.thinEdge + thinEdgeValue)
         let totalPrice = +(material.price * amount).toFixed(2)
         let boldEdgeTotalPrice = +(material.boldEdgePrice * boldEdge).toFixed(2)
         let thinEdgeTotalPrice = +(material.thinEdgePrice * thinEdge).toFixed(2)
         let discount = +(totalPrice * material.discountValue / 100).toFixed(2)
         let boldEdgeDiscount = +(edgeDiscount * boldEdgeTotalPrice / 100).toFixed(2)
         let thinEdgeDiscount = +(edgeDiscount * thinEdgeTotalPrice / 100).toFixed(2)
         let totalSum = +(totalPrice - discount).toFixed(2)
         let boldEdgeTotalSum = +(boldEdgeTotalPrice - boldEdgeDiscount).toFixed(2)
         let thinEdgeTotalSum = +(thinEdgeTotalPrice - thinEdgeDiscount).toFixed(2)
         return {...material, amount, totalPrice, discount, totalSum, boldEdge, thinEdge, 
            boldEdgeTotalPrice, thinEdgeTotalPrice, boldEdgeDiscount, thinEdgeDiscount, boldEdgeTotalSum, thinEdgeTotalSum}
      }) 
   } 
   finalItems = props.content.map(item => {
      let value = valueDifference.find(obj => obj.code === item.code)?.value || 0
      let amount = +(item.value + value).toFixed(2)
      if (item.multiplicity) {
         amount = Math.ceil(amount / item.multiplicity)
      }
      let getDiscont = (discount[item.manufacturer])
         ? discount[item.manufacturer]
         : 0
      let totalPrice = +(props.price[item.name] * amount).toFixed(2) || 0
      let itemDiscount = +(totalPrice * getDiscont / 100).toFixed(2)
      let totalSum = +(totalPrice - itemDiscount).toFixed(2)
      let manufacturer = (item.manufacturer) ? item.manufacturer : serviceManufacturer
      return {...item, materialCode: item.code, amount, price: props.price[item.name] || 0, totalPrice, discount: itemDiscount, totalSum, manufacturer}
   })
   const sortMaterials = useMemo(() => {
      if (!props.materials) return
      if (selectedSort === sort1) return finalMaterials
      if (selectedSort === sort2) return finalMaterials.sort((a,b) => b[selectedSort] > a[selectedSort] ? -1 : 1)
      if (selectedSort) {
         return finalMaterials.sort((a,b) => b[selectedSort] - a[selectedSort])
      }
      return finalMaterials
   }, [selectedSort, props.materials, finalMaterials])

   const sortItem = useMemo(() => {
      if (selectedSort === sort1) return finalItems
      if (selectedSort === sort2) return finalItems.sort((a,b) => b[selectedSort] > a[selectedSort] ? -1 : 1)
      if (selectedSort) {
         return finalItems.sort((a,b) => b[selectedSort] - a[selectedSort])
      }
      return finalItems
   }, [selectedSort, finalItems])
   
   return (
      <div className={props.class + TblClass}>
         <Title className={props.class + titleClass} title={props.title} />
         <div className={props.class + detailingTableResponsive}>
            <table className={props.class + props.tableClass}>
               <SpecificationThead  sort={setSelectedSort} />
               {props.materials && 
                  <SpecificationMaterials sortMaterials={sortMaterials} />}
               <SpecificationTbody content={sortItem} editContent={props.editContent}
                  price={props.price} discount={discount} translate={props.translate} manufacturerOptions={props.manufacturerOptions} />
               <SpecificationTfoot sum={props.sum} />
            </table>
         </div>   
         <div className={btnContainerClass}><AddLogo className={props.class + section4BtnClass} onClick={addItem} /></div>
         <MyModal visible={modal} setVisible={setModal}>
            <AddItem addItem={addNewItem} materials={props.materials} />
         </MyModal>
      </div>
   );
}