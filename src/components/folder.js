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
    event.nativeEvent.dataTransfer.setData("text/plain",
      this.props.node.top - event.clientY + "," +
      this.props.node.left - event.clientX
    );
    event.stopPropagation();
  }

  handleDrag(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  handleDrop(event) {
    let pos = event.nativeEvent.dataTransfer.getData("text/plain").split(",");

    console.log(pos);

    let newNode = { 
      ...this.props.node, 
      top: event.clientY + parseInt(pos[0], 10), 
      left: event.clientX + parseInt(pos[1], 10)
    };

    console.log(newNode);

    this.props.updateFolderPosition(newNode);
    event.stopPropagation();
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
        onDragOver={this.handleDrag}
        onDrop={this.handleDrop}
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