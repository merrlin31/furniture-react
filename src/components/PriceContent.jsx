import { useEffect } from 'react';
import { useState } from 'react';
import '../styles/price.scss';
import { furniture } from '../utils/furniture';
import { priceSection2, priceSection3, servicesOptions } from './properties/settingsProperties';
import { SettingsForm } from './SettingsForm';
import { ReactComponent as RightChevron } from "../img/chevron-right-solid.svg";
import { ReactComponent as DownChevron } from "../img/chevron-down-solid.svg";
import { headClass, inputClass, itemClass, listClass, materialsClass, section2Form1Class, section2Form2Class, section2FormClass, titleClass } from '../utils/description';
import { Title } from './Title';
import { useSelector } from 'react-redux';

import Materials from './Materials';

export const PriceContent = (props) => {

   const furnitures = useSelector(state => state.product.furnitures)
   const furniturePrices = useSelector(state => state.setting.furniturePrices)
   const servicePrices = useSelector(state => state.setting.servicePrices)
   const materials = useSelector(state => state.detail.materials)

   const [visibleList, setVisibleList] = useState(false)
   const translate1 = 'furniture.'
   const translate2 = 'services.'
   
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

   return (
      <>
         {materials.length > 0 && 
            <div className={props.class + section2FormClass}>
               <div className={props.class + headClass}>
                  <Title className={props.class + titleClass} title={props.title} />
                  {visibleList 
                     ? <DownChevron className={props.class + listClass} onClick={() => setVisibleList(!visibleList)} />
                     : <RightChevron className={props.class + listClass} onClick={() => setVisibleList(!visibleList)} />
                  }
               </div>   
               {visibleList && <div className={`${props.class}${inputClass} ${materialsClass}`}>
                  {materials.length > 0 && materials.map((material) =>
                     <Materials key={material.materialCode} material={material} />
                  )}
                  </div>
               }
            </div>
         }
         {furnitures.length > 0 && <SettingsForm className={props.class + section2Form1Class} parent={props.class} title={props.title1} 
            optionsClass={priceSection2} options={furnitureOptions} state={furniturePrices} translate={translate1} />
         }
         <SettingsForm className={props.class + section2Form2Class} parent={props.class} title={props.title2} 
            optionsClass={priceSection3} options={servicesOptions} state={servicePrices} translate={translate2} />
         
      </>
   );
}

