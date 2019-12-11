import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';

class VehiclesAdd extends Component {

    
    state = {
        vehicleName: "",
        vehicleTypeId: "",
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
    };

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    constructNewVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const newVehicle = {
            userId: Number(localStorage.getItem("userId")),
            name: this.state.vehicleName,
            vehicleTypeId: Number(this.state.vehicleTypeId),
            license: this.state.vehicleLicense,
            year: this.state.vehicleYear,
            make: this.state.vehicleMake,
            model: this.state.vehicleModel,
            location: this.state.vehicleLocation,
            purchaseLocation: this.state.vehiclePurchaseLocation,
            purchaseDate: this.state.vehiclePurchaseDate,
            purchasePrice: this.state.vehiclePurchasePrice,
            activeAsset: this.state.vehicleActiveAsset,
        }
        VehiclesAPIManager.postVehicle(newVehicle)
        .then(() => this.props.history.push("/vehicles"));
    }

    render() {
        return (
            <div id="newVehicleForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="vehicleName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="vehicleTypeId" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>VIN</Form.Label>
                        <Form.Control type="text" placeholder="Enter VIN" id="vehicleVin" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>License</Form.Label>
                        <Form.Control type="text" placeholder="Enter License" id="vehicleLicense" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year" id="vehicleYear" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" placeholder="Enter Make" id="vehicleMake" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" id="vehicleModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Car Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" id="vehicleLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" id="vehiclePurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="vehiclePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="vehiclePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructNewVehicle}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}


export default VehiclesAdd