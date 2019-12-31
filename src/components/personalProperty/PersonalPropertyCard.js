// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './PersonalPropertyCard.css'
import '../../AsseTracker.css'

class PersonalPropertyCard extends Component {
    render() {
    return (
        <React.Fragment>
            <div className="card">
                <div className = "card-content">
                    <Card.Title>
                        {(this.props.personalProperty.imageUrl !== "") 
                        ? <><img className="asset-image" src={this.props.personalProperty.imageUrl} alt={this.props.personalProperty.name} /><br /></>
                        : null }
                        {this.props.personalProperty.name}
                    </Card.Title><hr />
                    <div className="card-format">
                    
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Property Type</h6>
                            <h6 className="card-property">{this.props.personalProperty.ppType.type}</h6> 
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
                            <h6 className="row-sm-10 row-form-label">Physical Location</h6>
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
                    </div>
            
                    <div className="button-div">
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/edit`)}>Edit</Button>
                        {this.props.personalProperty.activeAsset ? 
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/disposal`)}>Disposal</Button>
                        :
                        null}  
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.deletePersonalProperty(this.props.personalProperty.id)}>Delete</Button>
                    
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default PersonalPropertyCard