import { useTranslation } from "react-i18next";

export const SpecificationThead = () => {
   const {t} = useTranslation()

   return (
      <thead>
         <tr>
            <td>{t('table.title')}</td>
            <td>{t('table.code')}</td>
            <td>{t('table.amount')}</td>
            <td>{t('table.price')}</td>
            <td>{t('table.totalPrice')}</td>
            <td>{t('table.discount')}</td>
            <td>{t('table.discountPrice')}</td>
         </tr>
      </thead>
   );
};
