/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
import './index.less'

export default class SetInputNumberFormat extends React.Component {
  static defaultProps = {

  }

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={3}>
           最大值：
          </Col>
          <Col span={6}>
           <Input />
          </Col>
          <Col span={1}>
          </Col>
          <Col span={3}>
           最小值：
          </Col>
          <Col span={6}>
           <Input />
          </Col>
        </Row>
      </div>
    )
  }
}