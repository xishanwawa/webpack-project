/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react'
import Immutable from 'immutable'
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

  componentDidMount() {
    let that = this;
    // let el = document.getElementById('items');

    // //获取初始数据
    // let sortable = new Sortable(el, {
    //    onEnd: function (evt) {
    //         let list = Immutable.fromJS(that.state.list).toJS();
    //         let newItem = list.slice(evt.oldIndex, evt.oldIndex+1);
    //         list.splice(evt.oldIndex, 1);
    //         debugger
    //         list.splice(evt.newIndex, 0,  newItem[0]);

    //         //提交数据
    //         console.log(evt.oldIndex +"and"+ evt.newIndex);
    //         console.log(that.state.list);

    //         // evt.oldIndex;  // element's old index within parent 
    //         // evt.newIndex;  // element's new index within parent 
    //    }
    // })
  }
  
  render() {
    let nodelist = this.state.list.map((item, index) => {
      return <div className = "divli" key = {index}>{item}</div>
    })

    return (
      <div className = "move-list">
        <div className = "divul" ref={this.dragulaDecorator}>
          {nodelist}
        </div>
      </div>
    )
          
  }
}

export default MoveList