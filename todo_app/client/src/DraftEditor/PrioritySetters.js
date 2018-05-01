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
      { "urgent": true, "quick": true },
    );
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setUrgentQuick}>_Urgent-Quick_</div>
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
      { "urgent": true, "quick": false },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setUrgentSlow}>|_Urgent-NotQuick_</div>
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
      { "urgent": false, "quick": false },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setNotUrgentSlow}>|_NotUrgent-NotQuick_</div>
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
      { "urgent": false, "quick": true },
    )
    onChange(EditorState.push(editorState, contentState, 'set-priority'));
  };

  render() {
    return (
      <div onClick={this.setNotUrgentQuick}>|_NotUrgent-Quick_</div>
    );
  }
}

export { UrgentSlow, UrgentQuick, NotUrgentSlow, NotUrgentQuick }
