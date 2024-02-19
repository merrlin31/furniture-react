import { useState } from 'react';
import { useSelector } from 'react-redux';
import { addFurnitureItem, addServiceItem, editFurnitureItem, editServiceItem } from '../../reducers/productReducer';
import '../../styles/specification.scss';
import { furnitureClass, materialClass, totalClass } from '../../utils/description';
import { furniture } from '../../utils/furniture';
import { allService } from '../../utils/services';
import { initialSum } from '../properties/settingsProperties';
import { SpecificationTable } from './SpecificationTable';
import { SpecificationTotalSum } from './SpecificationTotalSum';

export const SpecificationContent = (props) => {
   const translate1 = 'services.'
   const translate2 = 'furniture.'

   const furnitures = useSelector(state => state.product.furnitures)
   const services = useSelector(state => state.product.services)
   const furniturePrices = useSelector(state => state.setting.furniturePrices)
   const servicePrices = useSelector(state => state.setting.servicePrices)
   const materials = useSelector(state => state.detail.materials)

   const [serviceSum, setServiceSum] = useState(initialSum)
   const [furnitureSum, setFurnitureSum] = useState(initialSum)

   return (
      <>
         {materials.length !== 0 && 
            <SpecificationTable materials={materials} content={services} editContent={editServiceItem} addContent={addServiceItem}
               object={allService} class={props.class} title={props.title} price={servicePrices} tableClass={materialClass} translate={translate1} 
               sum={serviceSum} setSum={setServiceSum} />
         }
         {furnitures.length !== 0 && 
            <SpecificationTable content={furnitures} editContent={editFurnitureItem} addContent={addFurnitureItem}
               object={furniture} class={props.class} title={props.title1} price={furniturePrices} tableClass={furnitureClass} translate={translate2}
               sum={furnitureSum} setSum={setFurnitureSum} />
         }
         {serviceSum.totalSum > 0 &&
            <SpecificationTotalSum class={props.class} tableClass={totalClass} title={props.title2} serviceSum={serviceSum} 
               furnitureSum={furnitureSum} servicesPrice={servicePrices} />
         }
      </>
   );
}