
/**
 * Created by ytm
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
 
const SortableItem = SortableElement(({value}) =>
  <div className="list-item">{value}</div>
);
 
const SortableList = SortableContainer(({items}) => {
  return (
    <div className="list">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});
 
class SortableHot extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    console.log(this.state.items)
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableHot