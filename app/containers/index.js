
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames';
import Header      from "components/common/Header"
import SiderMenu        from "components/common/Menu"
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import "./index.less"

class Index extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        showHideMenu: true,
        current: 'mail',
      }
    }

    componentDidMount() {
    }

    showHideMenu(data){
        this.setState({
          showHideMenu: data,
        });
    }

    changeMenu(e){
      this.setState({
        current: e.key,
      });
    }

    render() {
      let showHideMenu = classNames({ 
          'first-child': true,
          'open': this.state.showHideMenu,
      });
      return (
        <div className = "ck-root">
            <Header showHideMenu = {this.showHideMenu.bind(this)} />
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
            </Menu>
            <SiderMenu
              showHideMenu = {this.state.showHideMenu} 
            />
            <div className = {showHideMenu}>
                { this.props.children || "index" }
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

})(Index)