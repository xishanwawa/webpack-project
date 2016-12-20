
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Menu     from "components/common/Menu"

class Index extends React.Component {

    constructor(props) {
      super(props)
    }

    componentDidMount() {
    }

    render() {
    	const { $$state } = this.props;
    	let value = $$state.get("val");

        return (
        	<div>
             <Menu />
             { this.props.children || "index" }
          </div>
        )
    }
}


function mapStateToProps(state) {
  return {
    $$state: state.indexPageReducer
  }
}

module.exports = connect(mapStateToProps, {

})(Index)