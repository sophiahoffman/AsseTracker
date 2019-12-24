// @authored by Sophia Hoffman

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import RealEstateCard from './RealEstateCard';
import './RealEstateList.css'

class RealEstateList extends Component {
    state = {
        realEstate: [],
        loadingStatus: true
    }

    componentDidMount() {
        this.setRealEstateState()
    }

    setRealEstateState = () => {
        this.setState({loadingStatus: false})
        RealEstateAPIManager.getAllRealEstate()
        .then(realEstate => {
            this.setState({
            realEstate: realEstate,
            })
        })
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