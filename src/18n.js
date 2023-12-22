import i18n from "i18next";
import Backend from 'i18next-http-backend'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next";

i18n.use(Backend).use(languageDetector).use(initReactI18next).init({
   fallbackLng:"uk",
   debug: true,
   detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie']
   },
   backend: {
      loadPath: process.env.PUBLIC_URL + "/locales/{{lng}}/translation.json",
   },
   interpolation: {
      escapeValue: false
   }
})

export default i18n