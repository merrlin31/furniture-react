import { useDispatch } from "react-redux"
import { ReactComponent as UserLogo } from "../../img/user-tie-solid.svg"
import UserName from "./UserName"
import { checkAuth, logout } from "../../actions/auth"
import { clearStore } from "../../actions/utils"
import { useTranslation } from "react-i18next"
import { setUserMenuVisibility } from "../../reducers/userReducer"

import style from './profile.module.scss'

const UserProfile = ({userName, setAuth}) => {
   const dispatch = useDispatch()
   const {t} = useTranslation()

   const LOGOUT = 'logout'

   const logoutHandler = (e) => {
      e.preventDefault()
      dispatch(logout())
      dispatch(clearStore())
      dispatch(checkAuth())
      setAuth(false)
   }

   return (
      <div className={style.profile}>
         <UserLogo className={style.avatar} onClick={() => dispatch(setUserMenuVisibility(true))}/>
         <UserName userName={userName} />
         <button className={style.btn} onClick={logoutHandler}>{t(LOGOUT)}</button>
      </div>
   )
}

export default UserProfile
