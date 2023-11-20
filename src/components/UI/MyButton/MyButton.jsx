import style from './MyButton.module.scss'

export const MyButton = ({children, color, onClick}) => {
   return (
      <button className={`${style.button} ${style[color]}`} onClick={onClick}>{children}</button>
   );
}