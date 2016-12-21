/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import CalendarMonthHeader from './CalendarMonthHeader'
import CalendarWeekHeader  from './CalendarWeekHeader'
import CalendarDayHeader   from './CalendarDayHeader'
import CalendarMonthBody   from './CalendarMonthBody'
import CalendarWeekBody    from './CalendarWeekBody'
import CalendarDayBody     from './CalendarDayBody'
import MoreEvents          from './MoreEvent'
import './index.less'

class CkFullCalendar extends React.Component {
  static defaultProps = {
    TitType:'',
    TimeLimit : 'none',
    Events:[],
    CreateTask: function(data) {
      console.log(data);
    },
    changeFcState:function(data) {
      console.log(data);
    },
    showHandleObjEvent: function(itemEvent, handleEventCon){
      console.log(itemEvent);
      console.log(handleEventCon);
    }
  }
  
  constructor() {
    super();
    var newDate =  new Date();
    this.state = {
      fcState : 'month',                 //1代表月，2代表周，3代表天
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
      moreEventPageX:0,
      moreEventPageY:0,
      moreEventsState: true,             //更多任务框显示隐藏
      moreEventsDate: {
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        day: newDate.getDate()
      }
    }
  }

  componentWillMount(){
    if(!!this.props.year){
      this.setState({
        fcState: this.props.fcState,
        year:    this.props.year,
        month:   this.props.month,
        day:     this.props.day
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      moreEventsState:true,
    });
    window.removeEventListener("mousedown", this.hideMoreEvents);
  }
  
  toUpdateState(date) {
    this.setState({
      moreEventsState: true, 
      month: date.month,
      year: date.year,
      day:date.day
    });
  }

  handleTodayClick() {
    var newDate  =  new Date();
    var newMonth = newDate.getMonth() + 1;
    var newYear  = newDate.getFullYear();
    var newDay   = newDate.getDate();
    var fcState  = this.state.fcState;
    this.setState({
      moreEventsState: true,
      year: newYear, 
      month: newMonth, 
      day: newDay
    });
    let date = {
      fcState,
      year: newYear, 
      month: newMonth, 
      day: newDay
    };
    this.props.changeFcState(date);
  }
  changeFcState(dateype) {
    var fcState = dateype;
    var year    = this.state.year;
    var month   = this.state.month;
    var day     = this.state.day;
    this.setState({
      fcState
    });
    let date = {
      fcState,
      year,
      month,
      day
    };
    this.props.changeFcState(date);
  }
  getMoreEvents(date, moreEventCon) {
    this.setState({
      moreEventsState: false,
      moreEventsDate: date,
      moreEventPageX:moreEventCon.pageX,
      moreEventPageY:moreEventCon.pageY
    });

    window.addEventListener("mousedown", this.hideMoreEvents.bind(this));

  }
  hideMoreEvents() {
    if(!this.state.moreEventsState){
      this.setState({
        moreEventsState: true
      });
    }
  }

  showHandleObjEvent(itemEvent, handleEventCon) {
    this.props.showHandleObjEvent(itemEvent, handleEventCon)
  }


  getWeekBtw() {
    var BtwStrDate = "";
    var oToday = new Date(this.state.year, this.state.month-1, this.state.day);
    var currentDay = oToday.getDay();
    //下面是周日到周六的。
    // var mondayTime = oToday.getTime()-(currentDay)*24*60*60*1000;
    // var sundayTime = oToday.getTime()+(6-currentDay)*24*60*60*1000;

    if(currentDay == 0){
      currentDay = 7
    }
    var mondayTime = oToday.getTime()-(currentDay-1)*24*60*60*1000;
    var sundayTime = oToday.getTime()+(7-currentDay)*24*60*60*1000;
    
    BtwStrDate = ( new Date(mondayTime).getFullYear() ) 
    + "年" + ( new Date(mondayTime).getMonth() + 1 ) 
    + "月" + ( new Date(mondayTime).getDate() ) + 
    "日" + " — "
    + ( new Date(sundayTime).getFullYear() ) + 
    "年" + ( new Date(sundayTime).getMonth() + 1 ) + 
    "月" + ( new Date(sundayTime).getDate() ) 
    + "日";
    return {
      BtwStrDate,
      mondayTime
    };
  }
  CreateTask(date) {
    if(this.props.TimeLimit == 'past'){
       let newDate = new Date();
       let localDate = new Date(date.year, date.month-1, date.day);
       if(localDate.getTime() < newDate.getTime()){
        date.month = newDate.getMonth() + 1;
        date.day = newDate.getDate();
       }
    }
    if(this.props.TimeLimit == 'future'){
       let newDate = new Date();
       let localDate = new Date(date.year, date.month-1, date.day);
       if(localDate.getTime() > newDate.getTime()){
        date.month = newDate.getMonth() + 1;
        date.day = newDate.getDate();
       }
    }
    this.props.CreateTask(date)
  }
  render() {
      if(this.state.fcState == 'month'){
        return ( 
          <div className="FullCalender"> 
            <CalendarMonthHeader
                TitType        = {this.props.TitType}
              year             = {this.state.year} 
              month            = {this.state.month} 
              fcState        = {this.state.fcState}

              CreateTask       = {this.CreateTask.bind(this)}
              handleTodayClick = {this.handleTodayClick.bind(this)}
              changeFcState    = {this.changeFcState.bind(this)}
            />
            <CalendarMonthBody 
              year           = {this.state.year} 
              month          = {this.state.month} 
              day            = {this.state.day}
              fcState        = {this.state.fcState}

              CreateTask     = {this.CreateTask.bind(this)}
              Events         = {this.props.Events || []}
              getMoreEvents  = {this.getMoreEvents.bind(this)}
              getHandleObjEvent = {this.showHandleObjEvent.bind(this)}
            />
            <MoreEvents 
              pageX           = {this.state.moreEventPageX}
              pageY           = {this.state.moreEventPageY}
              moreEventsDate  = {this.state.moreEventsDate}
              moreEventsState = {this.state.moreEventsState}

              Events          = {this.props.Events || []}
              hideMoreEvents  = {this.hideMoreEvents.bind(this)}
              getHandleObjEvent  = {this.showHandleObjEvent.bind(this)}
            />
          </div>
        )
      }else if(this.state.fcState == 'week'){
        let strDate = this.getWeekBtw();
        return (
          <div className="FullCalender"> 
            <CalendarWeekHeader
              TitType        = {this.props.TitType}
              year             = {this.state.year} 
              month            = {this.state.month} 
              day              = {this.state.day}
              fcState          = {this.state.fcState}
              
              strDate          = {strDate.BtwStrDate}
              CreateTask       = {this.CreateTask.bind(this)}
              handleTodayClick = {this.handleTodayClick.bind(this)}
              changeFcState    = {this.changeFcState.bind(this)}
            />
            <CalendarWeekBody 
              fcState        = {this.state.fcState}
              startDate      = {strDate.mondayTime}
              Events         = {this.props.Events || []}
              CreateTask     = {this.CreateTask.bind(this)}
              getHandleObjEvent = {this.showHandleObjEvent.bind(this)}
            />
          </div>
        )
      }else if(this.state.fcState == 'day'){
        return (
          <div className="FullCalender"> 
            <CalendarDayHeader
                TitType        = {this.props.TitType}
              year             = {this.state.year} 
              month            = {this.state.month} 
              day              = {this.state.day}
              fcState          = {this.state.fcState}
              CreateTask       = {this.CreateTask.bind(this)}
              handleTodayClick = {this.handleTodayClick.bind(this)}
              changeFcState    = {this.changeFcState.bind(this)}
            />
            <CalendarDayBody 
              year           = {this.state.year} 
              month          = {this.state.month} 
              day            = {this.state.day}
              fcState        = {this.state.fcState}

              Events         = {this.props.Events || []}
              CreateTask     = {this.CreateTask.bind(this)}
              getHandleObjEvent = {this.showHandleObjEvent.bind(this)}
            />
          </div>
        )
      }else {
        return (
          <div className="FullCalender"> 
            {"fcState状态错误!"}
          </div>
        )
      }
  }
}
export default CkFullCalendar