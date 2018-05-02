import React, { Component } from 'react';
import { EditorState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';

class UrgentQuick extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  setUrgentQuick: Function = (): void => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      { "urgent": true, "quick": true, "listName": "urgentQuick", },
    );
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setUrgentQuick}>_U-Q_</div>
    );
  }
}

class UrgentSlow extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  setUrgentSlow: Function = (): void => {
    const { editorState, onChange } = this.props;
    let contentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      { "urgent": true, "quick": false, "listName": "urgentSlow", },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setUrgentSlow}>|_U-nQ_</div>
    );
  }
}

class NotUrgentQuick extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  setNotUrgentQuick: Function = (): void => {
    const { editorState, onChange } = this.props;
    let contentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      { "urgent": false, "quick": true, "listName": "notUrgentQuick", },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setNotUrgentQuick}>|_nU-Q_</div>
    );
  }
}

class NotUrgentSlow extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  setNotUrgentSlow: Function = (): void => {
    const { editorState, onChange } = this.props;
    let contentState = Modifier.setBlockData(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      { "urgent": false, "quick": false, "listName": "notUrgentSlow", },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setNotUrgentSlow}>|_nU-nQ_</div>
    );
  }
}

export { UrgentQuick, UrgentSlow, NotUrgentQuick, NotUrgentSlow }
