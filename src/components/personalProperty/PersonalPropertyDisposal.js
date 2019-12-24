// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'

// PersonalPropertyDisposal allows user to add additional information about getting rid of the property and then removes the property from view. Data regarding the specific item is essentially archived.
class PersonalPropertyDisposal extends Component {
    objectId = this.props.match.params.personalPropertyId

    state = {
        personalpropertyName: "",
        personalPropertyDisposalDate: "",
        personalPropertyDisposalPrice: "",
        personalPropertyDisposalNotes: "",
        personalPropertyActiveAsset: true,
        loadingStatus: false,
    };

    componentDidMount() {
        PersonalPropertyAPIManager.getOnePersonalProperty(this.objectId)
        .then(item => {
            this.setState({personalPropertyName: item.name})
        })
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    constructUpdatedPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const updatedPersonalProperty = {
            id: this.objectId,
            disposalDate: this.state.personalPropertyDisposalDate,
            disposalPrice: Number(this.state.personalPropertyDisposalPrice).toFixed(2),
            disposalNotes: this.state.personalPropertyDisposalNotes,
            activeAsset: false,
        }
        PersonalPropertyAPIManager.updatePersonalProperty(updatedPersonalProperty)
        .then(() => this.props.history.push("/personalproperty"));
    }

    render() {
        return (
            <div id="personalPropertyDisposalForm">
                <h3 id="title_disposalForm">Disposal Form</h3>
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Date</Form.Label>
                        <Form.Control autoFocus="autofocus" type="date" id="personalPropertyDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Price</Form.Label>
                        <Form.Control type="number" id="personalPropertyDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Notes</Form.Label>
                        <Form.Control type="text" id="personalPropertyDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedPersonalProperty}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyDisposal