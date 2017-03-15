/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import classNames  from 'classnames';
import { Icon } from 'antd';
import './index.less'

class Notice extends React.Component {

  static defaultProps = {
  }
  

  constructor() {
      super()
      this.state = {
        showHideNotice: false
      }
  }
  

  handleNotice() {
      let showHideNotice = !this.state.showHideNotice; 
      this.setState({
        showHideNotice
      });
  }


  render() {

    let showHideNotice = classNames({ 
        'notice': true,
        'open': this.state.showHideNotice,
    });

    return (
        <div className={showHideNotice} >
            <div className="handle" onClick = {this.handleNotice.bind(this)} title = "公告">
               <Icon type="notification" />
            </div>
        </div>
    )

  }
}
export default Notice