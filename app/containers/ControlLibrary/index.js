
/**
 * Created by ytm on 4/7/16.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Controls from 'components/Controls'
import mockData from 'mockData'

class ControlLibrary extends React.Component {

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
            <Controls />
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
})(ControlLibrary)