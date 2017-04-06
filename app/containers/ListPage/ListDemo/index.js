import React, { Component, PropTypes } from 'react';
import reqwest from 'reqwest'
import "babel-polyfill";
import { Table, Icon } from 'antd';
import './index.less';

class ListDemo extends React.Component{

  constructor(props){

    super(props)
    
    this.state = {
      list :[]
    }

  }
  
  componentDidMount(){

    var asyncReadFile = async () => {
        var data = await reqwest({
            url: 'http://yangtianming.cn',
            method: 'post',
            type: 'json',
        });
        debugger
        this.setState({
            list: data.list
        })
    };
      
    asyncReadFile();

    // let that = this;
    // reqwest({
    //     url: 'http://yangtianming.cn',
    //     method: 'post',
    //     type: 'json',
    // }).then(function (data) {
    //   that.setState({
    //      list: data.list
    //   })
    // })

  }


  render() {

    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'number',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: 'star',
      dataIndex: 'string',
      key: 'string',
    },{
      title: 'array',
      dataIndex: 'array',
      key: 'array',
    },{
      title: 'date',
      dataIndex: 'date',
      key: 'date',
    }];

    return (
      <div className={"list-demo-root"} >
        <Table columns={columns} dataSource={this.state.list} />
      </div>
    );
  }

}

export default ListDemo
