import { useTranslation } from 'react-i18next';
import style from './MyInput.module.scss'
import { ReactComponent as CircleQuestion } from "../../../img/circle-question-regular.svg";
import { useState } from 'react';

const defaultInputType = 'number'
const defaultProfileInputType = 'text'
const inputType1 = 'checkbox'

export const MyInput = ({option, value, onChange, className, translate, hint, labelColor = 'grey'}) => {
   const {t} = useTranslation()
   const [isHint, setIsHint] = useState(false)

   let name = (translate) ? translate + option.name : option.name
   if (option.description) name = option.description
   let type = (option.type) ? option.type : defaultInputType
   let inputClass = (option.type === inputType1) ? style.checbox : style.input
   if (option.regist) inputClass = style.authInput

   const showHint = () => {
      setIsHint(true)
   }
   const hideHint = () => {
      setIsHint(false)
   }
   
   return (
      <div className={className}>
         <label>
            {isHint && <img src={option.img} alt={option.id} />}
            <div className={style.label + ' ' + style[labelColor]}>{t(name)}</div>
            <input className={inputClass} type={type} value={value} onChange={onChange} {...option.attribute} id={option.id} />
         </label>
         {hint && <CircleQuestion onMouseOver={showHint} onMouseOut={hideHint} className={style.circleQuestion} />}
         
      </div>   
   );
}

export const MyFormInput = ({option, className, translate, hint, labelColor = 'grey', register, errors}) => {
   const {t} = useTranslation()
   const [isHint, setIsHint] = useState(false)

   let name = (translate) ? translate + option.name : option.name
   if (option.description) name = option.description
   let type = (option.type) ? option.type : defaultInputType
   let inputClass = (option.type === inputType1) ? style.checbox : style.input
   if (option.regist) inputClass = style.authInput
   let count = null
   if (errors) {
   if (errors.message === 'max') count = option.attribute.max
   if (errors.message === 'min') count = option.attribute.min
   }

   const showHint = () => {
      setIsHint(true)
   }
   const hideHint = () => {
      setIsHint(false)
   }

   return (
      <div className={className}>
         <label>
            {isHint && <img src={option.img} alt={option.id} />}
            <div className={style.label + ' ' + style[labelColor]}>{t(name)}</div>
            <input className={inputClass} type={type} id={option.id} {...register(option.id, option.validate)} {...option.attribute} />
            {errors?.message && <p className={style.errors}>{t('errors.' + errors?.message, {count})}</p>}
         </label>
         {hint && <CircleQuestion onMouseOver={showHint} onMouseOut={hideHint} className={style.circleQuestion} />}
         
      </div>   
   );
}

export const MyInputWithSelect = ({option, value, onChange, className, register}) => {
   const {t} = useTranslation()
   let type = (option.type) ? option.type : defaultInputType
   let inputClass = (option.type === inputType1) ? style.checbox : style.input
   return (
      <div className={className}>
         <label>
            <div className={style.label}>{t(option.name)}</div>
            <select className={option.bind.className}  id={option.bind.select} {...register(option.bind.select, option.bind.validate)}>
               <option disabled value=''>{t(option.bind.defaultValue)}</option>
               {option.bind.options.map(option =>
                  <option key={option.value} value={option.value}>
                     {t(option.name)}
                  </option>
               )}
            </select>
            <input className={inputClass} type={type} value={value} onChange={onChange} {...option.attribute} id={option.id} />
         </label>
      </div> 
   )
}

export const MyMaterialInput = ({name, className, value, onChange, type = defaultInputType, labelColor = 'grey'}) => {
   const {t} = useTranslation()
   return (
      <div className={className}>
         <label>
            <div className={style.label + ' ' + style[labelColor]}>{t(name)}</div>
            <input className={style.input} type={type} value={value} onChange={onChange} />
         </label>
      </div>   
   );
}

export const MyEditableInput = ({id, value, onChange, type = defaultInputType}) => {
   return (
      <input className={style.editableInput} id={id} type={type} value={value} onChange={onChange} /> 
   );
}

export const MyProfileInput = ({labelColor, option, register, errors, type = defaultProfileInputType}) => {
   const {t} = useTranslation()
   return (
      <div>
         <label>
            <div className={style.label + ' ' + style[labelColor]}>{t('profile.' + option.name)}</div>
            <input className={style.authInput} type={type} id={option.name} {...register(option.name, option.validate)} />
            {errors?.message && <p className={style.errors}>{t('errors.' + errors?.message)}</p>}
         </label>
      </div>   
   );
}