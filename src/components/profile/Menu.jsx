import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers, getUser, refreshSetting } from '../../actions/user'
import { clearStore, getUserIndents, getUserPrices, setStore } from '../../actions/utils'
import { setUserMenuVisibility } from '../../reducers/userReducer'
import { loadStoreFromStorage } from '../../reducers/utils'
import { mainRole } from '../../utils/description'
import AddCustomer from './AddCustomer'
import AdminMenu from './AdminMenu'
import LoadProject from './LoadProject'
import style from './profile.module.scss'
import SaveProject from './SaveProject'

const Menu = ({setCurrentModal, modal, setModal}) => {
   const dispatch = useDispatch()
   const {t} = useTranslation()
   const user = useSelector(state => state.user)
   const furnitureObj = useSelector(state => state.product.furnitures)
   const furniturePrices = useSelector(state => state.setting.furniturePrices)
   const serviceObj = useSelector(state => state.product.services)
   const servicePrices = useSelector(state => state.setting.servicePrices)
   const indentValues = useSelector(state => state.setting.indentValues)

   const MENU = 'menu'
   const FURNITURES = 'furnitures'
   const SERVICES = 'services'
   const INDENTS = 'indents'
   const NEW_PROJECT = 'new project'
   const LOAD_PROJECT = 'load project'
   const SAVE_PROJECT = 'save project'
   const ADD_CUSTOMER = 'add customer'
   const RECOVER = 'recover'
   const UPDATE_FURNITURE_PRICES = 'update furniture prices'
   const UPDATE_SERVICE_PRICES = 'update service prices'
   const UPDATE_INDENTS = 'update indents'

   const createCustomerHandler = async () => {
      const customers = await getCustomers(user.currentUser.id)
      setCurrentModal(<AddCustomer modal={modal} setModal={setModal} style={style} user={user.currentUser.id} customers={customers} />)
      dispatch(setUserMenuVisibility(false))
      setModal(true)
   }

   const getProjectHandler = async () => {
      setCurrentModal(<LoadProject modal={modal} setModal={setModal} style={style} user={user.currentUser.id} />)
      dispatch(setUserMenuVisibility(false))
      setModal(true)
   }

   const saveProjectHandler = async () => {
      setCurrentModal(<SaveProject modal={modal} setModal={setModal} style={style} user={user.currentUser.id} />)
      dispatch(setUserMenuVisibility(false))
      setModal(true)
   }

   const refreshUserFurniturePrice = async () => {
      const arr = getUserPrices(user, furnitureObj, furniturePrices)
      refreshSetting(user.currentUser.id, arr, FURNITURES)
      dispatch(setUserMenuVisibility(false))
   }

   const refreshUserServicePrice = async () => {
      const arr = getUserPrices(user, serviceObj, servicePrices)
      refreshSetting(user.currentUser.id, arr, SERVICES)
      dispatch(setUserMenuVisibility(false))
   }

   const refreshUserIndentPrice = async () => {
      const arr = getUserIndents(user, indentValues)
      refreshSetting(user.currentUser.id, arr, INDENTS)
      dispatch(setUserMenuVisibility(false))
   }

   const clear = () => {
      dispatch(clearStore())
      dispatch(getUser(user.currentUser.id))
      dispatch(setUserMenuVisibility(false))
   }

   const recover = () => {
      const loadedStore = loadStoreFromStorage()
      dispatch(setStore(loadedStore))
   }

   const menuItems = [
      {title: NEW_PROJECT, onClick: clear},
      {title: LOAD_PROJECT, onClick: getProjectHandler},
      {title: ADD_CUSTOMER, onClick: createCustomerHandler},
      {title: SAVE_PROJECT, onClick: saveProjectHandler},
      {title: RECOVER, onClick: recover},
      {title: UPDATE_FURNITURE_PRICES, onClick: refreshUserFurniturePrice},
      {title: UPDATE_SERVICE_PRICES, onClick: refreshUserServicePrice},
      {title: UPDATE_INDENTS, onClick: refreshUserIndentPrice},
   ]

   return (
      <ul>
         {menuItems.map(item =>
            <li onClick={item.onClick} key={item.title}>{t(`${MENU}.${item.title}`)}</li>   
         )}
         {user.currentUser.role === mainRole && 
            <AdminMenu furniturePrices={furniturePrices} servicePrices={servicePrices} indentValues={indentValues} translate={MENU} />
         }
      </ul>
   )
}

export default Menu
