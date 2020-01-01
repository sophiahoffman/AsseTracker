// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import '../../AsseTracker.css'

class RealEstateCard extends Component {
    render () {
        return (
            <React.Fragment>
                <div className="card-small">
                    <div className = "card-content-small">
                    <a href={'realestate/'+ this.props.realEstate.id}>
                        <Card.Title className="card-title-small">
                        {(this.props.realEstate.imageUrl !== "") 
                        ? <><img className="card-image" src={this.props.realEstate.imageUrl} alt={this.props.realEstate.name} /><br /></>
                        : null }
                            {this.props.realEstate.name}
                        </Card.Title>
                        </a>
                        <div className="card-format-small">
                            {/* <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Property Type</h6>
                                <h6 className="card-property">{this.props.realEstate.reType.type}</h6> 
                            </div> */}
                            <div className="col-md-12">
                                {/* <h6 className="row-sm-10 row-form-label">Address</h6> */}
                                <h6 className="card-property-small">{this.props.realEstate.address}</h6> 
                            </div>
                            <div className="col-md-12">
                                <h6 className="card-property-small">{this.props.realEstate.city}, {this.props.realEstate.state}</h6> 
                            </div>
                            {/* 
                            {!this.props.realEstate.rent ? 
                            <>
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                                <h6 className="card-property">{this.props.realEstate.purchaseDate}</h6> 
                            </div>
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                                <h6 className="card-property">${Number(this.props.realEstate.purchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            </> :
                            null}
                            {!this.props.realEstate.activeAsset ? 
                            <>
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                                <h6 className="card-property">{this.props.realEstate.disposalDate}</h6> 
                            </div>
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                                <h6 className="card-property">${Number(this.props.realEstate.disposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                                <h6 className="card-property">{this.props.realEstate.disposalNotes}</h6> 
                            </div>
                            </> :
                            null}
                            
                        </div> 
                        <div className="button-div">
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realestate/${this.props.realEstate.id}/edit`)}>Edit</Button>
                            {this.props.realEstate.activeAsset ?     
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realestate/${this.props.realEstate.id}/disposal`)}>Disposal</Button>
                            :
                            null}  
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.deleteRealEstate(this.props.realEstate.id)}>Delete</Button>
                        */}
                        </div> 
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RealEstateCard