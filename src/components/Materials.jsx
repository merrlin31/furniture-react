import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { editMaterial } from "../reducers/detailReducer"
import { itemClass, materialsClass, oneMaterialClass, titleClass } from "../utils/description"
import { bodyManufacturerDiscount, choiceOption, dvpManufacturerDiscount, frontManufacturerDiscount, tabletopManufacturerDiscount } from "../utils/Material"
import { notPrice, price1, price2, price3 } from "./properties/detailingProperties"
import { priceSection1 } from "./properties/settingsProperties"
import { MyInput, MyMaterialInput } from "./UI/MyInput/MyInput"
import { MySelect } from "./UI/MySelect/MySelect"


const Materials = ({material}) => {
   const {t} = useTranslation()
   const dispatch = useDispatch()
   const materialItem = 'material'
   const boldEdgeItem = 'boldEdge'
   const thinEdgeItem = 'thinEdge'
   const inputType = 'checkbox'
   const pureSize = 'pureSize'

   const option = {name: pureSize, type: inputType, id: pureSize}

   const changeMaterial = (value, material, field) => {
      material[field] = value
      if (field === notPrice) {
         material.discountValue = choiceOption(material.material, bodyManufacturerDiscount, 
            frontManufacturerDiscount, dvpManufacturerDiscount, tabletopManufacturerDiscount)[value]
      }
      dispatch(editMaterial(material))
   }

   const change = (e) => {
      material.pureSize = e.target.checked
      dispatch(editMaterial(material))
   }

   return (
      <div className={oneMaterialClass}>
         <h3 className={materialsClass + titleClass}>{t(materialItem) + ' ' + material.materialCode}</h3>
         <div className={materialsClass} key={material.materialCode}>
            <MyMaterialInput name={materialItem} className={priceSection1 + itemClass} value={material.price} 
               onChange={e => changeMaterial(+e.target.value, material, price1)} />
            {material.boldEdge > 0 && <MyMaterialInput name={boldEdgeItem} className={priceSection1 + itemClass} value={material.boldEdgePrice} 
               onChange={e => changeMaterial(+e.target.value, material, price2)} />}
            {material.thinEdge > 0 && <MyMaterialInput name={thinEdgeItem} className={priceSection1 + itemClass} value={material.thinEdgePrice} 
               onChange={e => changeMaterial(+e.target.value, material, price3)} />}
            <MySelect options={choiceOption(material.material)} className ={priceSection1 + itemClass}
               value={material.manufacturer} onChange={value => changeMaterial(value, material, notPrice)} />
            <MyInput key={option.id} className={priceSection1 + itemClass} option={option}  onChange={change}  />
         </div>
      </div>
   )
}

export default Materials
