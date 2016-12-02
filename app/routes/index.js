import React, { Component, PropTypes } from 'react'
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import IndexPage from 'containers'

export default class Routes extends Component {
    constructor(props) {
      super(props)
    }
    render() {
        return (
          <Router history={browserHistory}>
        	<Route path="/" component={IndexPage}>
              <Route path="/IndexPage" component={IndexPage}/>
            </Route>
          </Router>
        )
    }
}