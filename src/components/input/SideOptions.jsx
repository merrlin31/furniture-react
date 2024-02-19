import { changeValues } from "../../reducers/productReducer";
import { sideClass, sideOption1, sideType1, sideType2, sideType3 } from "../../utils/description";
import { MySelect } from "../UI/MySelect/MySelect";

export const SideOptions = ({className, value, dispatch}) => {

   const side = {
      name: sideOption1, select: sideOption1, id: sideOption1, options: [
         {value: sideType1, name: sideType1},
         {value: sideType2, name: sideType2},
         {value: sideType3, name: sideType3},
      ], defaulValue: 'sideDefaultValue'
   }

   return (
      <MySelect options={side} value={value.side} className={className + sideClass} onChange={(v) => dispatch(changeValues({side: v}))} />
   );
}