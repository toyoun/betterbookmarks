import React, { Component } from 'react';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
import background from '../assets/background.jpg';

import './settings.css';

class Settings extends Component {
  render() { 
    return (
      <div id="Settings">
        <button 
          name="Settings"
          id="Settings-Button" 
          onClick={this.props.toggleDashboardVisibility}
        />
        <Dashboard 
          toggleDashboardVisibility={this.props.toggleDashboardVisibility}
        />
        <img id="background-img" alt="background" src={background} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleDashboardVisibility: () => dispatch({ type: "TOGGLE_DASHBOARD" })
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Settings);