import { section1Name, section2Name, section3Name, section4Name } from "../../utils/description";
import { useEffect, useState } from "react";
import { NavList } from "./NavList";

export const Nav = ({style}) => {

   const [isMobile, setIsMobile] = useState(false)
   const [viewMenu, setViewMenu] = useState(false)

   useEffect(() => {
      const handleWindowResize = () => {
         window.innerWidth >= 600 ? setIsMobile(false) : setIsMobile(true)
      };
      window.innerWidth >= 600 ? setIsMobile(false) : setIsMobile(true)

      window.addEventListener('resize', handleWindowResize);
      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   });

   const navList = [
      {name: section1Name, color: style.section1Color}, 
      {name: section2Name, color: style.section2Color}, 
      {name: section3Name, color: style.section3Color}, 
      {name: section4Name, color: style.section4Color}
   ]

   const [activeColor, setActiveColor] = useState(style.section1Color)
   const changeColor = (section) => {
      let color = navList.find((item) => item.name === section).color
      setActiveColor(color)
   }

   const openMenu = () => {
      setViewMenu(!viewMenu)
   }

   return (
      <nav className={viewMenu ? style.menuOpen : ''}>
         {!isMobile
            ? <NavList navList={navList} ulClass={style.navList} liClass={style.navItem} activeColor={activeColor} changeColor={changeColor} />
            :<button className={style.iconMenu} type="button" onClick={openMenu}>
               <span className={style.iconMenuLine}></span>
               {viewMenu &&
                  <div className={style.navBody}>
                     <NavList navList={navList} ulClass={style.navListMobile} liClass={style.navItemMobile} />
                  </div>
               }
            </button>}
         
      </nav>
   );
}