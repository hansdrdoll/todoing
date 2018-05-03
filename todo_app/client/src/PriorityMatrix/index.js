import React from 'react';

function PriorityMatrix(props) {
  const isBlank = obj => {
    if (obj.text === '' || obj.text === ' ') {
      return true;
    }
    return false;
  };

  const urgentQuickItems = props.editorData.blocks
    .filter(item => item.data.urgent && item.data.quick && !isBlank(item))
    .map(item => <li key={item.key}>{item.text}</li>);

  const urgentNotQuickItems = props.editorData.blocks
    .filter(item => item.data.urgent && !item.data.quick && !isBlank(item))
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentQuickItems = props.editorData.blocks
    .filter(item => !item.data.urgent && item.data.quick && !isBlank(item))
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentNotQuickItems = props.editorData.blocks
    .filter(
      item =>
        !item.data.urgent &&
        !item.data.quick &&
        item.data.urgent === false &&
        !isBlank(item)
    )
    .map(item => <li key={item.key}>{item.text}</li>);

  const unclassified = props.editorData.blocks
    .filter(
      item =>
        !isBlank(item) &&
        (item.data.listName === undefined || item.data.unclassified)
    )
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
      <h5>Unclassified</h5>
      {unclassified}
    </div>
  );
}

export default PriorityMatrix;
