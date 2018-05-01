import React from 'react';

function PriorityMatrix(props) {
  const cards = props.editorData.blocks.map(item => (
    <li key={item.key}>
      {item.data.urgent ? 'U ' : 'u '}
      {item.text}
    </li>
  ));
  const urgentQuickItems = props.editorData.blocks
    .filter(item => item.data.urgent && item.data.quick)
    .map(item => <li key={item.key}>{item.text}</li>);

  const urgentNotQuickItems = props.editorData.blocks
    .filter(item => item.data.urgent && !item.data.quick)
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentQuickItems = props.editorData.blocks
    .filter(item => !item.data.urgent && item.data.quick)
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentNotQuickItems = props.editorData.blocks
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

export default PriorityMatrix;
