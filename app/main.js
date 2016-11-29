// var greeter = require('./Greeter.js');
// document.getElementById("root").appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './main.less';

render(<Greeter />, document.getElementById('root'));