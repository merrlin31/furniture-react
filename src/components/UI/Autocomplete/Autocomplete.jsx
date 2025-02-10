import './aaa.css';
import { useState } from 'react';
import { MyProfileInput } from '../MyInput/MyInput';
import { menuLabelColor } from '../../../utils/description';

const MyAutocomplete = ({option, style, register, errors, items, value, setValue, field}) => {
   const [visibleDropdown, setVisibleDropdown] = useState(false)

   const setItem = (value) => {
      setValue(option.name, value, {shouldValidate: true})
      setVisibleDropdown(false)
   }

   const handleBlur = () => {
      setTimeout(() => setVisibleDropdown(false), 200)
   }
   
   return (
      <div className={style.saveProject} onFocus={() => setVisibleDropdown(true)} onBlur={handleBlur}>
         <MyProfileInput labelColor={menuLabelColor} option={option} register={register} errors={errors} />
         {visibleDropdown && items.length > 0 &&
            <div className={style.dropdown}>
               {items.map(item => <div key={item[field]} onClick={() => setItem(item[field])}>{item[field]}</div>)
            }
            </div>
         }   
      </div>
   )
}

export default MyAutocomplete
