import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';


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
            disposalPrice: this.state.realEstateDisposalPrice,
            disposalNotes: this.state.realEstateDisposalNotes,
            activeAsset: false,
        }
        RealEstateAPIManager.updateRealEstate(updatedRealEstate)
        .then(() => this.props.history.push("/realestate"));
    }

    render() {
        return (
            <div id="realEstateDisposalForm">
                <h3 id="title_disposalForm">Disposal Form <br />
                {this.state.realEstateName}</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Disposal Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Date" id="realEstateDisposalDate" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disposal Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Price" id="realEstateDisposalPrice" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Disposal Notes</Form.Label>
                        <Form.Control type="text" placeholder="Enter Disposal Notes" id="realEstateDisposalNotes" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" disabled={this.loadingStatus} onClick={this.constructUpdatedRealEstate}>
                        Submit
            </Button>
                </Form>
            </div>
        )
    }
}

export default RealEstateDisposal