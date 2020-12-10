import './Quote.css';
function Quote(props) {
    return (
        <li className="main__quotes-list-element">
            <span className="main__quotes-list-element-name">{props.currency}</span>
            <span className="main__quotes-list-element-rate">{props.rate}&euro;</span>
        </li>
    )
}
export default Quote;