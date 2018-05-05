import React from 'react';
import { EditorBlock } from 'react-draft-wysiwyg';

function Line(props) {
  const { block, contentState } = props;
  const lineNumber =
    contentState
      .getBlockMap()
      .toList()
      .findIndex(item => item.key === block.key) + 1;
  return (
    // <div className="line">
    <div className="line" data-line-number={lineNumber}>
      <div className="line-text">
        <EditorBlock {...props} />
      </div>
    </div>
  );
}

export default Line;
