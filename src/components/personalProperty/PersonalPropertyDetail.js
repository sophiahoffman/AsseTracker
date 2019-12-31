// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import APIManager from '../../modules/APIManager'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import './PersonalPropertyCard.css'
import '../../AsseTracker.css'

class PersonalPropertyCard extends Component {
    objectId = this.props.match.params.personalPropertyId

    state = {
        personalPropertyName: "",
        personalPropertyTypeId: "",
        personalPropertyType: "",
        personalPropertyTypes: [],
        personalPropertyDescription: "",
        personalPropertyManufacturer: "",
        personalPropertyModel: "",
        personalPropertyLocation: "",
        personalPropertyPurchaseLocation: "",
        personalPropertyPurchaseDate: "",
        personalPropertyPurchasePrice: "",
        personalPropertyActiveAsset: true,
        personalPropertyDisposalDate: "",
        personalPropertyDisposalPrice: "",
        personalPropertyDisposalNotes: "",
        loadingStatus: false,
        // Cloudinary added imageURL
        personalPropertyImageUrl: "",
    };

    componentDidMount() {
        let propType = 'ppTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({personalPropertyTypes: results})
        })
        .then(result => PersonalPropertyAPIManager.getOnePersonalProperty(this.objectId))
        .then(item => {
            this.setState({
                personalPropertyName: item.name,
                personalPropertyTypeId: item.ppTypeId,
                personalPropertyType: item.ppType.type,
                personalPropertyDescription: item.description,
                personalPropertyManufacturer: item.manufacturer,
                personalPropertyModel: item.model,
                personalPropertyLocation: item.location,
                personalPropertyPurchaseLocation: item.purchaseLocation,
                personalPropertyPurchaseDate: item.purchaseDate,
                personalPropertyPurchasePrice: item.purchasePrice,
                personalPropertyActiveAsset: item.activeAsset,
                // Cloudinary: added image URL
                personalPropertyImageUrl: item.imageUrl,
                personalPropertyDisposalDate: item.disposalDate,
                personalPropertyDisposalPrice: item.disposalPrice,
                personalPropertyDisposalNotes: item.disposalNotes,})
        })
    }

    render() {
    return (
        <React.Fragment>
            <div className="card">
                <div className = "card-content">

                    <Card.Title className="card-format">
                        {(this.state.personalPropertyImageUrl !== "") 
                        ? <><img src={this.state.personalPropertyImageUrl} alt={this.state.personalPropertyName} /><br /></>
                        : null }
                        {this.state.personalPropertyName}
                    </Card.Title><hr />
                    <div className="card-format">
                    
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Property Type</h6>
                            <h6 className="card-property">{this.state.personalPropertyType}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Description</h6>
                            <h6 className="card-property">{this.state.personalPropertyDescription}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Manufacturer</h6>
                            <h6 className="card-property">{this.state.personalPropertyManufacturer}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Model</h6>
                            <h6 className="card-property">{this.state.personalPropertyModel}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Physical Location</h6>
                            <h6 className="card-property">{this.state.personalPropertyLocation}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
                            <h6 className="card-property">{this.state.personalPropertyPurchaseLocation}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
                            <h6 className="card-property">{this.state.personalPropertyPurchaseDate}</h6> 
                        </div>
                        <div className="col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
                            <h6 className="card-property">${Number(this.state.personalPropertyPurchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                        </div>
                        {!this.state.personalPropertyActiveAsset ? 
                        <>
                        <div className="col-md-12 col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
                            <h6 className="card-property">{this.state.personalPropertyDisposalDate}</h6> 
                        </div>
                        <div className="col-md-12 col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
                            <h6 className="card-property">${Number(this.state.personalPropertyDisposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
                        </div>
                        <div className="col-md-12 col-md-12 form-group">
                            <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
                            <h6 className="card-property">{this.state.personalPropertyDisposalNotes}</h6> 
                        </div>
                        </> :
                        null}
                        <div className="button-div">
                            <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.objectId}/edit`)}>Edit</Button>
                            {this.state.personalPropertyActiveAsset ? 
                            <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.objectId}/disposal`)}>Disposal</Button>
                            :
                            null}  
                            <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.deletePersonalProperty(this.objectId)}>Delete</Button>

                        </div>                        
                    </div>
                </div>
            </div>
        </React.Fragment>
        // <React.Fragment>
        //     <div className="card">
        //         <div className = "card-content">
        //             <Card.Title>
        //                 {(this.props.personalProperty.imageUrl !== "") 
        //                 ? <><img className="asset-image" src={this.props.personalProperty.imageUrl} alt={this.props.personalProperty.name} /><br /></>
        //                 : null }
        //                 {this.props.personalProperty.name}
        //             </Card.Title><hr />
        //             <div className="card-format">
                    
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Property Type</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.ppType.type}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Description</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.description}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Manufacturer</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.manufacturer}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Model</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.model}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Physical Location</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.location}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Purchase Location</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.purchaseLocation}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Purchase Date</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.purchaseDate}</h6> 
        //                 </div>
        //                 <div className="col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Purchase Price</h6>
        //                     <h6 className="card-property">${Number(this.props.personalProperty.purchasePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
        //                 </div>
        //                 {!this.props.personalProperty.activeAsset ? 
        //                 <>
        //                 <div className="col-md-12 col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Disposal Date</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.disposalDate}</h6> 
        //                 </div>
        //                 <div className="col-md-12 col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Disposal Price</h6>
        //                     <h6 className="card-property">${Number(this.props.personalProperty.disposalPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h6> 
        //                 </div>
        //                 <div className="col-md-12 col-md-12 form-group">
        //                     <h6 className="row-sm-10 row-form-label">Disposal Notes</h6>
        //                     <h6 className="card-property">{this.props.personalProperty.disposalNotes}</h6> 
        //                 </div>
        //                 </> :
        //                 null}                        
        //             </div>
            
        //             <div className="button-div">
        //                 <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/edit`)}>Edit</Button>
        //                 {this.props.personalProperty.activeAsset ? 
        //                 <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalproperty/${this.props.personalProperty.id}/disposal`)}>Disposal</Button>
        //                 :
        //                 null}  
        //                 <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.deletePersonalProperty(this.props.personalProperty.id)}>Delete</Button>
                    
        //             </div>
        //         </div>
        //     </div>
        // </React.Fragment>
        )
    }
}

export default PersonalPropertyCard