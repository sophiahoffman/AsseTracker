// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import '../../AsseTracker.css';

class RealEstateCard extends Component {
        MyVerticallyCenteredModal = props => {
        return (
            <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {(this.props.realEstate.imageUrl !== "") 
                    ? <><img className="detail-image" src={this.props.realEstate.imageUrl} alt={this.props.realEstate.name} /><br /></>
                    : null }
                    {this.props.realEstate.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-12 form-group">
                    <h6 className="row-sm-10 row-form-label">Property Type</h6>
                    <h6 className="card-property">{this.props.realEstate.reType.type}</h6> 
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
                        {(this.props.realEstate.imageUrl !== "") 
                        ? <><img className="card-image" src={this.props.realEstate.imageUrl} alt={this.props.realEstate.name} /><br /></>
                        : null }
                            {this.props.realEstate.name}
                        </Card.Title>
                        <this.App />
                        <div className="card-format-small">
                            <div className="col-md-12">
                                {/* <h6 className="row-sm-10 row-form-label">Address</h6> */}
                                <h6 className="card-property-small">{this.props.realEstate.address}</h6> 
                            </div>
                            <div className="col-md-12">
                                <h6 className="card-property-small">{this.props.realEstate.city}, {this.props.realEstate.state}</h6> 
                            </div>
                        </div> 
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RealEstateCard