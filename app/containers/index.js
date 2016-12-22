
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
import ShowHideArrow from 'components/common/ShowHideArrow'
import Notice from 'components/common/Notice'

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

    showHideMenuEvent(data){
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
            <Header />
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
            <div  className = "ck-main">
              <SiderMenu
                  showHideMenu = {this.state.showHideMenu} 
              />
              <div className = {showHideMenu}>
                  { this.props.children || "Hello" }
              </div>
              <div className="main-right-list">
                <div>今日任务：</div>
              </div>
            </div>
            <ShowHideArrow 
                showHideMenuEvent = {this.showHideMenuEvent.bind(this)} 
            />
            <Notice />
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