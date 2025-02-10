import './styles/App.scss';
import { Main } from './components/Main';
import { Header } from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './actions/auth';

function App() {

  const isAuth = useSelector(state => state.user.isAuth)
  const isActivated = useSelector(state => state.user.isActivated)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(checkAuth(localStorage.getItem('token')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="App wraper">
      <Header />
      {!isActivated && isAuth && <div>'Треба активувати ваш email'</div>}
      <Main />
      <footer>hh</footer>
    </div>
  );
}

export default App;
