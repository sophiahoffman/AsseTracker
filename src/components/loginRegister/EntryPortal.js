import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import APIManager from '../../modules/APIManager';

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
        <div>
          <Form>
            <Form.Group className="col-md-12 form-group form-inline">
                <Form.Label className="col-sm-2 col-form-label">Enter Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Email Address" value={this.state.userEmailAddress} id="userEmailAddress" onChange={this.handleFieldChange} />
            </Form.Group>
            </Form>
            <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.validateUserEmail}>Submit
            </Button>
        </div>
      )
    }
  
}

export default EntryPortal