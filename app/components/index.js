import React, { Component, PropTypes } from 'react'

export default class Counter extends Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      //初始获取数据
    }

    render() {
    	let value = this.props.value;
        return (
        	<div>
	        	<h1>{value}</h1>
				<button onClick={this.props.onIncrement}>+</button>
				<button onClick={this.props.onDecrement}>-</button>
		    </div>
        )
    }
}