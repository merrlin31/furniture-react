import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { sideClass, sideOption1 } from "../../utils/description";
import { sideOptions } from "../properties/inputProperties";
import { MySelect1 } from "../UI/MySelect/MySelect";

export const SideOptions = ({className}) => {
   const { register } = useFormContext();
   const defaultValue = 'sideDefaultValue'
   const [side] = useState({defaultValue: defaultValue, name: sideOption1, select: sideOption1, id: sideOption1,
      options: sideOptions
   })

   return (
      <MySelect1 className={className + sideClass} options={side} register={register} />
   );
}