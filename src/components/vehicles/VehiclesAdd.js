// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore'
import './VehiclesAdd'

// vehiclesAdd takes input from user and writes a new item to the vehicles table. First it gets the vehicle types from vehicleTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the vehicleTypes table. That new typeId is added to the object and written to the vehicles table. 
class VehiclesAdd extends Component {
    vehicleTypesText = "";
    
    state = {
        vehicleName: "",
        vehicleTypes: [],
        vehicleType:"",
        vehicleTypeId: 1,
        vehicleVin: "",
        vehicleLicense: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleLocation: "",
        vehiclePurchaseLocation: "",
        vehiclePurchaseDate: "",
        vehiclePurchasePrice: "",
        vehicleActiveAsset: true,
        loadingStatus: false,        
        // Cloudinary added imageURL
        vehicleImageUrl: require("../../assets/vehicle.png"),
    };
// gets vehicle types for the select input
    componentDidMount() {
        let propType = 'vehicleTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({vehicleTypes: results})
        })
    };

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };
//  posts to vehicleTypes table if text is entered in the input field. Runs under constructNewVehicle on button click
    handleOtherInput = e => {
        let route = "vehicleTypes"
        let newTypeObject = {
            type: this.state.vehicleType
        }
        return APIManager.post(route, newTypeObject)
    };

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: Cloudinary.cloudName, upload_preset: Cloudinary.uploadPreset, tags:['atag']},
        (error, result) => {
            // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
            this.setState({vehicleImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
            });
    }


    constructNewVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.vehicleType !== "") {
            this.handleOtherInput()
            .then(result => {
                const newVehicle = {
                    userId: Number(localStorage.getItem("userId")),
                    name: this.state.vehicleName,
                    vehicleTypeId: Number(result.id),
                    vin: this.state.vehicleVin,
                    license: this.state.vehicleLicense,
                    year: this.state.vehicleYear,
                    make: this.state.vehicleMake,
                    model: this.state.vehicleModel,
                    location: this.state.vehicleLocation,
                    purchaseLocation: this.state.vehiclePurchaseLocation,
                    purchaseDate: this.state.vehiclePurchaseDate,
                    purchasePrice: Number(this.state.vehiclePurchasePrice).toFixed(2),
                    activeAsset: this.state.vehicleActiveAsset,
                    // Cloudinary: added image URL
                    imageUrl: this.state.vehicleImageUrl,
                }
                VehiclesAPIManager.postVehicle(newVehicle)
                .then(() => this.props.history.push("/vehicles"));            
            })
        } else {
            const newVehicle = {
                userId: Number(localStorage.getItem("userId")),
                name: this.state.vehicleName,
                vehicleTypeId: Number(this.state.vehicleTypeId),
                vin: this.state.vehicleVin,
                license: this.state.vehicleLicense,
                year: this.state.vehicleYear,
                make: this.state.vehicleMake,
                model: this.state.vehicleModel,
                location: this.state.vehicleLocation,
                purchaseLocation: this.state.vehiclePurchaseLocation,
                purchaseDate: this.state.vehiclePurchaseDate,
                purchasePrice: Number(this.state.vehiclePurchasePrice).toFixed(2),
                activeAsset: this.state.vehicleActiveAsset,
                // Cloudinary: added image URL
                imageUrl: this.state.vehicleImageUrl,
            }
            VehiclesAPIManager.postVehicle(newVehicle)
            .then(() => this.props.history.push("/vehicles"));  
        }
    }

    render() {
        return (
            <div id="newVehicleForm">
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                        <Form.Control autoFocus="autofocus" type="text" id="vehicleName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Select Vehicle Type</Form.Label>
                        <Form.Control as="select" id="vehicleTypeId" onChange={this.handleFieldChange}>
                        {this.state.vehicleTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Or Enter Other Vehicle Type</Form.Label>
                        <Form.Control type="text" id="vehicleType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">VIN</Form.Label>
                        <Form.Control type="text" id="vehicleVin" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">License</Form.Label>
                        <Form.Control type="text" id="vehicleLicense" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Year</Form.Label>
                        <Form.Control type="text" id="vehicleYear" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Make</Form.Label>
                        <Form.Control type="text" id="vehicleMake" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Model</Form.Label>
                        <Form.Control type="text" id="vehicleModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Vehicle Physical Location</Form.Label>
                        <Form.Control type="text" id="vehicleLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Location</Form.Label>
                        <Form.Control type="text" id="vehiclePurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                        <Form.Control type="date" id="vehiclePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                        <Form.Control type="number" id="vehiclePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
                    <img align="center" className="uploadImage" src={this.state.vehicleImageUrl} alt=""/><br />
                    <Button variant="secondary" onClick={this.uploadWidget.bind(this)} className="upload-button">Add Image
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructNewVehicle}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </Form>
            </div>
        )
    }
}


export default VehiclesAdd