import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';


class VehiclesEdit extends Component {
    objectId = this.props.match.params.vehicleId

    state = {
        vehicleName: "",
        vehicleTypeId: "",
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
        VehiclesAPIManager.getOneVehicle(this.objectId)
        .then(item => {
            this.setState({
                vehicleName: item.name,
                vehicleTypeId: item.ypeId,
                vehicleType: item.,
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
                vehicleDisposalNotes: "",})
        })
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    constructUpdatedVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const updatedVehicle = {
            id: this.objectId,
            name: this.vehicleName,
            vehicleTypeId: this.vehicleTypeId,
            vin: this.vehicleVin,
            license: this.vehicleLicense,
            year: this.vehicleYear,
            make: this.vehicleMake,
            model: this.vehicleModel,
            location: this.vehicleLocation,
            purchaseLocation: this.vehiclePurchaseLocation,
            purchaseDate: this.vehiclePurchaseDate,
            purchaePrice: this.vehiclePurchasePrice,
            activeAsset: this.vehicleActiveAsset,
            disposalDate: this.vehicleDisposalDate,
            disposalPrice: this.vehicleDisposalPrice,
            disposalNotes: this.vehicleDisposalNotes
        }
        VehiclesAPIManager.updateVehicle(updatedVehicle)
        .then(() => this.props.history.push("/vehicle"));
    }

    render() {
        return (
            <div id="vehicleUpdateForm">
                <h3 id="title_updateForm">Update Form <br />
                {this.state.vehicleName}</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={this.state.vehicleName} id="vehicleName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" value={this.state.vehicleType} id="vehicleTypeId" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>VIN</Form.Label>
                        <Form.Control type="text" placeholder="Enter VIN" value={this.state.vehicleVin} id="vehicleVin" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>License</Form.Label>
                        <Form.Control type="text" placeholder="Enter License" value={this.state.vehicleLicense} id="vehicleLicense" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year" value={this.state.vehicleYear} id="vehicleYear" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" placeholder="Enter Make" value={this.state.vehicleMake} id="vehicleMake" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" value={this.state.vehicleModel} id="vehicleModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Car Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Location" value={this.state.vehicleLocation} id="vehicleLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" value={this.state.vehiclePurchaseLocation} id="vehiclePurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" value={this.state.vehiclePurchaseDate} id="vehiclePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" value={this.state.vehiclePurchasePrice} id="vehiclePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedVehicle}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default VehiclesEdit