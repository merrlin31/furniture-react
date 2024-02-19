import { useTranslation } from "react-i18next";
import { levelAmount2, TblClass, section1TbodyClass, titleClass } from "../../utils/description";
import { section5 } from "../properties/inputProperties";
import { Title } from "../Title";

export const ItemTable = ({className, itemAmount, level, title}) => {
   const {t} = useTranslation()
   return (
      <div className={`${className}__${section5} ${section5}`}>
         <Title className={className + titleClass} title={title} />
         <table className={section5 + TblClass}>
            <tbody className={section5 + section1TbodyClass}>
               <tr>
                  <td colSpan="3">{t('itemAmount')}</td>
                  <td>{itemAmount.allItem}</td>
               </tr>
               <tr>
                  <td>{t('itemSection')}</td>
                  <td>{t('itemLeft')}</td>
                  <td>{t('itemCenter')}</td>
                  <td>{t('itemRight')}</td>
               </tr>
               <tr>
                  <td>{t('itemBottom')}</td>
                  <td>{itemAmount.leftBottomItem}</td>
                  <td>{itemAmount.centerBottomItem}</td>
                  <td>{itemAmount.rightBottomItem}</td>
               </tr>
               <tr>
                  {level === levelAmount2 
                     ? <td>{t('itemMiddle')}</td>
                     : <td>{t('itemUpper')}</td>
                  }
                  <td>{itemAmount.leftCentralItem}</td>
                  <td>{itemAmount.centerCentralItem}</td>
                  <td>{itemAmount.rightCentralItem}</td>
               </tr>
               {level === levelAmount2 && 
                  <tr>
                     <td>{t('itemUpper')}</td>
                     <td>{itemAmount.leftUpperItem}</td>
                     <td>{itemAmount.centerUpperItem}</td>
                     <td>{itemAmount.rightUpperItem}</td>
                  </tr>
               }
            </tbody>
         </table>
      </div>
   );
}