/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import classNames from 'classnames';
import Sortable from 'sortablejs';


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

  componentDidMount() {
    let that = this;
    let el = document.getElementById('items');

    //获取初始数据
    let sortable = new Sortable(el, {
       onEnd: function (evt) {
            let list = that.state.list;
            let newItem = list.splice(evt.oldIndex, 1);
            list.splice(evt.newIndex, 0, newItem[0]);
            //提交数据
            console.log(evt.oldIndex +"and"+ evt.newIndex);
            console.log(that.state.list);

            // evt.oldIndex;  // element's old index within parent 
            // evt.newIndex;  // element's new index within parent 
       }
    })
  }

  render() {
    let nodelist = this.state.list.map((item, index) => {
      return <li key = {index}>{item}</li>
    })

    return (
      <div className = "move-list">
        <ul id="items">
          {nodelist}
        </ul>
      </div>
    )
          
  }
}

export default MoveList