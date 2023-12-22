import { useTranslation } from "react-i18next";

export const Title = ({className, title}) => {
   const {t} = useTranslation()

   return (
      <h2 className={className}>{t(title)}</h2>
   );
}