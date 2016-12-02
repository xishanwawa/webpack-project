// var greeter = require('./Greeter.js');
// document.getElementById("root").appendChild(greeter());

import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import Routes from 'routes'

ReactDOM.render(
	<Provider store={store}>
        <Routes />
    </Provider>, 
	document.getElementById('root')
);