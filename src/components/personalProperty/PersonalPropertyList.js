// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import PersonalPropertyCard from './PersonalPropertyCard';

class PersonalPropertyList extends Component {
    state = {
        personalProperty: [],
        loadingStatus: true
    }

    componentDidMount() {
        this.setPersonalPropertyState()
    }

    setPersonalPropertyState = () => {
        this.setState({loadingStatus: false})
        PersonalPropertyAPIManager.getAllPersonalProperty()
        .then(personalProperty => {
            this.setState({
            personalProperty: personalProperty,
            })
        })
    }
     
    deletePersonalProperty = personalPropertyId => {
        this.setState({loadingStatus: true})        
        PersonalPropertyAPIManager.deletePersonalProperty(personalPropertyId)
        .then(() => this.setPersonalPropertyState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new personalProperty-section-content" align="center">
                    <Button variant="secondary" type="button" className="newPersonalPropertyBtn" onClick={() => this.props.history.push("personalproperty/new")}>Add New Item</Button>
                </div>
                <div className="personalProperty-container-cards" align="center">
                    {this.state.personalProperty.map(personalProperty => 
                        <PersonalPropertyCard 
                        key={personalProperty.id}
                        personalProperty={personalProperty}
                        deletePersonalProperty = {this.deletePersonalProperty}
                        {...this.props} />)}
                </div>
            </React.Fragment>
            

        )
    }
}

export default PersonalPropertyList