
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
import mockData from 'mockData'

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
          render: 'link',
          Event: (item, index) => {
            this.showSetTypeModal(item, index);
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
          render: 'switch'
        }
      ];

      const panes = [
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
        activeKey: 'table1',
        panes,
        columns,
        visible: false,
        setType: 'text',
        tabColumns: [
          { 
            title: 'tab 名称', 
            dataIndex: 'name', 
            key: 'name',
            render: 'input',
          },
          { 
            title: '对应查看表', 
            dataIndex: 'tableType', 
            key: 'tableType',
            render: 'select',
            selectList:[
              {
                name:'表一',
                val:'table1'
              },
              {
                name:'表二',
                val:'table2'
              }
            ]
          }
        ],
        tabData:[
          { 
            name: '页签不会太长的',
            tableType:'table1', 
            key: 1
          },
          { 
            name: '一般是2到7个字',
            tableType:'table2', 
            key: 2
          },
        ]
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
    
    //设置编辑类型
    showSetTypeModal(item, index){
      debugger
      let fields = Immutable.fromJS(item).toJS();
      let setType = item.tableType;
      this.setState({
        visible: true,
        setType
      });
    };

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

    //改变
    changePanes(panes){
      this.setState({ panes });
    }
    
    //页签改变
    changeTabData(tabData){
      this.setState({ tabData });
    }

    render() {

    	let nodeSetType;
      switch(this.state.setType)
      {
      case 'text':
        nodeSetType = <div>单行文本</div>;
        break;
      case 'textarea':
        nodeSetType = <div>多行文本</div>;
        break;
      case 'radio':
        nodeSetType = <div>单选框</div>;
        break;
      case 'checkbox':
        nodeSetType = <div>多选框</div>;
        break;
      case 'inputNumber':
        nodeSetType = <div>数字</div>;
        break;
      case 'date':
        nodeSetType = <div>日期</div>;
        break;
      default:
        nodeSetType = <div>无该字段设置项，请联系管理员</div>;
      }

      return (
        <div style={{ padding:'20px' }}>
          <div style={{ fontSize: '16px', margin:'20px 0', color: '#108ee9' }} >demo：</div>
          <SortAbleList 
            columns = {this.state.columns} 
            data = {this.state.panes} 
            onChange = {this.changePanes.bind(this)} 
          />
          <Modal 
            title="select control" 
            visible={this.state.visible}
            onOk={this.handleOk} 
            onCancel={this.handleCancel}
          >
            {nodeSetType}
          </Modal>
          <div style={{ fontSize: '16px', margin:'20px 0', color: '#108ee9' }} >实例：页签自定义：</div>
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="card"
          >
            {this.state.tabData.map((tabData, index) => <TabPane tab={tabData.name} key={index}>{tabData.name}</TabPane>)}
          </Tabs>
          <div style={{ fontSize: '14px', margin:'20px 0 10px', color: '#108ee9' }} >普通：</div>
          <SortAbleList 
            columns = {this.state.tabColumns} 
            data = {this.state.tabData} 
            onChange = {this.changeTabData.bind(this)} 
          />
          <div style={{ fontSize: '14px', margin:'20px 0 10px', color: '#108ee9' }} >不可编辑：</div>
          <SortAbleList 
            columns = {this.state.tabColumns} 
            data = {this.state.tabData} 
            editAble = {false}
            onChange = {this.changeTabData.bind(this)} 
          />
          <div style={{ fontSize: '14px', margin:'20px 0 10px', color: '#108ee9' }} >不可排序：</div>
          <SortAbleList 
            columns = {this.state.tabColumns} 
            data = {this.state.tabData} 
            sortAble = {false}
            onChange = {this.changeTabData.bind(this)} 
          />
          <div style={{ fontSize: '14px', margin:'20px 0 10px', color: '#108ee9' }} >不可增删：</div>
          <SortAbleList 
            columns = {this.state.tabColumns} 
            data = {this.state.tabData} 
            addAndDelAble = {false}
            onChange = {this.changeTabData.bind(this)} 
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