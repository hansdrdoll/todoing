import React from 'react';
import _ from 'lodash';
import orderBy from 'lodash/orderBy';

function PriorityMatrix(props) {
  const { blocks } = props.editorData;

  const isBlank = obj => {
    if (obj.text === '' || obj.text === ' ') {
      return true;
    }
    return false;
  };

  // TODO: maybe theres's a cleaner way to do this...

  const urgentQuickItemsData = blocks
    .filter(item => item.data.urgent && item.data.quick && !isBlank(item))

  const urgentQuickItems = _.orderBy(urgentQuickItemsData, ['data.order'])
    .map(item => <li key={item.key}>{item.text}</li>);

  const urgentNotQuickItemsData = blocks
    .filter(item => item.data.urgent && !item.data.quick && !isBlank(item))

  const urgentNotQuickItems = _.orderBy(urgentNotQuickItemsData, ['data.order'])
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentQuickItemsData = blocks
    .filter(item => !item.data.urgent && item.data.quick && !isBlank(item));

  const notUrgentQuickItems = _.orderBy(notUrgentQuickItemsData, ['data.order'])
    .map(item => <li key={item.key}>{item.text}</li>);

  const notUrgentNotQuickItemsData = blocks
    .filter(item =>
      !item.data.urgent &&
      !item.data.quick &&
      item.data.urgent === false &&
      !isBlank(item));

  const notUrgentNotQuickItems = _.orderBy(notUrgentNotQuickItemsData, ['data.order'])
    .map(item => <li key={item.key}>{item.text}</li>);

  const unclassifiedData = blocks
    .filter(item =>
      !isBlank(item) &&
      (item.data.listName === undefined || item.data.unclassified));

  const unclassified = _.orderBy(unclassifiedData, ['data.order'])
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
