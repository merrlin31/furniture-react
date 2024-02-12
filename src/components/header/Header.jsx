import style from './header.module.scss'

import { Nav } from './Nav';
import { Language } from './Language';

export const Header = () => {

   return (
      <header>
         <Language />
         <Nav style={style} />
      </header>
   );
}