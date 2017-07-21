/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class Header extends React.Component {
	
  constructor() {
    super();
  }

  render() {

		let year = this.props.year + "年",
		month = this.props.month + "月";

    return (
    	<div  className="ck-datePickerHeader">
	    	<div className="ck-handle ck-header-year">
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevYear} ></button>
	    	    <span>{year}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextYear} ></button>
	    	</div>
	    	<div className="ck-handle ck-header-month">
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevMonth} ></button>
	    	    <span>{month}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextMonth} ></button>
	    	</div>
        </div>
    )
  }
}

export default Header