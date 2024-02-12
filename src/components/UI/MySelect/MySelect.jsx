import { useTranslation } from 'react-i18next';
import style from './MySelect.module.scss'

export const MySelect = ({options, value, onChange, className, translate}) => {

   const {t} = useTranslation()
   let name = (translate) ? translate + options.name : options.name
   return (
      <div className={className}>
         <label>
         <div className={style.label}>{options.name && t(name)}</div>
            <select className={style.select} value={value} onChange={e => onChange(e.target.value)} id={options.id}>
               <option disabled value=''>{t(options.defaulValue)}</option>
               {options.options.map((option, index) =>
                  <option key={index} value={option.value}>
                     {t(option.name)}
                  </option>
               )}
            </select>
         </label>
      </div>   
   );
}