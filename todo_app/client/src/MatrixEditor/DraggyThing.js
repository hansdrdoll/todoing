import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function DraggyThing(props) {
  const { item, index, getItemStyle } = props;
  return (
    <Draggable key={item.key} draggableId={item.key} index={index}>
      {(provided, snapshot) => (
        <div
          // className="pt-card pt-elevation-0"
          className="draggy-thing"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <span className="lineNumTag pt-tag pt-minimal">{item.data.lineNumber}</span>{item.text}
        </div>
      )}
    </Draggable>
  );
}

export default DraggyThing;
