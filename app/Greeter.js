// var config = require("./config.json")

// module.exports = function() {
// 	var greet  = document.createElement("div");
// 	greet.textContent = config.greetText; 
// 	return greet;
// }

//Greeter,js
import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';
// //导入模拟数据
// import data from './Mock/index.js'
// console.log(data);

//使用ajax模拟数据
import Mock   from 'mockjs'
import reqwest from 'Reqwest'

class Greeter extends Component{

  constructor(props){

    super(props)
    
    this.state = {
      list :[]
    }

  }
  
  componentDidMount(){

    let that = this;

    Mock.mock('http://g1.cn', {
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            "number|100-200": 100,
            "string|1-5": "★",
            "array|1": [
                "北京",
                "上海",
                "广州"
            ],
            "date":'@datetime("yyyy-MM-dd HH:mm:ss")'
        }]
    })

    reqwest({
        url: 'http://g1.cn',
        method: 'post',
        type: 'json',
    }).then(function (data) {
      that.setState({
         list: data.list
      })
    })

  }


  render() {

    let nodeList = '';

    nodeList = this.state.list.map(function(item, i){
       return <p className = {styles.tr} key = {i}>
        <span className = {styles.td}>{item.id}</span>
        <span className = {styles.td}>{item.number}</span>
        <span className = {styles.td}>{item.string}</span>
        <span className = {styles.td}>{item.array}</span>
        <span className = {styles.td}>{item.date}</span>
       </p> 
    });

    return (
      <div className={styles.root} >
        {config.greetText}
        {nodeList}
      </div>
    );
  }

}

export default Greeter
