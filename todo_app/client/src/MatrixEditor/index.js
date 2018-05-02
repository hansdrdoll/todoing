import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggyThing from "./DraggyThing";

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//     const result = this.state.list;
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//
//     return result;
// };

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//     // some basic styles to make the items look a bit nicer
//     userSelect: 'none',
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,
//
//     // change background colour if dragging
//     background: isDragging ? 'lightgreen' : 'grey',
//
//     // styles we need to apply on draggables
//     ...draggableStyle
// });

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class MatrixEditor extends Component {
  constructor(props){
    super(props)
    this.state = {
      // editorData: this.props.editorData,
      urgentQuickItems: [],
      urgentNotQuickItems: [],
      notUrgentQuickItems: [],
      notUrgentNotQuickItems: [],
      unclassifiedItems: [],
      // selected: getItems(5, 10)
    };
  }

  componentDidMount(){
    const urgentQuickItems = this.props.editorData.blocks
      .filter(item => item.data.urgent && item.data.quick);

    const urgentNotQuickItems = this.props.editorData.blocks
      .filter(item => item.data.urgent && !item.data.quick);

    const notUrgentQuickItems = this.props.editorData.blocks
      .filter(item => !item.data.urgent && item.data.quick);

    const notUrgentNotQuickItems = this.props.editorData.blocks
      .filter(item => !item.data.urgent && !item.data.quick && item.data.urgent === false);

    const unclassifiedItems = this.props.editorData.blocks
      .filter(item => item.data.urgent === undefined );

      this.setState({
        urgentQuickItems,
        urgentNotQuickItems,
        notUrgentQuickItems,
        notUrgentNotQuickItems,
        unclassifiedItems,
      })
  }

  reorder (list, startIndex, endIndex) {
      const result = this.state[list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
  };
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    // id2List = {
    //     urgentQuickItems: this.state.urgentQuickItems,
    //     urgentNotQuickItems: this.state.urgentNotQuickItems
    // };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        console.log(result);
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
          const { droppableId } = source;
            const items = this.reorder(
                source.droppableId,
                source.index,
                destination.index
            );

            // doesn't this conflict with the above?
            // if (source.droppableId === 'droppable2') {
            //     state = { selected: items };
            // }

            this.setState({ droppableId: items });
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="urgentQuickItems">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.urgentQuickItems.map((item, index) => (
                              <DraggyThing provided={provided} snapshot={snapshot} getItemStyle={this.getItemStyle} index={index} item={item} key={'d',item.key} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {/* <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this.state.selected.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable> */}
            </DragDropContext>
        );
    }
}

// Put the things into the DOM!
export default MatrixEditor;
