/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input } from 'antd';
import './index.less'

class Controls extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
       controlsList: [
          {
            name: "单行文本",
            type: "text"
          },
          {
            name: "多行文本",
            type: "textarea"
          },        
          {
            name: "下拉菜单"
          },        
          {
            name: "单选框"
          },        
          {
            name: "复选框"
          },        
          {
            name: "数字"
          },        
          {
            name: "日期"
          },        
          {
            name: "日期区间"
          }
        ],
        addControlsList:[]
    }
  }

  componentDidMount() {
  }

  ControlsList(item, event) {
    //  console.log(event.pageX +','+ event.pageY);
    //  console.log(event.target.offsetLeft+','+event.target.offsetTop);
    //  console.log(item.name);
    let addControlsList = this.state.addControlsList;
    addControlsList.push(item);
    this.setState({
        addControlsList
    });

  }

  deleteItem(item, index) {
    let addControlsList = this.state.addControlsList;
    addControlsList.splice(index, 1);
    this.setState({
        addControlsList
    });
  }

  render() {

    const nodeControlsList = this.state.controlsList.map((item, index) => {
        return <span key = {index} onClick = { this.ControlsList.bind(this, item) } >{item.name}</span>
    });

    const nodeAddControlsList = this.state.addControlsList.map((item, index) => {
        return <li key = {index} >
            <Input placeholder = {item.name} type = {item.type} />
            <Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button>
        </li>
    });

    return (
      <div className = "ck-controls-main">
        <div className = "ck-controls no-select">
          {nodeControlsList}
        </div>
        <div className = "controls-box">
          <ul>
          {nodeAddControlsList} 
          </ul>
        </div>
      </div>
    )
  
  }
}

export default Controls