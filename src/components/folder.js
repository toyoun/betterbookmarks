/*global chrome*/
import React, { Component } from 'react';
import Bookmark from './bookmark';
import './folder.css';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.retrieveChildren = this.retrieveChildren.bind(this);
    this.searchForFolder = this.searchForFolder.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  retrieveChildren(child) {
    if (child.children) {
      return (
        <Folder 
          node={{ ...child, top: 0, left: 0 }}
          updateFolderPosition={this.props.updateFolderPosition}
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

  handleClick(event) {
    this.tempPos = {
      name: 'position',
      top: this.props.node.top - event.clientY,
      left: this.props.node.left - event.clientX
    };
  }

  updateLocation(event) {
    return { 
      ...this.props.node, 
      top: this.tempPos.top + event.clientY,
      left: this.tempPos.left + event.clientX
    };
  }

  handleDrag(event) {
    event.preventDefault();
    this.props.node = this.updateLocation(event);
  }
  
  handleDrop(event) {
    let newNode = this.updateLocation(event);

    this.props.updateFolderPosition(newNode);

    chrome.storage.local.set({
      "key": this.props.rootFolders
    });
  }

  componentDidCatch(error, info) {
    console.log(error + info);
  }

  componentDidUpdate(prevProps) {
    if (this.props.node !== prevProps.node) {
      this.position = {
        top: this.props.node.top,
        left: this.props.node.left
      }
    }
  }

  componentDidMount() {
    this.props.addFolder(this.props.node);
  }

  render() {
    this.position = {
      top: this.props.node.top,
      left: this.props.node.left
    };

    return (
      <div 
        id={this.props.node.id} 
        className="folder"
        style={this.position}
        onDragStart={this.handleClick}
        onDragEnter={this.handleDrag}
        onDragOver={this.handleDrop}
        onDragEnd={this.handleDrop}
        draggable
      >
        <h2 className="folder-name">
          {this.props.node.title}
        </h2>
        <div className="folder-items">
          {this.props.node.children.map(this.retrieveChildren)}
        </div>
      </div>
    );
  }
}

export default Folder;