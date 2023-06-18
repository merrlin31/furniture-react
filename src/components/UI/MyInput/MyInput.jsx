import style from './MyInput.module.scss'

export const MyInput = ({option, value, onChange, children}) => {
   return (
      <div className={option.className}>
         <label>
            {option.name}
            {option.bind
               ? children
               : ''
            }
            <input className={style.input} type={option.type} value={value} onChange={onChange} {...option.attribute} id={option.id} />
            
         </label>
      </div>   
   );
}