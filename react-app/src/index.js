import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RegisterSignIn from './RegisterSignIn';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

if(!localStorage.getItem('user')) {

    var user = {
        username: '',
        isadmin: false,
        isloggedin: false
    };

    localStorage.setItem('user', JSON.stringify(user));
}

//window.onunload = function () {
//    localStorage.clear();
//}
//
if (JSON.parse(localStorage.getItem('user')).isloggedin === false) {
    ReactDOM.render(<RegisterSignIn />, document.getElementById('root'));
}

else {
    ReactDOM.render(<App />, document.getElementById('root'));
}

registerServiceWorker();
