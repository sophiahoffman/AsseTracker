// @authored by Sophia Hoffman

import React, { Component } from 'react';
import './AsseTracker.css';
import ApplicationViews from './ApplicationViews'
import { withRouter } from 'react-router-dom'
import NavBar from '../src/components/navBar/NavBar'

// localStorage.setItem("userId", 1)

class AsseTracker extends Component {

  handleLogout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  isAuthenticated = () => localStorage.getItem("userId") !== null

  render() {
      return (
        <React.Fragment>
          <div className="navBar">
          <NavBar 
          {...this.props} 
          isAuthenticated={this.isAuthenticated}
          handleLogout={this.handleLogout} 
           />
           </div>
           <div className="applicationViews">
          <ApplicationViews 
          {...this.props} 
          isAuthenticated={this.isAuthenticated} 
          handleLogout={this.handleLogout} />
          </div>
        </React.Fragment>
      )
  }
}

export default withRouter(AsseTracker);
