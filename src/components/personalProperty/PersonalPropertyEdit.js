import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager';
import APIManager from '../../modules/APIManager';
import Cloudinary from '../../ignore';

// PersonalPropertyEdit prefills current database data and allows user to overwrite the values and update the item in the personalproperty table using PATCH. First it gets the personal property types from ppTypes table and provides those options in a dropdown. But the form also provides an option to fill in a text input and add to the ppTypes table. That new typeId is added to the object and written to the personalproperty table. 

class PersonalPropertyEdit extends Component {
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
        console.log("objectId", this.objectId)
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

    uploadWidget = () => {
        window.cloudinary.openUploadWidget({ cloud_name: Cloudinary.cloudName, upload_preset: Cloudinary.uploadPreset, tags:['atag']},
        (error, result) => {
            // Just like other input forms, changing state so that the imageUrl property will contain the URL of the uploaded image
            this.setState({personalPropertyImageUrl: `https://res.cloudinary.com/anymouse/image/upload/v1576529805/${result[0].public_id}`})
        });
    }

    constructUpdatedPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        if (this.state.personalPropertyType !== "") {
            this.handleOtherInput()
            .then(result => {
                const updatedPersonalProperty = {
                    id: this.objectId,
                    name: this.state.personalPropertyName.toUpperCase(),
                    ppTypeId: Number(result.id),
                    description: this.state.personalPropertyDescription.toUpperCase(),
                    manufacturer: this.state.personalPropertyManufacturer.toUpperCase(),
                    model: this.state.personalPropertyModel.toUpperCase(),
                    location: this.state.personalPropertyLocation.toUpperCase(),
                    purchaseLocation: this.state.personalPropertyPurchaseLocation.toUpperCase(),
                    purchaseDate: this.state.personalPropertyPurchaseDate,
                    purchasePrice: Number(this.state.personalPropertyPurchasePrice).toFixed(2),
                    activeAsset: this.state.personalPropertyActiveAsset,
                    // Cloudinary: added image URL
                    imageUrl: this.state.personalPropertyImageUrl,
                    disposalDate: this.state.personalPropertyDisposalDate,
                    disposalPrice: Number(this.state.personalPropertyDisposalPrice).toFixed(2),
                    disposalNotes: this.state.personalPropertyDisposalNotes.toUpperCase(),
                }
                PersonalPropertyAPIManager.updatePersonalProperty(updatedPersonalProperty)
                .then(() => this.props.history.push("/personalproperty"));
            })
        } else {
            const updatedPersonalProperty = {
                    id: this.objectId,
                    name: this.state.personalPropertyName.toUpperCase(),
                    ppTypeId: Number(this.state.personalPropertyTypeId),
                    description: this.state.personalPropertyDescription.toUpperCase(),
                    manufacturer: this.state.personalPropertyManufacturer.toUpperCase(),
                    model: this.state.personalPropertyModel.toUpperCase(),
                    location: this.state.personalPropertyLocation.toUpperCase(),
                    purchaseLocation: this.state.personalPropertyPurchaseLocation.toUpperCase(),
                    purchaseDate: this.state.personalPropertyPurchaseDate,
                    purchasePrice: Number(this.state.personalPropertyPurchasePrice).toFixed(2),
                    activeAsset: this.state.personalPropertyActiveAsset,
                    // Cloudinary: added image URL
                    imageUrl: this.state.personalPropertyImageUrl,
                    disposalDate: this.state.personalPropertyDisposalDate,
                    disposalPrice: Number(this.state.personalPropertyDisposalPrice).toFixed(2),
                    disposalNotes: this.state.personalPropertyDisposalNotes.toUpperCase(),
                }
                PersonalPropertyAPIManager.updatePersonalProperty(updatedPersonalProperty)
                .then(() => this.props.history.push("/personalproperty"));
        }
    }

    render() {
        return (
            <div id="personalPropertyEditForm">
                <h3 id="title_editForm">Property Edit Form</h3>
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Name</Form.Label>
                        <Form.Control autoFocus="autofocus" type="text" id="personalPropertyName" value={this.state.personalPropertyName} onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Select Item Type</Form.Label>
                        <Form.Control as="select" id="personalPropertyTypeId" value={this.state.personalPropertyTypeId} onChange={this.handleFieldChange} >
                        {this.state.personalPropertyTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Or Enter Item Type (if not on the Select)</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyType} id="personalPropertyType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Description</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyDescription} id="personalPropertyDescription" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Manufacturer</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyManufacturer} id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Model</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyModel} id="personalPropertyModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Physical Location</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyLocation} id="personalPropertyLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Location</Form.Label>
                        <Form.Control type="text" value={this.state.personalPropertyPurchaseLocation}  id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Date</Form.Label>
                        <Form.Control type="date" value={this.state.personalPropertyPurchaseDate} id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="row-sm-2 row-form-label">Purchase Price</Form.Label>
                        <Form.Control type="number" value={this.state.personalPropertyPurchasePrice} id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* This image tag will contain the uploaded image because we are using the imageUrl property in state which we change when the image is uploaded*/}
                    <img align="center" className="uploadImage" src={this.state.personalPropertyImageUrl} alt=""/><br />
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.uploadWidget.bind(this)} className="upload-button">Add Image
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedPersonalProperty}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyEdit