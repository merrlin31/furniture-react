import { useContext, useState } from 'react';
import { MyContext } from '../../context';
import '../../styles/specification.scss';
import { furnitureClass, materialClass, totalClass } from '../../utils/description';
import { furniture } from '../../utils/furniture';
import { allService } from '../../utils/services';
import { initialSum } from '../properties/settingsProperties';
import { SpecificationTable } from './SpecificationTable';
import { SpecificationTotalSum } from './SpecificationTotalSum';

export const SpecificationContent = (props) => {
   const {materials, setMaterials, services, setServices, furnitures, setFurnitures, servicesPrice, 
      furniturePrice, setServicesPrice, setFurniturePrice} = useContext(MyContext)
   const translate1 = 'services.'
   const translate2 = 'furniture.'

   const [serviceSum, setServiceSum] = useState(initialSum)
   const [furnitureSum, setFurnitureSum] = useState(initialSum)

   return (
      <>
         {materials.length !== 0 && 
            <SpecificationTable materials={materials} setMaterials={setMaterials} content={services} setContent={setServices} 
               translate={translate1} tableClass={materialClass} object={allService} class={props.class} title={props.title} 
               price={servicesPrice} setPrice={setServicesPrice} sum={serviceSum} setSum={setServiceSum} />
         }
         {furnitures.length !== 0 && 
            <SpecificationTable content={furnitures} setContent={setFurnitures} translate={translate2} tableClass={furnitureClass}
               object={furniture} class={props.class} title={props.title1} price={furniturePrice} setPrice={setFurniturePrice} 
               sum={furnitureSum} setSum={setFurnitureSum} />
         }
         {serviceSum.totalSum > 0 &&
            <SpecificationTotalSum class={props.class} tableClass={totalClass} title={props.title2} serviceSum={serviceSum} 
               furnitureSum={furnitureSum} servicesPrice={servicesPrice} />
         }
      </>
   );
}