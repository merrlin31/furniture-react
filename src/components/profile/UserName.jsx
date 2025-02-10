import style from './profile.module.scss'

const UserName = ({userName}) => {
   return (
      <div className={style.userName}>
         {userName}
      </div>
   )
}

export default UserName
