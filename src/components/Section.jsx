export const Section = (props) => {
   return (
      <section className={props.class}>
         <div className={`${props.class}__container`}>
            {props.content}
         </div>
      </section>
   );
}