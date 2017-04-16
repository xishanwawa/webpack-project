/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

import { 
  InputMoveEle,
  TextareMoveEle,
  NumberMoveEle } from 'components/Controls/formMoveLibrary';

import './index.less'

class FormLibrary extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
        formLibraryList:[
          {
            Label: "单行文本",
            Type: 'text'
          },
          {
            Label: "多行文本",
            Type: 'textarea'
          },
          {
            Label: "数值框",
            Type: 'number'
          }
        ],
        moveStateObj:{
          Label: "单行文本",
          Type: 'text'
        },
        eleMoveVisible: false
    }
  }

  componentDidMount() {
    //window.addEventListener('click', () => { this.winOnMouseUp() })
  }
  
  winOnMouseUp(){
    let moveStateObj = this.state.moveStateObj;
    this.props.dragActive(false);
    this.props.dragEnd(moveStateObj);

    this.setState({ eleMoveVisible:false });

    document.onmousemove = null;
    document.onmouseup = null;
  }
  
  winOnMouseMove(e){
    //console.log(e.pageX +" "+ e.pageY)
    if(e.pageX >= 230 && e.pageY >= 168){
        this.props.dragActive(true, e.pageY)
    }else{
        this.props.dragActive(false)
    };
    this.setState({ offMoveLeft: e.pageX-10, offMoveTop: e.pageY-10 });
    return false;
  };

  renderMoveElement(item, index, e) {
    //console.log(e)
    //console.log(e.pageX +" "+ e.pageY)
    document.onmousemove = this.winOnMouseMove.bind(this);
    document.onmouseup = this.winOnMouseUp.bind(this);

    let moveStateObj = {
       Label: item.Label,
       Type: item.Type
    };

    this.setState({ eleMoveVisible:true, moveStateObj, offMoveLeft: e.pageX-10, offMoveTop: e.pageY-10 });
    return false;  //火狐的bug，要阻止默认事件
  }

  render() {
    let elementList = this.state.formLibraryList.map((item, index)=>{
       return <span 
                className = "text-unchecked"
                onMouseDown = {this.renderMoveElement.bind(this, item, index)} 
                key = {item.Type}
              >{item.Label}</span>
    })
    
    let moveObj = this.state.moveStateObj;
    let eleMoveCon = '无相关组件示例！';

    if(moveObj.Type == "text"){
      eleMoveCon = <InputMoveEle />
    }else if(moveObj.Type == 'textarea' ){
      eleMoveCon = <TextareMoveEle />
    }else if(moveObj.Type == 'number' ){
      eleMoveCon = <NumberMoveEle />
    };

    let eleMove = <div className = "ele-move text-unchecked" style = {{ left: this.state.offMoveLeft, top: this.state.offMoveTop}}>
      <Row>
        <Col span={8} style = {{textAlign:'right', lineHeight:'24px'}}>{moveObj.Label+"："}</Col>
        <Col span={16}>{eleMoveCon}</Col>
      </Row>
    </div>
    return (
      <div className = "ck-formLibrary-main">
        <div className = "ck-fromLibrary-con text-unchecked">
          {elementList}
        </div>
        {this.state.eleMoveVisible ? eleMove: null}
      </div>
    )
  }
}

export default FormLibrary