import { useTranslation } from 'react-i18next'
import Auth from '../auth/Auth'
import style from './profile.module.scss'

const Login = ({auth, setAuth}) => {
   const {t} = useTranslation()
   const LOGIN = 'logIn'

   const showAuth = (e) => {
      e.stopPropagation()
      setAuth(true)
   }

   const hideAuth = (e) => {
      e.stopPropagation()
      setAuth(false)
   }

   return (
      <div className={style.container} onClick={hideAuth}>
         <div className={style.loginBtn} onClick={showAuth}>{t(LOGIN)}</div>
         {auth && <Auth />}
      </div>
   )
}

export default Login
