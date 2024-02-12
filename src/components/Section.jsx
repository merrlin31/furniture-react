import { containerClass } from "../utils/description"

export const Section = (props) => {

   return (
      <section className={props.class} id={props.name}>
         <div className={props.class + containerClass}>
            {props.children}
         </div>
      </section>
   );
}