
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Counter from "components"
import {onIncrement, onDecrement} from "actions"

class IndexPage extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
    }

    render() {
    	debugger
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

function mapStateToProps(state) {
  return {
    $$state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement,
    onDecrement
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(IndexPage)