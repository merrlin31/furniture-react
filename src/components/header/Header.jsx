import style from './header.module.scss'

import { Nav } from './Nav';
import { Language } from './Language';
import { loadStore } from '../../reducers/utils';
import { useDispatch } from 'react-redux';
import { clearDetail, loadDetail } from '../../reducers/detailReducer';
import { clearSetting, loadSetting } from '../../reducers/settingReducer';
import { clearProduct, loadProduct } from '../../reducers/productReducer';

export const Header = () => {
   const dispatch = useDispatch()
   const clear = () => {
      dispatch(clearDetail())
      dispatch(clearSetting())
      dispatch(clearProduct())
   }
   const recover = () => {
      const newStore = loadStore()
      dispatch(loadProduct(newStore.product))
      dispatch(loadDetail(newStore.detail))
      dispatch(loadSetting(newStore.setting))
   }

   return (
      <header>
         <Language />
         <button onClick={recover}>восстановить</button>
         <button onClick={clear}>очистить</button>
         <Nav style={style} />
      </header>
   );
}