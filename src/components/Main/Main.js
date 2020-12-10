import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import './Main.css';
import QuoteList from '../QuoteList/QuoteList';
import api from '../../utils/api';
function Main(props) {
    const [selectedCurrency, setSelectedCurrency] = React.useState("");
    const [roubleToCurrency, setRoubleToCurrency] = React.useState(0);
    //возможно делать запрос к api к евро по умолчанию
    const [currencyQuotes, setCurrencyQuotes] = React.useState({});
    const [clickedButton, setClickedButton] = React.useState("Евро");
    const { url } = useRouteMatch();

    React.useEffect(() => {
        api.getQuotes("EUR")
        .then((res) => {
            setCurrencyQuotes(res.rates);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
    

    function selectCurrency(evt) {
        setSelectedCurrency(evt.target.value);
    }

    function submitQuoteForm(evt) {
        evt.preventDefault();
        if(selectedCurrency === "" || evt.target.value === "") {
            return;
        }
        return api.getQuotes(selectedCurrency)
        .then((res) => {
            setRoubleToCurrency(Math.ceil(res.rates.RUB));
        })
        .catch((err) => {
            console.log(err);
        })
    }
    function setCurrencyForQuotes(evt) {
        setClickedButton(evt.target.textContent);
        api.getQuotes(evt.target.value)
        .then((res) => {
            setCurrencyQuotes(res.rates);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <main className="main">
            <div className="container">
                <div className="main__wrapper">
                    <h1 className="main__headline">{!props.type? "Конвертер валют" : "Котировки"}</h1>
                    <p className="main__subtitle">{!props.type ? "Расчет кросс курса, позволяющий автоматически осуществлять конвертацию доллара и евро в рубли" : "Здесь отображаются котировки разных валют, в зависимости от выбранной валюты"}</p>
                    {!props.type ? <form className="main__form">
                        <select className="main__form-select" name="currency" onChange={selectCurrency}>
                            <option value="">Выберите валюту</option>
                            <option value="USD">Доллар</option>
                            <option value="EUR">Евро</option>
                        </select>
                        <input className="main__form-input" name="summ" placeholder="Укажите сумму" onChange={submitQuoteForm} autoComplete="off"></input>
                        <span className="main__form-currency-logo">&euro;</span>
                    </form> : <ul className="main__currencies-list">
                                <li className="main__currencies-list-element">{<button className={`main__currencies-list-element-button ${clickedButton === "Доллар" ? "main__currencies-list-element-button_status_active" : ""}`} onClick={setCurrencyForQuotes} value="USD">Доллар</button>}</li>
                                <li className="main__currencies-list-element">{<button className={`main__currencies-list-element-button ${clickedButton === "Евро" ? "main__currencies-list-element-button_status_active" : ""}`} onClick={setCurrencyForQuotes} value="EUR">Евро</button>}</li>
                                <li className="main__currencies-list-element">{<button className={`main__currencies-list-element-button ${clickedButton === "Рубль" ? "main__currencies-list-element-button_status_active" : ""}`} onClick={setCurrencyForQuotes} value="RUB">Рубль</button>}</li>
                            </ul>
                    }
                    {!props.type ? <span className="main__currency-result">&#8381;{roubleToCurrency}</span> : <h2 className="main__quotes-subheading">Курс по отношению к {clickedButton}</h2>}
                    {!props.type ? "" : <QuoteList currencyQuotes={currencyQuotes}></QuoteList>}
                </div>
            </div>
        </main>
    )
}

export default Main;