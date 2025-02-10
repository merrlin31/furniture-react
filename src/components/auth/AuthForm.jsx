import { useState } from 'react'
import { btnType1, INVALID_EMAIL, MAX_LENGTH, MIN_LENGTH, registrationBtnColor, REQUIRED_EMAIL, REQUIRED_PASSWORD, REQUIRED_USERNAME } from '../../utils/description'
import { MyButton1 } from '../UI/MyButton/MyButton'
import { MyFormInput } from '../UI/MyInput/MyInput'
import { login, registration } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { initialUser } from '../../actions/utils'

import style from './auth.module.scss'

const AuthForm = () => {
   
   const {t} = useTranslation()
   const dispatch = useDispatch()
   const form = useForm({mode: "onBlur"})
   const {register, handleSubmit, formState} = form
   const {errors, isValid, isDirty, isSubmitting} = formState
   const [isRegistration, setIsRegistration] = useState(false)
   const [autorizeError, setAutorizeError] = useState('')

   const labelColor = 'white'
   const TEXT = 'text'
   const EMAIL = 'email'
   const USER_NAME = 'userName'
   const PASSWORD = 'password'
   const REGISTR = 'register'
   const LOGIN = 'logIn'
   const SIGN_UP = 'Sign up'
   const FORGOT_PASSWORD = 'Forgot your password?'
   const GO_TO_LOGIN = 'Go to login'
   const CREATE_ACCOUNT = "Don't have an account?"

   const options = [
      {type: TEXT, description: EMAIL, id: EMAIL, regist:true, 
         validate: {
            required: REQUIRED_EMAIL, 
            pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, message: INVALID_EMAIL}
         }
      },
      {type: TEXT, description: USER_NAME, id: USER_NAME, regist:isRegistration, 
         validate: {
            required: REQUIRED_USERNAME, 
            minLength: {value: 3, message: MIN_LENGTH},
            maxLength: {value: 30, message: MAX_LENGTH}
         }
      },
      {type: PASSWORD, description: PASSWORD, id: PASSWORD, regist:true,
         validate: {
            required: REQUIRED_PASSWORD, 
            minLength: {value: 3, message: MIN_LENGTH},
            maxLength: {value: 30, message: MAX_LENGTH}
         }
      }
   ]

   const onSubmit = async (data) => {
      let response
      if (isRegistration) {
         response = await registration(data.email, data.userName, data.password)
      } else {
         response = await login(data.email, data.password)
      }
      if (response.id) {
         dispatch(initialUser(response))
      } else if (response.data.message){
         setAutorizeError(response.data.message)
      }
   }

   return (
      <form className={style.authForm} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)} noValidate>
         {options.map(option => 
            option.regist && <MyFormInput key={option.id} className={style.input} labelColor={labelColor}
               option={option} register={register} errors={errors[option.id]}
            />
         )}
         {autorizeError && <p className={style.error}>{t(`errors.${autorizeError}`)}</p>}
         {isRegistration 
            ? <>
               <MyButton1 color={registrationBtnColor} btnType={btnType1} disabled={isSubmitting || !isDirty || !isValid} >{t(REGISTR)}</MyButton1>
               <span className={style.linkSpan} onClick={() => setIsRegistration(false)}>{t(GO_TO_LOGIN)}</span>
            </>
            : <>
               <MyButton1 color={registrationBtnColor} btnType={btnType1} disabled={isSubmitting || !isDirty || !isValid} >{t(LOGIN)}</MyButton1>
               <span>{t(CREATE_ACCOUNT)} <span className={style.linkSpan} onClick={() => setIsRegistration(true)}>{t(SIGN_UP)}</span></span>
               <span className={style.linkSpan}>{t(FORGOT_PASSWORD)}</span>
            </> 
         }  
      {/* <DevTool control={control}  placement="top-left"/> */}
      </form>
   )
}

export default AuthForm
