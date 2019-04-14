import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bookmark from './bookmark';
import './folder.css';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.retrieveChildren = this.retrieveChildren.bind(this);
    this.searchForFolder = this.searchForFolder.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);

    let tempPos;
  }

  retrieveChildren(child) {
    if (child.children) {
      return (
        <Folder 
          node={{ ...child, top: 0, left: 0 }}
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

    console.log(this.tempPos);
  }

  handleDrag(event) {
    event.preventDefault();
  }
  
  handleDrop(event) {
    let newNode;

    try {
      newNode = { 
        ...this.props.node, 
        top: this.tempPos.top + event.clientY,
        left: this.tempPos.left + event.clientX
      };
    }
    catch (error) {
      console.log(error);
      return;
    }

    console.log(newNode);

    this.props.updateFolderPosition(newNode);
  }

  componentDidCatch(error, info) {
    console.log(error + info);
  }

  componentDidMount() {
    this.props.addFolder(this.props.node);
  }

  render() {
    let position = {
      top: this.props.node.top,
      left: this.props.node.left
    };

    return (
      <div 
        id={this.props.node.id} 
        className="folder"
        style={position}
        onDragStart={this.handleClick}
        onDragEnter={this.handleDrag}
        onDragOver={this.handleDrop}
        onDragEnd={this.handleDrop}
        draggable
      >
        <h2 className="folder-name">{this.props.node.title}</h2>
        {this.props.node.children.map(this.retrieveChildren)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateFolderPosition: (node) => dispatch({ type: "UPDATE_FOLDER_POS", item: node }),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Folder);