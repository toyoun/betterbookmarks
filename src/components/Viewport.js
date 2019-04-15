/*global chrome*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Folder from './folder';
import './Viewport.css';

class Viewport extends Component {
  constructor(props) {
    super(props);

    this.grabStorageValues = this.grabStorageValues.bind(this);
    this.processTree = this.processTree.bind(this);
    this.processRoot = this.processRoot.bind(this);
    this.processChild = this.processChild.bind(this);
  }

  grabStorageValues(nodes) {
    if (nodes && nodes.key) {
      nodes.key.forEach(folder => this.props.updateFolderPos(folder));
    }
  }

  processChild(c) {
    if (c.children) {
      this.props.addRootFolder({ ...c, top: 0, left: 0 })
    }
  }

  processRoot(n) {
    n.children.forEach(this.processChild);

    chrome.storage.local.get("key", this.grabStorageValues);
  }

  processTree(i) {
    i.forEach(this.processRoot)
  }

  componentDidMount() {
    chrome.bookmarks.getTree(this.processTree);
  }

  render() {
    return (
      <div id="Viewport">
        {this.props.rootFolders.map((folder) => (
          <Folder 
            node={folder} 
            rootFolders={this.props.rootFolders}
            updateFolderPosition={this.props.updateFolderPos}
            addFolder={this.props.addFolder}
            addBookmark={this.props.addBookmark}
          />))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootFolders: state.rootFolders,
    folders: state.folders,
    bookmarks: state.bookmarks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFolderPos: (node) => dispatch({ type: "UPDATE_FOLDER_POS", item: node }),
    addRootFolder: (node) => dispatch({ type: "ADD_ROOT_FOLDER", item: node }),
    addFolder: (node) => dispatch({ type: "ADD_FOLDER", item: node }),
    addBookmark: (node) => dispatch({ type: "ADD_BOOKMARK", item: node })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewport);