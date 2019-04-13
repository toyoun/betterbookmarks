/*global chrome*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Folder from './folder';

class Viewport extends Component {
  constructor(props) {
    super(props);

    this.processTree = this.processTree.bind(this);
    this.processRoot = this.processRoot.bind(this);
    this.processChild = this.processChild.bind(this);
  }

  processChild(c) {
    if (c.children) {
      this.props.addRootFolder(c);
    }
  }

  processRoot(n) {
    n.children.forEach(this.processChild);
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
    addRootFolder: (node) => dispatch({ type: "ADD_ROOT_FOLDER", item:node }),
    addFolder: (node) => dispatch({ type: "ADD_FOLDER", item: node }),
    addBookmark: (node) => dispatch({ type: "ADD_BOOKMARK", item: node })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewport);