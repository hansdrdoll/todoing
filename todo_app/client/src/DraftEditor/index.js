import React from 'react';
import { Editor, EditorBlock, EditorState } from 'react-draft-wysiwyg';
import {
  UrgentQuick,
  UrgentNotQuick,
  NotUrgentQuick,
  NotUrgentNotQuick,
} from './PrioritySetters';
import PriorityMatrix from '../PriorityMatrix';
// import Line from '../Line';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function DraftEditor(props) {
  // const blockRendererFn = () => ({
  //   component: Line,
  // });

  return (
    <div className="main">
      <div className="ugly-line-numbers">
        <ol className="ugly-ordered-list">
          {[
            ...Array(props.editorState.getCurrentContent().getBlockMap().size),
          ].map((x, i) => (
            <li key={i} style={{ listStylePosition: 'inside' }} />
          ))}
        </ol>
        <div className="editor" style={{ flex: 1 }}>
          <Editor
            toolbarOnFocus
            editorState={props.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={props.onChange}
            // blockRendererFn={blockRendererFn}
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
              // textAlign: { inDropdown: true },
              // link: { inDropdown: true },
              // history: { inDropdown: true },
            }}
          />
        </div>
      </div>

      <div className="matrix">
        <PriorityMatrix editorData={props.rawState} />
      </div>
    </div>
  );
}

export default DraftEditor;
