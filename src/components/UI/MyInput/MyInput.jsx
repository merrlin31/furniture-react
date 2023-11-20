import { useTranslation } from 'react-i18next';
import style from './MyInput.module.scss'

const defaultInputTipe = 'number'
const inputType1 = 'checkbox'

export const MyInput = ({option, value, onChange, className, translate}) => {
   const {t} = useTranslation()
   let name = (translate) ? translate + option.name : option.name
   let type = (option.type) ? option.type : defaultInputTipe
   let inputClass = (option.type === inputType1) ? style.checbox : style.input
   return (
      <div className={className}>
         <label>
            {t(name)}
            <input className={inputClass} type={type} value={value} onChange={onChange} {...option.attribute} id={option.id} />
         </label>
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
         {t(option.name)}
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
            {t(name)}
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