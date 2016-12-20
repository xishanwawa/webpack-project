import React, { Component, PropTypes } from 'react';
import reqwest from 'reqwest'
import './index.less';

class ListDemo extends React.Component{

  constructor(props){

    super(props)
    
    this.state = {
      list :[]
    }

  }
  
  componentDidMount(){


    // async function f() {
    //   return 'hello world';
    // };

    // f().then(v => console.log(v));

    let that = this;
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
       return <p className = {"tr"} key = {i}>
        <span className = {'td'}>{item.id}</span>
        <span className = {'td'}>{item.number}</span>
        <span className = {'td'}>{item.string}</span>
        <span className = {'td'}>{item.array}</span>
        <span className = {'td'}>{item.date}</span>
       </p> 
    });

    return (
      <div className={"root"} >
        <p className = {"tr"} style = {{margin: "10px 0"}}>
        <span className = {'td'}>{"id"}</span>
        <span className = {'td'}>{"number"}</span>
        <span className = {'td'}>{"star"}</span>
        <span className = {'td'}>{"array"}</span>
        <span className = {'td'}>{"date"}</span>
       </p> 
        {nodeList}
      </div>
    );
  }

}

export default ListDemo
