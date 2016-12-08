/**
 * Created by yangtm
 */
import React, { Component, PropTypes } from 'react'
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

class MonthWeekDay extends React.Component {
  constructor() {
    super();
  }
  changeFcState(stateTyle) {
    this.props.changeFcState(stateTyle)
  }
  render() {
    let fcState = this.props.fcState;

    let nodeMonthWeekDay = [{name:'月', EngName:'month'}, {name:'周', EngName:'week'}, {name:'日', EngName:'day'}].map((item, i) => {
      let type = 'ghost';
      if(fcState == item.EngName){
        type = 'primary';
      }
      return <Button key = {i} type = {type} style = {{padding:"4px 20px"}}  onClick = {this.changeFcState.bind(this, item.EngName)} >{item.name}</Button>
    })
    return ( 
      <div className = 'MonthWeekDay'> 
        <ButtonGroup>
          {nodeMonthWeekDay}
        </ButtonGroup>
      </div>
    )
  }
}

export default MonthWeekDay