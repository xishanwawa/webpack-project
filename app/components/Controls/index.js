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
    }
  }

  componentDidMount() {
  }


  render() {

    return (
      <div className = "ck-controls-main">
        <FormLibrary />
      </div>
    )
  
  }
}

export default Controls