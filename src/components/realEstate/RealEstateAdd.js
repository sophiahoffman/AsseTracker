// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager'
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore';
import './RealEstateAdd'
import '../../AsseTracker.css'

// RealEstateAdd takes input from user and writes a new item to the realEstate table. First it gets the real estate types from ppTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the ppTypes table. That new typeId is added to the object and written to the realEstate table. 
class RealEstateAdd extends Component {
    userId = sessionStorage.getItem("userId")

    state = {
        realEstateName: "",
        realEstateTypeId: 1,
        realEstateType: "",
        realEstateTypes: [],
        realEstateAddress: "",
        realEstateCity: "",
        realEstateState: "",
        realEstateZip: "",
        realEstatePurchaseDate: "",
        realEstatePurchasePrice: "0",
        realEstateActiveAsset: true,
        rentCheckbox: false,
        loadingStatus: false,
        // Cloudinary added imageURL
        realEstateImageUrl: require("../../assets/real_estate.png"),
    };
// gets real estate types for the select
    componentDidMount() {
        let propType = 'reTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({realEstateTypes: results})
        })
    }
// to avoid issues with uncontrolled state
    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };
//  posts to reTypes table if text is entered in the input field. Runs under constructNewRealEstate on form submit/button click
    handleOtherInput = e => {
        let route = "reTypes"
        let newTypeObject = {
            type: this.state.realEstateType
        }
        return APIManager.post(route, newTypeObject)
    };

    handleCheckbox = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.checked
        this.setState(stateToChange)
    }

    uploadWidget = () => {
    window.cloudinary.openUploadWidget({ cloud_name: Cloudinary.cloudName, upload_preset: Cloudinary.uploadPreset, tags:['atag']},
    (error, result) => {
        // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
            if (result) {
                this.setState({realEstateImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
            } else {
                window.close()           
            }
        });
    }

    createPostNewRealEstate = reTypeId => {
        const newRealEstate = {
            userId: Number(this.userId),
            name: this.state.realEstateName,
            reTypeId: Number(reTypeId),
            address: this.state.realEstateAddress,
            city: this.state.realEstateCity,
            state: this.state.realEstateState,
            zip: this.state.realEstateZip,
            rent: this.state.rentCheckbox,
            // Cloudinary: added image URL
            imageUrl: this.state.realEstateImageUrl,
            purchaseDate: this.state.realEstatePurchaseDate,
            purchasePrice: Number(this.state.realEstatePurchasePrice).toFixed(2),
            activeAsset: this.state.realEstateActiveAsset,
        }
        RealEstateAPIManager.postRealEstate(newRealEstate)
        .then(() => this.props.history.push("/realestate"));
    }

    constructNewRealEstate = e => {
        let reTypeId = this.state.realEstateTypeId
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.realEstateType !== "") {
            this.handleOtherInput()
            .then(result => {
                reTypeId = result.id
                this.createPostNewRealEstate(reTypeId)
            })
        } else {
            this.createPostNewRealEstate(reTypeId)
        }
    }

    render() {
        return (
            <div className="new-form">
                
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                    <Form.Control autoFocus="autofocus" type="text" id="realEstateName" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Select Property Type</Form.Label>
                    <Form.Control as="select" id="realEstateTypeId" onChange={this.handleFieldChange}>
                        <option value={0}></option>                 
                        {this.state.realEstateTypes.map(type => (
                            <option key={`type-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        <option key={`type-option-0`} value={0}>Other</option>   
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Or Enter Other Type</Form.Label>
                    <Form.Control type="text" id="realEstateType" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Street Address</Form.Label>
                    <Form.Control type="text" id="realEstateAddress" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">City</Form.Label>
                    <Form.Control type="text" id="realEstateCity" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">State</Form.Label>
                    <Form.Control type="text" id="realEstateState" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Zip</Form.Label>
                    <Form.Control type="text" id="realEstateZip" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Check 
                    name="realEstateRent"
                    label="Check if you're renting"
                    checked={this.state.rentCheckbox}
                    onChange={this.handleCheckbox}
                    id="rentCheckbox" />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                    <Form.Control type="date" id="realEstatePurchaseDate" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                    <Form.Control type="number" id="realEstatePurchasePrice" onChange={this.handleFieldChange} />
                </Form.Group>
                {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}

                    <img className="detail-image" src={this.state.realEstateImageUrl} alt=""/><br />
                <div className="image-upload-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.uploadWidget.bind(this)}>Replace Image
                    </Button>
                </div>
                <div className="button-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructNewRealEstate}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

export default RealEstateAdd