import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";

export const NavList = ({navList, ulClass, liClass, activeColor, changeColor}) => {

   const {t} = useTranslation()
   const title = 'title.'
   const durationTime = 500
   const sectionOffset = -39

   return (
      <ul className={ulClass}>
         {navList.map((item) =>
            <li key={item.name} className={liClass}>
               <Link
                  activeClass={activeColor} spy={true}
                  to={item.name} offset={sectionOffset} 
                  smooth={true} duration={durationTime}
                  onSetActive={changeColor}
               >
                  {t(title + item.name)}
               </Link>
            </li>
         )}
      </ul>
   );
}