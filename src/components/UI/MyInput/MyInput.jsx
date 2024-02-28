import { useTranslation } from 'react-i18next';
import style from './MyInput.module.scss'
import { ReactComponent as CircleQuestion } from "../../../img/circle-question-regular.svg";
import { useState } from 'react';

const defaultInputTipe = 'number'
const inputType1 = 'checkbox'

export const MyInput = ({option, value, onChange, className, translate, hint}) => {
   const {t} = useTranslation()
   const [isHint, setIsHint] = useState(false)

   let name = (translate) ? translate + option.name : option.name
   if (option.description) name = option.description
   let type = (option.type) ? option.type : defaultInputTipe
   let inputClass = (option.type === inputType1) ? style.checbox : style.input

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
            <div className={style.label}>{t(name)}</div>
            <input className={inputClass} type={type} value={value} onChange={onChange} {...option.attribute} id={option.id} />
         </label>
         {hint && <CircleQuestion onMouseOver={showHint} onMouseOut={hideHint} className={style.circleQuestion} />}
         
      </div>   
   );
}

export const MyInputWithSelect = ({option, value, onChange, selectChange, className}) => {
   const {t} = useTranslation()
   let type = (option.type) ? option.type : defaultInputTipe
   let inputClass = (option.type === inputType1) ? style.checbox : style.input
   return (
      <div className={className}>
         <label>
         <div className={style.label}>{t(option.name)}</div>
            <select className={option.bind.className} value={value.dishwasherSize} onChange={selectChange}>
               <option disabled value=''>{t(option.bind.defaulValue)}</option>
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

export const MyMaterialInput = ({name, className, value, onChange, type = defaultInputTipe}) => {
   const {t} = useTranslation()
   return (
      <div className={className}>
         <label>
            <div className={style.label}>{t(name)}</div>
            <input className={style.input} type={type} value={value} onChange={onChange} />
         </label>
      </div>   
   );
}

export const MyEditableInput = ({id, value, onChange, type = defaultInputTipe}) => {
   return (
      <input className={style.editableInput} id={id} type={type} value={value} onChange={onChange} /> 
   );
}