import React from 'react';
import { Editor, EditorBlock, EditorState } from 'react-draft-wysiwyg';
import {
  UrgentQuick,
  UrgentNotQuick,
  NotUrgentQuick,
  NotUrgentNotQuick,
} from './PrioritySetters';
import PriorityMatrix from '../PriorityMatrix';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function myBlockStyleFn(contentBlock) {
  return 'ugly-list';
}

function DraftEditor(props) {
  return (
    <div className="main">
      <div className="editor">
        <Editor
          toolbarOnFocus
          editorState={props.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={props.onChange}
          blockStyleFn={myBlockStyleFn}
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
      </div>
      <div className="matrix">
        <PriorityMatrix editorData={props.rawState} />
      </div>
    </div>
  );
}

export default DraftEditor;
