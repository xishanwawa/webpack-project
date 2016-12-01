// var greeter = require('./Greeter.js');
// document.getElementById("root").appendChild(greeter());

import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from 'containers'
import { store } from 'store'

ReactDOM.render(
	<Provider store={store}>
        <App />
    </Provider>, 
	document.getElementById('root')
);