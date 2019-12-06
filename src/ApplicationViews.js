
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Test from './components/Test';



class ApplicationViews extends Component {

    render() {
        return (
          <React.Fragment>
    
            <Route
              exact path="/" render={props => {
                return Test
                // Remove null and return the component which will show news articles
              }}
            />

        </ React.Fragment>

        )


}

export default ApplicationViews