import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTotalSum } from "../../reducers/productReducer";
import { editPercentage, setCodes } from "../../reducers/settingReducer";
import { saveStore } from "../../reducers/utils";
import { detailingTableResponsive, TblClass, titleClass } from "../../utils/description";
import { DELIVERY, GASOLINE } from "../../utils/services";
import { Title } from "../Title";
import { SpecificationTotalSumRow } from "./SpecificationTotalSumRow";

export const SpecificationTotalSum = (props) => {

   const {t} = useTranslation()
   const dispatch = useDispatch()
   const percentage = useSelector(state => state.setting.percentage)
   const furnitures = useSelector(state => state.product.furnitures)
   const services = useSelector(state => state.product.services)
   const materials = useSelector(state => state.detail.materials)
   const SERVICES_MATERIALS = 'servicesAndMaterials'
   const FURNITURE = 'furniture'
   const TOTAL = 'total'
   const MOUNTING = 'mounting'
   const PROMOUT = 'promout'
   const DESIGN = 'design'
   const PROFIT = 'profit'
   const totalSumWithDiscount = props.serviceSum.totalSumWithDiscount + props.furnitureSum.totalSumWithDiscount
   const productSum = totalSumWithDiscount + totalSumWithDiscount / 100 * 
      (percentage.mounting + percentage.promout + percentage.design + percentage.profit) + 
      props.servicesPrice[DELIVERY] + props.servicesPrice[GASOLINE]
   
   const updatePercentage = (e) => dispatch(editPercentage(e.target.id, +e.target.value))
   const rows = [
      {name: SERVICES_MATERIALS, sum: props.serviceSum.totalSum, discount: props.serviceSum.totalDiscount, sumWithDiscount: props.serviceSum.totalSumWithDiscount},
      {name: FURNITURE, sum: props.furnitureSum.totalSum, discount: props.furnitureSum.totalDiscount, sumWithDiscount: props.furnitureSum.totalSumWithDiscount},
      {name: TOTAL, sum: props.serviceSum.totalSum + props.furnitureSum.totalSum, discount: props.serviceSum.totalDiscount + props.furnitureSum.totalDiscount, sumWithDiscount: totalSumWithDiscount},
      {name: MOUNTING, sumWithDiscount: totalSumWithDiscount / 100 * percentage.mounting, editable: true, value: percentage.mounting, onChange: updatePercentage}, 
      {name: PROMOUT, sumWithDiscount: totalSumWithDiscount / 100 * percentage.promout, editable: true, value: percentage.promout, onChange: updatePercentage},
      {name: DESIGN, sumWithDiscount: totalSumWithDiscount / 100 * percentage.design, editable: true, value: percentage.design, onChange: updatePercentage},
      {name: PROFIT, sumWithDiscount: totalSumWithDiscount / 100 * percentage.profit, editable: true, value: percentage.profit, onChange: updatePercentage},
      {name: DELIVERY, sum: props.servicesPrice[DELIVERY], sumWithDiscount: props.servicesPrice[DELIVERY]},
      {name: GASOLINE, sum: props.servicesPrice[GASOLINE], sumWithDiscount: props.servicesPrice[GASOLINE]},
   ]
   const updateCodes = () => {
      let newCodes = [];
      [...furnitures, ...services].forEach(item => {
         if (!newCodes.includes(item.code) && item.code && item.value !== 0) newCodes.push(item.code)
      })
      materials.forEach(item => {
         if (!newCodes.includes(item.materialCode) && item.materialCode) newCodes.push(item.materialCode)
      })
      dispatch(setCodes(newCodes))
   }
   useEffect(() => {
      dispatch(setTotalSum(productSum))
      updateCodes()
      saveStore()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [productSum])

   return (
      <div className={props.class + TblClass}>
         <Title className={props.class + titleClass} title={props.title} />
         <div className={props.class + detailingTableResponsive}>
            <table className={props.class + props.tableClass}>
               <thead>
                  <tr>
                     <th>{t('table.title')}</th>
                     <th>{t('table.totalPrice')}</th>
                     <th>{t('table.discount')}</th>
                     <th>{t('table.discountPrice')}</th>
                  </tr>
               </thead>
               <tbody>
                  {rows.map(row => <SpecificationTotalSumRow key={row.name} {...row} />)}
               </tbody>
               <tfoot>
                  <SpecificationTotalSumRow name={TOTAL} sumWithDiscount={productSum} />
               </tfoot> 
            </table>
         </div>
      </div>
   );
}