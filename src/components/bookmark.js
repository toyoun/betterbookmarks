import React, { Component } from 'react';
import './bookmark.css';

class Bookmark extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.addBookmark(this.props.node);
  }

  handleClick() {
    window.open(this.props.node.url, "_self", false);
  }

  render() {

    return (
      <div id={this.props.node.id} className="bookmark" onClick={this.handleClick}>
        <p className="bookmark-text">{this.props.node.title}</p>
      </div>
    );
  }
}

export default Bookmark;