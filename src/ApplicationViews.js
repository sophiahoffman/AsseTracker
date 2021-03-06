// @authored by Sophia Hoffman

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PersonalPropertyList from './components/personalProperty/PersonalPropertyList';
import PersonalPropertyAdd from './components/personalProperty/PersonalPropertyAdd';
import PersonalPropertyDisposal from './components/personalProperty/PersonalPropertyDisposal';
import PersonalPropertyEdit from './components/personalProperty/PersonalPropertyEdit';
import PersonalPropertyDetail from './components/personalProperty/PersonalPropertyDetail';
import VehiclesList from './components/vehicles/VehicleList';
import VehiclesAdd from './components/vehicles/VehiclesAdd';
import VehiclesDisposal from './components/vehicles/VehiclesDisposal';
import VehiclesEdit from './components/vehicles/VehiclesEdit';
import VehiclesDetail from './components/vehicles/VehiclesDetail';
import RealEstateList from './components/realEstate/RealEstateList';
import RealEstateAdd from './components/realEstate/RealEstateAdd';
import RealEstateDisposal from './components/realEstate/RealEstateDisposal';
import RealEstateEdit from './components/realEstate/RealEstateEdit';
import RealEstateDetail from './components/realEstate/RealEstateDetail';
import WelcomeAsseTracker from './components/welcomeAsseTracker/WelcomeAsseTracker';
import Login from './components/loginRegister/Login';
import Register from './components/loginRegister/Register';
import EntryPortal from './components/loginRegister/EntryPortal';


class ApplicationViews extends Component {

    render() {
        return (
          <React.Fragment>
            <Route
              exact path="/" render={props => {
                if (this.props.isAuthenticated()) {
                  return <WelcomeAsseTracker {...props} />
                  } else 
                  return <EntryPortal {...props} />
              }}
            />

    
            <Route
              exact path="/login" render={props => {
                if (this.props.isAuthenticated()) {
                  return <WelcomeAsseTracker {...props} />
                } else if (sessionStorage.getItem("email")) {
                  return <Login {...this.props} />
                } else {
                  return <EntryPortal {...props} />
                }
              }}
            />
              
            <Route
              exact path="/register" render={props => {
                if (this.props.isAuthenticated()) {
                  return <WelcomeAsseTracker {...props} />
                } else if (sessionStorage.getItem("email")) {
                  return <Register {...this.props} />
                } else {
                  return <EntryPortal {...props} />
                }
              }}
            />

            <Route
              exact path="/welcome" render={props => {
                if (this.props.isAuthenticated()) { 
                  return <WelcomeAsseTracker {...props} />
              } else {
                return <EntryPortal {...props} />
              }}}
            />


            <Route
              exact path="/vehicles" render={props => {
                if (this.props.isAuthenticated()) {
                  return <VehiclesList {...props}/>
                } else {
                  return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/vehicles/:vehicleId(\d+)/edit" render={props => {
                if (this.props.isAuthenticated()) {
                  return (
                  <VehiclesEdit 
                  {...props} 
                  />
                  )
                } else {
                return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/vehicles/:vehicleId(\d+)" render={props => {
                if (this.props.isAuthenticated()) {
                  return (<VehiclesDetail 
                  {...props} 
                  />
                  )
                } else {
                return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/vehicles/:vehicleId(\d+)/disposal" render={props => {
                if (this.props.isAuthenticated()) {
                  return <VehiclesDisposal {...props} />
                } else {
                return  <Redirect to="/" />
                }
              }}
            />

                
            <Route
              exact path="/vehicles/new" render={props => {
                if (this.props.isAuthenticated()) {
                  return <VehiclesAdd {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />

            <Route
              exact path="/personalproperty" render={props => {
                if (this.props.isAuthenticated()) {
                  return <PersonalPropertyList {...props} />
                } 
                else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/personalproperty/:personalPropertyId(\d+)/edit" render={props => {
                if (this.props.isAuthenticated()) {
                  return <PersonalPropertyEdit {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/personalproperty/:personalPropertyId(\d+)" render={props => {
                if (this.props.isAuthenticated()) {
                  return <PersonalPropertyDetail {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/personalproperty/:personalPropertyId(\d+)/disposal" render={props => {
                if (this.props.isAuthenticated()) {
                  return <PersonalPropertyDisposal {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />

                
            <Route
              exact path="/personalproperty/new" render={props => {
                if (this.props.isAuthenticated()) {
                  return <PersonalPropertyAdd {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />

            <Route
              exact path="/realestate" render={props => {
                if (this.props.isAuthenticated()) {
                  return <RealEstateList {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/realestate/:realEstateId(\d+)/edit" render={props => {
                if (this.props.isAuthenticated()) {
                  return <RealEstateEdit {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/realestate/:realEstateId(\d+)" render={props => {
                if (this.props.isAuthenticated()) {
                  return <RealEstateDetail {...props}
                  />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
    
            <Route
              exact path="/realEstate/:realEstateId(\d+)/disposal" render={props => {
                if (this.props.isAuthenticated()) {
                  return <RealEstateDisposal {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />

                
            <Route
              exact path="/realestate/new" render={props => {
                if (this.props.isAuthenticated()) {
                  return <RealEstateAdd {...props} />
                } else {
                 return <Redirect to="/" />
                }
              }}
            />
        </ React.Fragment>
      )
    }
}

export default ApplicationViews