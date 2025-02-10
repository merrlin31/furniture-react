import { btnType1, menuBtnType } from '../../../utils/description';
import style from './MyButton.module.scss'

export const MyButton = ({children, color, onClick, btnType}) => {
   let btnStyle = style.button
   if (btnType === btnType1) btnStyle = style.authBtn

   return (
      <button className={`${btnStyle} ${style[color]}`} onClick={onClick}>{children}</button>
   );
}

export const MyButton1 = ({children, color, btnType, disabled}) => {
   let btnStyle = style.button
   if (btnType === btnType1) btnStyle = style.authBtn
   if (btnType === menuBtnType) btnStyle = style.menuBtn
   let btnClass = `${btnStyle} ${style[color]}`
   btnClass += (disabled) ? ` ${style.inactive}` : ` ${style.active}`

   return (
         <button className={btnClass} disabled={disabled}>{children}</button>
   );
}