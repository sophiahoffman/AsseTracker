// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import APIManager from '../../modules/APIManager'
import './Login.css'
import '../../AsseTracker.css'

// Login allows user to enter in password and compares entered password to password in users table to determine if user can log in. If login is successful, user is redirected to WelcomeAsseTracker page.

class Login extends Component {
    state = {
        userEmailAddress: sessionStorage.getItem("email"),
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
            console.log(result)
            if (result[0].password === this.state.userPassword) {
                sessionStorage.setItem("userId", result[0].id)
                this.props.history.push('/')
                return this.props.isAuthenticated()
            } else {
                window.alert('User email and password do not match')
                this.setState({loadingStatus: false})
            }
        })
    }

    render() {
        return (
            <div className="new-form">
                <Form.Group className="col-md-8 entry-portal-fields">
                <Form.Label className="row-sm-2 row-form-label">Enter Your Password</Form.Label>
                    <Form.Control class="entry-portal-field" autoFocus type="password" id="userPassword" onChange={this.handleFieldChange} />
                </Form.Group>
                
                <div className="button-div">
                    <Button class="entry-portal-field" variant="secondary" type="button" disabled={this.state.loadingStatus} onClick={this.validateUserLogin}>Submit
                    </Button>
                    <Button class="entry-portal-field" variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.handleLogout}>Cancel
                    </Button>
                </div>
            </div>
        )
    }
  
}

export default Login
