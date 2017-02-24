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
          checkedYear: newDate.getFullYear(),
          checkedMonth: newDate.getMonth() + 1,
          checkedDay: newDate.getDate()
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
          year           = {this.state.checkedYear}
          month          = {this.state.checkedMonth}
          prevYearClick  = {this.prevYear.bind(this)}
          nextYearClick  = {this.nextYear.bind(this)}
          prevMonthClick = {this.prevMonth.bind(this)}
          nextMonthClick = {this.nextMonth.bind(this)}
        />
        <DatePickerBody
          year        = {this.state.checkedYear}
          month       = {this.state.checkedMonth}
          day         = {this.state.checkedDay}
          daysOnClick = {this.checkDays.bind(this)}
        />
      </div>
    )
  }
}
export default CkDatePicker