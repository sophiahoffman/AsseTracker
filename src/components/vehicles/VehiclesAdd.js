import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import APIManager from '../../modules/APIManager';

class VehiclesAdd extends Component {
    vehicleTypesText = "";
    
    state = {
        vehicleName: "",
        vehicleTypes: [],
        vehicleType:"",
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

    componentDidMount() {
        this.getVehicleTypes()
    };

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    handleOtherInput = e => {
        let route = "vehicleTypes"
        console.log("length", this.state.vehicleTypes.length)
        let vehicleTypeId = this.state.vehicleTypes.length+1
        this.setState({vehicleTypeId: vehicleTypeId})
        let newTypeObject = {
            id: Number(this.state.vehicleTypeId),
            type: this.state.vehicleType
        }
        return APIManager.post(route, newTypeObject)
    };


    getVehicleTypes = () => {
        let propType = 'vehicleTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            console.log("getTypes results", results)
            this.setState({vehicleTypes: results})
        })
    }

    constructNewVehicle = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        this.handleOtherInput()
        .then(result => {

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
                purchasePrice: this.state.vehiclePurchasePrice,
                activeAsset: this.state.vehicleActiveAsset,
            }
            VehiclesAPIManager.postVehicle(newVehicle)
            .then(() => this.props.history.push("/vehicles"));
                        
        })
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
                        <Form.Label>Select Vehicle Type</Form.Label>
                        <Form.Control as="select" id="vehicleTypeId">
                        {this.state.vehicleTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Or Enter Other Vehicle Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="vehicleType" onChange={this.handleFieldChange} />
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