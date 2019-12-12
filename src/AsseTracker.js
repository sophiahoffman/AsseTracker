import React, { Component } from 'react';
import logo from './logo.svg';
import './AsseTracker.css';
import { Form, Button } from 'react-bootstrap';
import ApplicationViews from './ApplicationViews'
import APIManager from './modules/APIManager';
import { Redirect } from 'react-router-dom'

// localStorage.setItem("userId", 1)

class AsseTracker extends Component {
  state = {
    userEmailAddress: "",
    // loadingStatus: true,
    isAuthenticated: false,
  }

  componentDidMount() {
    this.isAuthenticated()
    // this.setState({loadingStatus: false})
  }

  handleFieldChange = e => {
      const stateToChange = {};
      stateToChange[e.target.id] = e.target.value
      this.setState(stateToChange)
  };

  isAuthenticated = () => {
    if (localStorage.getItem("userId")) {
      this.setState({isAuthenticated: true})
    }
  }

  validateUserEmail = () => {
    console.log("I'm running validateUserEmail")
    let userEmail=this.state.userEmailAddress;
    APIManager.get(`users?email=${userEmail}`)
    .then(result => {
      console.log(result)
      console.log(this.props)
      if (result.length>0) {
        return <Redirect to='/login' />
      } else {
        return <Redirect to='/register' />
      }
    })
    // this.setState({loadingStatus: false})
  }


  render() {
      return (
        <ApplicationViews {...this.props} />

      )
    
  }
}

export default AsseTracker;
