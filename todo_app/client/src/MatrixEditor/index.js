import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggyThing from './DraggyThing';
import DroppyArea from './DroppyArea';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

class MatrixEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urgentQuickItems: [],
      urgentNotQuickItems: [],
      notUrgentQuickItems: [],
      notUrgentNotQuickItems: [],
      unclassifiedItems: [],
    };
  }

  componentDidMount() {
    const urgentQuickItems = this.props.editorData.blocks.filter(
      item => item.data.urgent && item.data.quick
    );

    const urgentNotQuickItems = this.props.editorData.blocks.filter(
      item => item.data.urgent && !item.data.quick
    );

    const notUrgentQuickItems = this.props.editorData.blocks.filter(
      item => !item.data.urgent && item.data.quick
    );

    const notUrgentNotQuickItems = this.props.editorData.blocks.filter(
      item =>
        !item.data.urgent && !item.data.quick && item.data.urgent === false
    );

    const unclassifiedItems = this.props.editorData.blocks.filter(
      item => item.data.urgent === undefined
    );

    this.setState({
      urgentQuickItems,
      urgentNotQuickItems,
      notUrgentQuickItems,
      notUrgentNotQuickItems,
      unclassifiedItems,
    });
  }

  reorder(list, startIndex, endIndex) {
    const result = this.state[list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = this.state[source];
    const destClone = this.state[destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

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

      // maybe not necessary?
      // if (source.droppableId === 'droppable2') {
      //     state = { selected: items };
      // }

      this.setState({ [droppableId]: items });
    } else {
      const result = this.move(
        source.droppableId,
        destination.droppableId,
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DroppyArea
          areaId={"urgentQuickItems"}
          grid={grid}
          getListStyle={getListStyle}
          getItemStyle={getItemStyle}
          items={this.state.urgentQuickItems}
        />
        <br />
        <DroppyArea
          areaId={"urgentNotQuickItems"}
          grid={grid}
          getListStyle={getListStyle}
          getItemStyle={getItemStyle}
          items={this.state.urgentNotQuickItems}
        />
        <br />
        <DroppyArea
          areaId={"notUrgentQuickItems"}
          grid={grid}
          getListStyle={getListStyle}
          getItemStyle={getItemStyle}
          items={this.state.notUrgentQuickItems}
        />
        <br />
        <DroppyArea
          areaId={"notUrgentNotQuickItems"}
          grid={grid}
          getListStyle={getListStyle}
          getItemStyle={getItemStyle}
          items={this.state.notUrgentNotQuickItems}
        />
        <br />
        <DroppyArea
          areaId={"unclassifiedItems"}
          grid={grid}
          getListStyle={getListStyle}
          getItemStyle={getItemStyle}
          items={this.state.unclassifiedItems}
        />
      </DragDropContext>
    );
  }
}

// Put the things into the DOM!
export default MatrixEditor;
