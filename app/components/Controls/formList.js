/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import Immutable from 'immutable'
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
    }
  }

  componentDidMount() {
  }

  render() {
    //let moveInEle = this.props.moveInActive ? <div className = "drag-active"></div> : null
    let formData = Immutable.fromJS(this.props.data).toJS();
    if(this.props.moveInActive){
      formData.splice(this.props.moveInIndex, 0, {})
    };

    let formDataEle = formData.map((item, index)=>{
        if(this.props.moveInIndex == index && this.props.moveInActive){
          return <div className = "drag-active" key = {index}>{item.Label}</div>
        }
        return <div className = "drag-item" key = {index}>{item.Label}</div>
    });

    return (
      <div>
        <div className = "ck-formlist-main">
          {formDataEle}
        </div>
      </div>
    )
  }
}

export default FormList