
/**
 * Created by ytm
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SortableList from './Sortable'
import SortableHot from './SortableHot'

import './index.less'

class Sortable extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
      };
    }

    componentDidMount() {
    }

    routerWillLeave(nextLocation) {
        let r = confirm("真的离开吗");
        if(r == true){
          console.log("离开！");
        }else{
          console.log("离开个毛！");
          return false
        }
    }

    render() {
        return (
        	<div style={{ padding:'20px' }}>
             <SortableList />
             <div style={{ padding:'20px' }}></div>
             <SortableHot />
          </div>
        )
    }
}

function mapStateToProps(state) {
  return {
  }
}

module.exports = connect(mapStateToProps, {
})(Sortable)