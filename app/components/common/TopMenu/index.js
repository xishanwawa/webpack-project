/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import classNames  from 'classnames';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import './index.less'

class TopMenu extends React.Component {
  static defaultProps = {
    handle: function(date) {
        console.log(date);
    }
  }
  
  constructor() {
      super();
      this.state = {
        current: 'mail',
      }
  }

  componentDidMount() {
  }

  changeMenu(e){
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
          <Menu 
            onClick={this.changeMenu.bind(this)}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            style = {{
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            <Menu.Item key="mail">
              <Icon type="folder" />第一部门
            </Menu.Item>
            <Menu.Item key="mail2">
              <Icon type="folder" />第二部门
            </Menu.Item>
            <Menu.Item key="mail3">
              <Icon type="folder" />第三部门
            </Menu.Item>
          </Menu>
    )
  }
}
export default TopMenu