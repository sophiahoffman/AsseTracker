// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import APIManager from '../../modules/APIManager';

// PersonalPropertyAdd takes input from user and writes a new item to the personalproperty table. First it gets the personal property types from ppTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the ppTypes table. That new typeId is added to the object and written to the personalproperty table. 

class PersonalPropertyAdd extends Component {
    state = {
        personalPropertyName: "",
        personalPropertyTypeId: 1,
        personalPropertyTypes: [],
        personalPropertyType: "",
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

// requires get call on the types to populate the dropdown select
    componentDidMount() {
        let propType = 'ppTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({personalPropertyTypes: results})
        })
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };
// handleOtherInput is run at form submit. Creates new type based on whether or not there is any text entered in id="personalPropertyType"
    handleOtherInput = e => {
        let route = "ppTypes"
        let newTypeObject = {
            type: this.state.personalPropertyType
        }
        return APIManager.post(route, newTypeObject)
    };

    constructNewPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.personalPropertyType !== "") {
            this.handleOtherInput()
            .then(result => {
                const newPersonalProperty = {
                    userId: Number(localStorage.getItem("userId")),
                    name: this.state.personalPropertyName,
                    ppTypeId: Number(result.id),
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
            })
        } else {
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
    }

    render() {
        return (
            <div id="newPersonalPropertyForm">
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="personalPropertyName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Select Item Type</Form.Label>
                        <Form.Control as="select" id="personalPropertyTypeId" onChange={this.handleFieldChange}>
                        {this.state.personalPropertyTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Or Enter Item Type (if not on the Select)</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="personalPropertyType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" id="personalPropertyDescription" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Manufacturer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Manufacturer" id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" id="personalPropertyModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Physical Location" id="personalPropertyLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructNewPersonalProperty}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyAdd