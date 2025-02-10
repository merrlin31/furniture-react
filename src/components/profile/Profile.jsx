import { useState } from "react"
import { useSelector } from "react-redux"
import { modalClass1 } from "../../utils/description"
import { Language } from "../header/Language"
import { MyModal } from "../UI/MyModal/MyModal"
import Menu from "./Menu"
import UserProfile from "./UserProfile"

import style from './profile.module.scss'
import Login from "./Login"

const Profile = () => {
   const user = useSelector(state => state.user)
   const isLoading = useSelector(state => state.user.isLoading)
   const [modal, setModal] = useState(false)
   const [auth, setAuth] = useState(false)
   const [currentModal, setCurrentModal] = useState('')

   if (isLoading) return <div>Loading...</div>

   if (!user.isAuth) 
      return (
         <Login auth={auth} setAuth={setAuth} />
      )

   return (
      <div className={style.container} >
         <UserProfile userName={user.currentUser.userName} setAuth={setAuth} />
         {user.isUserMenuVisible && 
            <div className={style.menu} >
               <Menu setCurrentModal={setCurrentModal} modal={modal} setModal={setModal} />
               <Language />
            </div>
         }
         {modal &&
            <MyModal visible={modal} setVisible={setModal} class={modalClass1}>
               {currentModal}
            </MyModal>
         }
      </div>
   )
}

export default Profile
