import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class VehiclesCard extends Component {

    render () {
        return (
        <React.Fragment>
            <div className="card vehicleCard">
             <Card>
                <div className = "card-content">
                <Card.Body className="vehicle-content">
                    <Card.Title>{this.props.vehicle.name}</Card.Title><hr />
                    <Card.Text>
                        {this.props.vehicle.vehicleTypeId}<br /> 
                        {this.props.vehicle.vin}<br />
                        {this.props.vehicle.license}<br />
                        {this.props.vehicle.year}<br />
                        {this.props.vehicle.make}<br />
                        {this.props.vehicle.model}<br />
                        {this.props.vehicle.location}<br />
                        {this.props.vehicle.purchaseDate}<br />
                        {this.props.vehicle.purchaseLocation}<br />
                        {this.props.vehicle.purchasePrice}<br />
                    </Card.Text>
            
                        <Button variant="primary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/edit`)}>Edit</Button>
                        <Button variant="primary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/disposal`)}>Disposal</Button>
                        <Button variant="primary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.props.vehicle.id)}>Delete</Button>
                    </Card.Body>
                </div>

             </Card>  

            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard