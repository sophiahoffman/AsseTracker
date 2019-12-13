import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

class PersonalPropertyCard extends Component {
    render() {
    return (
        <React.Fragment>
            <div className="card personalPropertyCard">
             <Card>
                <div className = "card-content">
                <Card.Body className="personalProperty-content">
                    <Card.Title>{this.props.personalProperty.name}</Card.Title><hr />
                    <Card.Text>
                        {this.props.personalProperty.ppType.type}<br /> 
                        {this.props.personalProperty.description}<br /> 
                        {this.props.personalProperty.manufacturer}<br />
                        {this.props.personalProperty.model}<br />
                        {this.props.personalProperty.location}<br />
                        {this.props.personalProperty.purchaseLocation}<br />
                        {this.props.personalProperty.purchaseDate}<br />
                        ${this.props.personalProperty.purchasePrice}<br />
                    </Card.Text>
            
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalProperty/${this.props.personalProperty.id}/edit`)}>Edit</Button>
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.history.push(`/personalProperty/${this.props.personalProperty.id}/disposal`)}>Disposal</Button>
                        <Button variant="secondary" type="button" className="personalProperty-button" onClick={() => this.props.deletePersonalProperty(this.props.personalProperty.id)}>Delete</Button>
                    </Card.Body>
                </div>

             </Card>  

            </div>
        </React.Fragment>
        )
    }
}

export default PersonalPropertyCard