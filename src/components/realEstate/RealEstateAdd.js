import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager'

class RealEstateAdd extends Component {
    state = {
        realEstateName: "",
        realEstateTypeId: "",
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

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    handleCheckbox = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.checked
        this.setState(stateToChange)
    }

    constructNewRealEstate = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
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
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="realEstateName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* need to make a dropdown menu or add new reType */}
                    <Form.Group>
                        <Form.Label>Real Estate Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" id="realEstateTypeId" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street Address" id="realEstateAddress" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" id="realEstateCity" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" id="realEstateState" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zip</Form.Label>
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
                    <Form.Group>
                        <Form.Label>Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" id="realEstatePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" id="realEstatePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructNewRealEstate}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default RealEstateAdd