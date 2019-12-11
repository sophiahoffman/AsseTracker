import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PersonalPropertyAPIManager from '../../modules/PersonalPropertyAPIManager'
import APIManager from '../../modules/APIManager';

class PersonalPropertyAdd extends Component {
    state = {
        personalPropertyName: "",
        personalPropertyTypeId: "",
        personalPropertyTypes: [],
        personalPropertyDescription: "",
        personalPropertyManufacturer: "",
        personalPropertyModel: "",
        personalPropertyLocation: "",
        personalPropertyPurchaseLocation: "",
        personalPropertyPurchaseDate: "",
        personalPropertyPurchasePrice: "",
        personalPropertyActiveAsset: true,
        loadingStatus: false,
    };

    componentDidMount() {
        this.getPPTypes()
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    handleOtherInput = e => {
        let route = "ppTypes"
        console.log("length", this.state.ppTypes.length)
        let ppTypeId = this.state.ppTypes.length+1
        this.setState({ppTypeId: ppTypeId})
        let newTypeObject = {
            id: Number(this.state.ppTypeId),
            type: this.state.ppType
        }
        return APIManager.post(route, newTypeObject)
    };

    getPPTypes = () => {
        let propType = 'ppTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            this.setState({personalPropertyTypes: results})
        })
    }

    constructNewPersonalProperty = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const newPersonalProperty = {
            userId: Number(localStorage.getItem("userId")),
            name: this.state.personalPropertyName,
            ppTypeId: Number(this.state.personalPropertyTypeId),
            description: this.state.personalPropertyDescription,
            manufacturer: this.state.personalPropertyManufacturer,
            model: this.state.personalPropertyModel,
            location: this.state.personalPropertyLocation,
            purchaseLocation: this.state.personalPropertyPurchaseLocation,
            purchaseDate: this.state.personalPropertyPurchaseDate,
            purchasePrice: this.state.personalPropertyPurchasePrice,
            activeAsset: this.state.personalPropertyActiveAsset,
        }
        PersonalPropertyAPIManager.postPersonalProperty(newPersonalProperty)
        .then(() => this.props.history.push("/personalproperty"));
    }

    render() {
        return (
            <div id="newPersonalPropertyForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="personalPropertyName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Select Item Type</Form.Label>
                        <Form.Control as="select" id="personalPropertyTypeId">
                        {this.state.personalPropertyTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Or Enter Item Type (if not on the Select)</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="personalPropertyType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" id="personalPropertyDescription" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type="text" placeholder="Enter Manufacturer" id="personalPropertyManufacturer" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Enter Model" id="personalPropertyModel" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Physical Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Physical Location" id="personalPropertyLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Location</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Location" id="personalPropertyPurchaseLocation" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="personalPropertyPurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="personalPropertyPurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructNewPersonalProperty}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default PersonalPropertyAdd