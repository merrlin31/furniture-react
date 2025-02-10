import style from './auth.module.scss'
import AuthForm from './AuthForm'

const Auth = () => {
   
   return (
      <section className={style.content}>
         <div className={style.container}>
            <AuthForm />
         </div>
      </section>
   )
}

export default Auth
