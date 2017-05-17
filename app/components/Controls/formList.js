/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import Immutable from 'immutable'
import { Button, Input, Select, Radio, Checkbox, InputNumber, DatePicker, Row, Col, Icon } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;

class FormList extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
      //当前移动组件对象
      moveStateObj: {
        Label: "单行文本",
        Type: 'text'
      },
      eleMoveVisible: false,
      insideMove: false
    }
  }

  componentDidMount() {
  }
  
  removeItem(index) {
    this.props.removeItem(index);
  }

  winOnMouseUp(){
    let moveStateObj = this.state.moveStateObj;
    this.props.dragEnd(moveStateObj, true);
    this.props.dragActive(false);

    this.setState({ eleMoveVisible:false, insideMove: false });
    document.onmousemove = null;
    document.onmouseup = null;
  }
  
  winOnMouseMove(e){
    if(e.pageX >= 230 && e.pageY >= 168){
        this.props.dragActive(true, e.pageY)
    }else{
        this.props.dragActive(false)
    };
    this.setState({ offMoveLeft: e.pageX-10, offMoveTop: e.pageY-10 });
  }

  renderMoveElement(item, index, e) {
    document.onmousemove = this.winOnMouseMove.bind(this);
    document.onmouseup = this.winOnMouseUp.bind(this);

    let moveStateObj = {
       Label: item.Label,
       Type: item.Type
    };

    this.setState({ eleMoveVisible:true, insideMove: true, moveStateObj, offMoveLeft: e.pageX-10, offMoveTop: e.pageY-10 });
    return false;  //火狐的bug，要阻止默认事件
  }

  render() {
    let formData = Immutable.fromJS(this.props.data).toJS();
    if(this.state.insideMove){
      formData.splice(this.props.moveInIndex, 1, {})
    }

    //拖动到区域内，添加临时对象渲染临时占位元素
    if(this.props.moveInActive && !this.state.insideMove){
      formData.splice(this.props.moveInIndex, 0, {})
    };
    
    //渲染已选组件列表
    let formDataEle = formData.map((item, index)=>{
        if(this.props.moveInIndex == index && this.props.moveInActive && !this.state.insideMove){
          return <div className = "drag-active" key = {index}>
            {item.Label}
          </div>
        }

        if(this.props.moveInIndex == index && this.state.insideMove){
          return <div className = "drag-active" key = {index}>
            {item.Label}
          </div>
        }

        return <div 
        className = "drag-item" 
        key = {index}>
          <Icon onMouseDown = {this.renderMoveElement.bind(this, item, index)}  className = "handle-drag-item"  type="ellipsis" />
          <Icon 
            onClick = {this.removeItem.bind(this, index)} 
            className = "del-drag-item" 
            type="close-circle-o" 
            title = "删除该项"
          />
          {item.Label}
        </div>
    });
    
    //渲染移动元素
    let eleMove = <div className = "drag-active ele-move" style = {{ left: this.state.offMoveLeft, top: this.state.offMoveTop}}>
      {this.state.moveStateObj.Label}
    </div>

    return (
      <div>
        <div className = "ck-formlist-main text-unchecked">
          {formDataEle}
          {this.state.eleMoveVisible ? eleMove: null}
        </div>
      </div>
    )
  }
}

export default FormList