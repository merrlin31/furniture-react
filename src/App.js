import './styles/App.scss';
import { Main } from './components/Main';
import { Header } from './components/header/Header';
import { Provider } from 'react-redux';
import { store } from './reducers';

function App() {
  

  return (
    <div className="App wraper">
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
      <footer>hh</footer>
    </div>
  );
}

export default App;
