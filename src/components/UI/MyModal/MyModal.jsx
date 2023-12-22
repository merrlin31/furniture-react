import style from './MyModale.module.scss'

export const MyModal = (props) => {

   const closeModal = () => {
      props.setVisible(false)
   }

   return (
      <>
         {props.visible &&
            <div className={style.background} onClick={closeModal}>
               <div className={style.form} onClick={(e) => e.stopPropagation()}>
                  {props.children}
               </div>
            </div>
         }
      </>
   );
}