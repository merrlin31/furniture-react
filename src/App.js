import './styles/App.scss';
import { Main } from './components/Main';
import { useTranslation } from 'react-i18next';

function App() {
  const {i18n} = useTranslation()
  const changeLanguage = (language) => {
      i18n.changeLanguage(language)
  }

  return (
    <div className="App wraper">
      <header>
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("uk")}>UA</button>
      </header>
      <Main />
      <footer>hh</footer>
    </div>
  );
}

export default App;
