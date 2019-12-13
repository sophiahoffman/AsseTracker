// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';

// VehiclesDisposal allows user to add additional information about getting rid of the property and then removes the property from view. Data regarding the specific item is essentially archived.
class VehiclesDisposal extends Component {
    objectId = this.props.match.params.vehicleId

    state = {
        vehicleName: "",
        vehicleDisposalDate: "",
        vehicleDisposalPrice: "",
        vehicleDisposalNotes: "",
        vehicleActiveAsset: true,
        loadingStatus: false,
    };

    componentDidMount() {
        VehiclesAPIManager.getOneVehicle(this.objectId)
        .then(item => {
            this.setState({vehicleName: item.name})
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
            disposalDate: this.state.vehicleDisposalDate,
            disposalPrice: this.state.vehicleDisposalPrice,
            disposalNotes: this.state.vehicleDisposalNotes,
            activeAsset: false,
        }
        VehiclesAPIManager.updateVehicle(updatedVehicle)
        .then(() => this.props.history.push("/vehicles"));
    }

    render() {
        return (
            <div id="vehicleDisposalForm">
                <h3 id="title_disposalForm">Disposal Form <br />
                {this.state.vehicleName}</h3>
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Disposal Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Date" id="vehicleDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Disposal Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Price" id="vehicleDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Disposal Notes</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Notes" id="vehicleDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedVehicle}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default VehiclesDisposal