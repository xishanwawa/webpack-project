/**
 * Created by yangtm on 2017-03-10
 */
import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
const Option = Select.Option;
import './index.less'

class SortAbleList extends React.Component {
  static defaultProps = {
    sortAbleSpan:3,
    addAndDelAbleSpan:3,
    sortAble: true,
    addAndDelAble:true,
    showTitle: true,
    editAble:true,
    plusPlace: 'next',
    plusType: 'copy',
    hasMinus: 'hasMinus',
    hasPlus: 'hasPlus',
    onChange: function (data) {
      console.log(data);
    }
  }

  constructor() {
    super();
  }

  state = {}

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

  changeFieldVal(index, dataIndex, e) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    let newName = e.target.value;
    fields[index][dataIndex] = newName;
    this.props.onChange(fields);
  }

  changeNumberFieldVal(index, dataIndex, value) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    let newName = value;
    fields[index][dataIndex] = newName;
    this.props.onChange(fields);
  }

  switchFieldVal(index, dataIndex, checked) {
    let fields = Immutable.fromJS(this.props.data).toJS();
    fields[index][dataIndex] = Number(checked);
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

    delete addObj[this.props.hasMinus];

    if(this.props.plusType =='costom'){
      addObj = this.props.plusTypeData;
    };
    
    if(this.props.plusPlace =='next'){
      fields.splice(index+1, 0, addObj);
    }else{
      fields.push(addObj);
    };

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
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                {item[columnsItem.dataIndex]}
            </Col>;
          };
          if(columnsItem.render == "input"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Input onChange={this.changeFieldVal.bind(this, index, columnsItem.dataIndex)} value = {item[columnsItem.dataIndex]} title = {item[columnsItem.dataIndex]} placeholder="不能为空.." style={{ width: 100 }} />
            </Col>;
          }else if(columnsItem.render == "inputNumber"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <InputNumber min={columnsItem.min || null} max={columnsItem.max || null} value={item[columnsItem.dataIndex]} onChange={this.changeNumberFieldVal.bind(this, index, columnsItem.dataIndex)} />
            </Col>;
          }else if(columnsItem.render == "boolean"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Switch 
                  checked={(Number(item[columnsItem.dataIndex]) == 1) ? true : false}
                  onChange={this.switchFieldVal.bind(this, index, columnsItem.dataIndex)}
                  checkedChildren={columnsItem.checkedText || '是'} 
                  unCheckedChildren={columnsItem.unCheckedText || '否'} 
                />
            </Col>;
          }else if(columnsItem.render == "select"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Select onChange={this.selectFieldVal.bind(this, index, columnsItem.dataIndex)} value={item[columnsItem.dataIndex]} style={{ width: 80 }}>
                  {columnsItem.selectList.map((selectListItem, selectListIndex )=>{
                      return <Option key = {selectListIndex} value={selectListItem.val}>{selectListItem.name}</Option>
                  })}
                </Select>
            </Col>;
          }else if(columnsItem.render == "link"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <a onClick = {columnsItem.Event.bind(this, item, index)} >编辑</a>
            </Col>;
          }else{
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                {item[columnsItem.dataIndex]}
            </Col>;
          };
       });
       return <li key = {index} style={{ margin:"10px 0"}}>
              <Row>
                {this.props.sortAble ? <Col span={this.props.sortAbleSpan}>
                   <Button style={{ marginRight: 6 }} type="primary" onClick = {this.shiftUpField.bind(this, index)} disabled = {(index == 0) ? true : false} ><Icon type="arrow-up" /></Button>
                   <Button type="primary" onClick = {this.shiftDownField.bind(this, index)} disabled = {(index == fieldLength) ? true : false} ><Icon type="arrow-down" /></Button>
                </Col>:''}
                {nodeItemList}
                {this.props.addAndDelAble ? <Col span={this.props.addAndDelAbleSpan}>
                   {item[this.props.hasPlus] ? null :
                     <Button style={{ marginRight: 6 }} type="primary" onClick = {this.addField.bind(this, index)} ><Icon type="plus" /></Button>}
                   {item[this.props.hasMinus] ? null :
                   <Button  type="primary"  onClick = {this.reduceField.bind(this, index)} disabled = {(fieldLength == 0) ? true : false} ><Icon type="minus" /></Button>}
                </Col>: ''}
              </Row>
          </li>
    })
    let nodeColumns = this.props.showTitle ? <Row style={{ fontWeight:'bold', background: '#f7f7f7', padding:'10px 4px'}}>
          {this.props.sortAble ? <Col span={this.props.sortAbleSpan}>上移/下移</Col> : ''}
          {this.props.columns.map((item) => {
            return <Col key ={item.key} span={item.span || 3}>{item.title}</Col>
          })}
          {this.props.addAndDelAble ? <Col span={this.props.addAndDelAbleSpan}>添加/删除</Col> : ""}
        </Row>:null;
    return (
      <div className = "ck-sortable-list">
        {nodeColumns}
        <ul>
        {nodeFieldList} 
        </ul>
      </div>
    )

  }
}

export default SortAbleList