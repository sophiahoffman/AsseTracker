import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './VehiclesCard'

class VehiclesCard extends Component {

    render () {
        return (
        <React.Fragment>
            <div className="card vehicleCard">
             <Card>
                <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <Card.Body className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <Card.Title className="f4">
                        {(this.props.vehicle.imageUrl !== "") 
                        ? <><img className="uploadImage" src={this.props.vehicle.imageUrl} alt={this.props.vehicle.name} /><br /></>
                        : null }
                    </Card.Title><hr />
                    <Card.Text>
                        {this.props.vehicle.vehicleType.type}<br /> 
                        {this.props.vehicle.vin}<br />
                        {this.props.vehicle.license}<br />
                        {this.props.vehicle.year}<br />
                        {this.props.vehicle.make}<br />
                        {this.props.vehicle.model}<br />
                        {this.props.vehicle.location}<br />
                        {this.props.vehicle.purchaseDate}<br />
                        {this.props.vehicle.purchaseLocation}<br />
                        ${this.props.vehicle.purchasePrice}<br />
                    </Card.Text>
            
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/edit`)}>Edit</Button>
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/disposal`)}>Disposal</Button>
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.props.vehicle.id)}>Delete</Button>
                    </Card.Body>
                </article>

             </Card>  

            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard