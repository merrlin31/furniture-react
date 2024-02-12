import { useTranslation } from 'react-i18next';

export const Language = (props) => {

   const {i18n} = useTranslation()
   const changeLanguage = (language) => {
      i18n.changeLanguage(language)
   }
   return (
      <div>
         <button onClick={() => changeLanguage("en")}>EN</button>
         <button onClick={() => changeLanguage("uk")}>UA</button>
      </div>
   );
}