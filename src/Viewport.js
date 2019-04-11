/*global chrome*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Viewport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      container: []
    }

    this.processTree = this.processTree.bind(this);
    this.processNode = this.processNode.bind(this);
  }

  processNode(n) {
    if (!n.url) {
      this.props.addFolder(n);
      n.children.forEach(this.processNode);
    }
    else {
      this.props.addBookmark(n);
    }
  }

  processTree(i) {
    i.forEach(this.processNode)
  }

  componentDidMount() {
    chrome.bookmarks.getTree(this.processTree);
  }

  render() {
    return (
      <div id="Viewport">
        {this.props.container.map((item) => <p>{JSON.stringify(item)}</p>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    container: state.container
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFolder: (node) => dispatch({ type: "ADD_FOLDER", item: node }),
    addBookmark: (node) => dispatch({ type: "ADD_BOOKMARK", item: node })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewport);