// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card';
// import './PersonalPropertyCard.css';
import '../../AsseTracker.css';

class PersonalPropertyCard extends Component {

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
            <Modal.Title id="contained-modal-title-vcenter">
                {(this.props.personalProperty.imageUrl !== "") 
                ? <><img className="detail-image" src={this.props.personalProperty.imageUrl} alt={this.props.personalProperty.name} /><br /></>
                : null }
                {this.props.personalProperty.name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Property Type</h6>
                {this.props.personalProperty.ppTypeId !== 0 ?
                <h6 className="card-property">{this.props.personalProperty.ppType.type}</h6> 
                : <h6 className="card-property">Other</h6>
                }
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Description</h6>
                <h6 className="card-property">{this.props.personalProperty.description}</h6> 
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Manufacturer</h6>
                <h6 className="card-property">{this.props.personalProperty.manufacturer}</h6> 
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Model</h6>
                <h6 className="card-property">{this.props.personalProperty.model}</h6> 
            </div>

            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Location</h6>
                {this.props.personalProperty.realEstateId !== 0 ?
                <h6 className="card-property">{this.props.personalProperty.realEstate.name}</h6>
                : <h6 className="card-property">Other</h6>
                }
            </div>

            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Location Notes</h6>
                <h6 className="card-property">{this.props.personalProperty.location}</h6> 
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
                <h6 className="card-property">{this.props.personalProperty.purchaseLocation}</h6> 
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                <h6 className="card-property">{this.props.personalProperty.purchaseDate}</h6> 
            </div>
            <div className="col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                <h6 className="card-property">${Number(this.props.personalProperty.purchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
            </div>
            {!this.props.personalProperty.activeAsset ? 
            <>
            <div className="col-md-12 col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                <h6 className="card-property">{this.props.personalProperty.disposalDate}</h6> 
            </div>
            <div className="col-md-12 col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                <h6 className="card-property">${Number(this.props.personalProperty.disposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
            </div>
            <div className="col-md-12 col-md-12 form-group">
                <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                <h6 className="card-property">{this.props.personalProperty.disposalNotes}</h6> 
            </div>
            </> :
            null}
            {this.state.showButtons ?
            <div className="button-div">
                <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/edit`)}>Edit</Button>
                {this.props.personalProperty.activeAsset ? 
                <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/disposal`)}>Disposal</Button>
                :
                null}  
                <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.deletePersonalProperty(this.props.personalProperty.id)}>Delete</Button>
            </div>
            : null}  
        </Modal.Body>
        <Modal.Footer>
                <Button className="modal-close" variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer> 
        </Modal>
        )
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

    
    render() {
        return (
            <React.Fragment>
                <div className="card-small">
                    <div className = "card-content-small">
                        <Card.Title className="card-title-small">
                            {(this.props.personalProperty.imageUrl !== "") 
                            ? <><img className="card-image" src={this.props.personalProperty.imageUrl} alt={this.props.personalProperty.name} /><br /></>
                            : null }
                            {this.props.personalProperty.name}
                        </Card.Title>
                        <this.App />
                        <div className="col-md-12 card-format-small">
                            <h6 className="card-property">{this.props.personalProperty.description}</h6> 
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PersonalPropertyCard