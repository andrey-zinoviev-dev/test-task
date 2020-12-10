import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './PopupWithForm.css';
import popupCloseSign from '../../images/Icon.png';
import countries from '../../utils/countries';
import arrowUp from '../../images/Line.png';
import arrowDown from '../../images/Line-down.png';
import { OpenedPopupContext } from '../../contexts/PopupContext';
import tick from '../../images/Path.png';

const SelectContainer = styled("div")`
    margin: 0 0 16px 0;
`;
const SelectedOption = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 12px 16px;
    background-color: rgba(9, 19, 33, 0.0638304);
    border: none;
    margin: 0;
    text-align: left;
    &:focus {
        background-color: rgba(9, 19, 33, 0.0638304);
    }
`;
const Arrow = styled("img")``;

const OptionsList = styled("ul")`
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow: auto;
`;
const Option = styled("li")`
    text-align: left;
    background-color: #F0F0F1;
    padding: 12px 0 12px 16px;
    &:hover {
        background-color: rgba(0, 101, 242, 0.12);
    }
`;


function PopupWithForm(props) {

    const [countryValue, setCountryValue] = React.useState();
    const [cityValue, setCityValue] = React.useState();
    const [tickIsSet, setTickIsSet] = React.useState(false);
    const [selectedCountryOption, setSelectedCountryOption] = React.useState(false);
    const [selectedCityOption, setSelectedCityOption] = React.useState(false);
    const [isOffsetAvailable, setIsOffsetAvailable] = React.useState(false);
    const [optionOffsetTop, setOptionOffsetTop] = React.useState(0);
    // let isOffsetAvailable;
    React.useEffect(() => {
        if(selectedCityOption) {
            setIsOffsetAvailable(true);
        }
    }, [selectedCityOption]);

    //подумать над ref
    const optionRef = React.useRef();

    
    function toggleCountrySelectMenu() {
        setSelectedCountryOption(!selectedCountryOption);
    }
    function toggleCitySelectMenu() {
        isOffsetAvailable && console.log(optionRef.current);
        setSelectedCityOption(!selectedCityOption);
    }
    function showInputResult(evt) {
        setCountryValue(evt.target.textContent);
        setSelectedCountryOption(false);
    }
    function showCityInputResult(evt) {
        const { textContent, id } = evt.target;
        setOptionOffsetTop(evt.target.offsetTop);
        setCityValue({ value: textContent, id });
        setSelectedCityOption(false);
        // console.log(evt.target);
    }

    function checkInputValidity(evt) {
        const { valid } = evt.target.validity;
        if(valid) {
            evt.target.classList.remove('popup__form-input_error');
        } else {
            evt.target.classList.add('popup__form-input_error');
        }
    }

    const filteredCountry = countries.filter((country) => {
        return country.name === countryValue;
    }).pop();
   
    function putTickInCheckbox() {
        setTickIsSet(!tickIsSet);
    }

    // function showPageOffset(evt) {
    //     console.log(evt.target.offsetTop);
    // }

    const popup = React.useContext(OpenedPopupContext);
    
    return (
        <section className={`popup ${popup ? "popup_status_opened" : ""}`}>
            <div className="popup__wrapper">
                <h3 className="popup__headline">Модальное окно</h3>
                <button className="popup__button-close" onClick={props.closePopupWindow}><img src={popupCloseSign} className="popup__button-close-sign"></img></button>
                <form className="popup__form" noValidate={true}>
                    <input className="popup__form-input" placeholder="ФИО" autoComplete="off"></input>
                    <input className="popup__form-input" placeholder="+7 (___) ___-__-__" autoComplete="off"  minLength={11} onChange={checkInputValidity}></input>
                    <input className="popup__form-input" placeholder="Email" autoComplete="off" type="email" name="email" onChange={checkInputValidity}></input>
                    <SelectContainer>
                        <SelectedOption onClick={toggleCountrySelectMenu}>{countryValue ? countryValue : "Выберите страну"}<Arrow src={!selectedCountryOption ? arrowDown : arrowUp}></Arrow></SelectedOption>
                        {selectedCountryOption && <OptionsList>{countries.map((country, index) => {
                            return <Option key={index} value={country.name} onClick={showInputResult}>{country.name}</Option>
                        })}</OptionsList>}
                    </SelectContainer>
                    <SelectContainer>
                    <SelectedOption onClick={toggleCitySelectMenu}>{cityValue ? cityValue.value : "Выбрать город"}<Arrow src={!selectedCityOption ? arrowDown : arrowUp}></Arrow></SelectedOption>
                        {selectedCityOption && <OptionsList ref={optionRef}>{filteredCountry ? filteredCountry.cities.map((city, index) => {
                            return <Option key={index} value={city} onClick={showCityInputResult} id={index}>{city}</Option>
                        }) : ""}</OptionsList>}
                    </SelectContainer>
                    <div className="popup__form-input-wrapper">
                        <input className="popup__form-input-wrapper-checkbox" id="data-process-admit" name="admission" type="checkbox"></input>
                        <label className="popup__form-input-wrapper-checkbox-custom" htmlFor="data-process-admit" onClick={putTickInCheckbox}>{tickIsSet ? <img alt="галка" src={tick}></img>: ""}</label>
                        <label className="popup__form-input-wrapper-label" htmlFor="data-process-admit" onClick={putTickInCheckbox}>Я согласен на обработку данных</label>
                    </div>
                    <button className="popup__form-submit" type="submit">Отправить</button>
                </form>
            </div>
            <div className="popup__overlay" onClick={props.closePopupWindow}></div>
        </section>
    )
}

export default PopupWithForm;