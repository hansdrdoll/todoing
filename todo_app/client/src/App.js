import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DraftEditor from './DraftEditor';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: {},
      items: [],
    };
    this.handleRawEditorState = this.handleRawEditorState.bind(this);
  }

  handleRawEditorState(editorData) {
    // console.log("apo", editorData.blocks[0].text)
    const items = editorData.blocks.map(item => <li>{item.text}</li>);
    this.setState({
      editorData,
      items,
    })
  }



  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>header</h1>
        </div>
        <div className="editor">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <DraftEditor {...props} shareEditor={this.handleRawEditorState} />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>
        { this.state.items && (<div>{this.state.items}</div>)}
      </div>
    );
  }
}

export default App;
