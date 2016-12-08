/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class CalendarBody extends React.Component {
  constructor() {
    super();
  }
  //根据年月返回当月1号是星期几
  getFirstDayWeek() {
    var year = this.props.year,
    month = this.props.month;
    var dt = new Date( year, month-1 , 1 ) ; //new Date(year,month,1);
    var Weekdays = (dt.getDay() == 0) ? 6 : (dt.getDay() - 1);
    return Weekdays;
  }
  //根据月份获取当前天数
  getMonthDays() {
    var year = this.props.year,
    month = this.props.month;
    var temp = new Date( year, month, 0 );
    return temp.getDate();
  }
  //获取Previous month's days
  getPrevDays() {
    var year = this.props.year,
    month = this.props.month;
    var temp = new Date( year, month-1 ,0 );
    return temp.getDate();
  }
  //获取上个月开始显示天数
  getFirstPrevDay(){
    var prevDays = this.getPrevDays();
    var FristPrevDays = prevDays - this.getFirstDayWeek() + 1;
    return FristPrevDays;
  }
  CreateTask(date) {
    this.props.CreateTask(date)
  }
  HandleObjEvent(itemEvent, e){
    e.stopPropagation();
    let window_width = document.body.clientWidth;
    let pageX = (window_width - e.pageX > 300) ? e.pageX : window_width-300;
    var handleEventCon = {
      pageX: pageX,
      pageY: e.pageY
    }
    this.props.getHandleObjEvent(itemEvent, handleEventCon);
  }
  getMoreEvents(date, e){
    e.stopPropagation();
    var moreEventCon = {
      pageX: e.target.offsetLeft - 8,
      pageY: e.target.offsetTop - 76
    }
    this.props.getMoreEvents(date, moreEventCon);
  }
  render() {
      let that = this;
      let fcState = this.props.fcState;
      let day = this.props.day;
      let month = this.props.month;
      let year = this.props.year;

      let nowYear = (new Date()).getFullYear();
      let nowMonth = (new Date()).getMonth()+1;
      let nowDay = (new Date()).getDate();

      let prevDays = [], CurrentDays = [], nextDays = [];

      let FirstDayWeek = this.getFirstDayWeek(),
      getMonthDays = this.getMonthDays(),
      lastDays = 42 -  FirstDayWeek - getMonthDays;
      
      // Previous month's days
      let FirstPrevDay = this.getFirstPrevDay()
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

      const classStatus = function(itemEvent){
              switch (itemEvent.Status) 
              {
                case null:
                return 'task_not_start';
                case '未开始':
                return 'task_not_start';
                case '已取消':
                return 'task_canceled';
                case '已完成':
                return 'task_finished';
                case '进行中':
                return 'task_doing';
                case '已延期':
                return 'task_delay';
              }
      };
      
      let nodePrev = prevDays.map(function( item, j ){
        let prevMonth, prevYear;
        if(month == 1){
          prevMonth =12;
          prevYear = year - 1;
        }else{
          prevMonth = month - 1;
          prevYear = year;
        };

        return <li key = { j } className = "fc-past"  onClick = {that.CreateTask.bind(that, {fcState, year: prevYear, month: prevMonth, day:item, hours: "0"})} >{item}</li>
      });

      let nodeCurrent = CurrentDays.map(function( item, j ){
        let eventCount = 0;
        let moreCount = 0;
        let nodeMore = [];
        let nodeEvents = that.props.Events.map(function(itemEvent, i){
          let classNameStatus = classStatus(itemEvent);
          let taskORschedule = (itemEvent.AddType == "日程")? 'ck_schedule': 'ck_task';
            if(new Date(year, month-1, item, 23, 59, 59) >= new Date(itemEvent.StartTime.replace(/-/g, '/')) && new Date(year, month-1, item, 0, 0, 0) <= new Date(itemEvent.EndTime.replace(/-/g, '/'))){
              eventCount++
              if(eventCount >= 3){
                moreCount++;
                //先删除后添加，保证最后一个为more的最多值；
                nodeMore.pop(); 
                nodeMore.push(<span key = { i } className = "fc-moreEvents" onMouseDown = {that.getMoreEvents.bind(that, {year, month, day:item})}>{"+" + moreCount + "更多.."}</span>);
              }
              else if(eventCount < 3){
                return <span key = { i } className = {taskORschedule +' '+ classNameStatus + " EventTit fc-unselectable"} title ={itemEvent.Name} onClick = {that.HandleObjEvent.bind(that, itemEvent)} >{itemEvent.Name}</span>
              };
            }
        });

        let className = (nowDay == item && month == nowMonth && year == nowYear ) 
        ? "fc-today" 
        : "";
        return <li key = { j } className = {className} onClick = {that.CreateTask.bind(that, {fcState, year, month, day:item, hours: "0"})} >{item}{nodeEvents}{nodeMore[0]}</li>;
      });

      let nodeNext = nextDays.map(function( item, j ){
        let prevMonth, prevYear;
        if(month == 12){
          prevMonth =1;
          prevYear = year + 1;
        }else{
          prevMonth = month + 1;
          prevYear = year;
        };

        return <li key = { j }  className = "fc-past" onClick = {that.CreateTask.bind(that, {fcState, year: prevYear, month: prevMonth, day:item, hours: "0"})} >{item}</li>
      });

      return ( 
      <div className = "CalendarBody"> 
        <div className = "weekday" >
          <span>周一</span>
          <span>周二</span>
          <span>周三</span>
          <span>周四</span>
          <span>周五</span>
          <span>周六</span>
          <span>周日</span>
        </div>
        <div className = "fc-days-content" >
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

export default CalendarBody