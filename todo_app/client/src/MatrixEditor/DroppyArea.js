import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggyThing from './DraggyThing';

function DroppyArea(props) {
  return (
    <Droppable droppableId={props.areaId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="droppy-area"
          style={props.getListStyle(snapshot.isDraggingOver)}>
          {props.items.map((item, index) => (
            <DraggyThing
              grid={props.grid}
              getItemStyle={props.getItemStyle}
              index={index}
              item={item}
              key={('_', item.key)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
export default DroppyArea;
