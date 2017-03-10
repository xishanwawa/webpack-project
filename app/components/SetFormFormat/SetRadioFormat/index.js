/**
 * Created by yangtm
 */
import React, {Component, PropTypes} from 'react';
import SortAbleList from 'components/SortAbleList';
import './index.less'

export default class SetRadioFormat extends React.Component {
  static defaultProps = {

  }

  constructor() {
    super();
  }
  state = {
    columns:[
       {}
    ],
    data: [
       {}
    ]
  }
  onChange(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
         <SortAbleList 
            columns = {this.state.columns} 
            data = {this.state.data} 
            onChange = {this.onChange.bind(this)} 
          />
      </div>
    )
  }
}