import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DroppyArea from './DroppyArea';
import _ from 'lodash';
import orderBy from 'lodash/orderBy';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? '#EBF1F5' : '#F5F8FA',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#D8E1E8' : '#E1E8ED',
  padding: grid,
  // TODO: make this responsive
  // width: 400,
});

class MatrixEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urgentQuick: [],
      urgentNotQuick: [],
      notUrgentQuick: [],
      notUrgentNotQuick: [],
      unclassified: [],
    };
  }

  componentDidMount() {
    const urgentQuickData = this.props.editorData.blocks.filter(
      item => item.data.urgent && item.data.quick
    )
    const urgentQuick = _.orderBy(urgentQuickData, ["data.order"])

    const urgentNotQuickData = this.props.editorData.blocks.filter(
      item => item.data.urgent && !item.data.quick
    );
    const urgentNotQuick = _.orderBy(urgentNotQuickData, ["data.order"])

    const notUrgentQuickData = this.props.editorData.blocks.filter(
      item => !item.data.urgent && item.data.quick
    );
    const notUrgentQuick = _.orderBy(notUrgentQuickData, ["data.order"])

    const notUrgentNotQuickData = this.props.editorData.blocks.filter(
      item =>
        !item.data.urgent && !item.data.quick && item.data.urgent === false
    );
    const notUrgentNotQuick = _.orderBy(notUrgentNotQuickData, ["data.order"])

    const unclassifiedData = this.props.editorData.blocks.filter(
      item => item.data.urgent === undefined
    );
    const unclassified = _.orderBy(unclassifiedData, ["data.order"])

    this.setState({
      urgentQuick,
      urgentNotQuick,
      notUrgentQuick,
      notUrgentNotQuick,
      unclassified,
    });
  }

  setDataBooleans(item, listName) {
    switch (listName) {
      case 'urgentQuick':
        item.data = {
          listName,
          urgent: true,
          quick: true,
        }
        break;
      case 'urgentNotQuick':
      item.data = {
        listName,
        urgent: true,
        quick: false,
      }
        break;
      case 'notUrgentQuick':
      item.data = {
        listName,
        urgent: false,
        quick: true,
      }
        break;
      case 'notUrgentNotQuick':
      item.data = {
        listName,
        urgent: false,
        quick: false,
      }
        break;
      default:
        item.data = {
          unclassified: true,
        }
    }
    return item;
  }

  reorder(list, startIndex, endIndex) {
    const result = this.state[list];
    const [removed] = result.splice(startIndex, 1);
    // put it back in the right place
    result.splice(endIndex, 0, removed);
    // TODO: find a better way assign order values, maybe with floats
    result.forEach((item, index) => {
      item.data.order = index;
    });
    this.props.updateEditorData(this.props.editorData);
    // return new array
    return result;
  }

  move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = this.state[source];
    const destClone = this.state[destination];
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const renamed = this.setDataBooleans(removed, droppableDestination.droppableId);
    destClone.splice(droppableDestination.index, 0, renamed);
    destClone.forEach((item, index) => {
      item.data.order = index;
    });

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    this.props.updateEditorData(this.props.editorData);
    return result;
  }

  onDragEnd = result => {
    const { source, destination } = result;
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
        // selected: result.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="priority-grid">
          <div className="droppy-area-container urgent-quick">
            <h4>Urgent, Quick</h4>
            <DroppyArea
              areaId={'urgentQuick'}
              grid={grid}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              items={this.state.urgentQuick}
              specialClass="droppy-area pt-card"
            />
          </div>
          <div className="droppy-area-container urgent-not-quick">
            <h4>Urgent, Not Quick</h4>
            <DroppyArea
              areaId={'urgentNotQuick'}
              grid={grid}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              items={this.state.urgentNotQuick}
              specialClass="droppy-area pt-card"
            />
          </div>
          <div className="droppy-area-container not-urgent-quick">
            <h4>Not Urgent, Quick</h4>
            <DroppyArea
              areaId={'notUrgentQuick'}
              grid={grid}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              items={this.state.notUrgentQuick}
              specialClass="droppy-area pt-card"
            />
          </div>
          <div className="droppy-area-container not-urgent-not-quick">
            <h4>Not Urgent, Not Quick</h4>
            <DroppyArea
              areaId={'notUrgentNotQuick'}
              grid={grid}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              items={this.state.notUrgentNotQuick}
              specialClass="droppy-area pt-card"
            />
          </div>
          <div className="droppy-area-container unclassified">
            <h4>Unclassified</h4>
            <DroppyArea
              areaId={'unclassified'}
              grid={grid}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              items={this.state.unclassified}
              specialClass="middle-droppy-area droppy-area pt-card"
            />
          </div>
          {/* <b className="empty-row" /> */}
          {/* <b className="empty-column" /> */}
        </div>
      </DragDropContext>
    );
  }
}

// Put the things into the DOM!
export default MatrixEditor;
