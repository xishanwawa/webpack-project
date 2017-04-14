/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class FormSetting extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
        addControlsList:[]
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className = "ck-formsetting-main">
      </div>
    )
  }
}

export default FormSetting