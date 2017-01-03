/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'

import DatePickerHeader from './Header'
import DatePickerBody   from './Body'
import './index.less'

class CkDatePicker extends React.Component {
  static defaultProps = {
    changeDate: function(date) {
        console.log(date);
    }
  }
  
  constructor() {
      super()
      var newDate =  new Date();
      this.state = {
          year:  newDate.getFullYear(),
          month: newDate.getMonth() + 1,
          day:   newDate.getDate(),
      }
  }

  prevYear() {

  }

  nextYear() {
    
  }

  prevMonth() {
    
  }

  nextMonth() {
    
  }

  checkDays() {
    
  }

  render() {
    return (
      <div className="datepicker unselectable">
        <DatePickerHeader 
          year           = {this.state.year}
          month          = {this.state.month}
          prevYearClick  = {this.prevYear.bind(this)}
          nextYearClick  = {this.nextYear.bind(this)}
          prevMonthClick = {this.prevMonth.bind(this)}
          nextMonthClick = {this.nextMonth.bind(this)}
        />
        <DatePickerBody
          year        = {this.state.year}
          month       = {this.state.month}
          day         = {this.state.day}
          daysOnClick = {this.checkDays.bind(this)}
        />
      </div>
    )
  }
}
export default CkDatePicker