/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Header from './Header'
import Body   from './Body'
import './index.less'

function fillZero(arg){
    return (arg<10) ? "0" + arg : arg;
}

class DatePicker extends React.Component {
  static defaultProps = {
    type: "day",
    change: function(date) {
      console.log(date);
    }
  }
  
  constructor() {
      super()
      let date =  moment();
      this.state = {
        dateObj: date,
        dateStr: date.format(),
        year: date.year(),
        month: date.months(),
        day: date.day()
      }
  }

  prevYear = () => {
    debugger
    console.log(moment().add('year', 1).format("YYYY-MM-DD"));
  }

  nextYear = () => {
    
  }

  prevMonth = () => {
    
  }

  nextMonth = () => {
    
  }

  render() {
    return (
      <div className="ck-datePicker fc-unselectable">
        <Header 
          {...this.state}
          prevYear = {this.prevYear}
          nextYear = {this.nextYear}
          prevMonth = {this.prevMonth}
          nextMonth = {this.nextMonth}
        />
      </div>
    )
  }
}

export default DatePicker