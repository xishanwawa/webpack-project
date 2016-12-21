/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class CalendarBody extends React.Component {
  constructor() {
    super();
  }
  weekToDay() {
    var arrayDate = [];
    var startDate = this.props.startDate;
    for(let i = 0; i < 7; i++){
      arrayDate.push( new Date(startDate).setDate((new Date(startDate)).getDate() + i) );
    } 
    return arrayDate;
  }

  getHandleObjEvent(itemEvent, e){
    e.stopPropagation();
    let window_width = document.body.clientWidth;
    let pageX = (window_width - e.pageX > 300) ? e.pageX : window_width-300;
    var handleEventCon = {
      pageX: pageX,
      pageY: e.pageY
    }
    this.props.getHandleObjEvent(itemEvent, handleEventCon);
  }

  CreateTask(date) {
    this.props.CreateTask(date)
  }

  render() {
      var that = this;
      let fcState = this.props.fcState;
      var arrayDate = this.weekToDay();
      var nodeWeekTit = arrayDate.map(function(item, i){
            let weekStr = "";
            switch (i)
            {
              case 0:
                weekStr = "周一";
                break;
              case 1:
                weekStr = "周二";
                break;
              case 2:
                weekStr = "周三";
                break;
              case 3:
                weekStr = "周四";
                break;
              case 4:
                weekStr = "周五";
                break;
              case 5:
                weekStr = "周六";
                break;
              case 6:
                weekStr = "周日";
                break;


            }
            return <span key = {i} >{(new Date(item).getMonth() + 1) + "/" + new Date(item).getDate() + weekStr}</span>
          })

      
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

      var nodeWeekCon = arrayDate.map(function(item, i){
            let d_now = new Date();
            let d_item = new Date(item);

            let year = d_item.getFullYear(),
                month = d_item.getMonth(),
                day = d_item.getDate();

            let today = d_now.getFullYear () 
            +"-"+ d_now.getMonth ()
            +"-"+ d_now.getDate ();

            let foday = year 
            +"-"+ month
            +"-"+ day;
             
            let className = (today == foday) 
            ? "nodeWeekCon fc-today"
            :"nodeWeekCon";
            
            let nodeEvents = that.props.Events.map(function(itemEvent, j){
                let classNameStatus = classStatus(itemEvent);
                let taskORschedule = (itemEvent.AddType == "日程")? 'ck_schedule': 'ck_task';
                if(new Date(year, month, day, 23, 59, 59) >= new Date(itemEvent.StartTime.replace(/-/g, '/')) && new Date(year, month, day, 0, 0, 0) <= new Date(itemEvent.EndTime.replace(/-/g, '/'))){
                    return <span className = {taskORschedule +" "+ classNameStatus + " EventTit fc-unselectable"} title ={itemEvent.Name} onClick = {that.getHandleObjEvent.bind(that, itemEvent)}  key = {j} >{itemEvent.Name}</span>
                }
            });

            month+=1;
            return <div className = {className} onClick = {that.CreateTask.bind(that, {fcState, year, month, day, hours: "0"})} key = {i}> {nodeEvents} </div>;
          })
      return ( 
      <div className = "CalendarBody"> 
        <div className = "weekday" >
          { nodeWeekTit }
        </div>
        <div className = "fc-week-content" >
          { nodeWeekCon }
        </div>
      </div>
      )
  }
}

export default CalendarBody