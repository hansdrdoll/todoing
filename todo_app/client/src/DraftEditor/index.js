import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
  UrgentSlow,
  UrgentQuick,
  NotUrgentSlow,
  NotUrgentQuick,
} from './PrioritySetters';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function DraftEditor(props) {
  return (
    <Editor
      editorState={props.editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={props.onChange}
      toolbarCustomButtons={[
        <UrgentQuick />,
        <UrgentSlow />,
        <NotUrgentQuick />,
        <NotUrgentSlow />,
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
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        // history: { inDropdown: true },
      }}
    />
  );
}

export default DraftEditor;
