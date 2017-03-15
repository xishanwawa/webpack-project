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
      {
        title: '项名称',
        dataIndex: 'name', 
        key: 'name',
        render: 'input',
        span: 6
      }
    ],
    data: [
       {
         name:"yangtianming",
       }
    ]
  }

  onChange(data) {
    // console.log(data);
    this.setState({data})
  }

  render() {
    return (
      <div>
         <SortAbleList 
            columns = {this.state.columns} 
            data = {this.state.data} 
            onChange = {this.onChange.bind(this)} 
            sortAbleSpan = {6}
            addAndDelAbleSpan = {6}
          />
      </div>
    )
  }
}