/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
import Sortable from 'sortablejs';
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
       controlsList: [
          {
            name: "单行文本",
            type: "text"
          },
          {
            name: "多行文本",
            type: "textarea"
          },        
          {
            name: "下拉菜单",
            type: "Select"
          },        
          {
            name: "单选框",
            type:  "Radio",
            value: ['A', 'B', 'C']
          },        
          {
            name: "复选框",
            type:  "Checkbox",
            value: ['A', 'B', 'C']
          },        
          {
            name: "数字",
            type: "InputNumber"
          },        
          {
            name: "日期",
            type: "DatePicker"
          },        
          {
            name: "日期区间",
            type: "RangePicker"
          }
        ],
        addControlsList:[]
    }
  }

  componentDidMount() {
    let that = this;
    let el = document.getElementById('items');

    //获取初始数据
    let sortable = new Sortable(el, {
       onEnd: function (evt) {
            let list = that.state.list;
            let newItem = list.splice(evt.oldIndex, 1);
            list.splice(evt.newIndex, 0, newItem[0]);
            //提交数据
            console.log(evt.oldIndex +"and"+ evt.newIndex);
            console.log(that.state.list);

            // evt.oldIndex;  // element's old index within parent 
            // evt.newIndex;  // element's new index within parent 
       }
    })
  }

  ControlsList(item, event) {
    //  console.log(event.pageX +','+ event.pageY);
    //  console.log(event.target.offsetLeft+','+event.target.offsetTop);
    //  console.log(item.name);
    let addControlsList = this.state.addControlsList;
    addControlsList.push(item);
    this.setState({
        addControlsList
    });

  }

  deleteItem(item, index) {
    let addControlsList = this.state.addControlsList;
    addControlsList.splice(index, 1);
    this.setState({
        addControlsList
    });
  }

  render() {

    const nodeControlsList = this.state.controlsList.map((item, index) => {
        return <span key = {index} onClick = { this.ControlsList.bind(this, item) } >{item.name}</span>
    });

    const nodeAddControlsList = this.state.addControlsList.map((item, index) => {
        if(item.type == 'text' || item.type == 'textarea') {
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}><Input placeholder = {item.name} type = {item.type} /></Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'Select'){
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  <Select defaultValue="lucy" style={{ width: '100%'}}>
                    <Option value="lucy">Lucy</Option>
                  </Select>
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'Radio'){
          const NodeRadio =  item.value.map((item, index)=> {
              return <Radio value={item} key = {index}>{item}</Radio>
          });
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  {NodeRadio}
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'Checkbox'){
          const NodeCheckbox =  item.value.map((item, index)=> {
              return <Checkbox value={item} key = {index}>{item}</Checkbox>
          });
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  {NodeCheckbox}
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'InputNumber'){
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  <InputNumber min={1} max={2} defaultValue={3} />
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'DatePicker'){
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  <DatePicker />
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }else if(item.type == 'RangePicker'){
          return <li key = {index} >
              <Row>
                <Col span={6}>{item.name} </Col>
                <Col span={16}>
                  <RangePicker />
                </Col>
                <Col span={2}><Button onClick = { this.deleteItem.bind(this, item, index) } >删除</Button></Col>
              </Row>
          </li>
        }
        
    });

    return (
      <div className = "ck-controls-main">
        <div className = "ck-controls no-select">
          {nodeControlsList}
        </div>
        <div className = "controls-box">
          <ul id="items" style={{ width: '400px'}}>
          {nodeAddControlsList} 
          </ul>
        </div>
      </div>
    )
  
  }
}

export default Controls