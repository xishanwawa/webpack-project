/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class CalendarBody extends React.Component {
  constructor() {
    super();
  }
  CreateTask(date) {
    this.props.CreateTask(date)
  }
  getHandleObjEvent(itemEvent, e){
    e.stopPropagation();
    let window_width = document.body.clientWidth;
    let pageX = (window_width - e.pageX > 300) ? e.pageX : window_width - 300;
    var handleEventCon = {
      pageX: pageX,
      pageY: e.pageY
    }
    this.props.getHandleObjEvent(itemEvent, handleEventCon);
  }
  render() {
    var that = this;
    let fcState = this.props.fcState;
    let d_now = new Date();
    let year = d_now.getFullYear(),
    month = d_now.getMonth(),
    day = d_now.getDate();


    let today = year +"-"+ month +"-"+ day;

    let thisYear = this.props.year,
        thisMonth = this.props.month-1,
        thisDay = this.props.day;

    let foday = thisYear +"-"+ thisMonth  +"-"+ thisDay;



    let className = (today == foday) 
        ? "fc-day-content fc-today"
        : "fc-day-content";

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
    
    let nodeEvents = that.props.Events.map(function(itemEvent, i){
      let classNameStatus = classStatus(itemEvent);
      let taskORschedule = (itemEvent.AddType == "日程")? 'ck_schedule': 'ck_task';
        if(new Date(thisYear, thisMonth, thisDay, 23, 59, 59) >= new Date(itemEvent.StartTime.replace(/-/g, '/')) && new Date(thisYear, thisMonth, thisDay, 0, 0, 0) <= new Date(itemEvent.EndTime.replace(/-/g, '/'))){
        
          let EventLineWidth = 0;

          //label left值
          let halfEventWidth = 25;
          let startDay   = new Date(itemEvent.StartTime.replace(/-/g, '/')).getDate(),
              endDay     = new Date(itemEvent.EndTime.replace(/-/g, '/')).getDate(),
              startHours = new Date(itemEvent.StartTime.replace(/-/g, '/')).getHours(),
              endHours   = new Date(itemEvent.EndTime.replace(/-/g, '/')).getHours();

          let EventLeft = (thisDay == startDay) ? startHours*50 : 0;

          if( endDay == startDay ){
            EventLineWidth = ( endHours - startHours )*50 + halfEventWidth;
          }else{
            if(thisDay == startDay){
              EventLineWidth = ( 23 - startHours )*50 + halfEventWidth;
            }else if(thisDay == endDay){
              EventLineWidth = endHours*50 + halfEventWidth;
            }else{
              EventLineWidth = 23*50 + halfEventWidth;
            };
          };
          
          return  <div className = "dayEventCon"  style = {{ left: EventLeft}}  key = {i} >
                    <span 
                      key={i}
                      className = {taskORschedule +' '+ classNameStatus + " EventTit fc-unselectable"} 
                      title ={itemEvent.Name} 
                      onClick = {that.getHandleObjEvent.bind(that, itemEvent)}
                      >{itemEvent.Name}</span>
                    <label className = {classNameStatus + " timeLine"} style = {{ width: EventLineWidth }} ></label>
                  </div>;
        }

    });
    
    let arrayTimeTit = [];
    for(let i = 0; i <= 23; i++){
      arrayTimeTit.push(i+"点");
    }

    let nodeTimeTit = arrayTimeTit.map(function(item, i){
      return <span key = {i} >{item}</span>
    })

    let nodeTimeCon = arrayTimeTit.map(function(item, i){
      return <div className ="TimeCon" onClick = {that.CreateTask.bind(that, {fcState, year: thisYear, month:thisMonth+1, day: thisDay, hours:i})}  key = {i} ></div>
    })

    let fcDayNode = <div className = {className} >
      <div className = "timesTit">{nodeTimeTit}</div>
      <div className = "timesCon">{nodeTimeCon}</div>
      <div className = "timesConFloat">{nodeEvents}</div>
    </div>;

    return ( 
    <div className = "CalendarBody dayBody"> 
      <div  className = "CalendarBodycon">
        {fcDayNode}
      </div>
    </div>
    )
  }
}

export default CalendarBody