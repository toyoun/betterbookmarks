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
          updateFolder={this.props.updateFolder}
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
    this.tempStyle = {
      top: this.props.node.top - event.clientY,
      left: this.props.node.left - event.clientX
    };
  }

  updateLocation(event) {
    return { 
      ...this.props.node, 
      top: this.tempStyle.top + event.clientY,
      left: this.tempStyle.left + event.clientX
    };
  }

  handleDrag(event) {
    event.preventDefault();

    if (this.tempStyle) {
      this.props.node = this.updateLocation(event);
    }
  }
  
  handleDrop(event) {
    let newNode = this.updateLocation(event);

    this.props.updateFolder(newNode);

    chrome.storage.local.set({
      "key": this.props.rootFolders
    });
  }

  componentDidCatch(error, info) {
    console.log(error + info);
  }

  componentDidUpdate(prevProps) {
    if (this.props.node !== prevProps.node) {
      this.style = {
        top: this.props.node.top,
        left: this.props.node.left,
        width: this.props.node.width,
        height: this.props.node.height
      }
    }
  }

  componentDidMount() {
    this.props.addFolder(this.props.node);
  }

  render() {
    this.style = {
      top: this.props.node.top,
      left: this.props.node.left,
      width: this.props.node.width,
      height: this.props.node.height
    };

    return (
      <div 
        id={this.props.node.id} 
        className="folder"
        style={this.style}
      >
        <h2 
          className="folder-name"
          onDragStart={this.handleClick}
          onDragEnter={this.handleDrag}
          onDragOver={this.handleDrop}
          onDragEnd={this.handleDrop}
          draggable
        >
          {this.props.node.title}
        </h2>
        <div className="folder-items">
          {this.props.node.children.map(this.retrieveChildren)}
        </div>
        <div 
          className="resize-button"
        ></div>
      </div>
    );
  }
}

export default Folder;