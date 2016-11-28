// var config = require("./config.json")

// module.exports = function() {
// 	var greet  = document.createElement("div");
// 	greet.textContent = config.greetText; 
// 	return greet;
// }

//Greeter,js
import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';//导入
import data from './Mock/index.js'

class Greeter extends Component{
  render() {
    let list = '';
    debugger
    list = data.list.map(function(item, i){
       return <p className = "tr" key = {i}>
        <span className = "td">{item.id}</span>
        <span className = "td">{item.string}</span>
       </p> 
    });
    return (
      <div className={styles.root} >
        {config.greetText}
        {list}
      </div>
    );
  }
}

export default Greeter
