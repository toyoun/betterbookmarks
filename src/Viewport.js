import React, { Component } from 'react';
import ReactDOM from 'react-don';

class Viewport extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mode: "folders",
      folders: [],
      folderBuf: null
    }
  }

  findParent(node) {
    let folder;

    if (node.id == 0) {
      this.state.folders.push(node);
      return null;
    }

    searchElements(parent) {
      parent.children.forEach(function(child) {
        if (child.children) {
          searchElements(child, node.parentId);

          if (child.id == node.parentId)
            this.setState({
              folderBuf: child
            });
        }
      })

      this.state.folderBuf.listItems.push(node)
    }

    // Retrieve the parent folder by traversing
    // down each element
    this.state.folders.forEach(function(item) {
      folder = searchElements(item)
    });

    return folder;
  }

  appendFolder(node) {
    let parent = findParent(node);

    if (!parent) {
      parent.listItems.push(

      )
    }
    else {
      this.folders.push()
    }
  }

  appendBookmark(node) {
    let parent = findParent(node);
  }

  convertChildToElement(node) {
    if (node.children)
      appendFolder(node);
    if (node.url)
      appendBookmark(node);
  }

  displayNode(node) {
    if (node.children) {
      node.children.forEach(function(child) {
        this.displayNode(child)
      })
    }

    if (node.url) {
      console.log(node);
    }
  }

  displayItems() {
    chrome.bookmarks.getTree(function(tree) {
      tree.forEach(function(node) {
        this.root = node;
        displayNode(node);
      })
    })
  }

  componentDidMount() {
    displayItems();
  }

  render() {
    return this.state.folders;
  }
}

export default Viewport;