/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class DatePickerBody extends React.Component {
  constructor() {
    super();
  }
  //根据年月返回当月1号是星期几
  getFirstDayWeek() {
    var year = this.props.year,
    month = this.props.month;
    var dt = new Date( year , month-1 , 1 ) ; //new Date(year,month,1);
    var Weekdays = (dt.getDay() == 0) ? 6 : (dt.getDay() - 1);
    return Weekdays;
  }
   //根据月份获取当前天数
  getMonthDays() {
    var year = this.props.year,
    month = this.props.month;
    var temp = new Date( year, month ,0 );
    return temp.getDate();
  }
  //获取Previous month's days
  getPrevDays() {
    var year = this.props.year,
    month = this.props.month - 1;
    var temp = new Date( year, month ,0 );
    return temp.getDate();
  }
  //获取上个月开始显示天数
  getFirstPrevDay(){
    var prevDays = this.getPrevDays();
    var FristPrevDays = prevDays - this.getFirstDayWeek() + 1;
    return FristPrevDays;
  }

  getWeekBtw(year, month, day) {

    var oToday = new Date(this.props.year, this.props.month-1, this.props.day);
    var currentDay = (oToday.getDay() == 0) ? 6 : (oToday.getDay()-1);
    var arrayDate = [];
    //下面是周日。
    // if(currentDay==0){currentDay=7};
    // var sundayTime = oToday.getTime()-(7-currentDay)*24*60*60*1000;
    var sundayTime = oToday.getTime()-(currentDay)*24*60*60*1000;

    var temporaryDate;
    for(let i = 0; i < 7; i++){
      temporaryDate = new Date(sundayTime).setDate((new Date(sundayTime)).getDate() + i);
      arrayDate.push( (new Date(temporaryDate).getMonth()+1)+"-"+new Date(temporaryDate).getDate());
    } 

    return arrayDate;
  }

  render() {
    let that = this;
  	let nodePrev = "";
  	let nodeCurrent = "";
  	let nodeNext = "";
    let getWeekBtw = [];

  	var prevDays = [], CurrentDays = [], nextDays = [];

    var FirstDayWeek = this.getFirstDayWeek(),
        getMonthDays = this.getMonthDays(),
        lastDays = 42 - FirstDayWeek - getMonthDays;
      
    // Previous month's days
    var FirstPrevDay = this.getFirstPrevDay();

    for (let i = 0; i < FirstDayWeek; i++) {
      prevDays[i] = FirstPrevDay;
      FirstPrevDay++;
    }

    // Current month's days
    for (let i = 1; i <= getMonthDays; i++) {
      CurrentDays[i] = i;
    }

    // Next month's days
    for (let i = 1; i < lastDays+1; i++) {
      nextDays[i] = i;
    }

    let year  = this.props.year,
        month = this.props.month,
        day   = this.props.day;
     
    if(that.props.fcState == 'week'){
      getWeekBtw = this.getWeekBtw(year, month-1, day);
    }

    nodePrev = prevDays.map(function( item, i ){
        let preYear, preMonth;
        let className = "fc-past";
        if(month == 1){
          preYear  = year-1;
          preMonth = 12;
        }else{
          preYear  = year;
          preMonth = month-1;
        };

        if(that.props.fcState == 'month'){
          className += " checked-day"
        };
        if(that.props.fcState == 'week'){
          if( getWeekBtw.indexOf( preMonth+"-"+item ) > -1 ){
            className += " checked-day"
          }
        };

        return <li key={i} className = {className} onClick = {that.props.daysOnClick.bind(that, {year:preYear, month:preMonth, day:item})} >{item}</li>
    });
    
    nodeCurrent = CurrentDays.map(function( item, i ){
      let className = "";
      if(that.props.fcState == 'month'){
        className += "checked-day"
      }else if (that.props.fcState == 'week') {
        if( getWeekBtw.indexOf(month+"-"+item) > -1 ){
          className += " checked-day"
        };
      }else if (that.props.fcState == 'day' && item == day ) {
        className += "checked-day"
      }
      return <li  key={i} className = {className} onClick = {that.props.daysOnClick.bind(that, {year, month, day:item})} >{item}</li>;
    })

    nodeNext = nextDays.map(function( item, i ){
        let preYear, preMonth;
        let className = "fc-past";
        if(month == 12){
          preYear  = year+1;
          preMonth = 1;
        }else{
          preYear  = year;
          preMonth = month+1;
        };

        if(that.props.fcState == 'month'){
          className += " checked-day"
        };
        if(that.props.fcState == 'week'){
          if( getWeekBtw.indexOf(preMonth+"-"+item) > -1 ){
            className += " checked-day"
          }
        };

        return <li key={i} className = {className}  onClick = {that.props.daysOnClick.bind(that, {year:preYear, month:preMonth, day:item})}>{item}</li>
    });

      

    return (
    	<div className="ck-datePickerBody">
    	    <div className = "ck-datePickerWeekDay" >
	          <span>一</span>
	          <span>二</span>
	          <span>三</span>
	          <span>四</span>
	          <span>五</span>
	          <span>六</span>
            <span>日</span>
	        </div>
	        <div className = "ck-datePicker-dayCon" >
	            <ul>
	            {nodePrev}
	            {nodeCurrent}
	            {nodeNext}
	            </ul>
	        </div>
    	</div>
    )
  }
}
export default DatePickerBody