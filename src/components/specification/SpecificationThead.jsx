import { useTranslation } from "react-i18next";

export const SpecificationThead = () => {
   const {t} = useTranslation()

   return (
      <thead>
         <tr>
            <th>{t('table.title')}</th>
            <th>{t('table.code')}</th>
            <th>{t('table.amount')}</th>
            <th>{t('table.price')}</th>
            <th>{t('table.totalPrice')}</th>
            <th>{t('table.discount')}</th>
            <th>{t('table.discountPrice')}</th>
            <th></th>
         </tr>
      </thead>
   );
};
