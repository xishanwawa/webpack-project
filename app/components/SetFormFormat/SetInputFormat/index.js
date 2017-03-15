/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
import './index.less'

export default class SetInputFormat extends React.Component {
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
           最大长度：
          </Col>
          <Col span={6}>
           <Input />
          </Col>
        </Row>
      </div>
    )
  }
}