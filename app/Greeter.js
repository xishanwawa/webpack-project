// var config = require("./config.json")

// module.exports = function() {
// 	var greet  = document.createElement("div");
// 	greet.textContent = config.greetText; 
// 	return greet;
// }

//Greeter,js
import React, {Component} from 'react'
import reqwest from 'Reqwest'
// // //导入模拟ajax数据
// import  './Mock/index.js'
//import config from './config.json';
import styles from './Greeter.css';
//使用模拟ajax数据
import Mock   from 'mockjs'
Mock.mock('http://g1.cn', {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [{
        'id|+1': 1,
        "number|100-200": 100,
        "string|1-5": "★",
        "array|1": [
            "北京",
            "上海",
            "深圳",
            "广州"
        ],
        "date":'@datetime("yyyy-MM-dd HH:mm:ss")'
    }]
})

class Greeter extends Component{

  constructor(props){

    super(props)
    
    this.state = {
      list :[]
    }

  }
  
  componentDidMount(){

    let that = this;
    reqwest({
        url: 'http://g1.cn',
        method: 'post',
        type: 'json',
    }).then(function (data) {
      debugger
      that.setState({
         list: data.list
      })
    })

  }


  render() {

    let nodeList = '';

    nodeList = this.state.list.map(function(item, i){
       return <p className = {'tr'} key = {i}>
        <span className = {'td'}>{item.id}</span>
        <span className = {'td'}>{item.number}</span>
        <span className = {'td'}>{item.string}</span>
        <span className = {'td'}>{item.array}</span>
        <span className = {'td'}>{item.date}</span>
       </p> 
    });

    return (
      <div className={'root'} >
        {/*config.greetText*/}
        <p className = {'tr'} style = {{marginBottom:10}}>
        <span className = {'td'}>{"id"}</span>
        <span className = {'td'}>{"number"}</span>
        <span className = {'td'}>{"string"}</span>
        <span className = {'td'}>{"array"}</span>
        <span className = {'td'}>{"date"}</span>
       </p> 
        {nodeList}
      </div>
    );
  }

}

export default Greeter
