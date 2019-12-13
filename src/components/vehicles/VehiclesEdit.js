import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import APIManager from '../../modules/APIManager';

// VehiclesEdit prefills current database data and allows user to overwrite the values and update the item in the vehicles table using PATCH. First it gets the personal property types from vehicleTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the vehicleTypes table. That new typeId is added to the object and written to the vehicles table. 

class VehiclesEdit extends Component {
    objectId = this.props.match.params.vehicleId

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
        vehicleLocation: "",
        vehiclePurchaseLocation: "",
        vehiclePurchaseDate: "",
        vehiclePurchasePrice: "",
        vehicleActiveAsset: true,
        vehicleDisposalDate: "",
        vehicleDisposalPrice: "",
        vehicleDisposalNotes: "",
        loadingStatus: false,
    };

    componentDidMount() {
        let propType = 'vehicleTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({vehicleTypes: results})
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
                vehicleLocation: item.location,
                vehiclePurchaseLocation: item.purchaseLocation,
                vehiclePurchaseDate: item.purchaseDate,
                vehiclePurchasePrice: item.purchasePrice,
                vehicleActiveAsset: item.activeAsset,
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

    constructUpdatedVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.vehicleType !== "") {
            this.handleOtherInput()
            .then(result => {
                const updatedVehicle = {
                    id: this.objectId,
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
                    purchasePrice: this.state.vehiclePurchasePrice,
                    activeAsset: this.state.vehicleActiveAsset,
                    disposalDate: this.state.vehicleDisposalDate,
                    disposalPrice: this.state.vehicleDisposalPrice,
                    disposalNotes: this.state.vehicleDisposalNotes
                }
                VehiclesAPIManager.updateVehicle(updatedVehicle)
                .then(() => this.props.history.push("/vehicles"));
            })
        } else {
            const updatedVehicle = {
                id: this.objectId,
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
                purchasePrice: this.state.vehiclePurchasePrice,
                activeAsset: this.state.vehicleActiveAsset,
                disposalDate: this.state.vehicleDisposalDate,
                disposalPrice: this.state.vehicleDisposalPrice,
                disposalNotes: this.state.vehicleDisposalNotes
            }
            VehiclesAPIManager.updateVehicle(updatedVehicle)
            .then(() => this.props.history.push("/vehicles"));
        }
    }

    render() {
        return (
            <div id="vehicleUpdateForm">
                <h3 id="title_updateForm">Update Form</h3>
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={this.state.vehicleName} id="vehicleName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Select Vehicle Type</Form.Label>
                        <Form.Control as="select" id="vehicleTypeId" value={this.state.vehicleTypeId} onChange={this.handleFieldChange}>
                        {this.state.vehicleTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Or Enter Other Vehicle Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="vehicleType" value={this.state.vehicleType} onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">VIN</Form.Label>
                        <Form.Control type="text" placeholder="Enter VIN" value={this.state.vehicleVin} id="vehicleVin" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">License</Form.Label>
                        <Form.Control type="text" placeholder="Enter License" value={this.state.vehicleLicense} id="vehicleLicense" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year" value={this.state.vehicleYear} id="vehicleYear" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Make</Form.Label>
                        <Form.Control type="text" placeholder="Enter Make" value={this.state.vehicleMake} id="vehicleMake" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" value={this.state.vehicleModel} id="vehicleModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Car Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={this.state.vehicleLocation} id="vehicleLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" value={this.state.vehiclePurchaseLocation} id="vehiclePurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" value={this.state.vehiclePurchaseDate} id="vehiclePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" value={this.state.vehiclePurchasePrice} id="vehiclePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedVehicle}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default VehiclesEdit