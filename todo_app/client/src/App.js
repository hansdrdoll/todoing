import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { getTodo, updateTodo } from './api';
import debounce from 'lodash/debounce';
import DraftEditor from "./DraftEditor"
import PriorityMatrix from './PriorityMatrix';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      rawState: {},
      dataLoaded: false,
    };
    this.handleRawEditorState = this.handleRawEditorState.bind(this);
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
  }

  componentDidMount() {
    getTodo(1).then((rawState) => {
      if (rawState) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(rawState)),
          rawState,
          dataLoaded: true,
        });
      } else {
        console.log('i got nothin');
        this.setState({
          editorState: EditorState.createEmpty(),
          dataLoaded: false,
        });
      }
    });
  }

  handleEditorStateChange(editorState) {
    const currentContent = editorState.getCurrentContent();
    const rawState = convertToRaw(currentContent);
    this.updateApiEditorData(rawState);
    this.setState({
      editorState,
      rawState,
    });
  }

  updateApiEditorData = debounce((rawState) => {
    const userId = 1;
    updateTodo(userId, rawState)
    console.table(rawState.blocks)
  }, 2000)


  // maybe unnecessary
  handleRawEditorState(editorData) {
    this.setState({
      editorData,
    });
  }

  render() {
    if (this.state.dataLoaded) {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="header">
            <h1>header</h1>
            {/* <Link to="/">Editor</Link> <Link to="priority">Priority</Link> */}
          </div>
          <div className="editor">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <DraftEditor
                    {...props}
                    editorState={this.state.editorState}
                    onChange={this.handleEditorStateChange}
                  />
                )}
              />
              {/* <Route
                exact
                path="/priority"
                render={props => (
                  <PriorityMatrix {...props} editorData={this.state.editorData} />
                )}
              /> */}
            </Switch>
          </div>
          <div className="matrix">
            <PriorityMatrix editorData={this.state.rawState} />
          </div>
        </div>
      </BrowserRouter>
    )
  } else {
    return <div>Loading</div>
  }
  }
}

export default App;
