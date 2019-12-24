// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import '../../AsseTracker.css'

// RealEstateDisposal allows user to add additional information about getting rid of the property and then removes the property from view. Data regarding the specific item is essentially archived.
class RealEstateDisposal extends Component {
    objectId = this.props.match.params.realEstateId

    state = {
        realEstateName: "",
        realEstateDisposalDate: "",
        realEstateDisposalPrice: "",
        realEstateDisposalNotes: "",
        realEstateActiveAsset: true,
        loadingStatus: false,
    };

    componentDidMount() {
        RealEstateAPIManager.getOneRealEstate(this.objectId)
        .then(item => {
            this.setState({realEstateName: item.name})
        })
    }

    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    };

    constructUpdatedRealEstate = e => {
        e.preventDefault();
        this.setState({loadingStatus:true});
        const updatedRealEstate = {
            id: this.objectId,
            disposalDate: this.state.realEstateDisposalDate,
            disposalPrice: Number(this.state.realEstateDisposalPrice).toFixed(2),
            disposalNotes: this.state.realEstateDisposalNotes.toUpperCase(),
            activeAsset: false,
        }
        RealEstateAPIManager.updateRealEstate(updatedRealEstate)
        .then(() => this.props.history.push("/realestate"));
    }

    render() {
        return (
            <div className="disposal-form">
                <h4 id="title_disposalForm">{this.state.realEstateName}</h4>

                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Disposal Date</Form.Label>
                    <Form.Control autoFocus="autofocus" type="date" id="realEstateDisposalDate" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Disposal Price</Form.Label>
                    <Form.Control type="number" id="realEstateDisposalPrice" onChange={this.handleFieldChange} />
                </Form.Group>
                <Form.Group className="col-md-12 form-group form-inline">
                    <Form.Label className="row-sm-2 row-form-label">Disposal Notes</Form.Label>
                    <Form.Control type="text" id="realEstateDisposalNotes" onChange={this.handleFieldChange} />
                </Form.Group>
                <div className="button-div">
                    <Button variant="secondary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedRealEstate}>Submit
                    </Button>
                    <Button variant="secondary" type="button" disabled={this.state.loadingStatus} 
                    onClick={this.props.history.goBack}>Cancel
                    </Button>
                </div>

            </div>
        )
    }
}

export default RealEstateDisposal