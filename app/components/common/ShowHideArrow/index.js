/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import classNames  from 'classnames';

import './index.less'

class ShowHideArrow extends React.Component {
  static defaultProps = {
    showHideMenu: function(date) {
        console.log(date);
    }
  }
  
  constructor() {
      super()
      this.state = {
        showHideMenu: true
      }
  }
  
  showHideMenuEvent() {
      let showHideMenu = !this.state.showHideMenu; 
      this.setState({
        showHideMenu
      });
      this.props.showHideMenuEvent(showHideMenu);
  }

  render() {

    let showHideMenu = classNames({ 
        'isolate': true,
        'waves-effect': true,
        'waves-button': true,
        'open': this.state.showHideMenu,
    });

    return (
         <div className={showHideMenu} onClick = {this.showHideMenuEvent.bind(this)}>
            <div className="line-wrap">
                <div className="line top"></div>
                <div className="line center"></div>
                <div className="line bottom"></div>
            </div>
        </div>
    )
  }
}
export default ShowHideArrow