
/**
 * Created by ytm
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd';
import {Editor, EditorState, Modifier, RichUtils} from 'draft-js';
import Draggable from 'react-draggable';

// const confirm = Modal.confirm;
// import { Lifecycle } from 'react-router'
// import reactMixin  from 'react-mixin';

import Counter     from "./Counter"
//import MoveList    from "components/MoveList"
import {onIncrement, onDecrement} from "actionsReducers/IndexPage"



import ReactPDF from 'react-pdf';
 
class MyApp extends React.Component {

    constructor(props) {
      super(props)
      this.state = {pageNumber: 0, total:1};
    }

    onDocumentLoad({ total }) {
        this.setState({ total });
    }
 
    onPageLoad({ pageIndex, pageNumber }) {
        this.setState({ pageIndex, pageNumber });
    }
    
    render() {
        return (
            <div>
                <ReactPDF
                    file="pdf/sample.pdf"
                    pageIndex={2}
                    onDocumentLoad={this.onDocumentLoad}
                    onPageLoad={this.onPageLoad}
                />
                <p>Page {this.state.pageNumber} of {this.state.total}</p>
            </div>
        );
    }
}


class IndexPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {editorState: EditorState.createEmpty()};
      this.onChange = (editorState) => this.setState({editorState});
    }

    componentDidMount() {

        //网上给的错误教程，setRouteLeaveHook函数在props.router里
        // this.context.router.setRouteLeaveHook(
        //   this.props.route,
        //   this.routerWillLeave
        // )

        //正确的方法
         const { dispatch, dirty, route, router } = this.props;
         router.setRouteLeaveHook(route, this.routerWillLeave.bind(this));
    }

    //mixins: [ Lifecycle ]

    routerWillLeave(nextLocation) {
        let r = confirm("真的离开吗");
        if(r == true){
          console.log("离开！");
        }else{
          console.log("离开个毛！");
          return false
        }
        
        // let r = true;
        // var asyncReadFile = async () => {
        //   await confirm({
        //     title: '不要走，决战到天亮?',
        //     content: '',
        //     okText: '相忘于江湖',
        //     cancelText: '白头偕老',
        //     onOk() {
        //       console.log("离开！");
        //     },
        //     onCancel() {
        //       console.log("离开个毛！");
        //       return false
        //     }
        //   });
        // };

        // asyncReadFile();

        // if(r == true){
        //   console.log("离开！");
        // }else{
        //   console.log("离开个毛！");
        //   return false
        // }
    }

    render() {
    	const { $$state } = this.props;
    	let value = $$state.get("val");

        return (
        	<div style={{ padding:'20px' }}>
              <Counter
                value={value}
                onIncrement={ this.props.onIncrement.bind(this) }
                onDecrement={  this.props.onDecrement.bind(this) }
              />
              {/*<RichEditorExample />
              <Draggable bounds="body">
                <div>I can now be moved around!</div>
              </Draggable>*/}
          </div>
        )
    }
}

// reactMixin(IndexPage.prototype, [ Lifecycle ]);

// function mapStateToProps(state) {
//   return {
//     $$state: state.indexPageReducer
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     onIncrement: () => dispatch(onIncrement()),
//     onDecrement: () => dispatch(onDecrement())
//   }
// }

// module.exports = connect(mapStateToProps, mapDispatchToProps)(IndexPage)


//or
// class RichEditorExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};

//     this.focus = () => this.refs.editor.focus();
//     this.onChange = (editorState) => this.setState({editorState});

//     this.handleKeyCommand = (command) => this._handleKeyCommand(command);
//     this.onTab = (e) => this._onTab(e);
//     this.toggleBlockType = (type) => this._toggleBlockType(type);
//     this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
//   }

//   _handleKeyCommand(command) {
//     const {editorState} = this.state;
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _onTab(e) {
//     const maxDepth = 4;
//     this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
//   }

//   _toggleBlockType(blockType) {
//     this.onChange(
//       RichUtils.toggleBlockType(
//         this.state.editorState,
//         blockType
//       )
//     );
//   }

//   _toggleInlineStyle(inlineStyle) {
//     this.onChange(
//       RichUtils.toggleInlineStyle(
//         this.state.editorState,
//         inlineStyle
//       )
//     );
//   }

//   render() {
//     const {editorState} = this.state;

//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = 'RichEditor-editor';
//     var contentState = editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (contentState.getBlockMap().first().getType() !== 'unstyled') {
//         className += ' RichEditor-hidePlaceholder';
//       }
//     }

//     return (
//       <div className="RichEditor-root">
//         <BlockStyleControls
//           editorState={editorState}
//           onToggle={this.toggleBlockType}
//         />
//         <InlineStyleControls
//           editorState={editorState}
//           onToggle={this.toggleInlineStyle}
//         />
//         <div className={className} onClick={this.focus}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             customStyleMap={styleMap}
//             editorState={editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//             onTab={this.onTab}
//             placeholder="Tell a story..."
//             ref="editor"
//             spellCheck={true}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case 'blockquote': return 'RichEditor-blockquote';
//     default: return null;
//   }
// }

// class StyleButton extends React.Component {
//   constructor() {
//     super();
//     this.onToggle = (e) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }

//   render() {
//     let className = 'RichEditor-styleButton';
//     if (this.props.active) {
//       className += ' RichEditor-activeButton';
//     }

//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// const BLOCK_TYPES = [
//   {label: 'H1', style: 'header-one'},
//   {label: 'H2', style: 'header-two'},
//   {label: 'H3', style: 'header-three'},
//   {label: 'H4', style: 'header-four'},
//   {label: 'H5', style: 'header-five'},
//   {label: 'H6', style: 'header-six'},
//   {label: 'Blockquote', style: 'blockquote'},
//   {label: 'UL', style: 'unordered-list-item'},
//   {label: 'OL', style: 'ordered-list-item'},
//   {label: 'Code Block', style: 'code-block'},
// ];

// const BlockStyleControls = (props) => {
//   const {editorState} = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) =>
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

// var INLINE_STYLES = [
//   {label: '加粗', style: 'BOLD'},
//   {label: '斜体', style: 'ITALIC'},
//   {label: '下划线', style: 'UNDERLINE'},
//   {label: 'Monospace', style: 'CODE'},
// ];

// const InlineStyleControls = (props) => {
//   var currentStyle = props.editorState.getCurrentInlineStyle();
//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map(type =>
//         <StyleButton
//           key={type.label}
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

function mapStateToProps(state) {
  return {
    $$state: state.indexPageReducer
  }
}

module.exports = connect(mapStateToProps, {
  onIncrement,
  onDecrement,
})(IndexPage)