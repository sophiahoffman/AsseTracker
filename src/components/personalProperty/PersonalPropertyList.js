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
        const value = this.state.SelectedValue
        this.setPersonalPropertyState(value)
    }
// sets state array value depending on the active, disposed or all value selected by user with radio buttons
    setPersonalPropertyState = value => {
        this.setState({loadingStatus: false})
        if (value === "all") {
            return (
                PersonalPropertyAPIManager.getAllPersonalProperty()
                .then(personalProperty => {
                    this.setState({
                    personalProperty: personalProperty,
                    })
                })
            )
        } else if (value === "disposed") {
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
                PersonalPropertyAPIManager.getActivePersonalProperty()
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
        this.setPersonalPropertyState(this.state.selectedValue)
    }

    handleChange = value => {
        this.setState({selectedValue: value});
        this.setPersonalPropertyState(value)
    }

     
    deletePersonalProperty = personalPropertyId => {
        this.setState({loadingStatus: true})        
        PersonalPropertyAPIManager.deletePersonalProperty(personalPropertyId)
        .then(() => this.setPersonalPropertyState(this.state.selectedValue))
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new personalProperty-section-content">
                    <Button variant="secondary" type="button" className="newPersonalPropertyBtn" onClick={() => this.props.history.push("personalproperty/new")}>Add New Item</Button>
                </div>
                <form className="form-radio">
                    <h6>Assets to Display:</h6>
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
                    {/* <Button variant="secondary" type="submit">Display</Button> */}
                </form>

                <div className="personalProperty-container-cards container-cards">
                    {this.state.personalProperty.map(personalProperty => 
                        <PersonalPropertyCard 
                        key={personalProperty.id}
                        personalProperty={personalProperty}
                        deletePersonalProperty = {this.deletePersonalProperty}
                        {...this.props}
                         />)}
                </div>
            </React.Fragment>
            

        )
    }
}

export default PersonalPropertyList