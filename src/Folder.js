import React, { Component } from 'react';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: this.props.bookmarks,
    }
  }

  render() {
    return { this.state.bookmarks };
  }
}

export default Folder;