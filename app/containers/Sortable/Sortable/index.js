
/**
 * Created by ytm
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { sortable } from 'react-sortable';

var ListItem = React.createClass({
  displayName: 'SortableListItem',
  render: function() {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    )
  }
})
 
var SortableListItem = sortable(ListItem);
 
var SortableList = React.createClass({
 
  getInitialState: function() {
    return {
      draggingIndex: null,
      data: [
            "Gold",
            "Crimson",
            "Hotpink",
            "Blueviolet",
          ]
    };
  },
 
  updateState: function(obj) {
    this.setState(obj);
  },
 
  render: function() {
    var childProps = { className: 'myClass1' };
    var listItems = this.state.data.map(function(item, i) {
      return (
        <SortableListItem
          key={i}
          updateState={this.updateState}
          items={this.state.data}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list"
          childProps={childProps}
          >{item}</SortableListItem>
      );
    }, this);
 
    return (
          <div className="list">{listItems}</div>
    )
  }
});

export default SortableList