/**
 * Created by ytm on 4/7/16.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import DatePicker from "components/DatePicker"

class ListPage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const {$$state} = this.props;

    return (
      <div style={{ padding:'20px' }}>
        <DatePicker />
      </div>
    )
  }
}

// function mapStateToProps(state) {   return {     $$state:
// state.indexPageReducer   } } function mapDispatchToProps(dispatch) {   return
// {     onIncrement: () => dispatch(onIncrement()),     onDecrement: () =>
// dispatch(onDecrement())   } } module.exports = connect(mapStateToProps,
// mapDispatchToProps)(IndexPage) or

function mapStateToProps(state) {
  return {$$state: state.indexPageReducer}
}

module.exports = connect(mapStateToProps, {})(ListPage)