import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'

class WelcomeAsseTracker extends Component {

    state = {
        realEstateArray: [],
        vehiclesArray: [],
        personalPropertyArray: [],
        realEstateTotal: "",
        vehiclesTotal: "",
        personalPropertyTotal: "",

        userId: sessionStorage.getItem("userId"),
        personalPropertyImage: require("../../assets/personal_property.png"),
        realEstateImage: require("../../assets/real_estate.png"),
        vehicleImage: require("../../assets/vehicle.png")
    }

    componentDidMount() {
        APIManager.get(`realestates/?userId=${this.state.userId}&&activeAsset=true`)
        .then(re => this.setState({realEstateTotal: this.sumAssetPrice(re)}))
        APIManager.get(`personalproperty/?userId=${this.state.userId}&&activeAsset=true`)
        .then(pp => this.setState({personalPropertyTotal: this.sumAssetPrice(pp)}))
        APIManager.get(`vehicles/?userId=${this.state.userId}&&activeAsset=true`)
        .then(v => this.setState({vehiclesTotal: this.sumAssetPrice(v)}))


    }

    sumAssetPrice = array => {
        let purchasePriceSum = 0
        array.forEach(item => purchasePriceSum += Number(item.purchasePrice))
        // purchasePriceSum = '$'+String(purchasePriceSum).replace(/\$|,/g, '')
        return purchasePriceSum
    }

    render () {
        return (
            <div className="entry-portal-page">
                <h4>Welcome to AsseTracker</h4>
                <h4>Total Assets:<br />
                {/* {Number(this.state.realEstateTotal)+Number(this.state.vehiclesTotal)+Number(this.state.personalPropertyTotal)}</h4> */}
                ${(Number(this.state.realEstateTotal)+Number(this.state.vehiclesTotal)+Number(this.state.personalPropertyTotal)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h4>

                <a href={'/realestate'}><img src={this.state.realEstateImage} alt="realEstateImage" className="detail-image" /></a>
                
                <h5>Total Real Estate:</h5>
                <h5>${Number(this.state.realEstateTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h5>

                <a href={'/vehicles'}><img src={this.state.vehicleImage} alt="vehicleImage" className="detail-image"/></a>

                <h5>Total Vehicles:</h5>
                <h5>${Number(this.state.vehiclesTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h5>

                <a href={'/personalproperty'}><img src={this.state.personalPropertyImage} alt="personalPropertyImage" className="detail-image" /></a>

                <h5>Total Personal Property:</h5>
                <h5>${Number(this.state.personalPropertyTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} </h5>
            </div>
        )
    }
}

export default WelcomeAsseTracker