import React from 'react';
import _ from 'lodash';
import { Tag } from '@blueprintjs/core';

class PriorityMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTag: 'default',
      hashtag: false,
      hashData: [],
    };
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleTagChange(e, selectedTag) {
    this.setState({ selectedTag, hashtag: false });
  }
  handleHashtag(e, selectedTag) {
    // console.log(selectedTag);
    const hashtagArr = this.props.hashtags.filter(h => h.name === selectedTag);
    this.setState({
      selectedTag: selectedTag,
      hashtag: true,
      hashData: hashtagArr[0].blocks,
    });
  }

  render() {
    const { blocks } = this.props.editorData;
    const isBlank = obj => {
      if (obj.text === '' || obj.text === ' ') {
        return true;
      }
      return false;
    };

    // eslint-disable-next-line
    const blocksWithIndex = blocks.map((block, index) => {
      block.data.lineNumber = index + 1;
    });

    // TODO: maybe theres's a cleaner way to do this...

    const urgentQuickItemsData = blocks.filter(
      item => item.data.urgent && item.data.quick && !isBlank(item)
    );

    const urgentQuickItems = _.orderBy(urgentQuickItemsData, [
      'data.order',
    ]).map(item => (
      <li key={item.key}>
        <span className="lineNum">{item.data.lineNumber}</span>
        {item.text}
      </li>
    ));

    const urgentNotQuickItemsData = blocks.filter(
      item => item.data.urgent && !item.data.quick && !isBlank(item)
    );

    const urgentNotQuickItems = _.orderBy(urgentNotQuickItemsData, [
      'data.order',
    ]).map(item => (
      <li key={item.key}>
        <span className="lineNum">{item.data.lineNumber}</span>
        {item.text}
      </li>
    ));

    const notUrgentQuickItemsData = blocks.filter(
      item => !item.data.urgent && item.data.quick && !isBlank(item)
    );

    const notUrgentQuickItems = _.orderBy(notUrgentQuickItemsData, [
      'data.order',
    ]).map(item => (
      <li key={item.key}>
        <span className="lineNum">{item.data.lineNumber}</span>
        {item.text}
      </li>
    ));

    const notUrgentNotQuickItemsData = blocks.filter(
      item =>
        !item.data.urgent &&
        !item.data.quick &&
        item.data.urgent === false &&
        !isBlank(item)
    );

    const notUrgentNotQuickItems = _.orderBy(notUrgentNotQuickItemsData, [
      'data.order',
    ]).map(item => (
      <li key={item.key}>
        <span className="lineNum">{item.data.lineNumber}</span>
        {item.text}
      </li>
    ));

    const unclassifiedData = blocks.filter(
      item =>
        !isBlank(item) &&
        (item.data.listName === undefined || item.data.unclassified)
    );

    const unclassified = _.orderBy(unclassifiedData, ['data.order']).map(
      item => (
        <li key={item.key}>
          <span className="lineNum">{item.data.lineNumber}</span>
          {item.text}
        </li>
      )
    );

    return (
      <div>
        {this.props.hashtags ? (
          <div>
            <Tag
              interactive
              minimal
              className={
                this.state.selectedTag === 'urgentQuick'
                  ? 'hashtag-button pt-intent-primary'
                  : 'hashtag-button'
              }
              onClick={e => this.handleTagChange(e, 'urgentQuick')}>
              Urgent, Quick
              <span className="tagNum">{urgentQuickItems.length}</span>
            </Tag>
            <Tag
              interactive
              minimal
              className={
                this.state.selectedTag === 'urgentNotQuick'
                  ? 'hashtag-button pt-intent-primary'
                  : 'hashtag-button'
              }
              onClick={e => this.handleTagChange(e, 'urgentNotQuick')}>
              Urgent, Not Quick
              <span className="tagNum">{urgentNotQuickItems.length}</span>{' '}
            </Tag>
            <Tag
              interactive
              minimal
              className={
                this.state.selectedTag === 'notUrgentQuick'
                  ? 'hashtag-button pt-intent-primary'
                  : 'hashtag-button'
              }
              onClick={e => this.handleTagChange(e, 'notUrgentQuick')}>
               Not Urgent, Quick
              <span className="tagNum">{notUrgentQuickItems.length}</span>
            </Tag>
            <Tag
              interactive
              minimal
              className={
                this.state.selectedTag === 'notUrgentNotQuick'
                  ? 'hashtag-button pt-intent-primary'
                  : 'hashtag-button'
              }
              onClick={e => this.handleTagChange(e, 'notUrgentNotQuick')}>
              Not Urgent, Not Quick
              <span className="tagNum">{notUrgentNotQuickItems.length}</span>{' '}
            </Tag>
            {/* <Tag
              interactive
              minimal
              // className="hashtag-button"
              className={this.state.selectedTag === 'unclassified' ? 'hashtag-button pt-intent-primary' : 'hashtag-button'}
              onClick={e => this.handleTagChange(e, 'unclassified')}>
              <span className="tagNum">{unclassified.length}</span> Unclassified
            </Tag> */}
            <div>
              {this.props.hashtags &&
                this.props.hashtags.map((h, i) => {
                  return (
                    <Tag
                      key={i}
                      interactive
                      minimal
                      onClick={e => this.handleHashtag(e, h.name)}
                      className={
                        this.state.selectedTag === h.name
                          ? 'hashtag-button pt-intent-primary'
                          : 'hashtag-button'
                      }>
                      <span className="hashy">#</span>{h.name}<span className="tagNum">{h.blocks.length}</span>
                    </Tag>
                  );
                })}
            </div>
            <div className="tag-results">
              {this.state.hashtag && (
                <div>
                  <ul className="priority-list">
                    {this.state.hashData.map(b => {
                      return (
                        <div key={b.key}>
                          <span className="lineNum">{b.data.lineNumber}</span>
                          <li>{b.text}</li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              )}
              {this.state.selectedTag === 'urgentQuick' && (
                <div>
                  <ul className="priority-list">{urgentQuickItems}</ul>
                </div>
              )}
              {this.state.selectedTag === 'urgentNotQuick' && (
                <div>
                  <ul className="priority-list">{urgentNotQuickItems}</ul>
                </div>
              )}
              {this.state.selectedTag === 'notUrgentQuick' && (
                <div>
                  <ul className="priority-list">{notUrgentQuickItems}</ul>
                </div>
              )}
              {this.state.selectedTag === 'notUrgentNotQuick' && (
                <div>
                  <ul className="priority-list">{notUrgentNotQuickItems}</ul>
                </div>
              )}
              {this.state.selectedTag === 'unclassified' && (
                <div>
                  <ul className="priority-list">{unclassified}</ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default PriorityMatrix;
