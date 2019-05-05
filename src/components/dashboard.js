import React, { Component } from 'react';
import { connect } from 'react-redux';
import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div 
        id="dashboard"
        style={this.props.dashboardVisibility}
      >
        <button 
          id="Close-Button"
          onClick={this.props.toggleDashboardVisibility}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboardVisibility: state.dashboardVisibility
  }
}

export default connect(
  mapStateToProps
)(Dashboard);