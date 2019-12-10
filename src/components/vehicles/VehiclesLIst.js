import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import VehiclesCard from './VehiclesCard';

class VehiclesList extends Component {
    state = {
        vehicles: []
    }

    componentDidMount() {
        this.setVehicleState()
    }

    setVehicleState = () => {
        VehiclesAPIManager.getAllVehicles()
        .then(vehicles => {
            this.setState({
            vehicles: vehicles,
            })
        })
    }

    deleteVehicle = vehicleId => {
        VehiclesCard.deleteVehicle(vehicleId)
        .then(() => this.setVehicleState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new vehicle-section-content" align="center">
                    <Button variant="primary" type="button" className="newArticleBtn" onClick={() => this.props.history.push("vehicles/new")}>Add New Vehicle</Button>
                </div>
                <div className="vehicle-container-cards" align="center">
                    {this.state.vehicles.map(vehicle => 
                        <VehiclesCard 
                        key={vehicle.id}
                        vehicle={vehicle}
                        deleteVehicle = {this.deleteVehicle}
                        {...this.props} />)}
                </div>
            </React.Fragment>
            

        )
    }
}

export default VehiclesList