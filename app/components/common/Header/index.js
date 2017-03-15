/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import classNames  from 'classnames';

import './index.less'

class Header extends React.Component {
  static defaultProps = {
    handle: function(date) {
        console.log(date);
    }
  }
  
  constructor() {
      super();
      this.state = {
      }
  }

  render() {
    return (
      <div className="header">
      </div>
    )
  }
}
export default Header