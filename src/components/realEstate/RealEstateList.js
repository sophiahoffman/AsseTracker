import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RealEstateAPIManager from '../../modules/RealEstateAPIManager';
import RealEstateCard from './RealEstateCard';

class RealEstateList extends Component {
    state = {
        realEstate: []
    }

    componentDidMount() {
        this.setRealEstateState()
    }

    setRealEstateState = () => {
        RealEstateAPIManager.getAllRealEstate()
        .then(realEstate => {
            this.setState({
            realEstate: realEstate,
            })
        })
    }

    
    deleteRealEstate = realEstateId => {
        RealEstateAPIManager.deleteRealEstate(realEstateId)
        .then(() => this.setRealEstateState())
    }

    render() {
        return (
            <React.Fragment>
                <div className="button-new realEstate-section-content" align="center">
                    <Button variant="primary" type="button" className="newArticleBtn" onClick={() => this.props.history.push("realestate/new")}>Add New Property</Button>
                </div>
                <div className="realEstate-container-cards" align="center">
                    {this.state.realEstate.map(realEstate => 
                        <RealEstateCard 
                        key={realEstate.id}
                        realEstate={realEstate}
                        deleteRealEstate = {this.deleteRealEstate}
                        {...this.props} />)}
                </div>
            </React.Fragment>
            

        )
    }
}

export default RealEstateList