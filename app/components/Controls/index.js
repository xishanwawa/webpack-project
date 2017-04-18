/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

import FormLibrary from './formLibrary'
import FormList from './formList'
import FormSetting from './formSetting'

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
      formData: [

      ],
      moveInActive: false,
      moveInIndex: 0
    }
  }

  componentDidMount() {
  }
  
  //正在拖动中
  dragActive(bool, pageY) {
    if(this.state.moveInActive != bool){
      this.setState({moveInActive: bool})
    };

    if(bool) {
        //计算拖动在索引值
        let index = Math.floor((pageY - 168)/62);
        this.setState({moveInIndex: index});
    }
  }
  
  //拖动结束事件
  dragEnd(moveStateObj, isList) {
    let formData = this.state.formData;
    //把要添加的项放在计算索引位置

    if(this.state.moveInActive && !isList){
      formData.splice(this.state.moveInIndex, 0, moveStateObj);
      this.setState({ formData })
    }else{
      formData.splice(this.state.moveInIndex, 1, moveStateObj);
      this.setState({ formData })
    };
  }
  
  //移除表单项
  removeItem(index) {
    let formData = this.state.formData;
    formData.splice(index, 1);
    this.setState({ formData })
  }

  render() {

    return (
      <div className = "ck-controls-main">
        <FormLibrary 
          dragActive = {this.dragActive.bind(this)}
          dragEnd = {this.dragEnd.bind(this)}
        />
        <FormList 
          moveInActive = {this.state.moveInActive} 
          data = {this.state.formData} 
          moveInIndex = {this.state.moveInIndex}
          dragActive = {this.dragActive.bind(this)}
          dragEnd = {this.dragEnd.bind(this)}
          removeItem = {this.removeItem.bind(this)}
        />
      </div>
    )
  
  }
}

export default Controls