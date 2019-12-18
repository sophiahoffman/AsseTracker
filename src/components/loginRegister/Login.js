// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import APIManager from '../../modules/APIManager'

// Login allows user to enter in password and compares entered password to password in users table to determine if user can log in. If login is successful, user is redirected to WelcomeAsseTracker page.

class Login extends Component {
    state = {
        userEmailAddress: localStorage.getItem("email"),
        userPassword: "",
        loadingStatus: false,
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    validateUserLogin = () => {
        this.setState({loadingStatus: true})
        APIManager.get(`users?email=${this.state.userEmailAddress}`)
        .then(result => {
            if (result[0].password === this.state.userPassword) {
                localStorage.setItem("userId", result[0].id)
                this.props.history.push('/')
                return this.props.isAuthenticated()
            } else {
                window.alert('User email and password do not match')
            }
        })
    }

    render() {
        return (
            <div>
                <Form>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="col-sm-2 col-form-label">Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" id="userPassword" onChange={this.handleFieldChange} />
                </Form.Group>
                </Form>
                <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.validateUserLogin}>Submit
                </Button>
                <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                onClick={this.props.handleLogout}>Cancel
                </Button>
            </div>
        )
    }
  
}

export default Login
