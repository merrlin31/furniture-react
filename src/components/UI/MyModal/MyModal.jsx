import style from './MyModale.module.scss'

export const MyModal = (props) => {

   const closeModal = () => {
      props.setVisible(false)
   }

   const showModal = () => {
      props.setVisible(true)
   }

   return (
      <>
         {props.visible &&
            <div className={style.background} onClick={closeModal}>
               <div className={style[props.class]} onClick={(e) => e.stopPropagation()}>
                  {props.children}
               </div>
            </div>
         }
      </>
   );
}