import React from 'react';
import './QuoteList.css';
import Quote from '../Quote/Quote';
// import qoutes from '../../utils/quotes';
function QuoteList(props) {

    let array = [];

    Object.entries(props.currencyQuotes).forEach((entry) => {
        const [currency, rate] = entry;
        array.push({currency: currency, rate: Math.floor(rate * 100)/100});
    });
    return (
        
        <ul className="main__quotes-list">
           {array ? array.map((quote, index) => {
               return <Quote key={index} currency={quote.currency} rate={quote.rate}></Quote>
           }): ""} 
        </ul>
    )
}
export default QuoteList;