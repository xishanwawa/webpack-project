import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import IndexPage from 'containers/IndexPage';

const routes = {
  path: '/',
  component: IndexPage,
  
  // childRoutes: [
  //   { 
  //     path: 'IndexPage', 
  //     component: IndexPage 
  //   },
  //   { 
  //     path: 'inbox', 
  //     component: IndexPage 
  //   }
  // ]

  // getChildRoutes(partialNextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./routes/datalog'),
  //     ])
  //   })
  // }

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('containers/IndexPage'))
    })
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