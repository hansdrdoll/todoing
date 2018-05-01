import React, { Component } from 'react';

class PriorityMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorData: {},
    };
  }

  componentDidMount() {
    this.setState({
      editorData: this.props.editorData,
    });
  }

  render() {
    if (this.state.editorData) {
      const cards = this.props.editorData.blocks.map(item => (
        <li key={item.key}>
          {item.data.urgent ? 'U ' : 'u '}
          {item.text}
        </li>
      ));
      const urgentQuickItems = this.props.editorData.blocks
        .filter(item => item.data.urgent && item.data.quick)
        .map(item => <li key={item.key}>{item.text}</li>);

      const urgentNotQuickItems = this.props.editorData.blocks
        .filter(item => item.data.urgent && !item.data.quick)
        .map(item => <li key={item.key}>{item.text}</li>);

      const notUrgentQuickItems = this.props.editorData.blocks
        .filter(item => !item.data.urgent && item.data.quick)
        .map(item => <li key={item.key}>{item.text}</li>);

      const notUrgentNotQuickItems = this.props.editorData.blocks
        .filter(item => !item.data.urgent && !item.data.quick)
        .map(item => <li key={item.key}>{item.text}</li>);

      return (
        <div>
          <h5>Urgent and Quick:</h5>
          {urgentQuickItems}
          <h5>Urgent and Not Quick:</h5>
          {urgentNotQuickItems}
          <h5>Not Urgent and Quick:</h5>
          {notUrgentQuickItems}
          <h5>Not Urgent and Not Quick:</h5>
          {notUrgentNotQuickItems}
        </div>
      );
    }
    return <div>loading</div>;
  }
}

export default PriorityMatrix;
