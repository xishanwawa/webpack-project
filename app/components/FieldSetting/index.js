/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
const Option = Select.Option;
import './index.less'

class FieldSetting extends React.Component {
  static defaultProps = {
    onChange: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
  }

  state = {
    visible: false,
    setType: 'text'
  }

  showModal = (index) => {
    debugger
    let fields = Immutable.fromJS(this.props.list).toJS();
    let setType = fields[index].typeName;
    this.setState({
      visible: true,
      setType
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  componentDidMount() {
  }

  shiftUpField(index) {
     let fields = Immutable.fromJS(this.props.list).toJS();
     let agency = fields[index];
     fields[index] = fields[index-1];
     fields[index-1] = agency;
     this.props.onChange(fields);
  }

  shiftDownField(index) {
     let fields = Immutable.fromJS(this.props.list).toJS();
     let agency = fields[index];
     fields[index] = fields[index+1];
     fields[index+1] = agency;
     this.props.onChange(fields);
  }

  changeFieldName(index, e) {
    let fields = Immutable.fromJS(this.props.list).toJS();
    let newName = e.target.value;
    fields[index].name = newName;
    this.props.onChange(fields);
  }
  
  changeFieldType(index, value) {
    let fields = Immutable.fromJS(this.props.list).toJS();
    fields[index].typeName = value;
    this.props.onChange(fields);
  }

  switchFieldDisplay(index, checked) {
    let fields = Immutable.fromJS(this.props.list).toJS();
    fields[index].show = checked;
    this.props.onChange(fields);
  }

  switchFieldAvailable(index, checked) {
    let fields = Immutable.fromJS(this.props.list).toJS();
    fields[index].available = checked;
    this.props.onChange(fields);
  }

  addField(index) {
     let fields = Immutable.fromJS(this.props.list).toJS();
     fields.splice(index+1, 0, fields[index]);
     this.props.onChange(fields);
  }

  reduceField(index) {
     let fields = Immutable.fromJS(this.props.list).toJS();
     fields.splice(index, 1);
     this.props.onChange(fields);
  }

  render() {
    let fieldLength = this.props.list.length - 1;
    let nodeFieldList = this.props.list.map((item, index) => {
       return <li key = {index} >
              <Row>
                <Col span={3}>
                   <Button style={{ marginRight: 6 }} type="primary" onClick = {this.shiftUpField.bind(this, index)} disabled = {(index == 0) ? true : false} ><Icon type="arrow-up" /></Button>
                   <Button type="primary" onClick = {this.shiftDownField.bind(this, index)} disabled = {(index == fieldLength) ? true : false} ><Icon type="arrow-down" /></Button>
                </Col>
                <Col span={4}>
                  <Input onChange={this.changeFieldName.bind(this, index)} value = {item.name} style={{ width: 120 }} />
                </Col>
                <Col span={3}>
                  <Select onChange={this.changeFieldType.bind(this, index)} value={item.typeName} style={{ width: 80 }}>
                    <Option value="单行文本">单行文本</Option>
                    <Option value="多行文本">多行文本</Option>
                    <Option value="数值">数值</Option>
                    <Option value="日期">日期</Option>
                  </Select>
                </Col>
                <Col span={3}><a onClick = {this.showModal.bind(this, index)} >编辑</a></Col>
                <Col span={2}>
                  <Switch 
                    checked={item.show}
                    onChange={this.switchFieldDisplay.bind(this, index)}
                    checkedChildren={'显示'} 
                    unCheckedChildren={'隐藏'} 
                  />
                </Col>
                <Col span={2}>
                  <Switch 
                    checked={item.available} 
                    onChange={this.switchFieldAvailable.bind(this, index)}
                    checkedChildren={'可用'} 
                    unCheckedChildren={'禁用'} 
                  />
                </Col>
                <Col span={4}>
                   <Button style={{ marginRight: 6 }} type="primary" onClick = {this.addField.bind(this, index)} ><Icon type="plus" /></Button>
                   <Button  type="primary"  onClick = {this.reduceField.bind(this, index)} disabled = {(fieldLength == 0) ? true : false} ><Icon type="minus" /></Button>
                </Col>
              </Row>
          </li>
    })
    
    let nodeSetType;
    switch(this.state.setType)
    {
    case '单行文本':
      nodeSetType = <div>单行文本</div>;
      break;
    case '多行文本':
      nodeSetType = <div>多行文本</div>;
      break;
    case '单选框':
      nodeSetType = <div>单选框</div>;
      break;
    case '多选框':
      nodeSetType = <div>多选框</div>;
      break;
    case '数值':
      nodeSetType = <div>数值</div>;
      break;
    case '日期':
      nodeSetType = <div>日期</div>;
      break;
    default:
      nodeSetType = <div>无该字段设置项，请联系管理员</div>;
    }

    return (
      <div className = "ck-field-setting-main">
        <div className = "field-setting-box">
          <Row>
            <Col span={3}>上移/下移</Col>
            <Col span={4}>字段名称</Col>
            <Col span={3}>字段类型</Col>
            <Col span={3}>字段类型设置</Col>
            <Col span={2}>是否显示</Col>
            <Col span={2}>是否可用</Col>
            <Col span={3}>添加/删除</Col>
          </Row>
          <ul>
          {nodeFieldList} 
          </ul>
        </div>
        <Modal 
          title="字段类型设置" 
          visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          {nodeSetType}
        </Modal>
      </div>
    )

  }
}

export default FieldSetting