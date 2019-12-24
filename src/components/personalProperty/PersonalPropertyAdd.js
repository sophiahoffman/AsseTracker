// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore';
import './PersonalPropertyAdd.css';
import '../../AsseTracker.css';

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
        // Cloudinary added imageURL
        personalPropertyImageUrl: require("../../assets/personal_property.png"),
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

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: Cloudinary.cloudName, upload_preset: Cloudinary.uploadPreset, tags:['atag']},
        (error, result) => {
            // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
            this.setState({personalPropertyImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
        });
    }

    constructNewPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.personalPropertyType !== "") {
            this.handleOtherInput()
            .then(result => {
                const newPersonalProperty = {
                    userId: Number(localStorage.getItem("userId")),
                    name: this.state.personalPropertyName.toUpperCase(),
                    ppTypeId: Number(result.id),
                    description: this.state.personalPropertyDescription.toUpperCase(),
                    manufacturer: this.state.personalPropertyManufacturer.toUpperCase(),
                    model: this.state.personalPropertyModel.toUpperCase(),
                    location: this.state.personalPropertyLocation.toUpperCase(),
                    purchaseLocation: this.state.personalPropertyPurchaseLocation.toUpperCase(),
                    purchaseDate: this.state.personalPropertyPurchaseDate,
                    purchasePrice: Number(this.state.personalPropertyPurchasePrice).toFixed(2),
                    activeAsset: this.state.personalPropertyActiveAsset,
                    // Cloudinary: added image URL
                    imageUrl: this.state.personalPropertyImageUrl,
                }
                PersonalPropertyAPIManager.postPersonalProperty(newPersonalProperty)
                .then(() => this.props.history.push("/personalproperty"));
            })
        } else {
            const newPersonalProperty = {
                userId: Number(localStorage.getItem("userId")),
                name: this.state.personalPropertyName.toUpperCase(),
                ppTypeId: Number(this.state.personalPropertyTypeId),
                description: this.state.personalPropertyDescription.toUpperCase(),
                manufacturer: this.state.personalPropertyManufacturer.toUpperCase(),
                model: this.state.personalPropertyModel.toUpperCase(),
                location: this.state.personalPropertyLocation.toUpperCase(),
                purchaseLocation: this.state.personalPropertyPurchaseLocation.toUpperCase(),
                purchaseDate: this.state.personalPropertyPurchaseDate,
                purchasePrice: Number(this.state.personalPropertyPurchasePrice).toFixed(2),
                activeAsset: this.state.personalPropertyActiveAsset,
                // Cloudinary: added image URL
                imageUrl: this.state.personalPropertyImageUrl,
            }
            PersonalPropertyAPIManager.postPersonalProperty(newPersonalProperty)
            .then(() => this.props.history.push("/personalproperty"));
        }
    }

    render() {
        return (
            <div className="new-form">
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                        <Form.Control autoFocus="autofocus" type="text" id="personalPropertyName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Select Item Type</Form.Label>
                        <Form.Control as="select" id="personalPropertyTypeId" onChange={this.handleFieldChange}>
                        {this.state.personalPropertyTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Or Enter Other Item Type</Form.Label>
                        <Form.Control type="text" id="personalPropertyType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Description</Form.Label>
                        <Form.Control type="text" id="personalPropertyDescription" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Manufacturer</Form.Label>
                        <Form.Control type="text" id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Model</Form.Label>
                        <Form.Control type="text" id="personalPropertyModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Physical Location</Form.Label>
                        <Form.Control type="text" id="personalPropertyLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Location</Form.Label>
                        <Form.Control type="text" id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                        <Form.Control type="date" id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                        <Form.Control type="number" step=".01" id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
                    <img className="uploadImage" src={this.state.personalPropertyImageUrl} alt=""/><br />
                    <div className="image-upload-div">
                        <Button variant="secondary" onClick={this.uploadWidget.bind(this)} className="upload-button" disabled={this.state.loadingStatus}>Add Image
                        </Button>
                    </div>
                    <div className="button-div">
                        <Button variant="secondary" type="button" disabled={this.state.loadingStatus} onClick={this.constructNewPersonalProperty}>Submit
                        </Button>
                        <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                        onClick={this.props.history.goBack}>Cancel
                        </Button>
                    </div>
            </div>
        )
    }
}

export default PersonalPropertyAdd