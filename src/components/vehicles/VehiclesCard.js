import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './VehiclesCard'
import '../../AsseTracker.css'

class VehiclesCard extends Component {

    render () {
        return (
        <React.Fragment>
            <div className="card-small">
                <div className = "card-content-small">
                    <a href={'vehicles/'+ this.props.vehicle.id}>
                    <Card.Title className="card-title-small">
                        {(this.props.vehicle.imageUrl !== "") 
                        ? <><img className="card-image" src={this.props.vehicle.imageUrl} alt={this.props.vehicle.name} /><br /></>
                        : null }
                        {this.props.vehicle.name}
                    </Card.Title>
                    </a>
                    {/* <div className="card-format">
                    
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
                            <h6 className="card-property">${Number(this.props.vehicle.purchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                        </div>
                        {!this.props.vehicle.activeAsset ? 
                            <>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                                <h6 className="card-property">{this.props.vehicle.disposalDate}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                                <h6 className="card-property">${Number(this.props.vehicle.disposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                                <h6 className="card-property">{this.props.vehicle.disposalNotes}</h6> 
                            </div>
                            </> :
                            null}
                    </div>
            
                    <div className="button-div">
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/edit`)}>Edit</Button>
                        {this.props.vehicle.activeAsset ?
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/disposal`)}>Disposal</Button>
                        :
                        null}
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.props.vehicle.id)}>Delete</Button>
                    
                    </div> */}
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard