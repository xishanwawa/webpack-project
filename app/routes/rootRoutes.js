import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';

// import Index from 'containers/Index';
// import IndexPage from 'containers/IndexPage';

const routeConfig = {
  path: '/',
  // component: Index,
  
  childRoutes: [
    { 
      path: 'index-page', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/IndexPage'))
        }, 'indexPage')
      },
      // onEnter: function () {
      //   let r = confirm("Press a button")
      //   if (r == true){
      //     return 'ok';
      //   }else{
      //     return false;
      //   }
      // },
      // onLeave: function (nextState, replaceState) {
      //     //replaceState(null, '/index-page/' + nextState.params.id);
      //     //return false;
      // }
    },
    { 
      path: 'list-page', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/ListPage'))
        }, 'listPage')
      }
    },
    { 
      path: 'date-page', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/DatePage'))
        }, 'DatePage')
      }
    },
    { 
      path: 'control-library', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/ControlLibrary'))
        }, 'ControlLibrary')
      }
    },
    // { 
    //   path: 'inbox', 
    //   component: IndexPage 
    // }
  ],

  // getChildRoutes(partialNextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./routes/datalog'),
  //     ])
  //   })
  // }

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('containers'))
    }, 'index')
  }
}


export default class Routes extends Component {
    constructor(props) {
      super(props)
    }
    render() {
        return (
          <Router routes={routeConfig} history={browserHistory} />
        )
    }
}