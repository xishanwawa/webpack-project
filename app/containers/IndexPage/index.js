
/**
 * Created by ytm
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd';

// const confirm = Modal.confirm;
// import { Lifecycle } from 'react-router'
// import reactMixin  from 'react-mixin';

import Counter     from "./Counter"
import MoveList    from "components/MoveList"
import {onIncrement, onDecrement} from "actionsReducers/IndexPage"

class IndexPage extends React.Component {

    constructor(props) {
      super(props)
    }

    componentDidMount() {

        //网上给的错误教程，setRouteLeaveHook函数在props.router里
        // this.context.router.setRouteLeaveHook(
        //   this.props.route,
        //   this.routerWillLeave
        // )

        //正确的方法
         const { dispatch, dirty, route, router } = this.props;
         router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    }

    //mixins: [ Lifecycle ]

    routerWillLeave(nextLocation) {
        let r = confirm("真的离开吗");
        if(r == true){
          console.log("离开！");
        }else{
          console.log("离开个毛！");
          return false
        }
        
        // let r = true;
        // var asyncReadFile = async () => {
        //   await confirm({
        //     title: '不要走，决战到天亮?',
        //     content: '',
        //     okText: '相忘于江湖',
        //     cancelText: '白头偕老',
        //     onOk() {
        //       console.log("离开！");
        //     },
        //     onCancel() {
        //       console.log("离开个毛！");
        //       return false
        //     }
        //   });
        // };

        // asyncReadFile();

        // if(r == true){
        //   console.log("离开！");
        // }else{
        //   console.log("离开个毛！");
        //   return false
        // }
    }

    render() {
    	const { $$state } = this.props;
    	let value = $$state.get("val");

        return (
        	<div>
              <Counter
                value={value}
                onIncrement={ this.props.onIncrement.bind(this) }
                onDecrement={  this.props.onDecrement.bind(this) }
              />
              <MoveList />
          </div>
        )
    }
}

// reactMixin(IndexPage.prototype, [ Lifecycle ]);

// function mapStateToProps(state) {
//   return {
//     $$state: state.indexPageReducer
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onIncrement: () => dispatch(onIncrement()),
//     onDecrement: () => dispatch(onDecrement())
//   }
// }

// module.exports = connect(mapStateToProps, mapDispatchToProps)(IndexPage)


//or


function mapStateToProps(state) {
  return {
    $$state: state.indexPageReducer
  }
}

module.exports = connect(mapStateToProps, {
  onIncrement,
  onDecrement,
})(IndexPage)