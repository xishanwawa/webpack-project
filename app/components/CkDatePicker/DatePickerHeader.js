/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class DatePickerHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
    	<div  className="ck-datePickerHeader">
	    	<div className="ck-handle ck-header-year">
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevYear} ></button>
	    	    <span>{this.props.year+"年"}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextYear} ></button>
	    	</div>
	    	<div className="ck-handle ck-header-month">
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevMonth} ></button>
	    	    <span>{this.props.month+"月"}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextMonth} ></button>
	    	</div>
        </div>
    )
  }
}

export default DatePickerHeader