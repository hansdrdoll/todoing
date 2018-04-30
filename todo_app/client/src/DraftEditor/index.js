
import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import debounce from 'lodash/debounce';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class DraftEditor extends Component {
  constructor(props) {
  super(props);
  this.state = {
    editorState: EditorState.createEmpty(),
  };
}

onEditorStateChange: Function = (editorState) => {
  this.logStateChange(editorState.getCurrentContent())
  // this.logStateChange(editorState)
  this.setState({
    editorState,
  });
};

logStateChange = debounce((editorState) => {
  console.log(convertToRaw(editorState))
}, 2000)

render() {
  const { editorState } = this.state;
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.onEditorStateChange}
    />
  )
}

}

export default DraftEditor;
