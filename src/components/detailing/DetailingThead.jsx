import { useTranslation } from "react-i18next";
import { bottomEdgeClass, leftEdgeClass, rightEdgeClass, topEdgeClass } from "../../utils/description";

export const sort1 = 'name'
   const sort2 = 'materialCode'
   const sort3 = 'height'
   const sort4 = 'width'

export const DetailingThead = ({edge, sort}) => {
   const {t} = useTranslation()
   const sortTable = (e) => {
      sort(e.target.id)
   }

   return (
      <thead>
         <tr>
            <th id={sort1} onClick={sortTable} >№</th>
            <th id={sort2} onClick={sortTable} >{t('detailingTable.material')}</th>
            <th id={sort3} onClick={sortTable} >{t('detailingTable.height')}</th>
            <th id={sort4} onClick={sortTable} >{t('detailingTable.width')}</th>
            <th>{t('detailingTable.amount')}</th>
            {!edge &&
               <>
                  <th><div className={topEdgeClass}></div></th>
                  <th><div className={bottomEdgeClass}></div></th>
                  <th><div className={leftEdgeClass}></div></th>
                  <th><div className={rightEdgeClass}></div></th>
               </>
            }
            <th></th>
         </tr>
      </thead>
   );
}