import React, { Component } from 'react';
import './App.css';
import Editor from "./Editor";

class App extends Component {
  constructor(props) {
  super(props);
  // this.state = {editorState: editorStateFromRaw(null)};
  // this.onChange = this.onChange.bind(this)
}

  render() {
    return (
      <div className="App">
        <Editor />
      </div>
    );
  }
}

export default App;
