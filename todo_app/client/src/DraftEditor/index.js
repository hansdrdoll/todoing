import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
  UrgentQuick,
  UrgentNotQuick,
  NotUrgentQuick,
  NotUrgentNotQuick,
} from './PrioritySetters';
import PriorityMatrix from '../PriorityMatrix';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
          toolbarCustomButtons={[
            <UrgentQuick />,
            <UrgentNotQuick />,
            <NotUrgentQuick />,
            <NotUrgentNotQuick />,
          ]}
          toolbar={{
            options: ['inline', 'list', 'emoji', 'history'],
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
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            // history: { inDropdown: true },
          }}
        />
      </div>
      <div className="matrix">
        <PriorityMatrix editorData={props.rawState} />
      </div>
    </div>
  );
}

export default DraftEditor;
