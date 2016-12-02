/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
class MoreEvents extends React.Component {
  constructor() {
    super();
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
  stopPropagation(e) {
    e.stopPropagation();
  }
  render() {
      let  that = this;

      let  classes = 'MoreEvents';
      if(this.props.moreEventsState){
        classes+=" hideShow"
      }

      let divStyle = {
        top: this.props.pageY,
        left: this.props.pageX
      };
      let moreEventsDate = this.props.moreEventsDate;

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

          if(new Date(moreEventsDate.year, moreEventsDate.month-1, moreEventsDate.day, 23, 59, 59) >= new Date(itemEvent.StartTime.replace(/-/g, '/')) && new Date(moreEventsDate.year, moreEventsDate.month-1, moreEventsDate.day, 0, 0, 0) <= new Date(itemEvent.EndTime.replace(/-/g, '/'))){
              return <span key={i} className = {taskORschedule +' '+ classNameStatus + " EventTit fc-unselectable"} title ={itemEvent.Name} onClick = {that.getHandleObjEvent.bind(that, itemEvent)} >{itemEvent.Name}</span>;
          };
      });

      return ( 
      <div style={ divStyle } className = { classes }  onMouseDown = {this.stopPropagation}  > 
        <div className = "MoreEventTit">
          <span className = "hideMoreEvents anticon anticon-cross"  onClick = {this.props.hideMoreEvents} ></span>
          <span className = "hideMoreEventsDate">{moreEventsDate.year+"-"+moreEventsDate.month+"-"+moreEventsDate.day}</span>
        </div>
        <div className = "MoreEventBody">
        {nodeEvents}
        </div>
      </div>
      )
  }
}

export default MoreEvents