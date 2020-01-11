import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import './VehiclesCard'
import '../../AsseTracker.css'

class VehiclesCard extends Component {
    state = {
        showButtons: true,
    }

    componentDidMount() {
        if (this.props.fromRealEstateCard) {
            this.setState({showButtons: false})
        } else {
            return null
        }
    }

    MyVerticallyCenteredModal = props => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title className= "my-modal-title" id="contained-modal-title-vcenter">
                    {(this.props.vehicle.imageUrl !== "") 
                    ? <><img className="detail-image" src={this.props.vehicle.imageUrl} alt={this.props.vehicle.name} /><br /></>
                    : null }
                    {this.props.vehicle.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Vehicle Type</h6>
                    {this.props.vehicle.vehicleTypeId !== 0 ?
                    <h6 className="card-property">{this.props.vehicle.vehicleType.type}</h6> 
                    : <h6 className="card-property">Other</h6>
                    }
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
                    <h6 className="row-sm-10 row-form-label">Location</h6>
                    {this.props.vehicle.realEstateId !== 0 ?
                    <h6 className="card-property">{this.props.vehicle.realEstate.name}</h6>
                    : <h6 className="card-property">Other</h6>
                    }
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Location Notes</h6>
                    <h6 className="card-property">{this.props.vehicle.location}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                    <h6 className="card-property">{this.props.vehicle.purchaseDate}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
                    <h6 className="card-property">{this.props.vehicle.purchaseLocation}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
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
                {this.state.showButtons ?
                <div className="button-div">
                    <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/edit`)}>Edit</Button>
                    {this.props.vehicle.activeAsset ? 
                    <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.history.push(`/vehicles/${this.props.vehicle.id}/disposal`)}>Disposal</Button>
                    :
                    null}  
                    <Button variant="secondary" type="button" className="vehicle-button" onClick={() => this.props.deleteVehicle(this.props.vehicle.id)}>Delete</Button>

                </div>  
                : null}
            </Modal.Body>
            <Modal.Footer>
                    <Button className="modal-close" variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer> 
            </Modal>
        );
    }
    

    App = () => {
        const [modalShow, setModalShow] = React.useState(false);

        return (
            <ButtonToolbar>
            <Button className="button-card" variant="secondary" onClick={() => setModalShow(true)}>
                Details
            </Button>

            <this.MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            </ButtonToolbar>
        );
    }
    render () {
        return (
        <React.Fragment>
            <div className="card-small">
                <div className = "card-content-small">
                    <Card.Title className="card-title-small">
                        {(this.props.vehicle.imageUrl !== "") 
                        ? <><img className="card-image" src={this.props.vehicle.imageUrl} alt={this.props.vehicle.name} /><br /></>
                        : null }
                        {this.props.vehicle.name}
                    </Card.Title>
                    <this.App />
                    <div className="card-format-small">

                        <div className="col-md-12">
                            <h6 className="card-property-small">{this.props.vehicle.vin}</h6> 
                        </div>

                        <div className="col-md-12">
                            <h6 className="card-property-small">{this.props.vehicle.year} {this.props.vehicle.make} {this.props.vehicle.model}</h6> 
                        </div>

                    </div>  
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default VehiclesCard