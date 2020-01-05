import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Radio, RadioGroup} from 'react-radio-group';
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';
import VehiclesCard from './VehiclesCard';

class VehicleList extends Component {
    state = {
        vehicles: [],
        loadingStatus: true,
        selectedValue: "active"
    }

    componentDidMount() {
        const value = this.state.selectedValue
        this.setVehiclesState(value)
    }

    setVehiclesState = value => {
        this.setState({loadingStatus: false})
        if (value === "all") {
            return (
                VehiclesAPIManager.getAllVehicles()
                .then(vehicles => {
                    this.setState({
                    vehicles: vehicles,
                    })
                })
            )
        } else if (value === "disposed") {
            return (
                VehiclesAPIManager.getDisposedVehicles()
                .then(vehicles => {
                    this.setState({
                    vehicles: vehicles,
                    })
                })
            )
        } else {
            return (
                VehiclesAPIManager.getActiveVehicles()
                .then(vehicles => {
                    this.setState({
                    vehicles: vehicles,
                    })
                })
            )
        }
    }

    updateVehiclesState = e => {
        this.setState({loadingStatus: true})
        e.preventDefault();
        this.setVehiclesState()
    }

    handleChange = value => {
        this.setState({selectedValue: value});
        this.setVehiclesState(value);
    }

    deleteVehicle = vehicleId => {
        this.setState({loadingStatus: true})
        VehiclesAPIManager.deleteVehicle(vehicleId)
        .then(() => this.setVehiclesState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new vehicle-section-content">
                    <Button variant="secondary" type="button" className="newArticleBtn" onClick={() => this.props.history.push("vehicles/new")}>Add New Vehicle</Button>
                </div>
                <form className="form-radio">
                    <h6>Assets to Display:</h6>
                    <RadioGroup className="radio-button-group" name="assetDisplay" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <label>
                            <Radio value="active" className="radio-button"  />  Active
                        </label>
                        <label>
                            <Radio value="disposed" className="radio-button"  />  Disposed
                        </label>
                        <label>
                            <Radio value="all" className="radio-button"  />  All
                        </label>
                    </RadioGroup>
                    {/* <Button variant="secondary" type="submit">Display</Button> */}
                </form>                
                <div className="vehicle-container-cards container-cards" align="center">
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

export default VehicleList