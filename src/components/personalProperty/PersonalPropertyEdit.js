import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager';
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore';

// PersonalPropertyEdit prefills current database data and allows user to overwrite the values and update the item in the personalproperty table using PATCH. First it gets the personal property types from ppTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the ppTypes table. That new typeId is added to the object and written to the personalproperty table. 

class PersonalPropertyEdit extends Component {
    objectId = this.props.match.params.personalPropertyId
    userId = sessionStorage.getItem("userId")

    state = {
        personalPropertyName: "",
        personalPropertyTypeId: "",
        personalPropertyType: "",
        personalPropertyTypes: [],
        personalPropertyDescription: "",
        personalPropertyManufacturer: "",
        personalPropertyModel: "",
        personalPropertyLocationId: "",
        personalPropertyLocations: [],
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
        let locations = `realEstates?userId=${this.userId}&&_sort=id&&_order=asc`
        APIManager.get(propType)
        .then(results => {
            this.setState({personalPropertyTypes: results})
        })
        .then(() => APIManager.get(locations))
        .then(results => {
            this.setState({personalPropertyLocations: results})
        })
        .then(result => PersonalPropertyAPIManager.getOnePersonalProperty(this.objectId))
        .then(item => {
            this.setState({
                personalPropertyName: item.name,
                personalPropertyTypeId: item.ppTypeId,
                personalPropertyDescription: item.description,
                personalPropertyManufacturer: item.manufacturer,
                personalPropertyModel: item.model,
                personalPropertyLocationId: item.realEstateId,
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

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };
// handleOtherInput is run at form submit. Creates new type based on whether or not there is any text entered in id="personalPropertyType"
    handleOtherInput = e => {
        let route = "ppTypes"
        let newTypeObject = {
            type: this.state.personalPropertyType
        }
        return APIManager.post(route, newTypeObject)
    };
// Cloudinary widget to upload images
    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: Cloudinary.cloudName, upload_preset: Cloudinary.uploadPreset, tags:['atag']},
        (error, result) => {
            // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
            if (result) {
                this.setState({personalPropertyImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
            } else {
                window.close()           
            }
        });
    }

    createPostUpdatedPersonalProperty = ppTypeId => {
        const updatedPersonalProperty = {
            id: this.objectId,
            name: this.state.personalPropertyName,
            ppTypeId: Number(ppTypeId),
            description: this.state.personalPropertyDescription,
            manufacturer: this.state.personalPropertyManufacturer,
            model: this.state.personalPropertyModel,
            location: this.state.personalPropertyLocation,
            realEstateId: Number(this.state.personalPropertyLocationId),
            purchaseLocation: this.state.personalPropertyPurchaseLocation,
            purchaseDate: this.state.personalPropertyPurchaseDate,
            purchasePrice: Number(this.state.personalPropertyPurchasePrice).toFixed(2),
            activeAsset: this.state.personalPropertyActiveAsset,
            // Cloudinary: added image URL
            imageUrl: this.state.personalPropertyImageUrl,
            disposalDate: this.state.personalPropertyDisposalDate,
            disposalPrice: Number(this.state.personalPropertyDisposalPrice).toFixed(2),
            disposalNotes: this.state.personalPropertyDisposalNotes,
        }
        PersonalPropertyAPIManager.updatePersonalProperty(updatedPersonalProperty)
        .then(() => this.props.history.push("/personalproperty"));
    }

    constructUpdatedPersonalProperty = e => {
        let ppTypeId = this.state.personalPropertyTypeId
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.personalPropertyType !== "") {
            this.handleOtherInput()
            .then(result => {
                ppTypeId = result.id
                this.createPostUpdatedPersonalProperty(ppTypeId)
            })
        } else {
            this.createPostUpdatedPersonalProperty(ppTypeId)
        }
    }

    render() {
        return (
            <div className="update-form">
                <h4 id="title_editForm">{this.state.personalPropertyName}</h4>

                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                    <Form.Control autoFocus="autofocus" type="text" id="personalPropertyName" value={this.state.personalPropertyName} onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Select Item Type</Form.Label>
                    <Form.Control as="select" id="personalPropertyTypeId" value={this.state.personalPropertyTypeId} onChange={this.handleFieldChange} >
                        {this.state.personalPropertyTypes.map(type => (
                            <option key={`type-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        <option key={`type-option-0`} value={0}>Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Or Enter Other Type</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyType} id="personalPropertyType" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Description</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyDescription} id="personalPropertyDescription" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Manufacturer</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyManufacturer} id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Model</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyModel} id="personalPropertyModel" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Select Location</Form.Label>
                    <Form.Control as="select" id="personalPropertyLocationId" onChange={this.handleFieldChange} value={this.state.personalPropertyLocationId}>
                        {this.state.personalPropertyLocations.map(location => (
                            <option key={`location-option-${location.id}`} value={location.id}>{location.name}</option>
                        ))}
                        <option key={`location-option-0`} value={0}></option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Physical Location</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyLocation} id="personalPropertyLocation" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Location</Form.Label>
                    <Form.Control type="text" value={this.state.personalPropertyPurchaseLocation}  id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                    <Form.Control type="date" value={this.state.personalPropertyPurchaseDate} id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-8 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                    <Form.Control type="number" value={this.state.personalPropertyPurchasePrice} id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                </Form.Group>
                {!this.state.personalPropertyActiveAsset ? 
                <>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Date</Form.Label>
                        <Form.Control type="date" value={this.state.personalPropertyDisposalDate}  id="personalPropertyDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Price</Form.Label>
                        <Form.Control type="number" value={this.state.personalPropertyDisposalPrice} id="personalPropertyDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-8 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Disposal Notes</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyDisposalNotes} id="personalPropertyDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                </> :
                null} 
                {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
                <img className="detail-image" src={this.state.personalPropertyImageUrl} alt=""/><br />
                <div className="image-upload-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.uploadWidget.bind(this)} className="upload-button">Replace Image
                    </Button>
                </div>
                <div className="button-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedPersonalProperty}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

export default PersonalPropertyEdit