// @authored by Sophia Hoffman

import React, { Component } from 'react';
import './AsseTracker.css';
import ApplicationViews from './ApplicationViews'
import { withRouter } from 'react-router-dom'
import NavBar from '../src/components/navBar/NavBar'

// localStorage.setItem("userId", 1)

class AsseTracker extends Component {
  state = {
    userEmailAddress: "",
    // userAuthenticated: false,
  }

  // componentDidMount() {
  //   this.setUserState()
  // }

  handleLogout = () => {
    localStorage.clear()
    // this.setState({userAuthenticated: false})
    this.props.history.push('/')
  }

  handleFieldChange = e => {
      const stateToChange = {};
      stateToChange[e.target.id] = e.target.value
      this.setState(stateToChange)
  };

isAuthenticated = () => localStorage.getItem("userId") !== null

// setUserState = () => {
//   console.log("isAuthenticatedAsseTracker", localStorage.getItem("userId") !== null)
//     this.setState({
//       userAuthenticated: this.isAuthenticated(),
//     });
//   }

  render() {
      return (
        <React.Fragment>
          <NavBar 
          {...this.props} 
          isAuthenticated={this.isAuthenticated}
          handleLogout={this.handleLogout} 
          {...this.props} />
          <ApplicationViews 
          {...this.props} 
          isAuthenticated={this.isAuthenticated}
          setUserState={this.setUserState}/>
        </React.Fragment>
      )
    
  }
}

export default withRouter(AsseTracker);
