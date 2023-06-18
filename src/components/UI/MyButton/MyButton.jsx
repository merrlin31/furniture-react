import style from './MyButton.module.scss'

export const MyButton = ({children, color}) => {
   return (
      <button className={`${style.button} ${style[color]}`}>{children}</button>
   );
}