import React, { Component } from 'react';
import './bookmark.css';

class Bookmark extends Component {
  componentDidMount() {
    this.props.addBookmark(this.props.node);
  }

  render() {
    return (
      <div id={this.props.node.id} className="bookmark">
        <a href={this.props.node.url} className="bookmark-text">{this.props.node.title}</a>
      </div>
    );
  }
}

export default Bookmark;