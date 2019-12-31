// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Radio, RadioGroup} from 'react-radio-group';
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import PersonalPropertyCard from './PersonalPropertyCard';
import './PersonalPropertyList.css';

class PersonalPropertyList extends Component {
    state = {
        personalProperty: [],
        loadingStatus: true,
        selectedValue: "active"
    }

    componentDidMount() {
            this.setPersonalPropertyState()
    }

    setPersonalPropertyState = () => {
        this.setState({loadingStatus: false})
        if (this.state.selectedValue === "active") {
            return (
                PersonalPropertyAPIManager.getActivePersonalProperty()
                .then(personalProperty => {
                    this.setState({
                    personalProperty: personalProperty,
                    })
                })
            )
        } else if (this.state.selectedValue === "disposed") {
            return (
                PersonalPropertyAPIManager.getDisposedPersonalProperty()
                .then(personalProperty => {
                    this.setState({
                    personalProperty: personalProperty,
                    })
                })
            )
        } else {
            return (
                PersonalPropertyAPIManager.getAllPersonalProperty()
                .then(personalProperty => {
                    this.setState({
                    personalProperty: personalProperty,
                    })
                })
            )
        }
    }

    updatePersonalPropertyState = e => {
        this.setState({loadingStatus: true})
        e.preventDefault();
        this.setPersonalPropertyState()
    }

    handleChange = value => {
    this.setState({selectedValue: value});
    console.log("selected value", this.state.selectedValue)
  }

     
    deletePersonalProperty = personalPropertyId => {
        this.setState({loadingStatus: true})        
        PersonalPropertyAPIManager.deletePersonalProperty(personalPropertyId)
        .then(() => this.setPersonalPropertyState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new personalProperty-section-content">
                    <Button variant="secondary" type="button" className="newPersonalPropertyBtn" onClick={() => this.props.history.push("personalproperty/new")}>Add New Item</Button>
                </div>
                <form className="form-radio" onSubmit={this.updatePersonalPropertyState}>
                    <RadioGroup className="radio-button-group" name="assetDisplay" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <label>
                            <Radio value="active" className="radio-button"  />  Active
                        </label>
                        <label>
                            <Radio value="disposed" className="radio-button"  />  Disposed
                        </label>
                        <label>
                            <Radio value="all" className="radio-button"  />  All
                        </label>
                    </RadioGroup>
                    <Button variant="secondary" type="submit">Display</Button>
                </form>

                <div className="personalProperty-container-cards container-cards" align="center">
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