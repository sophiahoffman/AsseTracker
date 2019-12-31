import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import APIManager from '../../modules/APIManager'
import VehiclesAPIManager from '../../modules/VehiclesAPIManager'
import './VehiclesCard'
import '../../AsseTracker.css'

class VehiclesCard extends Component {
    objectId = this.props.match.params.vehicleId

    state = {
        vehicleName: "",
        vehicleTypeId: "",
        vehicleTypes: [],
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
        // Cloudinary added imageURL
        vehicleImageUrl: "",
    };

    componentDidMount() {
        let propType = 'vehicleTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({vehicleTypes: results})
        })
        .then(results => VehiclesAPIManager.getOneVehicle(this.objectId))
        .then(item => {
            this.setState({
                vehicleName: item.name,
                vehicleTypeId: item.vehicleTypeId,
                vehicleType: item.vehicleType.type,
                vehicleVin: item.vin,
                vehicleLicense: item.license,
                vehicleYear: item.year,
                vehicleMake: item.make,
                vehicleModel: item.model,
                vehicleLocation: item.location,
                vehiclePurchaseLocation: item.purchaseLocation,
                vehiclePurchaseDate: item.purchaseDate,
                vehiclePurchasePrice: item.purchasePrice,
                vehicleActiveAsset: item.activeAsset,
                // Cloudinary: added image URL
                vehicleImageUrl: item.imageUrl,
                vehicleDisposalDate: item.disposalDate,
                vehicleDisposalPrice: item.disposalPrice,
                vehicleDisposalNotes: item.disposalNotes,})
        })
    }
    render () {
        return (
        <React.Fragment>
            <div className="card">
                <div className = "card-content">
                    <Card.Title className="card-format">
                        {(this.state.vehicleImageUrl !== "") 
                        ? <><img src={this.state.vehicleImageUrl} alt={this.state.vehicleName} /><br /></>
                        : null }
                        {this.state.vehicleName}
                    </Card.Title><hr />
                    <div className="card-format">
                    
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Vehicle Type</h6>
                            <h6 className="card-property">{this.state.vehicleType}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">VIN</h6>
                            <h6 className="card-property">{this.state.vehicleVin}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">License Number</h6>
                            <h6 className="card-property">{this.state.vehicleLicense}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Year</h6>
                            <h6 className="card-property">{this.state.vehicleYear}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Make</h6>
                            <h6 className="card-property">{this.state.vehicleMake}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Model</h6>
                            <h6 className="card-property">{this.state.vehicleModel}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Vehicle Physical Location</h6>
                            <h6 className="card-property">{this.state.vehicleLocation}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                            <h6 className="card-property">{this.state.vehiclePurchaseDate}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
                            <h6 className="card-property">{this.state.vehiclePurchaseLocation}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                            <h6 className="card-property">${Number(this.state.vehiclePurchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                        </div>
                        {!this.state.vehicleActiveAsset ? 
                            <>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                                <h6 className="card-property">{this.state.vehicleDisposalDate}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                                <h6 className="card-property">${Number(this.state.vehicleDisposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                                <h6 className="card-property">{this.state.vehicleDisposalNotes}</h6> 
                            </div>
                            </> :
                            null}
                    </div>
            
                    <div className="button-div">
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.objectId}/edit`)}>Edit</Button>
                        {this.props.vehicleActiveAsset ?
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.objectId}/disposal`)}>Disposal</Button>
                        :
                        null}
                        <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.objectId)}>Delete</Button>
                    
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard