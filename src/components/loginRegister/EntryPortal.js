// @authored by Sophia Hoffman

import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import APIManager from '../../modules/APIManager';
import './EntryPortal.css'


// EntryPortal designed to be start to login process - user enters in email address and comparison made to users table to determine if an account has been previously established with that email address. If so, it redirects user to the login page; if not, it redirects to the registration page.

class EntryPortal extends Component {
      
  state = {
    userEmailAddress: "",
    loadingStatus: true,
  }

  handleFieldChange = e => {
      const stateToChange = {};
      stateToChange[e.target.id] = e.target.value
      this.setState(stateToChange)
  };

  validateUserEmail = () => {
    localStorage.setItem("email", this.state.userEmailAddress)
    let userEmail=this.state.userEmailAddress;
    APIManager.get(`users?email=${userEmail}`)
    .then(result => {
      if (result.length>0) {
        this.props.history.push('/login')
      } else {
        this.props.history.push('/register')
      }
    })
    this.setState({loadingStatus: false})
  }


  render() {
      return (
        <>
        <div className="entry-portal-background">
        </div>
        <div className="entry-portal-fields">
          <Form>
            <Form.Group className="col-md-12 form-group form-block">
                <Form.Label className="row-sm-2 row-form-label">Enter Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email Address" value={this.state.userEmailAddress} id="userEmailAddress" onChange={this.handleFieldChange} />
            </Form.Group>
            </Form>
            <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.validateUserEmail}>Submit
            </Button>
        </div>
        </>
      )
    }
  
}

export default EntryPortal