/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import './index.less'

class SiderMenu extends React.Component {
  static defaultProps = {
  }
  
  constructor() {
      super()
      this.state = {
        current: '1',
      }
  }

  changeMenu(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {

    return (
        <div className = 'menu'>
          <Menu onClick={this.changeMenu.bind(this)}
            style={{ width: 220 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon type="folder" /><span>基本功能</span></span>}>
              <Menu.Item key="1"><Link to="/index-page"><Icon type="file" />设置</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/list-page"><Icon type="file" />列表</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/date-page"><Icon type="file" />日历</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/control-library"><Icon type="file" />控件库</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
    )
  }
}
export default SiderMenu