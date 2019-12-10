import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import PersonalPropertyCard from './PersonalPropertyCard';

class PersonalPropertyList extends Component {
    state = {
        personalProperty: []
    }

    componentDidMount() {
        this.setPersonalPropertyState()
    }

    setPersonalPropertyState = () => {
        PersonalPropertyAPIManager.getAllPersonalProperty()
        .then(personalProperty => {
            this.setState({
            personalProperty: personalProperty,
            })
        })
    }

    
    deletPersonalProperty = personalPropertyId => {
        PersonalPropertyAPIManager.deletePersonalProperty(personalPropertyId)
        .then(() => this.setPersonalPropertyState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new personalProperty-section-content" align="center">
                    <Button variant="primary" type="button" className="newPersonalPropertyBtn" onClick={() => this.props.history.push("personalproperty/new")}>Add New Property</Button>
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