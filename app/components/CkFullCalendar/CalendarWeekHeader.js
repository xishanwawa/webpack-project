/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import { Button }    from 'antd';
import MonthWeekDay from "./MonthWeekDay";

class CalendarHeader extends React.Component {
  constructor() {
    super();
  }
  changeFcState(stateTyle) {
    this.props.changeFcState(stateTyle)
  }
  CreateTask () {
    let date = new Date();
    let objDate = {year:date.getFullYear(), month: date.getMonth()+1, day:date.getDate(),  hours: "0"};
    this.props.CreateTask(objDate)
  }
  render() {
      return ( 
      <div className = "CalendarHeader" > 
        <div className = "fc-left" >
          <Button type="ghost"  onClick = {this.props.handleTodayClick} >{'本周'}</Button>
        </div>
        <div className = "fc-center" >
          { this.props.strDate }
        </div>
        <div className = "fc-right" >
          <div className = "fc-button-group">
            <MonthWeekDay fcState = {this.props.fcState} changeFcState = {this.changeFcState.bind(this)} />
            <Button type="primary"  onClick = {this.CreateTask.bind(this)} >{'新建'+this.props.TitType}</Button>
          </div>
        </div>
        <div className = "fc-clear" ></div>
      </div>
      )
  }
}

export default CalendarHeader