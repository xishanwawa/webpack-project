/**
 * Created by yangtm on 2017-03-10
 */
import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, Switch, Row, Col, Icon, Modal } from 'antd';
const ButtonGroup = Button.Group;
const Option = Select.Option;
import './index.less'

class SortAbleList extends React.Component {
  static defaultProps = {
    size: "default",
    sortAbleSpan:3,
    addAndDelAbleSpan:3,
    sortAble: true,
    addAndDelAble:true,
    showHeader: true,
    plusPlace: 'next',
    plusType: 'copy',
    hasMinus: 'hasMinus',
    hasPlus: 'hasPlus',
    commonPlus: true,
    delAsk: false,
    allowLenZero: false,
    upDownControlText: '上移/下移',
    addDelControlText: '添加/删除',
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
     let that = this;
     let fields = Immutable.fromJS(this.props.data).toJS();
     let item = fields.splice(index, 1);
     if(this.props.delAsk){
        Modal.confirm({
          title: '确定删除该项？',
          content: '',
          okText: '是',
          cancelText: '否',
          onOk: function(){
             that.props.onChange(fields, item[0]);
          },
          onCancel: function(){
            return;
          }
        });
     }else{
        that.props.onChange(fields, item[0]);
     };
  }

  render() {
    let fieldLength = this.props.data.length - 1;
    let nodeFieldList = this.props.data.map((item, index) => {
       let nodeItemList =  this.props.columns.map((columnsItem, columnsIndex) => {
          if (typeof columnsItem.render == 'function'){
             return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                {columnsItem.render(item, item[columnsItem.dataIndex],  index)}
             </Col>;
          }else if(columnsItem.render == "input"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Input size= {this.props.size} onChange={this.changeFieldVal.bind(this, index, columnsItem.dataIndex)} value = {item[columnsItem.dataIndex]} title = {item[columnsItem.dataIndex]} placeholder="不能为空.." style={{ width: 100 }} />
            </Col>;
          }else if(columnsItem.render == "inputNumber"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <InputNumber size= {this.props.size} min={columnsItem.min || null} max={columnsItem.max || null} value={item[columnsItem.dataIndex]} onChange={this.changeNumberFieldVal.bind(this, index, columnsItem.dataIndex)} />
            </Col>;
          }else if(columnsItem.render == "boolean"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Switch 
                  size= {this.props.size}
                  checked={(Number(item[columnsItem.dataIndex]) == 1) ? true : false}
                  onChange={this.switchFieldVal.bind(this, index, columnsItem.dataIndex)}
                  checkedChildren={columnsItem.checkedText || '是'} 
                  unCheckedChildren={columnsItem.unCheckedText || '否'} 
                />
            </Col>;
          }else if(columnsItem.render == "select"){
            return <Col key = {columnsItem.key} span={columnsItem.span || 3}>
                <Select size= {this.props.size} onChange={this.selectFieldVal.bind(this, index, columnsItem.dataIndex)} value={item[columnsItem.dataIndex]} style={{ width: 80 }}>
                  {columnsItem.selectList.map((selectListItem, selectListIndex )=>{
                      return <Option key = {selectListIndex} value={selectListItem.val}>{selectListItem.name}</Option>
                  })}
                </Select>
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
                  <ButtonGroup>
                    <Button size= {this.props.size} type="primary" onClick = {this.shiftUpField.bind(this, index)} disabled = {(index == 0) ? true : false} title = "上移"><Icon type="arrow-up" /></Button>
                    <Button size= {this.props.size} type="primary" onClick = {this.shiftDownField.bind(this, index)} disabled = {(index == fieldLength) ? true : false} title = "下移"><Icon type="arrow-down" /></Button>
                  </ButtonGroup>
              </Col>:''}
                {nodeItemList}
                {this.props.addAndDelAble ? <Col span={this.props.addAndDelAbleSpan}>
                  <ButtonGroup>
                    {!item[this.props.hasPlus] && this.props.commonPlus ? <Button size= {this.props.size} type="primary" onClick = {this.addField.bind(this, index)} title = "添加项"><Icon type="plus" /></Button> : null }
                    { this.props.allowLenZero ?
                    (!item[this.props.hasMinus] ? <Button size= {this.props.size}  type="primary"  onClick = {this.reduceField.bind(this, index)}  title = "删除该项" ><Icon type="minus" /></Button> : null) :
                    (!item[this.props.hasMinus] ? <Button size= {this.props.size}  type="primary"  onClick = {this.reduceField.bind(this, index)} disabled = {(fieldLength == 0) ? true : false} title = "删除该项" ><Icon type="minus" /></Button> : null) }
                  </ButtonGroup>
                </Col>: ''}
              </Row>
          </li>
    })
    let nodeColumns = this.props.showHeader ? <Row style={{ fontWeight:'bold', background: '#f7f7f7', padding:'10px 4px'}}>
          {this.props.sortAble ? <Col span={this.props.sortAbleSpan}>{this.props.upDownControlText}</Col> : ''}
          {this.props.columns.map((item) => {
            return <Col key ={item.key} span={item.span || 3}>{item.title}</Col>
          })}
          {this.props.addAndDelAble ? <Col span={this.props.addAndDelAbleSpan}>{this.props.addDelControlText}</Col> : ""}
        </Row> : null;
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