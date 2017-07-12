
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { Button, Row, Col, Tabs, Modal } from 'antd';
const TabPane = Tabs.TabPane;

import FieldSetting from 'components/FieldSetting'
import SortAbleList from 'components/SortAbleList'
import {  
  SetCheckboxFormat,
  SetDateFormat,
  SetInputFormat,
  SetInputNumberFormat,
  SetRadioFormat,
  SetSwitchFormat,
  SetTextareaFormat} from 'components/SetFormFormat'

class FieldSettings extends React.Component {

    constructor(props) {
      super(props)
      const columns = [
        { 
          title: 'render input', 
          dataIndex: 'name', 
          key: 'name',
          render: 'input',
        },
        { 
          title: 'render select', 
          dataIndex: 'tableType', 
          key: 'tableType',
          render: 'select',
          selectList:[
            {
              name:'单行文本',
              val:'text'
            },
            {
              name:'多行文本',
              val:'textarea'
            },
            {
              name:'数字',
              val:'inputNumber'
            },
            {
              name:'单选框',
              val:'radio'
            },
            {
              name:'多选框',
              val:'checkbox'
            },
            {
              name:'布尔类型',
              val:'boolean'
            },
            {
              name:'日期',
              val:'date'
            }
          ]
        },
        { 
          title: 'render switch', 
          dataIndex: 'show', 
          key: 'show',
          render: 'boolean'
        },
        { 
          title: 'render text', 
          dataIndex: 'beizhu', 
          key: 'beizhu',
          render: 'text'
        },
        { 
          title: 'render renderFn', 
          dataIndex: 'link', 
          key: 'link',
          render: (record, text, index)=>{
              return <span>{"render(ecord, text, index)"}</span>
          }
        },
      ];

      const data = [
        { 
          name: 'item 1',
          tableType:'text', 
          show: 1, 
          beizhu:'11111', 
          key: 1
        },
        { 
          name: 'item 2',
          tableType:'inputNumber', 
          show: 0, 
          beizhu:'22222', 
          key: 2 
        },
      ];

      this.state = {
        data,
        columns,
        canEdit: true,
        showHeader: true,
        sortAble: true,
        addAndDelAble:true,
        delAsk: false,
      }
    }

    componentDidMount() {
      const { dispatch, dirty, route, router } = this.props;
      router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    }
    
    //改变
    onChange(data){
      this.setState({ data });
    }

    changeCanEdit = ()=>{
      this.setState({
          canEdit: !this.state.canEdit
      });
    }

    changeShowHeader = ()=>{
      this.setState({
          showHeader: !this.state.showHeader
      });
    }

    changeSortAble = ()=>{
      this.setState({
          sortAble: !this.state.sortAble
      });
    }

    changeAddAndDelAble = ()=>{
      this.setState({
          addAndDelAble: !this.state.addAndDelAble
      });
    }

    changeDelAsk = () => {
      this.setState({
          delAsk: !this.state.delAsk
      });
    }
    
    render() {
      return (
        <div style={{ padding:'20px' }}>
          <div style={{ fontSize: '16px', margin:'20px 0', color: '#108ee9' }} >demo：</div>
          <SortAbleList
            columns = {this.state.columns} 
            data = {this.state.data} 
            delAsk = {true}
            editAble = {this.state.canEdit}
            showHeader = {this.state.showHeader}
            sortAble = {this.state.sortAble}
            addAndDelAble = {this.state.addAndDelAble}
            delAsk = {this.state.delAsk}
            onChange = {this.onChange.bind(this)} 
          />
          <div style={{ padding:'20px 0' }}>
            <Button style={{ marginRight:'10px' }} type="primary" onClick = {this.changeCanEdit}>{this.state.canEdit?'不可编辑':'可编辑'}</Button>
            <Button style={{ marginRight:'10px' }} type="primary" onClick = {this.changeShowHeader}>{this.state.showHeader?'有头部':'无头部'}</Button>
            <Button style={{ marginRight:'10px' }} type="primary" onClick = {this.changeSortAble}>{this.state.sortAble?'可排序':'不可排序'}</Button>
            <Button style={{ marginRight:'10px' }} type="primary" onClick = {this.changeAddAndDelAble}>{this.state.addAndDelAble?'可增删':'不可增删'}</Button>
            <Button style={{ marginRight:'10px' }} type="primary" onClick = {this.changeDelAsk}>{this.state.delAsk ?'删除询问':'删除不询问'}</Button>
          </div>
        </div>
      )
    }
}


function mapStateToProps(state) {
  return {
    $$state: state.indexPageReducer
  }
}

module.exports = connect(mapStateToProps, {
})(FieldSettings)