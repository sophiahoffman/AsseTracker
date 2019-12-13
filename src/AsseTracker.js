// @authored by Sophia Hoffman

import React, { Component } from 'react';
import './AsseTracker.css';
import ApplicationViews from './ApplicationViews'
import { Redirect } from 'react-router-dom'
import NavBar from '../src/components/navBar/NavBar'

// localStorage.setItem("userId", 1)

class AsseTracker extends Component {
  state = {
    userEmailAddress: "",
    userAuthenticated: false,
  }

  componentDidMount() {
    this.setUserState()
    // this.setState({loadingStatus: false})
  }

  handleLogout = () => {
    localStorage.clear()
    this.setUserState()
    return <Redirect to="/" />
  }

  handleFieldChange = e => {
      const stateToChange = {};
      stateToChange[e.target.id] = e.target.value
      this.setState(stateToChange)
  };

  setUserState = () => {
    if (localStorage.getItem("userId")) {
      this.setState({userAuthenticated: true})  
    } else {
      this.setState({userAuthenticated: false})
    }
  }

  render() {
      return (
        <React.Fragment>
          <NavBar 
          {...this.props} 
          userAuthenticated={this.state.userAuthenticated}
          handleLogout={this.handleLogout} 
          {...this.props} />
          <ApplicationViews 
          {...this.props} 
          userAuthenticated={this.state.userAuthenticated}
          setUserState={this.setUserState}/>
        </React.Fragment>
      )
    
  }
}

export default AsseTracker;
