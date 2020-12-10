import React from 'react';
class Api extends React.Component {
    constructor({baseUrl, header}) {
        super({baseUrl, header});
        this.baseUrl = baseUrl;
        this.header = header;
    }
    _handleResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }
    _handleError(err) {
        return err;
    }
    getQuotes(currency) {
        if(!currency) {
            return;
        }
        return fetch(`${this.baseUrl}=${currency}`)
        .then(this._handleResponse)
        .catch(this._handleError)
    }
}

const api = new Api({baseUrl: 'https://api.exchangeratesapi.io/latest?base'});

export default api;