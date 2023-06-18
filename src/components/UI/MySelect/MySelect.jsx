import style from './MySelect.module.scss'

export const MySelect = ({options, value, onChange}) => {
   return (
      <div className={options.className}>
         <label>
            {options.name
               ? options.name
               : ''
            }
            <select className={style.select} value={value} onChange={e => onChange(e.target.value)}>
               <option disabled value='value1'>{options.defaulValue}</option>
               {options.options.map(option =>
                  <option key={option.value} value={option.value}>
                     {option.name}
                  </option>
               )}
            </select>
         </label>
      </div>   
   );
}