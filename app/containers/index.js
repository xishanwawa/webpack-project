
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames  from 'classnames';
//import { Lifecycle, RouteContext } from 'react-router'
// import reactMixin  from 'react-mixin';

import Header      from "components/common/Header"
import TopMenu     from "components/common/TopMenu"
import SiderMenu   from "components/common/SiderMenu"
import ShowHideArrow from 'components/common/ShowHideArrow'
import Notice      from 'components/common/Notice'

import "./index.less"

class Index extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        showHideMenu: true 
      }
    }


    // mixins: [ RouteContext ]


    componentDidMount() {
    }


    showHideMenuEvent(data){
        this.setState({
          showHideMenu: data,
        });
    }


    render() {
      let showHideFirstChild = classNames({ 
        'first-child': true,
        'open': this.state.showHideMenu,
      });

      let showHideMenu = classNames({ 
        'menu-box': true,
        'open': this.state.showHideMenu,
      });

      return (
        <div className = "ck-root">
            <Header />
            <TopMenu />
            <div  className = "ck-main">
              <div className = {showHideMenu}><SiderMenu /></div>
              <div className = {showHideFirstChild}>{ this.props.children || "Hello" }</div>
              <div className="main-right-list"><div>今日任务：</div></div>
            </div>
            <ShowHideArrow  showHideMenuEvent = {this.showHideMenuEvent.bind(this)} />
            <Notice />
        </div>
      )
    }
}

// reactMixin(Index.prototype,  [ RouteContext ]);

function mapStateToProps(state) {
  return {
    $$state: state.indexPageReducer
  }
}

module.exports = connect(mapStateToProps, {

})(Index)