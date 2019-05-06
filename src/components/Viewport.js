/*global chrome*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Folder from './folder';
import Settings from './settings';
import './Viewport.css';

class Viewport extends Component {
  constructor(props) {
    super(props);

    this.grabStorageValues = this.grabStorageValues.bind(this);
    this.grabShortcuts = this.grabShortcuts.bind(this);
    this.processTree = this.processTree.bind(this);
    this.processRoot = this.processRoot.bind(this);
    this.processChild = this.processChild.bind(this);
    this.handleShortcut = this.handleShortcut.bind(this);
  }

  grabStorageValues(nodes) {
    if (nodes && nodes.folders) {
      nodes.folders.forEach(folder => this.props.updateFolder(folder));
    }
  }

  grabShortcuts(nodes) {
    if (nodes && nodes.shortcuts) {
      nodes.shortcuts.forEach(shortcut => this.props.addShortcut(shortcut));
    }
  }

  processChild(c) {
    if (c.children) {
      this.props.addRootFolder({ ...c, top: 0, left: 0 })
    }
  }

  processRoot(n) {
    n.children.forEach(this.processChild);

    chrome.storage.local.get("folders", this.grabStorageValues);
  }

  processTree(i) {
    i.forEach(this.processRoot)
  }

  handleShortcut(e) {
    console.log(e.key);

    this.props.shortcuts.forEach((shortcut) => {
      if (shortcut.key === e.key) {
        window.open(shortcut.url, "_self", false);
      }
    })
  }

  componentDidMount() {
    chrome.bookmarks.getTree(this.processTree);

    chrome.storage.local.get("shortcuts", this.grabShortcuts);
  }

  render() {
    return (
      <div>
        <div id="Viewport">
          {this.props.rootFolders.map((folder) => (
            <Folder 
              node={folder} 
              rootFolders={this.props.rootFolders}
              updateFolder={this.props.updateFolder}
              addFolder={this.props.addFolder}
              addBookmark={this.props.addBookmark}
            />))
          }
          <Settings />
          <input id="KeyReader" type="text" maxLength="0" onKeyDown={this.handleShortcut}></input>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rootFolders: state.rootFolders,
    folders: state.folders,
    bookmarks: state.bookmarks,
    shortcuts: state.shortcuts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateFolder: (node) => dispatch({ type: "UPDATE_FOLDER", item: node }),
    addRootFolder: (node) => dispatch({ type: "ADD_ROOT_FOLDER", item: node }),
    addFolder: (node) => dispatch({ type: "ADD_FOLDER", item: node }),
    addBookmark: (node) => dispatch({ type: "ADD_BOOKMARK", item: node }),
    addShortcut: (shortcut) => dispatch({ type: "ADD_SHORTCUT", item: shortcut })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewport);