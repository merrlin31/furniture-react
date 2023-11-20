import { containerClass } from "../utils/description"

export const Section = (props) => {
   return (
      <section className={props.class}>
         <div className={props.class + containerClass}>
            {props.content}
         </div>
      </section>
   );
}