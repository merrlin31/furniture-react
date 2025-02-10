import style from './header.module.scss'

import { Nav } from './Nav';
import Profile from '../profile/Profile';

export const Header = () => {
   

   return (
      <header>
         <div className={style.title}>Кухні</div>
         <Nav style={style} />
         <Profile style={style} />
      </header>
   );
}