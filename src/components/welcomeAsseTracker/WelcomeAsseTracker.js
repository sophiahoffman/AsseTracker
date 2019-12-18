import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'

class WelcomeAsseTracker extends Component {

    state = {
        realEstateArray: [],
        vehiclesArray: [],
        personalPropertyArray: [],
        userId: localStorage.getItem("userId")
    }

    componentDidMount() {
        APIManager.get(`realestate/?userId=${this.state.userId}&&activeAsset=true`)
        .then(re => {
            console.log(re)
            this.setState({realEstateArray: re})})
        APIManager.get(`personalproperty/?userId=${this.state.userId}&&activeAsset=true`)
        .then(pp => this.setState({personalPropertyArray: pp}))
        APIManager.get(`vehicles/?userId=${this.state.userId}&&activeAsset=true`)
        .then(v => this.setState({realEstateArray: v}))
    }

    sumAssetPrice = array => {
        let purchasePriceSum = 0
        array.forEach(item => purchasePriceSum += Number(item.purchasePrice))
        purchasePriceSum = purchasePriceSum.toFixed(2)
        return purchasePriceSum
    }

    render () {
        return (
            <div>
            Welcome to AsseTracker!!! <br />
            Total of ACTIVE personal property: {this.sumAssetPrice(this.state.personalPropertyArray)} <br />
            Total of ACTIVE real estate: {this.sumAssetPrice(this.state.realEstateArray)} <br />
            Total of ACTIVE vehicles: {this.sumAssetPrice(this.state.vehiclesArray)} <br />
            </div>
        )
    }
}

export default WelcomeAsseTracker