import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class RealEstateCard extends Component {
    render () {
        if (this.props.realEstate.rent) {
        return (
        <React.Fragment>
            <div className="card realEstateCard">
             <Card>
                <div className = "card-content">
                <Card.Body className="realEstate-content">
                    <Card.Title>{this.props.realEstate.name}</Card.Title><hr />
                    <Card.Text>
                        {this.props.realEstate.reType.type}<br /> 
                        {this.props.realEstate.address}<br />
                        {this.props.realEstate.city}<br />
                        {this.props.realEstate.state}<br />
                        {this.props.realEstate.zip}<br />
                    </Card.Text>
            
                        <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/edit`)}>Edit</Button>
                        <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/disposal`)}>Disposal</Button>
                        <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.deleteRealEstate(this.props.realEstate.id)}>Delete</Button>
                    </Card.Body>
                </div>

             </Card>  

            </div>
        </React.Fragment>
        )
        } else {

        return (
            <React.Fragment>
                <div className="card realEstateCard">
                 <Card>
                    <div className = "card-content">
                    <Card.Body className="realEstate-content">
                        <Card.Title>{this.props.realEstate.name}</Card.Title><hr />
                        <Card.Text>
                            {this.props.realEstate.reTypeId}<br /> 
                            {this.props.realEstate.address}<br />
                            {this.props.realEstate.city}<br />
                            {this.props.realEstate.state}<br />
                            {this.props.realEstate.zip}<br />
                            {this.props.realEstate.purchaseDate}<br />
                            {this.props.realEstate.purchasePrice}<br />
                        </Card.Text>
                
                            <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/edit`)}>Edit</Button>
                            <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.history.push(`/realEstate/${this.props.realEstate.id}/disposal`)}>Disposal</Button>
                            <Button variant="primary" type="button" className="realEstate-button" onClick={() => this.props.deleteRealEstate(this.props.realEstate.id)}>Delete</Button>
                        </Card.Body>
                    </div>
    
                 </Card>  
    
                </div>
            </React.Fragment>
            )
        }
    }
}

export default RealEstateCard