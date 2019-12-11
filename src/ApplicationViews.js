
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PersonalPropertyList from './components/personalProperty/PersonalPropertyList';
import PersonalPropertyAdd from './components/personalProperty/PersonalPropertyAdd';
import PersonalPropertyDisposal from './components/personalProperty/PersonalPropertyDisposal';
import PersonalPropertyEdit from './components/personalProperty/PersonalPropertyEdit';
import VehiclesList from './components/vehicles/VehiclesList';
import VehiclesAdd from './components/vehicles/VehiclesAdd';
import VehiclesDisposal from './components/vehicles/VehiclesDisposal';
import VehiclesEdit from './components/vehicles/VehiclesEdit';
import RealEstateList from './components/realEstate/RealEstateList';
import RealEstateAdd from './components/realEstate/RealEstateAdd';
import RealEstateDisposal from './components/realEstate/RealEstateDisposal';
import RealEstateEdit from './components/realEstate/RealEstateEdit';
import WelcomeAsseTracker from './components/welcomeAsseTracker/WelcomeAsseTracker';
import Login from './components/loginRegister/Login';
import Register from './components/loginRegister/Register';
import APIManager from './modules/APIManager';


class ApplicationViews extends Component {

    render() {
        return (
          <React.Fragment>
    
            <Route
              exact path="/login" render={props => {
                  return <Login {...props} />
              }}
            />
              
            <Route
              exact path="/register" render={props => {
                  return <Register {...props} />
              }}
            />

            <Route
              exact path="/vehicles" render={props => {
                // if (this.props.user) {
                  return <VehiclesList {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/vehicles/:vehicleId(\d+)/edit" render={props => {
                // if (this.props.userValidated) {
                  return (
                  <VehiclesEdit 
                  {...props} 
                  {...this.props} 
                  />
                  )
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/vehicles/:vehicleId(\d+)/disposal" render={props => {
                // if (this.props.userValidated) {
                  return <VehiclesDisposal {...props} {...this.props}/>
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />

                
            <Route
              path="/vehicles/new" render={props => {
                // if (this.props.userValidated) {
                  return <VehiclesAdd {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />

            <Route
              exact path="/personalProperty" render={props => {
                // if (this.props.userValidated) {
                  return <PersonalPropertyList {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/personalProperty/:personalPropertyId(\d+)/edit" render={props => {
                // if (this.props.userValidated) {
                  return <PersonalPropertyEdit {...props} {...this.props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/personalProperty/:personalPropertyId(\d+)/disposal" render={props => {
                // if (this.props.userValidated) {
                  return <PersonalPropertyDisposal {...props} {...this.props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />

                
            <Route
              path="/personalProperty/new" render={props => {
                // if (this.props.userValidated) {
                  return <PersonalPropertyAdd {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />

            <Route
              exact path="/realEstate" render={props => {
                // if (this.props.userValidated) {
                  return <RealEstateList {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/realEstate/:realEstateId(\d+)/edit" render={props => {
                // if (this.props.userValidated) {
                  return <RealEstateEdit {...props} {...this.props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />
    
            <Route
              path="/realEstate/:realEstateId(\d+)/disposal" render={props => {
                // if (this.props.userValidated) {
                  return <RealEstateDisposal {...props} {...this.props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />

                
            <Route
              path="/realEstate/new" render={props => {
                // if (this.props.userValidated) {
                  return <RealEstateAdd {...props} />
                // } else {
                  // <Redirect to="/" />
                // }
              }}
            />


        </ React.Fragment>
      )
    }


}

export default ApplicationViews