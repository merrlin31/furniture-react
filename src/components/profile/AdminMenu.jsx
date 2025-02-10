import { useTranslation } from 'react-i18next'
import { setFurniture, setIndent, setService } from '../../actions/settings'
import { createFurnitureArr, createIndentArr, createServiceArr } from '../properties/profileProperties'
import style from './profile.module.scss'

const AdminMenu = ({furniturePrices, servicePrices, indentValues, translate}) => {
   const {t} = useTranslation()

   const ADMIN_PANEL = 'admin panel'
   const UPDATE_DB_FURNITURE_PRICES = 'update db furniture prices'
   const UPDATE_DB_SERVICE_PRICES = 'update db service prices'
   const UPDATE_DB_INDENTS = 'update db indents'

   const refreshDbFurniturePrices = () => {
      let furniture = createFurnitureArr(furniturePrices)
      setFurniture(furniture)
   }

   const refreshDbServicePrices = () => {
      let service = createServiceArr(servicePrices)
      setService(service)
   }

   const refreshDbIndentValues = () => {
      let indents = createIndentArr(indentValues)
      setIndent(indents)
   }

   const adminMenuItems = [
      {title: UPDATE_DB_FURNITURE_PRICES, onClick: refreshDbFurniturePrices},
      {title: UPDATE_DB_SERVICE_PRICES, onClick: refreshDbServicePrices},
      {title: UPDATE_DB_INDENTS, onClick: refreshDbIndentValues},
   ]

   return (
      <li className={style.menuItem}>
         <div>{t(`menu.${ADMIN_PANEL}`)}</div>
         <div className={style.submenu}>
            <ul className={style.submenuList}>
               {adminMenuItems.map(item =>
                  <li onClick={item.onClick} key={item.title}>{t(`${translate}.${item.title}`)}</li>   
               )}
            </ul>
         </div>
      </li>
   )
}

export default AdminMenu
