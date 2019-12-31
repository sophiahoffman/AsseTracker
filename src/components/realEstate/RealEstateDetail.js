// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import APIManager from '../../modules/APIManager'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager'
import '../../AsseTracker.css'

class RealEstateDetail extends Component {
    objectId = this.props.match.params.realEstateId;

    state = {
        realEstateUserId: "",
        realEstateName: "",
        realEstateTypeId: "",
        realEstateTypes: [],
        realEstateType: "",
        realEstateAddress: "",
        realEstateCity: "",
        realEstateState: "",
        realEstateZip: "",
        realEstatePurchaseDate: "",
        realEstatePurchasePrice: "",
        rentCheckbox: false,
        realEstateDisposalDate: "",
        realEstateDisposalPrice: "",
        realEstateDisposalNotes: "",
        realEstateActiveAsset: true,
        loadingStatus: false,
        // Cloudinary added imageURL
        realEstateImageUrl: "",
    };

    componentDidMount() {
        let propType = 'reTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({realEstateTypes: results})
        })
        RealEstateAPIManager.getOneRealEstate(this.objectId)
        .then(item => {
            this.setState({
                realEstateUserId: item.userId,
                realEstateName: item.name,
                realEstateTypeId: item.reTypeId,
                realEstateType: item.reType.type,
                realEstateAddress: item.address,
                realEstateCity: item.city,
                realEstateState: item.state,
                realEstateZip: item.zip,
                realEstatePurchaseDate: item.purchaseDate,
                realEstatePurchasePrice: item.purchasePrice,
                rentCheckbox: item.rent,
                realEstateDisposalDate: item.disposalDate,
                realEstateDisposalPrice: item.disposalPrice,
                realEstateDisposalNotes: item.disposalNotes,
                realEstateActiveAsset: item.activeAsset,
                loadingStatus: false,
                // Cloudinary: added image URL
                realEstateImageUrl: item.imageUrl,
                })
        })
    }

    render () {
        return (
            <React.Fragment>
                <div className="card">
                    <div className = "card-content">
                        <Card.Title className="card-format">
                        {(this.state.realEstateImageUrl !== "") 
                        ? <><img src={this.state.realEstateImageUrl} alt={this.state.realEstateName} /><br /></>
                        : null }
                            {this.state.realEstateName}
                        </Card.Title><hr />
                        <div className="card-format">
                            <div className="col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Property Type</h6>
                                <h6 className="card-property">{this.state.realEstateType}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Address</h6>
                                <h6 className="card-property">{this.state.realEstateAddress}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">City</h6>
                                <h6 className="card-property">{this.state.realEstateCity}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">State</h6>
                                <h6 className="card-property">{this.state.realEstateState}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Zip Code</h6>
                                <h6 className="card-property">{this.state.realEstateZip}</h6> 
                            </div>
                            {!this.state.rentCheckbox ? 
                            <>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                                <h6 className="card-property">{this.state.realEstatePurchaseDate}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                                <h6 className="card-property">${Number(this.state.realEstatePurchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            </> :
                            null}
                            {!this.state.realEstateActiveAsset ? 
                            <>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                                <h6 className="card-property">{this.state.realEstateDisposalDate}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                                <h6 className="card-property">${Number(this.state.realEstateDisposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                            </div>
                            <div className="col-md-12 col-md-12 form-group">
                                <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                                <h6 className="card-property">{this.state.realEstateDisposalNotes}</h6> 
                            </div>
                            </> :
                            null}
                            
                        </div> 
                        <div className="button-div">
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realestate/${this.objectId}/edit`)}>Edit</Button>
                            {this.state.realEstateActiveAsset ?     
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realestate/${this.objectId}/disposal`)}>Disposal</Button>
                            :
                            null}  
                            <Button variant="secondary" type="button" className="realEstate-button" onClick={() => this.props.deleteRealEstate(this.objectId)}>Delete</Button>
                        
                        </div>
                        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RealEstateDetail