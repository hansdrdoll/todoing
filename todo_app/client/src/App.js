import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
import { getTodo, updateTodo } from './api';
import { Button, Spinner } from '@blueprintjs/core';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import DraftEditor from './DraftEditor';
import MatrixEditor from './MatrixEditor';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
// import { IconNames } from '@blueprintjs/icons';
import './App.css';

const tabCharacter = "    ";

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
    this.handleTab = this.handleTab.bind(this);
    this.mapHashtags = this.mapHashtags.bind(this);
  }

  componentDidMount() {
    getTodo(1).then(rawState => {
      if (rawState) {
        this.setState({
          editorState: EditorState.createWithContent(convertFromRaw(rawState)),
          rawState,
          dataLoaded: true,
        });
        this.mapHashtags(this.state.rawState.blocks);
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
    this.setState({
      editorState,
      rawState,
    });
  }

  updateApiEditorData = debounce(rawState => {
    // just throwing this in here to benefit from the debouncing
    this.mapHashtags(this.state.rawState.blocks);

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

  handleTab(e) {
    e.preventDefault();

    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );

    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
  }

  matchBlocksToHashtags(hashtag, blocks) {
    return blocks.filter(block => block.text.includes(hashtag))
  }
  // thanks http://geekcoder.org/js-extract-hashtags-from-text/
  mapHashtags(rawState) {
    const hashtag = /(?:^|)(?:#)([a-zA-Z\d]+)/;
    const hashtag2 = /(?:^|)(?:#)([a-zA-Z\d]+)/;
    // const containsHashtag = rawState.filter(item => regex.test(item.text));
    const containsHashtag = rawState.filter(item => hashtag.test(item.text))
    const allHashtags = new Set(containsHashtag.map(item => {
      return hashtag2.exec(item.text)[0]
    }));
    const blocksByHashtag = [];
    allHashtags.forEach(h => {
      blocksByHashtag.push({
        name: h.trim().substring(1),
        blocks: this.matchBlocksToHashtags(h, containsHashtag)
      })
    });
    this.setState({
      blocksByHashtag,
    });
  }

  render() {
    if (this.state.dataLoaded) {
      return (
        <BrowserRouter>
          <div className="App">
            <nav className="pt-navbar">
              <div className="pt-navbar-group pt-align-left">
                <div className="pt-navbar-heading">Todoing</div>
                <span className="pt-navbar-divider" />
                <div className="pt-tag pt-minimal">
                  {this.state.saved ? <span>saved</span> : <span>...</span>}
                </div>
              </div>
              <div className="pt-navbar-group pt-align-right">
                <Link to="/">
                  <Button minimal icon="manually-entered-data">
                    Editor
                  </Button>
                </Link>
                <Link to="priority">
                  <Button minimal icon="sort">
                    Priority
                  </Button>
                </Link>
              </div>
            </nav>
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
                    onTab={this.handleTab}
                    hashtags={this.state.blocksByHashtag}
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
      return (
        <div className="spinner">
          <Spinner />
          <p>Loading</p>
        </div>
      );
    }
  }
}

export default App;
