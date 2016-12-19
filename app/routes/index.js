import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
import IndexPage from 'containers/IndexPage';


// const history = syncHistoryWithStore(browserHistory, store)

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