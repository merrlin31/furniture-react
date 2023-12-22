import { useTranslation } from "react-i18next";
import { MyEditableInput } from "../UI/MyInput/MyInput";

export const SpecificationTotalSumItem = (props) => {
   const {t} = useTranslation()
   const translate = 'totalSum.'

   return (
      <tr>
         <td>{t(translate + props.name)}</td>
         <td>{props.sum && +props.sum.toFixed(2)}</td>
         {!props.editable 
            ? <td>{props.discount && +props.discount.toFixed(2)}</td>
            : <td><MyEditableInput id={props.name} value={props.value} onChange={props.onChange} /></td>
         }
         <td>{+props.sumWithDiscount.toFixed(2)}</td>
      </tr>
   );
}