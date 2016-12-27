/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';

import './index.less'

class MoveList extends React.Component {
  static defaultProps = {
    handle: function (date) {
      console.log(date);
    }
  }

  constructor() {
    super();
    this.state = {
      list:['ytm','yxm','xph','lsx','fwf','jianyu']
    }
  }

  componentDidMount() {}

  render() {
    let nodelist = this.state.list.map((item) => {
      return <li>{item}<li>
    });

    return (
      <div>qqqq</div>
    )
  }
}

export default MoveList