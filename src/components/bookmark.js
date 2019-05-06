/*global chrome*/
import React, { Component } from 'react';
import './bookmark.css';
import { connect } from 'react-redux';

class Bookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: ""
    }

    this.saveShortcuts = this.saveShortcuts.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.displayShortcut = this.displayShortcut.bind(this);
  }

  displayShortcut(nodes) {
    if (nodes && nodes.shortcuts) {
      nodes.shortcuts.forEach((shortcut) => {
        if (shortcut.id === this.props.node.id) {
          this.setState({
            label: shortcut.key
          })
        }
      })
    }
  }

  componentDidMount() {
    this.props.addBookmark(this.props.node);

    chrome.storage.local.get("shortcuts", this.displayShortcut);
  }

  saveShortcuts() {
    chrome.storage.local.set({
      "shortcuts": this.props.shortcuts
    });
  }

  handleClick() {
    this.saveShortcuts();
    window.open(this.props.node.url, "_self", false);
  }

  handleEnter(e) {
    if (e.which === 13) {
      this.setState({
        label: e.target.value
      })

      if (e.target.value) {
        this.props.addShortcut({ key: e.target.value, url: this.props.node.url, id: this.props.node.id });
      }
      else {
        this.props.removeShortcut({ id: this.props.node.id });
      }

      this.saveShortcuts();
    }
  }

  render() {
    return (
      <div id={this.props.node.id} className="bookmark">
        <p className="bookmark-text" onClick={this.handleClick}>{this.props.node.title}</p>
        <div>
          <label 
            className="bookmark-shortcut-label" 
            for={this.props.node.id}
          >
            {this.state.label}
          </label>
          <input 
            type="text" 
            name={this.props.node.id} 
            className="bookmark-shortcut-input"
            maxLength="1"
            size="1"
            onKeyUp={this.handleEnter}
          ></input>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shortcuts: state.shortcuts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addShortcut: (shortcut) => dispatch({ type: "ADD_SHORTCUT", item: shortcut }),
    removeShortcut: (shortcut) => dispatch({ type: "DEL_SHORTCUT", item: shortcut })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bookmark);