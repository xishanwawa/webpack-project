/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react';
import './index.less';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
const RadioGroup = Radio.Group;

export default class SetDateFormat extends React.Component {
  static defaultProps = {
  }

  constructor() {
    super();
  }

  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={3}>
           格式
          </Col>
          <Col span={6}>
           <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>年-月-日</Radio>
            <Radio value={2}>年-月</Radio>
            <Radio value={3}>年-月-日 时：分：秒</Radio>
          </RadioGroup>
          </Col>
        </Row>
      </div>
    )
  }
}