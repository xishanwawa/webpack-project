/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
const Option = Select.Option;
import './index.less'

class SortAbleList extends React.Component {
  static defaultProps = {
    sortAble: true,
    addAndDelAble:true,
    editAble:true,
    onChange: function (data) {
      console.log(data);
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
     let fields = Immutable.fromJS(this.props.data).toJS();
     let agency = fields[index];
     fields[index] = fields[index-1];
     fields[index-1] = agency;
     this.props.onChange(fields);
  }

  shiftDownField(index) {
     let fields = Immutable.fromJS(this.props.data).toJS();
     let agency = fields[index];
     fields[index] = fields[index+1];
     fields[index+1] = agency;
     this.props.onChange(fields);
  }

  changeFieldVal(index, dataIndex,  e) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    let newName = e.target.value;
    fields[index][dataIndex] = newName;
    this.props.onChange(fields);
  }

  switchFieldVal(index, dataIndex, checked) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    fields[index][dataIndex] = checked;
    this.props.onChange(fields);
  }
  
  selectFieldVal(index, dataIndex, val) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    fields[index][dataIndex] = val;
    this.props.onChange(fields);
  }

  addField(index) {
     let fields = Immutable.fromJS(this.props.data).toJS();
     let addObj = Immutable.fromJS(fields[index]).toJS();
     addObj.key++
     fields.splice(index+1, 0, addObj);
     this.props.onChange(fields);
  }

  reduceField(index) {
     let fields = Immutable.fromJS(this.props.data).toJS();
     fields.splice(index, 1);
     this.props.onChange(fields);
  }

  render() {
    let fieldLength = this.props.data.length - 1;
    let nodeFieldList = this.props.data.map((item, index) => {
       let nodeItemList =  this.props.columns.map((columnsItem, columnsIndex) => {
          if(!this.props.editAble){
            return <Col key = {columnsItem.key} span={3}>
                {item[columnsItem.dataIndex]}
            </Col>;
          };
          if(columnsItem.render == "input"){
            return <Col key = {columnsItem.key} span={3}>
                <Input onChange={this.changeFieldVal.bind(this, index, columnsItem.dataIndex)} value = {item[columnsItem.dataIndex]} style={{ width: 100 }} />
            </Col>;
          }else if(columnsItem.render == "switch"){
            return <Col key = {columnsItem.key} span={3}>
                <Switch 
                  checked={item[columnsItem.dataIndex]}
                  onChange={this.switchFieldVal.bind(this, index, columnsItem.dataIndex)}
                  checkedChildren={'显示'} 
                  unCheckedChildren={'隐藏'} 
                />
            </Col>;
          }else if(columnsItem.render == "select"){
            return <Col key = {columnsItem.key} span={3}>
                <Select onChange={this.selectFieldVal.bind(this, index, columnsItem.dataIndex)} value={item[columnsItem.dataIndex]} style={{ width: 80 }}>
                  {columnsItem.selectList.map((selectListItem, selectListIndex )=>{
                      return <Option key = {selectListIndex} value={selectListItem.val}>{selectListItem.name}</Option>
                  })}
                </Select>
            </Col>;
          }else if(columnsItem.render == "link"){
            return <Col key = {columnsItem.key} span={3}>
                <a onClick = {columnsItem.Event.bind(this, item, index)} >编辑</a>
            </Col>;
          }else{
            return <Col key = {columnsItem.key} span={3}>
                {item[columnsItem.dataIndex]}
            </Col>;
          };
       });
       return <li key = {index} >
              <Row>
                {this.props.sortAble ? <Col span={3}>
                   <Button style={{ marginRight: 6 }} type="primary" onClick = {this.shiftUpField.bind(this, index)} disabled = {(index == 0) ? true : false} ><Icon type="arrow-up" /></Button>
                   <Button type="primary" onClick = {this.shiftDownField.bind(this, index)} disabled = {(index == fieldLength) ? true : false} ><Icon type="arrow-down" /></Button>
                </Col>:''}
                {nodeItemList}
                {this.props.addAndDelAble ? <Col span={3}>
                   <Button style={{ marginRight: 6 }} type="primary" onClick = {this.addField.bind(this, index)} ><Icon type="plus" /></Button>
                   <Button  type="primary"  onClick = {this.reduceField.bind(this, index)} disabled = {(fieldLength == 0) ? true : false} ><Icon type="minus" /></Button>
                </Col>: ''}
              </Row>
          </li>
    })

    return (
      <div className = "ck-sortable-list">
        <Row style={{ fontWeight:'bold', background: '#f7f7f7', padding:'10px 4px'}}>
          {this.props.sortAble ? <Col span={3}>上移/下移</Col> : ''}
          {this.props.columns.map((item) => {
            return <Col key ={item.key} span={3}>{item.title}</Col>
          })}
          {this.props.addAndDelAble ? <Col span={3}>添加/删除</Col> : ""}
        </Row>
        <ul>
        {nodeFieldList} 
        </ul>
      </div>
    )

  }
}

export default SortAbleList