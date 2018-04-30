
import React, { Component } from 'react';
import { EditorState, Modifier, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import { UrgentSlow, UrgentQuick, NotUrgentSlow, NotUrgentQuick } from './PrioritySetters'

// import { Map } from 'immutable';
import debounce from 'lodash/debounce';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styleMap = {
  'urgent-slow': {
    color: 'red',
  },
  'urgent-quick': {
    color: 'blue',
  },
  'noturgent-slow': {
    color: 'orange',
  },
  'noturgent-quick': {
    color: 'green',
  },
};

class DraftEditor extends Component {
  constructor(props) {
  super(props);
  this.state = {
    editorState: EditorState.createEmpty(),
  };
}

onEditorStateChange: Function = (editorState) => {
  this.logStateChange(editorState.getCurrentContent())
  this.setState({
    editorState,
  });
};

logStateChange = debounce((editorState) => {
  const rawState = convertToRaw(editorState)
  // console.log(rawState)
  console.table(rawState.blocks)
}, 2000)

render() {
  const { editorState } = this.state;
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.onEditorStateChange}
      toolbarCustomButtons={[<UrgentQuick />, <UrgentSlow />, <NotUrgentSlow />, <NotUrgentQuick />]}
      customStyleMap={styleMap}
      toolbar={{
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'link', 'emoji', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    // bold: { icon: bold, className: undefined },
    // italic: { icon: italic, className: undefined },
    // underline: { icon: underline, className: undefined },
    // strikethrough: { icon: strikethrough, className: undefined },
    // monospace: { icon: monospace, className: undefined },
    // superscript: { icon: superscript, className: undefined },
    // subscript: { icon: subscript, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code', 'Urgent'],
    // options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },

  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  // history: { inDropdown: true },
}}
    />
  )
}

}

export default DraftEditor;
