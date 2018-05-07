import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import { Button, Card, Elevation } from "@blueprintjs/core";
import { Editor } from 'react-draft-wysiwyg';
import {
  UrgentQuick,
  UrgentNotQuick,
  NotUrgentQuick,
  NotUrgentNotQuick,
} from './PrioritySetters';
import PriorityMatrix from '../PriorityMatrix';

function myBlockStyleFn(contentBlock) {
  return 'ugly-list';
}

function DraftEditor(props) {
  return (
    <div className="main">
      <Card className="editor" elevation={Elevation.ONE}>
        <Editor
          toolbarHidden
          toolbarClassName="editor-toolbar"
          editorState={props.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={props.onChange}
          blockStyleFn={myBlockStyleFn}
          onTab={props.onTab}
          toolbarCustomButtons={[
            <UrgentQuick />,
            <UrgentNotQuick />,
            <NotUrgentQuick />,
            <NotUrgentNotQuick />,
          ]}
          toolbar={{
            options: ['inline', 'emoji', 'history'],
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'monospace',
              ],
            },
          }}
          hashtag={{}}
        />
      </Card>
      <Card className="matrix" elevation={Elevation.ONE}>
        <PriorityMatrix editorData={props.rawState} hashtags={props.hashtags} />
      </Card>
    </div>
  );
}

export default DraftEditor;
