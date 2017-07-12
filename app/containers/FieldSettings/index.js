
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
          title: 'input control', 
          dataIndex: 'name', 
          key: 'name',
          render: 'input',
        },
        { 
          title: 'select control', 
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
          title: 'link control', 
          dataIndex: 'editSleck', 
          key: 'editSleck',
          render: (record, text, index)=>{
              return <span>{"link"}</span>
          }
        },
        { 
          title: 'text control', 
          dataIndex: 'beizhu', 
          key: 'beizhu',
          render: 'text'
        },
        { 
          title: 'switch text', 
          dataIndex: 'show', 
          key: 'show',
          render: 'boolean'
        }
      ];

      const data = [
        { 
          name: 'item 1',
          tableType:'text', 
          show: true, 
          beizhu:'11111', 
          key: 1
        },
        { 
          name: 'item 2',
          tableType:'inputNumber', 
          show: false, 
          beizhu:'22222', 
          key: 2 
        },
      ];

      this.state = {
        data,
        columns,
      }
    }

    componentDidMount() {
      const { dispatch, dirty, route, router } = this.props;
      router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    }

    routerWillLeave(nextLocation) {
        let r = confirm("本页设置可能丢失，确认真的离开吗？");
        if(r == true){
          console.log("离开！");
        }else{
          console.log("离开个毛！");
          return false
        }
    }
    
    //改变
    changePanes(data){
      this.setState({ data });
    }

    render() {
      return (
        <div style={{ padding:'20px' }}>
          <div style={{ fontSize: '16px', margin:'20px 0', color: '#108ee9' }} >demo：</div>
          <SortAbleList
            columns = {this.state.columns} 
            data = {this.state.data} 
            delAsk = {true}
            editAble = {false}
            upDownControlText = {'排序'}
            addDelControlText = {'增删'}
            onChange = {this.changePanes.bind(this)} 
          />
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