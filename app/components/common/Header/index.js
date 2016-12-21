/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import ShowHideArrow from 'components/common/ShowHideArrow'
import classNames  from 'classnames';

import './index.less'

class Header extends React.Component {
  static defaultProps = {
    showHideMenu: function(date) {
        console.log(date);
    }
  }
  
  constructor() {
      super();
      this.state = {
      }
  }
  
  showHideMenu(data) {
      this.props.showHideMenu(data);
  }

  render() {
    return (
      <div className="header">
         <ShowHideArrow 
             showHideMenu = {this.showHideMenu.bind(this)} 
         />
      </div>
    )
  }
}
export default Header