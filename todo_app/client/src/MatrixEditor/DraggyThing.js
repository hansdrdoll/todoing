import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function DraggyThing(props) {
  const { item, index, getItemStyle } = props;
  return (
    <Draggable key={item.key} draggableId={item.key} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {item.text}
        </div>
      )}
    </Draggable>
  );
}

export default DraggyThing;
