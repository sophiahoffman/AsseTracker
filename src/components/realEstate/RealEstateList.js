// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Radio, RadioGroup} from 'react-radio-group';
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import RealEstateCard from './RealEstateCard';
import './RealEstateList.css'

class RealEstateList extends Component {
    state = {
        realEstate: [],
        loadingStatus: true,
        selectedValue: "active"
    }

    componentDidMount() {
        this.setRealEstateState()
    }
    setRealEstateState = () => {
        this.setState({loadingStatus: false})
        if (this.state.selectedValue === "active") {
            return (
                RealEstateAPIManager.getActiveRealEstate()
                .then(realEstate => {
                    this.setState({
                    realEstate: realEstate,
                    })
                })
            )
        } else if (this.state.selectedValue === "disposed") {
            return (
                RealEstateAPIManager.getDisposedRealEstate()
                .then(realEstate => {
                    this.setState({
                    realEstate: realEstate,
                    })
                })
            )
        } else {
            return (
                RealEstateAPIManager.getAllRealEstate()
                .then(realEstate => {
                    this.setState({
                    realEstate: realEstate,
                    })
                })
            )
        }
    }

    updateRealEstateState = e => {
        this.setState({loadingStatus: true})
        e.preventDefault();
        this.setRealEstateState()
    }

    handleChange = value => {
    this.setState({selectedValue: value});
    }
    
    deleteRealEstate = realEstateId => {
        this.setState({loadingStatus: true})
        RealEstateAPIManager.deleteRealEstate(realEstateId)
        .then(() => this.setRealEstateState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new realEstate-section-content">
                    <Button variant="secondary" type="button" className="newArticleBtn" onClick={() => this.props.history.push("realestate/new")}>Add New Property</Button>
                </div>
                <form className="form-radio" onSubmit={this.updateRealEstateState}>
                    <RadioGroup className="radio-button-group" name="assetDisplay" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
                        <label>
                            <Radio value="active" className="radio-button"  />  Active
                        </label>
                        <label>
                            <Radio value="disposed" className="radio-button"  />  Disposed
                        </label>
                        <label>
                            <Radio value="all" className="radio-button"  />  All
                        </label>
                    </RadioGroup>
                    <Button variant="secondary" type="submit">Display</Button>
                </form>
                <div className="realEstate-container-cards container-cards" align="center">
                    {this.state.realEstate.map(realEstate =>
                        <RealEstateCard 
                        key={realEstate.id}
                        realEstate={realEstate}
                        deleteRealEstate = {this.deleteRealEstate}
                        {...this.props} /> )}
                </div>
            </React.Fragment>
            

        )
    }
}

export default RealEstateList