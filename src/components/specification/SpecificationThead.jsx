import { useTranslation } from "react-i18next";

export const sort1 = 'material'
export const sort2 = 'manufacturer'
const sort3 = 'materialCode'
const sort4 = 'amount'
const sort5 = 'price'
const sort6 = 'totalPrice'
const sort7 = 'discount'
const sort8 = 'totalSum'

export const SpecificationThead = ({sort}) => {
   const {t} = useTranslation()

   const sortTable = (e) => {
      sort(e.target.id)
   }

   return (
      <thead>
         <tr>
            <th id={sort1} onClick={sortTable}>{t('table.title')}</th>
            <th id={sort2} onClick={sortTable}>{t('table.manufacturer')}</th>
            <th id={sort3} onClick={sortTable}>{t('table.code')}</th>
            <th id={sort4} onClick={sortTable}>{t('table.amount')}</th>
            <th id={sort5} onClick={sortTable}>{t('table.price')}</th>
            <th id={sort6} onClick={sortTable}>{t('table.totalPrice')}</th>
            <th id={sort7} onClick={sortTable}>{t('table.discount')}</th>
            <th id={sort8} onClick={sortTable}>{t('table.discountPrice')}</th>
            <th></th>
         </tr>
      </thead>
   );
};
