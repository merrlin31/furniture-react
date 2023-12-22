import { useTranslation } from "react-i18next";

export const SpecificationTfoot = ({sum}) => {
   const {t} = useTranslation()

   return (
      <tfoot>
         <tr>
            <td>{t('table.total')}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{+sum.totalSum.toFixed(2)}</td>
            <td>{+sum.totalDiscount.toFixed(2)}</td>
            <td>{+sum.totalSumWithDiscount.toFixed(2)}</td>
         </tr>
      </tfoot>
   );
}