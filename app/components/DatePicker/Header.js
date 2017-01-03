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
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevYearClick} ></button>
	    	    <span>{this.props.year+"年"}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextYearClick} ></button>
	    	</div>
	    	<div className="ck-handle ck-header-month">
	    	    <button className = {"anticon anticon-left"} onClick = {this.props.prevMonthClick} ></button>
	    	    <span>{this.props.month+"月"}</span>
	    	    <button className = {"anticon anticon-right"} onClick = {this.props.nextMonthClick} ></button>
	    	</div>
        </div>
    )
  }
}

export default DatePickerHeader