import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore';

// VehiclesEdit prefills current database data and allows user to overwrite the values and update the item in the vehicles table using PATCH. First it gets the personal property types from vehicleTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the vehicleTypes table. That new typeId is added to the object and written to the vehicles table. 

class VehiclesEdit extends Component {
    objectId = this.props.match.params.vehicleId
    userId = sessionStorage.getItem("userId")

    state = {
        vehicleName: "",
        vehicleTypeId: "",
        vehicleTypes: [],
        vehicleType: "",
        vehicleVin: "",
        vehicleLicense: "",
        vehicleYear: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleLocations: [],
        vehicleLocationId: "",
        vehicleLocation: "",
        vehiclePurchaseLocation: "",
        vehiclePurchaseDate: "",
        vehiclePurchasePrice: "",
        vehicleActiveAsset: true,
        vehicleDisposalDate: "",
        vehicleDisposalPrice: "",
        vehicleDisposalNotes: "",
        loadingStatus: false,
        // Cloudinary added imageURL
        vehicleImageUrl: "",
    };

    componentDidMount() {
        let propType = 'vehicleTypes?_sort=id&&_order=asc'
        let locations = `realEstates?userId=${this.userId}&&_sort=id&&_order=asc`
        APIManager.get(propType)
        .then(results => {
            this.setState({vehicleTypes: results})
        })
        .then(() => APIManager.get(locations))
        .then(results => {
            this.setState({vehicleLocations: results})
        })
        .then(results => VehiclesAPIManager.getOneVehicle(this.objectId))
        .then(item => {
            this.setState({
                vehicleName: item.name,
                vehicleTypeId: item.vehicleTypeId,
                vehicleVin: item.vin,
                vehicleLicense: item.license,
                vehicleYear: item.year,
                vehicleMake: item.make,
                vehicleModel: item.model,
                vehicleLocationId: item.realEstateId,
                vehicleLocation: item.location,
                vehiclePurchaseLocation: item.purchaseLocation,
                vehiclePurchaseDate: item.purchaseDate,
                vehiclePurchasePrice: item.purchasePrice,
                vehicleActiveAsset: item.activeAsset,
                // Cloudinary: added image URL
                vehicleImageUrl: item.imageUrl,
                vehicleDisposalDate: item.disposalDate,
                vehicleDisposalPrice: item.disposalPrice,
                vehicleDisposalNotes: item.disposalNotes,})
        })
    }

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
            if (result) {
                this.setState({vehicleImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
            } else {
                window.close()           
            }
        });
    }

    createUpdatedVehicle = vehicleLocationId => {
        const updatedVehicle = {
            id: this.objectId,
            name: this.state.vehicleName,
            vehicleTypeId: Number(vehicleLocationId),
            vin: this.state.vehicleVin,
            license: this.state.vehicleLicense,
            year: this.state.vehicleYear,
            make: this.state.vehicleMake,
            model: this.state.vehicleModel,
            realEstateId: this.state.vehicleLocationId,
            location: this.state.vehicleLocation,
            purchaseLocation: this.state.vehiclePurchaseLocation,
            purchaseDate: this.state.vehiclePurchaseDate,
            purchasePrice: Number(this.state.vehiclePurchasePrice).toFixed(2),
            activeAsset: this.state.vehicleActiveAsset,
            disposalDate: this.state.vehicleDisposalDate,
            disposalPrice: Number(this.state.vehicleDisposalPrice).toFixed(2),
            disposalNotes: this.state.vehicleDisposalNotes,
            // Cloudinary: added image URL
            imageUrl: this.state.vehicleImageUrl,
        }
        VehiclesAPIManager.updateVehicle(updatedVehicle)
        .then(() => this.props.history.push("/vehicles"));    
    }

    constructUpdatedVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        let vehicleTypeId = this.state.vehicleTypeId
        if (this.state.vehicleType !== "") {
            this.handleOtherInput()
            .then(result => {vehicleTypeId = result.id})
            .then(() => this.createUpdatedVehicle(vehicleTypeId))
        } else {
            this.createUpdatedVehicle(vehicleTypeId)
        }
    }

    render() {
        return (
            <div className="update-form">
                <h6 id="title-update-Form">{this.state.vehicleName}</h6> 
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                    <Form.Control autoFocus="autofocus" type="text" value={this.state.vehicleName} id="vehicleName" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Select Vehicle Type</Form.Label>
                    <Form.Control as="select" id="vehicleTypeId" value={this.state.vehicleTypeId} onChange={this.handleFieldChange}>
                        {this.state.vehicleTypes.map(type => (
                            <option key={`type-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        <option key={`type-option-0`} value={0}></option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Or Enter Other Type</Form.Label>
                    <Form.Control type="text" id="vehicleType" value={this.state.vehicleType} onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">VIN</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleVin} id="vehicleVin" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">License</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleLicense} id="vehicleLicense" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Year</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleYear} id="vehicleYear" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Make</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleMake} id="vehicleMake" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Model</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleModel} id="vehicleModel" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Select Location</Form.Label>
                    <Form.Control as="select" id="vehicleLocationId" value={this.state.vehicleLocationId} onChange={this.handleFieldChange}>
                        {this.state.vehicleLocations.map(location => (
                            <option key={`location-option-${location.id}`} value={location.id}>{location.name}</option>
                        ))}
                        <option key={`location-option-0`} value={0}></option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Location Notes</Form.Label>
                    <Form.Control type="text" value={this.state.vehicleLocation} id="vehicleLocation" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Location</Form.Label>
                    <Form.Control type="text" value={this.state.vehiclePurchaseLocation} id="vehiclePurchaseLocation" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                    <Form.Control type="date" value={this.state.vehiclePurchaseDate} id="vehiclePurchaseDate" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                    <Form.Control type="number" value={this.state.vehiclePurchasePrice} id="vehiclePurchasePrice" onChange={this.handleFieldChange} />
                </Form.Group>
                {!this.state.vehicleActiveAsset ? 
                <>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Date</Form.Label>
                        <Form.Control type="date" value={this.state.vehicleDisposalDate}  id="vehicleDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Price</Form.Label>
                        <Form.Control type="number" value={this.state.vehicleDisposalPrice} id="vehicleDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Notes</Form.Label>
                        <Form.Control type="text" value={this.state.vehicleDisposalNotes} id="vehicleDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                </> :
                null}                 
                {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
                <img className="detail-image" src={this.state.vehicleImageUrl} alt=""/><br />
                <div className="image-upload-div">
                    <Button variant="secondary" onClick={this.uploadWidget.bind(this)} className="upload-button">Replace Image
                    </Button>
                </div>
                <div className="button-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedVehicle}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

export default VehiclesEdit