import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'

class PersonalPropertyAdd extends Component {
    state = {
        personalPropertyName: "",
        personalPropertyTypeId: "",
        personalPropertyDescription: "",
        personalPropertyManufacturer: "",
        personalPropertyModel: "",
        personalPropertyLocation: "",
        personalPropertyPurchaseLocation: "",
        personalPropertyPurchaseDate: "",
        personalPropertyPurchasePrice: "",
        personalPropertyActiveAsset: true,
        loadingStatus: false,
    };

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    constructNewPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const newPersonalProperty = {
            userId: Number(localStorage.getItem("userId")),
            name: this.state.personalPropertyName,
            ppTypeId: Number(this.state.personalPropertyTypeId),
            description: this.state.personalPropertyDescription,
            manufacturer: this.state.personalPropertyManufacturer,
            model: this.state.personalPropertyModel,
            location: this.state.personalPropertyLocation,
            purchaseLocation: this.state.personalPropertyPurchaseLocation,
            purchaseDate: this.state.personalPropertyPurchaseDate,
            purchasePrice: this.state.personalPropertyPurchasePrice,
            activeAsset: this.state.personalPropertyActiveAsset,
        }
        PersonalPropertyAPIManager.postPersonalProperty(newPersonalProperty)
        .then(() => this.props.history.push("/personalproperty"));
    }

    render() {
        return (
            <div id="newPersonalPropertyForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="personalPropertyName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* need to make a dropdown menu or add new reType */}
                    <Form.Group>
                        <Form.Label>Personal Property Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="personalPropertyTypeId" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" id="personalPropertyDescription" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Manufacturer" id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" id="personalPropertyModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Physical Location" id="personalPropertyLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructNewPersonalProperty}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyAdd