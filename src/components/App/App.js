// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import api from '../../utils/api';
import { OpenedPopupContext, popup } from '../../contexts/PopupContext';

function App() {
  const [isUrlMainPage, setIsUrlMainPage] = React.useState(true);
  const [popupWindow, setPopupWindow] = React.useState('closed');
  const [pageRoute, setPageRoute] = React.useState("/");

  function switchToNotMainPage() {
    setIsUrlMainPage(false);
  }
  function switchToMainPage() {
    setIsUrlMainPage(true);
  }
  function openPopupWindow() {
    setPopupWindow('opened');
  }
  function closePopupWindow() {
    setPopupWindow('closed');
  }
  function getQoutes(currency) {
    return api.getQuotes(currency)
  }

  return (
    <div className="App">
    <OpenedPopupContext.Provider value={popup[popupWindow]}>
      <Header openPopupWindow={openPopupWindow} isUrlMainPage={isUrlMainPage} onMainLickClick={switchToMainPage} onNotMainLinkClick={switchToNotMainPage}/>
      <Switch>
        <Route exact path = "/">
          <Main />
        </Route>
        <Route path = "/rates">
          <Main type="rates" getQuotes={getQoutes} />
        </Route>
      </Switch>
      <PopupWithForm closePopupWindow={closePopupWindow}></PopupWithForm>
    </OpenedPopupContext.Provider>
    </div>
  );
}

export default App;
