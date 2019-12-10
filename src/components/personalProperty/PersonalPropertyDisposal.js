import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'

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
            disposalPrice: this.state.personalPropertyDisposalPrice,
            disposalNotes: this.state.personalPropertyDisposalNotes,
            activeAsset: false,
        }
        PersonalPropertyAPIManager.updatePersonalProperty(updatedPersonalProperty)
        .then(() => this.props.history.push("/personalproperty"));
    }

    render() {
        return (
            <div id="personalPropertyDisposalForm">
                <h3 id="title_disposalForm">Disposal Form <br />
                {this.state.personalPropertyName}</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Disposal Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Date" id="personalPropertyDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disposal Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Price" id="personalPropertyDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disposal Notes</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Notes" id="personalPropertyDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedPersonalProperty}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyDisposal