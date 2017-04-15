/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class InputMoveEle extends React.Component {
  static defaultProps = {
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
      <div>
        <Input placeholder="请输入。。" />
      </div>
    )
  }
}

class TextareMoveEle extends React.Component {
  static defaultProps = {
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
      <div>
        <Input type="textarea" rows={2} />
      </div>
    )
  }
}

class NumberMoveEle extends React.Component {
  static defaultProps = {
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
      <div>
        <InputNumber min={1} max={10} defaultValue={3} />
      </div>
    )
  }
}


export {
  InputMoveEle,
  TextareMoveEle,
  NumberMoveEle
}