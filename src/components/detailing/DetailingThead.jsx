import { useTranslation } from "react-i18next";
import { bottomEdgeClass, leftEdgeClass, rightEdgeClass, topEdgeClass } from "../../utils/description";

export const DetailingThead = ({edge}) => {
   const {t} = useTranslation()
   return (
      <thead>
         <tr>
            <td>№</td>
            <td>{t('detailingTable.material')}</td>
            <td>{t('detailingTable.height')}</td>
            <td>{t('detailingTable.width')}</td>
            <td>{t('detailingTable.amount')}</td>
            {!edge &&
               <>
                  <td><div className={topEdgeClass}></div></td>
                  <td><div className={bottomEdgeClass}></div></td>
                  <td><div className={leftEdgeClass}></div></td>
                  <td><div className={rightEdgeClass}></div></td>
               </>
            }
            <td></td>
         </tr>
      </thead>
   );
}