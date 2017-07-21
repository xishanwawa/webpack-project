/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'

import DatePickerHeader from './DatePickerHeader'
import DatePickerBody   from './DatePickerBody'
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
          backupFcState: 'month',
          fcState: 'month',
          year:  newDate.getFullYear(),
          month: newDate.getMonth() + 1,
          day:   newDate.getDate(),
          nowYear: newDate.getFullYear(),
          nowMonth: newDate.getMonth() + 1
      }
  }
  toUpdateState(date) {
    this.setState({
      fcState: date.fcState       || this.state.fcState,
      backupFcState: date.fcState || this.state.fcState,
      year:  date.year    || this.state.year,
      month: date.month   || this.state.month,
      day:   date.day     || this.state.day,
      nowYear: date.year  || this.state.year,
      nowMonth: date.month|| this.state.month
    });
  }
  prevYear (){
    let newYear = this.state.year - 1;
    var newMonth = parseInt( this.state.month );
    var newDay = this.state.day;

    //防止日超出范围
    var dateDay = new Date(newYear, newMonth, 0).getDate();
    if(dateDay < newDay){
       newDay = dateDay;
    };
    
    //保证月周日状态和日期同步
    let strNewDate = newYear + "" + newMonth;
    let nowDate    = this.state.nowYear + "" +  this.state.nowMonth;
    let fcState;
    if(strNewDate == nowDate){
        fcState = this.state.backupFcState;
    }else{
        fcState = 4;
    };

    this.setState( {
      fcState,
      year: newYear,
      day: newDay
    });
  }
  nextYear (){
    var newYear = this.state.year + 1;
    var newMonth = parseInt( this.state.month );
    var newDay = this.state.day;

    //防止日超出范围
    var dateDay = new Date(newYear, newMonth, 0).getDate();
    if(dateDay < newDay){
       newDay = dateDay;
    };

    //保证月周日状态和日期同步
    let strNewDate = newYear + "" + newMonth;
    let nowDate    = this.state.nowYear + "" +  this.state.nowMonth;
    let fcState;
    if(strNewDate == nowDate){
        fcState = this.state.backupFcState;
    }else{
        fcState = 4;
    };

    this.setState( {
      fcState,
      year: newYear,
      day: newDay
    });
  }
  prevMonth (){
    var newYear = this.state.year;
    var newMonth = parseInt( this.state.month ) - 1;
    var newDay = this.state.day;
    if( newMonth < 1 ){
      newYear--;
      newMonth = 12;
    };

    //防止日超出范围
    var dateDay = new Date(newYear, newMonth, 0).getDate();
    if(dateDay < newDay){
       newDay = dateDay;
    };

    //保证月周日状态和日期同步
    let strNewDate = newYear + "" + newMonth;
    let nowDate    = this.state.nowYear + "" +  this.state.nowMonth;
    let fcState;
    if(strNewDate == nowDate){
        fcState = this.state.backupFcState;
    }else{
        fcState = 4;
    };

    this.setState({
      fcState,
      month: newMonth,
      year: newYear,
      day:newDay
    });
  }
  nextMonth (){
    var newYear = this.state.year;
    var newMonth = parseInt( this.state.month ) + 1;
    var newDay = this.state.day;
    if( newMonth > 12 ){
      newYear++;
      newMonth = 1;
    };
    //防止日超出范围
    var dateDay = new Date(newYear, newMonth, 0).getDate();
    if(dateDay < newDay){
       newDay = dateDay;
    };

    //保证月周日状态和日期同步
    let strNewDate = newYear + "" + newMonth;
    let nowDate    = this.state.nowYear + "" +  this.state.nowMonth;
    let fcState;
    if(strNewDate == nowDate){
        fcState = this.state.backupFcState;
    }else{
        fcState = 4;
    };

    this.setState({
      fcState,
      year: newYear, 
      month: newMonth,
      day:newDay
    });
  }
  dayOnClick (date){
    let fcState = this.state.backupFcState;
    this.setState({
      fcState,
      year:  date.year, 
      month: date.month, 
      day:   date.day,
      nowYear:date.year, 
      nowMonth:date.month
    });
    date.fcState = fcState;
    this.props.changeDate(date)
  }
  render() {
    return (
      <div className="ck-datePicker fc-unselectable">
        <DatePickerHeader 
          year    = {this.state.year}
          month   = {this.state.month}
          prevYear = {this.prevYear.bind(this)}
          nextYear = {this.nextYear.bind(this)}
          prevMonth = {this.prevMonth.bind(this)}
          nextMonth = {this.nextMonth.bind(this)}
        />
        <DatePickerBody
          fcState     = {this.state.fcState}
          year        = {this.state.year}
          month       = {this.state.month}
          day         = {this.state.day}
          dayOnClick = {this.dayOnClick.bind(this)}
        />
      </div>
    )
  }
}
export default CkDatePicker