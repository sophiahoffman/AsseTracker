import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';

class RealEstateEdit extends Component {
    objectId = this.props.match.params.realEstateId

    state = {
        realEstateName: "",
        realEstateTypeId: "",
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
    };

    componentDidMount() {
        RealEstateAPIManager.getOneRealEstate(this.objectId)
        .then(item => {
            this.setState({
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
                })
        })
    }

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

    constructUpdatedRealEstate = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const updatedRealEstate = {
            id: this.objectId,
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
            disposalDate: this.state.realEstateDisposalDate,
            disposalPrice: this.state.realEstateDisposalPrice,
            disposalNotes: this.state.realEstateDisposalNotes,
        }
        RealEstateAPIManager.updateRealEstate(updatedRealEstate)
        .then(() => this.props.history.push("/realestate"));
    }

    render() {
        return (
            <div id="realEstateUpdateForm">
                <h3 id="title_updateForm">Update Form <br />
                {this.state.realEstateName}</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={this.state.realEstateName} id="realEstateName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    {/* need to make a dropdown menu or add new reType */}
                    <Form.Group>
                        <Form.Label>Real Estate Type</Form.Label>
                        <Form.Control type="text" placeholder="Enter Type" value={this.state.realEstateType} id="realEstateType" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Street Address" value={this.state.realEstateAddress} id="realEstateAddress" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" value={this.state.realEstateCity} id="realEstateCity" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" value={this.state.realEstateState} id="realEstateState" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="Enter Zip" value={this.state.realEstateZip} id="realEstateZip" onChange={this.handleFieldChange} />
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
                        <Form.Control type="text" placeholder="Enter Purchase Date" value={this.state.realEstatePurchaseDate} id="realEstatePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" value={this.state.realEstatePurchasePrice} id="realEstatePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedRealEstate}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default RealEstateEdit