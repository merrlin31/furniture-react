import style from './header.module.scss'
// import { Language } from './Language';

import { Nav } from './Nav';

export const Header = () => {
   

   return (
      <header>
         <div className={style.title}>Кухні</div>
         <Nav style={style} />
         {/* <Language /> */}
      </header>
   );
}