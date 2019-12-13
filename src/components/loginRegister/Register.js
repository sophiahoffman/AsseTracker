// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import APIManager from '../../modules/APIManager'

// Register is designed to take username and password with double entry to verify and then post the new user to the users table

class Register extends Component {
    state = {
        userEmailAddress: localStorage.getItem("email"),
        userPassword: "",
        userPassword2: "",
        userName: "",
        loadingStatus: false,
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    createUser = () => {
        this.setState({loadingStatus: true})

        if (this.state.userName === "" || this.state.userPassword === "" || this.state.userPassword2 === "") {
            window.alert("Please complete all fields")
        } else if (this.state.userPassword === this.state.userPassword2) {

            const newUser = {
                userName: this.state.userName,
                userPassword: this.state.userPassword,
                userEmailAddress: this.state.userEmailAddress
            }
            APIManager.post(`users`, newUser)
            .then(result => {
                this.props.history.push('/welcome')
                localStorage.setItem("userId", result.id)
                this.props.setUserState()
            })       
        } else {

            window.alert("Passwords do not match")
        }             
    }

    render() {
        return (
            <div>
                <header align="center">
                <h2>hello {this.state.userEmailAddress}</h2>
                <h2>Please enter the following information to create an account and access</h2>
                <h3>AsseTracker</h3>
                </header>
                <Form>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="col-sm-2 col-form-label">Enter User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" id="userName" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="col-sm-2 col-form-label">Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" id="userPassword" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="col-sm-2 col-form-label">Enter Password Again</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" id="userPassword2" onChange={this.handleFieldChange} />
                </Form.Group>
                </Form>
                <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.createUser}>Submit
                </Button>
            </div>
        )
    }
  
}

export default Register