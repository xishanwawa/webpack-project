import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

// import Index from 'containers/Index';
// import IndexPage from 'containers/IndexPage';

const routes = {
  path: '/',
  // component: Index,
  
  childRoutes: [
    { 
      path: 'index-page', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/IndexPage'))
        }, 'indexPage')
      }
    },
    { 
      path: 'list-page', 
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('containers/ListPage'))
        }, 'listPage')
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
          <Router routes={routes} history={browserHistory} />
        )
    }
}