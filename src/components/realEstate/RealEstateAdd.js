import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager'
import APIManager from '../../modules/APIManager';

class RealEstateAdd extends Component {


    state = {
        realEstateName: "",
        realEstateTypeId: "",
        realEstateType: "",
        realEstateTypes: [],
        realEstateAddress: "",
        realEstateCity: "",
        realEstateState: "",
        realEstateZip: "",
        realEstatePurchaseDate: "",
        realEstatePurchasePrice: "",
        realEstateActiveAsset: true,
        rentCheckbox: false,
        loadingStatus: false,
    };

    componentDidMount() {
        this.getRETypes()
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    handleOtherInput = e => {
        let route = "reTypes"
        console.log("length", this.state.reTypes.length)
        let reTypeId = this.state.reTypes.length+1
        this.setState({reTypeId: reTypeId})
        let newTypeObject = {
            id: Number(this.state.reTypeId),
            type: this.state.reType
        }
        return APIManager.post(route, newTypeObject)
    };

    getRETypes = () => {
        let propType = 'reTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            console.log("getTypes results", results)
            this.setState({realEstateTypes: results})
        })
    }

    handleCheckbox = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.checked
        this.setState(stateToChange)
    }

    constructNewRealEstate = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        this.handleOtherInput();
        const newRealEstate = {
            userId: Number(localStorage.getItem("userId")),
            name: this.state.realEstateName,
            reTypeId: Number(this.state.realEstateTypeId),
            address: this.state.realEstateAddress,
            city: this.state.realEstateCity,
            state: this.state.realEstateState,
            zip: this.state.realEstateZip,
            rent: this.state.rentCheckbox,
            purchaseDate: this.state.realEstatePurchaseDate,
            purchasePrice: this.state.realEstatePurchasePrice,
            activeAsset: this.state.realEstateActiveAsset,
        }
        RealEstateAPIManager.postRealEstate(newRealEstate)
        .then(() => this.props.history.push("/realestate"));
    }

    render() {
        return (
            <div id="newRealEstateForm">
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="realEstateName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Select Property Type</Form.Label>
                        <Form.Control as="select" id="realEstateTypeId" onChange={this.handleFieldChange}>
                        {this.state.vehicleTypes.map(type => (
                            <option key={`select-option-${type.id}`} value={type.id}>{type.type}</option>
                        ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Or Enter Other Real Estate Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="realEstateType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Street Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street Address" id="realEstateAddress" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" id="realEstateCity" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" id="realEstateState" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Zip</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip" id="realEstateZip" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check 
                        name="realEstateRent"
                        label="Check if you're renting"
                        checked={this.state.rentCheckbox}
                        onChange={this.handleCheckbox}
                        id="rentCheckbox" />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="realEstatePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="realEstatePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructNewRealEstate}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default RealEstateAdd