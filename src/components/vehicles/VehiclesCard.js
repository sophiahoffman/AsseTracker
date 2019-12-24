import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './VehiclesCard'
import '../../AsseTracker.css'

class VehiclesCard extends Component {

    render () {
        return (
        <React.Fragment>
            <div>
                <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                    <Card.Title className="f4">
                        {(this.props.vehicle.imageUrl !== "") 
                        ? <><img src={this.props.vehicle.imageUrl} alt={this.props.vehicle.name} /><br /></>
                        : null }
                        {this.props.vehicle.name}
                    </Card.Title><hr />
                    <div className="card-format">
                    
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Vehicle Type</h6>
                            <h6 className="card-property">{this.props.vehicle.vehicleType.type}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">VIN</h6>
                            <h6 className="card-property">{this.props.vehicle.vin}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">License Number</h6>
                            <h6 className="card-property">{this.props.vehicle.license}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Year</h6>
                            <h6 className="card-property">{this.props.vehicle.year}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Make</h6>
                            <h6 className="card-property">{this.props.vehicle.make}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Model</h6>
                            <h6 className="card-property">{this.props.vehicle.model}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Vehicle Physical Location</h6>
                            <h6 className="card-property">{this.props.vehicle.location}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                            <h6 className="card-property">{this.props.vehicle.purchaseDate}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
                            <h6 className="card-property">{this.props.vehicle.purchaseLocation}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                            <h6 className="card-property">${this.props.vehicle.purchasePrice}</h6> 
                        </div>
                    </div>
            
                    <div className="button-div">
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/edit`)}>Edit</Button>
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/disposal`)}>Disposal</Button>
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.props.vehicle.id)}>Delete</Button>
                    
                    </div>
                    </div>
                </article>
            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard