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
      const cards = this.props.editorData.blocks.map(item => <li>{item.text}</li>)
      return (<div>{cards}</div>)
    }
    return (<div>loading</div>)
  }
}

export default PriorityMatrix;
