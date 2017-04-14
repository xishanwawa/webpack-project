/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class FormList extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
        formList:[
          {
            Label: "单行文本",
            Type: 'text'
          },
          {
            Label: "多行文本",
            Type: 'textarea'
          },
          {
            Label: "数值框",
            Type: 'number'
          }
        ]
    }
  }

  componentDidMount() {
  }

  renderMoveElement(index) {

    
  }

  render() {
    let nodeList = this.state.formList.map((item, index)=>{
       return <span onMouseDown = {this.renderMoveElement.bind(this, index)} key = {item.Type}>{item.Label}</span>
    })

    return (
      <div>
        <div className = "ck-formlist-main">
          {nodeList}
        </div>
      </div>
    )
  }
}

export default FormList