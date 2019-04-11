import React, { Component } from 'react';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    }
  }

  render() {
    return this.state.items;
  }
}

export default Folder;