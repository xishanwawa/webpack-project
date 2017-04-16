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
  
  dragActive(bool, pageY) {
    if(this.state.moveInActive != bool){
      this.setState({moveInActive: bool})
    };

    if(bool) {
        let index = Math.floor((pageY - 168)/62);

        //console.log(bool);
        this.setState({moveInIndex: index});
    }
  }
  
  dragEnd(moveStateObj) {
    let formData = this.state.formData;
    formData.splice(this.state.moveInIndex, 0, moveStateObj);
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
        />
      </div>
    )
  
  }
}

export default Controls