import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import APIManager from '../../modules/APIManager';

class RealEstateEdit extends Component {
    objectId = this.props.match.params.realEstateId;

    state = {
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
    };

    componentDidMount() {
        console.log("componentDidMount")
        let propType = 'reTypes?_sort=id&&_order=asc'
        APIManager.get(propType)
        .then(results => {
            console.log("getTypes results", results)
            this.setState({realEstateTypes: results})
            console.log(this.state.realEstateTypes)
        })
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
    
    handleCheckbox = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.checked
        this.setState(stateToChange)
    }

    constructUpdatedRealEstate = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        this.handleOtherInput()
        .then(result => {
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
    })
    }

    render() {
        return (
            <div id="realEstateUpdateForm">
                <h3 id="title_updateForm">Update Form <br />
                {this.state.realEstateName}</h3>
                <Form>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={this.state.realEstateName} id="realEstateName" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Select Property Type</Form.Label>
                        <Form.Control as="select" id="realEstateTypeId" >
                        {this.state.realEstateTypes.map(type => (
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
                        <Form.Control type="text" placeholder="Enter Street Address" value={this.state.realEstateAddress} id="realEstateAddress" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">City</Form.Label>
                        <Form.Control type="text" placeholder="Enter City" value={this.state.realEstateCity} id="realEstateCity" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">State</Form.Label>
                        <Form.Control type="text" placeholder="Enter State" value={this.state.realEstateState} id="realEstateState" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Zip</Form.Label>
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
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Date" value={this.state.realEstatePurchaseDate} id="realEstatePurchaseDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group className="col-md-12 form-group form-inline">
                        <Form.Label className="col-sm-2 col-form-label">Purchase Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Purchase Price" value={this.state.realEstatePurchasePrice} id="realEstatePurchasePrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedRealEstate}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default RealEstateEdit