import React, { Component, PropTypes } from 'react';
import { Button, Menu, Dropdown, Icon } from 'antd';

export default class Counter extends React.Component {
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
            <Button type="primary"  onClick={this.props.onIncrement}>+</Button>
            <Button type="primary"  onClick={this.props.onDecrement}>-</Button>
		    </div>
        )
    }
}