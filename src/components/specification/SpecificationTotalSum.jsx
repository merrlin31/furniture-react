import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TblClass, titleClass } from "../../utils/description";
import { serviceItem13, serviceItem16 } from "../../utils/services";
import { initialPercentage } from "../properties/settingsProperties";
import { Title } from "../Title";
import { SpecificationTotalSumItem } from "./SpecificationTotalSumItem";

export const SpecificationTotalSum = (props) => {
   const item1 = 'servicesAndMaterials'
   const item2 = 'furniture'
   const item3 = 'total'
   const item4 = 'mounting'
   const item5 = 'promout'
   const item6 = 'design'
   const item7 = 'profit'
   const totalSumWithDiscount = props.serviceSum.totalSumWithDiscount + props.furnitureSum.totalSumWithDiscount
   const [percentage, setPercentage] = useState(initialPercentage)
   const {t} = useTranslation()
   const table = useRef(null)

   const updatePercentage = (e) => {
      setPercentage({...percentage, [e.target.id]: +e.target.value})
   }

   return (
      <div className={props.class + TblClass}>
         <Title className={props.class + titleClass} title={props.title} />
         <table ref={table} className={props.class + props.tableClass}>
            <thead>
               <tr>
                  <td>{t('table.title')}</td>
                  <td>{t('table.totalPrice')}</td>
                  <td>{t('table.discount')}</td>
                  <td>{t('table.discountPrice')}</td>
               </tr>
            </thead>
            <tbody>
               <SpecificationTotalSumItem name={item1} sum={props.serviceSum.totalSum} 
                  discount={props.serviceSum.totalDiscount} sumWithDiscount={props.serviceSum.totalSumWithDiscount} />
               <SpecificationTotalSumItem name={item2} sum={props.furnitureSum.totalSum} 
                  discount={props.furnitureSum.totalDiscount} sumWithDiscount={props.furnitureSum.totalSumWithDiscount} />
               <SpecificationTotalSumItem name={item3} sum={props.serviceSum.totalSum + props.furnitureSum.totalSum} 
                  discount={props.serviceSum.totalDiscount + props.furnitureSum.totalDiscount} sumWithDiscount={totalSumWithDiscount} />
               <SpecificationTotalSumItem name={item4} sum={null} 
                  sumWithDiscount={totalSumWithDiscount / 100 * percentage.mounting} 
                  value={percentage.mounting} onChange={updatePercentage} editable={true} />
               <SpecificationTotalSumItem name={item5} sum={null} 
                  sumWithDiscount={totalSumWithDiscount / 100 * percentage.promout} 
                  value={percentage.promout} onChange={updatePercentage} editable={true} />
               <SpecificationTotalSumItem name={item6} sum={null} 
                  sumWithDiscount={totalSumWithDiscount / 100 * percentage.design} 
                  value={percentage.design} onChange={updatePercentage} editable={true} />
               <SpecificationTotalSumItem name={item7} sum={null} 
                  sumWithDiscount={totalSumWithDiscount / 100 * percentage.profit} 
                  value={percentage.profit} onChange={updatePercentage} editable={true} />
               <SpecificationTotalSumItem name={serviceItem13} sum={props.servicesPrice[serviceItem13]} 
                  discount={null} sumWithDiscount={props.servicesPrice[serviceItem13]} />
               <SpecificationTotalSumItem name={serviceItem16} sum={props.servicesPrice[serviceItem16]} 
                  discount={null} sumWithDiscount={props.servicesPrice[serviceItem16]} />
            </tbody>
            <tfoot>
               <SpecificationTotalSumItem name={item3} sum={null} 
                  discount={null} sumWithDiscount={totalSumWithDiscount + 
                     totalSumWithDiscount / 100 * 
                     (percentage.mounting + percentage.promout + percentage.design + percentage.profit) + 
                     props.servicesPrice[serviceItem13] + props.servicesPrice[serviceItem16]} />
            </tfoot>
            
         </table>         
      </div>
   );
}