import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute  } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件
 
import Index from 'containers';
import IndexPage from 'containers/IndexPage';
import ListPage from 'containers/ListPage'

// const history = syncHistoryWithStore(browserHistory, store)

export default class Routes extends Component {
    constructor(props) {
      super(props)
    }
    render() {
        return (
          <Router history={browserHistory}>
        	  <Route path="/" component={Index}>
              <IndexRoute component={IndexPage} />
              <Route path="/index-page" component={IndexPage}/>
              <Route path="/list-page" component={ListPage}/>
            </Route>
          </Router>
        )
    }
}