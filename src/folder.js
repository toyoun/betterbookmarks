import React, { Component } from 'react';
import Bookmark from './bookmark';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.retrieveChildren = this.retrieveChildren.bind(this);
    this.searchForFolder = this.searchForFolder.bind(this);
  }

  retrieveChildren(child) {
    if (child.children) {
      return (
        <Folder 
          node={child}
          addFolder={this.props.addFolder}
          addBookmark={this.props.addBookmark}
        />
      );
    }
    else if (child.url) {
      return (
        <Bookmark 
          node={child}
          addBookmark={this.props.addBookmark}
        />
      );
    }
  }

  searchForFolder(node) {
    if (node.id === this.props.node.id) {
      return node;
    }
  }

  componentDidCatch(error, info) {
    console.log(error + info);
  }

  componentDidMount() {
    this.props.addFolder(this.props.node);
  }

  render() {
    return (
      <div id={this.props.node.id} className="folder">
        <p className="folder-name">{this.props.node.title}</p>
        {this.props.node.children.map(this.retrieveChildren)}
      </div>
    );
  }
}

export default Folder;