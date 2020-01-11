// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PersonalPropertyCard from '../personalProperty/PersonalPropertyCard';
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager';
import VehiclesCard from '../vehicles/VehiclesCard';
import VehiclesAPIManager from '../../modules/VehiclesAPIManager';

// import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import '../../AsseTracker.css';

class RealEstateCard extends Component {
    state = {
        personalProperty: [],
        vehicles: [],
        fromRealEstateCard: true,
    }

    componentDidMount() {
        const locationId = this.props.realEstate.id
          
        PersonalPropertyAPIManager.getActivePersonalPropertyAtLocation(locationId)
        .then(personalProperty => {
            this.setState({
                personalProperty: personalProperty,
            })
        })

        VehiclesAPIManager.getActiveVehiclesAtLocation (locationId)
        .then(vehicles => {
            
            this.setState({
                vehicles: vehicles,
            })
        })
    }

    // getActivePersonalPropertyAtLocation = locationId => {
    //     locationId = this.props.realEstate.id
    //     return (

    //         PersonalPropertyAPIManager.getActivePersonalPropertyAtLocation(locationId)
    //         .then(personalProperty => {
    //             this.setState({
    //             personalProperty: personalProperty,
    //             })
    //         })
    //     )
    // }

    // getActiveVehiclesAtLocation = locationId => {
    //     locationId = this.props.realEstate.id
    //     return (

    //         VehiclesAPIManager.getActiveVehiclesAtLocation(locationId)
    //         .then(vehicles => {
    //             this.setState({
    //             vehicles: vehicles,
    //             })
    //         })
    //     )
    // }

    MyVerticallyCenteredModal = props => {
        console.log("realestateProps",this.props)
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title className= "my-modal-title" id="contained-modal-title-vcenter">
                    {(this.props.realEstate.imageUrl !== "") 
                    ? <><img className="detail-image" src={this.props.realEstate.imageUrl} alt={this.props.realEstate.name} /><br /></>
                    : null }
                    {this.props.realEstate.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Property Type</h6>
                    {this.props.realEstate.reTypeId !== 0 ?
                    <h6 className="card-property">{this.props.realEstate.reType.type}</h6> 
                    : <h6 className="card-property">Other</h6>
                    }
                </div>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Address</h6>
                    <h6 className="card-property">{this.props.realEstate.address}</h6> 
                </div>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">City</h6>
                    <h6 className="card-property">{this.props.realEstate.city}</h6> 
                </div>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">State</h6>
                    <h6 className="card-property">{this.props.realEstate.state}</h6> 
                </div>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Zip</h6>
                    <h6 className="card-property">{this.props.realEstate.zip}</h6> 
                </div>
                {!this.props.realEstate.rent ? 
                <>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                    <h6 className="card-property">{this.props.realEstate.purchaseDate}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                    <h6 className="card-property">${Number(this.props.realEstate.purchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                </div>
                </> :
                null}
                {!this.props.realEstate.activeAsset ? 
                <>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                    <h6 className="card-property">{this.props.realEstate.disposalDate}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                    <h6 className="card-property">${Number(this.props.realEstate.disposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                </div>
                <div className="col-md-12 col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                    <h6 className="card-property">{this.props.realEstate.disposalNotes}</h6> 
                </div>
                </> :
                null}
                <div className="button-div">
                    <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/edit`)}>Edit</Button>
                    {this.props.realEstate.activeAsset ? 
                    <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/disposal`)}>Disposal</Button>
                    :
                    null}  
                    <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.deleteRealEstate(this.props.realEstate.id)}>Delete</Button>

                </div>  
            </Modal.Body>
            <Modal.Footer>
                    <Button className="modal-close" variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer> 
            </Modal>
        );
    }
    MyAssociatedPersonalProperty = props => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title className= "my-modal-title" id="contained-modal-title-vcenter">
                    <h6>Personal Property associated with {this.props.realEstate.name}</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="personalProperty-container-cards container-cards">
                    {this.state.personalProperty.map(personalProperty => 
                        <PersonalPropertyCard 
                        key={personalProperty.id}
                        personalProperty={personalProperty}
                        fromRealEstateCard = {this.state.fromRealEstateCard}
                        deletePersonalProperty = {this.deletePersonalProperty}
                        {...this.props}
                         />)}
                </div> 
            </Modal.Body>
            <Modal.Footer>
                    <Button className="modal-close" variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer> 
            </Modal>
        );
    }
    MyAssociatedVehicles = props => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title className= "my-modal-title" id="contained-modal-title-vcenter">
                    <h6>Vehicles associated with {this.props.realEstate.name}</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="personalProperty-container-cards container-cards">
                    {this.state.vehicles.map(vehicle => 
                        <VehiclesCard 
                        key={vehicle.id}
                        vehicle={vehicle}
                        fromRealEstateCard = {this.state.fromRealEstateCard}
                        deleteVehicle = {this.deleteVehicle}
                        {...this.props}
                         />)}
                </div> 
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

    AssociatedPP = () => {
        const [modalShow, setModalShow] = React.useState(false);

        return (
            <ButtonToolbar>
            <Button className="button-card" variant="secondary" onClick={() => setModalShow(true)}>
                Personal Property
            </Button>

            <this.MyAssociatedPersonalProperty
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            </ButtonToolbar>
        );
    }

    AssociatedVehicles = () => {
        const [modalShow, setModalShow] = React.useState(false);

        return (
            <ButtonToolbar>
            <Button className="button-card" variant="secondary" onClick={() => setModalShow(true)}>
                Vehicles
            </Button>

            <this.MyAssociatedVehicles
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            </ButtonToolbar>
        );
    }
    
    render () {
        return (
            <React.Fragment>
                <div className="card-medium">
                    <div className = "card-content-small">
                        <Card.Title className="card-title-small">
                        {(this.props.realEstate.imageUrl !== "") 
                        ? <><img className="card-image" src={this.props.realEstate.imageUrl} alt={this.props.realEstate.name} /><br /></>
                        : null }
                            {this.props.realEstate.name}
                        </Card.Title>
                        <this.App />
                        <this.AssociatedPP />
                        <this.AssociatedVehicles />
                        <div className="card-format-small">
                            <div className="col-md-12">
                                {/* <h6 className="row-sm-10 row-form-label">Address</h6> */}
                                <h6 className="card-property-small">{this.props.realEstate.address}</h6> 
                            </div>
                            <div className="col-md-12">
                                <h6 className="card-property-small">{this.props.realEstate.city}
                                <p>{this.props.realEstate.state}</p></h6> 
                            </div>
                        </div> 
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RealEstateCard