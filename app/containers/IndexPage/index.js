
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { Lifecycle } from 'react-router'
import reactMixin  from 'react-mixin';

import Counter     from "./Counter"
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
        //return '真的离开吗?'
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