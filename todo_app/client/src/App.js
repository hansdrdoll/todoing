import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import { getTodo, updateTodo } from './api';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import DraftEditor from './DraftEditor';
import MatrixEditor from './MatrixEditor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      rawState: {},
      dataLoaded: false,
      saved: true,
    };
    this.handleEditorStateChange = this.handleEditorStateChange.bind(this);
    this.handleMatrixEditorChange = this.handleMatrixEditorChange.bind(this);
  }

  componentDidMount() {
    getTodo(1).then(rawState => {
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

  componentDidUpdate(_prevProps, prevState, _snapshot) {
    // TODO: debounce this
    if (!isEqual(prevState.rawState.blocks, this.state.rawState.blocks)) {
      this.setState({ saved: false });
      this.updateApiEditorData(this.state.rawState);
    }
  }

  handleEditorStateChange(editorState) {
    const currentContent = editorState.getCurrentContent();
    const rawState = convertToRaw(currentContent);
    // this.updateApiEditorData(rawState);
    this.setState({
      editorState,
      rawState,
    });
  }

  updateApiEditorData = debounce(rawState => {
    const userId = 1;
    updateTodo(userId, rawState).then(_res => {
      this.setState({
        saved: true,
      });
    });
  }, 1500);

  handleMatrixEditorChange(modifiedData) {
    this.setState({
      editorState: EditorState.createWithContent(convertFromRaw(modifiedData)),
      saved: false,
      // rawState: modifiedData,
    });
    this.updateApiEditorData(modifiedData);
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <div className="header">
              <h1>just todo it</h1>
              <p>{this.state.saved ? <span>saved</span> : <span>...</span>}</p>
              <Link to="/">Editor</Link> <Link to="priority">Priority</Link>
            </div>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <DraftEditor
                    {...props}
                    editorState={this.state.editorState}
                    onChange={this.handleEditorStateChange}
                    rawState={this.state.rawState}
                  />
                )}
              />
              <Route
                exact
                path="/priority"
                render={props => (
                  <MatrixEditor
                    {...props}
                    editorData={this.state.rawState}
                    updateEditorData={this.handleMatrixEditorChange}
                  />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

export default App;
