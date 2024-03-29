import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/price.scss';
import { furniture } from '../utils/furniture';
import { bodyManufacturerDiscount, choiceOption, dvpManufacturerDiscount, frontManufacturerDiscount, tabletopManufacturerDiscount } from '../utils/Material';
import { priceSection2, priceSection3, servicesOptions, priceSection1 } from './properties/settingsProperties';
import { SettingsForm } from './SettingsForm';
import { MyMaterialInput } from './UI/MyInput/MyInput';
import { MySelect } from './UI/MySelect/MySelect';
import { ReactComponent as RightChevron } from "../img/chevron-right-solid.svg";
import { ReactComponent as DownChevron } from "../img/chevron-down-solid.svg";
import { useTranslation } from 'react-i18next';
import { headClass, inputClass, itemClass, listClass, materialsClass, oneMaterialClass, section2Form1Class, section2Form2Class, section2FormClass, titleClass } from '../utils/description';
import { Title } from './Title';
import { notPrice, price1, price2, price3 } from './properties/detailingProperties';
import { useDispatch, useSelector } from 'react-redux';
import { editMaterial } from '../reducers/detailReducer';

export const PriceContent = (props) => {

   const {t} = useTranslation()

   const dispatch = useDispatch()
   const furnitures = useSelector(state => state.product.furnitures)
   const furniturePrices = useSelector(state => state.setting.furniturePrices)
   const servicePrices = useSelector(state => state.setting.servicePrices)
   const materials = useSelector(state => state.detail.materials)

   const [visibleList, setVisibleList] = useState(false)
   const translate1 = 'furniture.'
   const translate2 = 'services.'
   const materialItem = 'material'
   const boldEdgeItem = 'boldEdge'
   const thinEdgeItem = 'thinEdge'
   
   const [furnitureOptions, setFurnitureOptions] = useState([])

   useEffect(() => {
      let furnitureArr = []
      for (let key in furniture) {
         if (furniture[key].value > 0) {
            let item = {}
            item.name = furniture[key].name
            item.id = furniture[key].name
            item.className = priceSection2 + itemClass
            if (furniture[key].description) item.description = furniture[key].description
            furnitureArr.push(item)
         } 
      }
      setFurnitureOptions(furnitureArr)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [furnitures])

   const changeMaterial = (value, material, field) => {
      material[field] = value
      if (field === notPrice) {
         material.discountValue = choiceOption(material.material, bodyManufacturerDiscount, 
            frontManufacturerDiscount, dvpManufacturerDiscount, tabletopManufacturerDiscount)[value]
      }
      dispatch(editMaterial(material))
   }

   return (
      <>
         {materials.length > 0 && <div className={props.class + section2FormClass}>
            <div className={props.class + headClass}>
               <Title className={props.class + titleClass} title={props.title} />
               {visibleList 
                  ? <DownChevron className={props.class + listClass} onClick={() => setVisibleList(!visibleList)} />
                  : <RightChevron className={props.class + listClass} onClick={() => setVisibleList(!visibleList)} />
               }
            </div>   
            {visibleList && <div className={`${props.class}${inputClass} ${materialsClass}`}>
               {materials.length > 0 && materials.map((material) =>
                  <div key={material.materialCode} className={oneMaterialClass}>
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
                     </div>
                  </div> 
               )}
               </div>
            }
         </div>}
         {furnitures.length > 0 && <SettingsForm className={props.class + section2Form1Class} parent={props.class} title={props.title1} 
            optionsClass={priceSection2} options={furnitureOptions} state={furniturePrices} translate={translate1} />
         }
         <SettingsForm className={props.class + section2Form2Class} parent={props.class} title={props.title2} 
            optionsClass={priceSection3} options={servicesOptions} state={servicePrices} translate={translate2} />
         
      </>
   );
}

