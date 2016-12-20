/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import './index.less'

class Menu extends React.Component {
  static defaultProps = {
  }
  
  constructor() {
      super()
      this.state = {
      }
  }

  render() {
    return (
      <div className="Menu">
        <ul>
          <li><Link to="/IndexPage">IndexPage</Link></li>
          <li><Link to="/ListPage">ListPage</Link></li>
        </ul>
      </div>
    )
  }
}
export default Menu