import React, { Component } from 'react';
import logo from './logo.svg';
import './AsseTracker.css';
import { Modal, Button } from 'react-bootstrap';
import ApplicationViews from './ApplicationViews'

localStorage.setItem("userId", 1)
class AsseTracker extends Component {
  render() {
      return <ApplicationViews {...this.props} />
  }
}

export default AsseTracker;
