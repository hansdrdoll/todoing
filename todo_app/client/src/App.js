import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import DraftEditor from './DraftEditor';
import PriorityMatrix from './PriorityMatrix';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: {},
    };
    this.handleRawEditorState = this.handleRawEditorState.bind(this);
  }

  handleRawEditorState(editorData) {
    // console.log("apo", editorData.blocks[0].text)
    this.setState({
      editorData,
    })
  }



  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="header">
          <h1>header</h1>
          <Link to='/'>Editor</Link>
          {' '}
          <Link to='priority'>Priority</Link>
        </div>
        <div className="editor">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <DraftEditor {...props} shareEditor={this.handleRawEditorState} />
                )}
              />
              <Route
                exact
                path="/priority"
                render={props => (
                  <PriorityMatrix {...props} editorData={this.state.editorData} />
                )}
              />
            </Switch>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
