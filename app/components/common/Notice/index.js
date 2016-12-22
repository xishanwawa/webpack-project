/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import classNames  from 'classnames';

import './index.less'

class Notice extends React.Component {

  static defaultProps = {
  }
  

  constructor() {
      super()
      this.state = {
        showHideNotice: true
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
        <div className={showHideNotice} onClick = {this.handleNotice.bind(this)}>
        </div>
    )

  }
}
export default Notice