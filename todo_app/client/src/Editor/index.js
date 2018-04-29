import React, { Component } from 'react';
import 'megadraft/dist/css/megadraft.css'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {editorState: editorStateFromRaw(null)};
  this.onChange = this.onChange.bind(this)
  this.onSaveClick = this.onSaveClick.bind(this)
}

onChange = (editorState) => {
  this.setState({editorState});
}

onSaveClick = () => {
  const {editorState} = this.state;
  const content = editorStateToJSON(editorState);
  // Your function to save the content
  // save_my_content(content);
  console.log(content);
}


  render() {
    return (
      <div className="editor">
        <MegadraftEditor
  editorState={this.state.editorState}
  onChange={this.onChange}/>
      <button onClick={this.onSaveClick}>
          Save
        </button>
      </div>
    );
  }
}

export default App;
