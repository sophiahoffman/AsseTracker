// @authored by Sophia Hoffman

import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav } from 'react-bootstrap'

// NavBar renders two versions based on value of userAuthenticated (logged in or not) from AsseTracker.js

class NavBar extends Component {

    render() {
        if (this.props.isAuthenticated()) {
            return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">AsseTracker</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/realestate">Real Estate</Nav.Link>
                    <Nav.Link href="/vehicles">Vehicles</Nav.Link>
                    <Nav.Link href="/personalproperty">Personal Property</Nav.Link>
                    <Nav.Link onClick={this.props.handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar>
            )
        } else {
            return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">AsseTracker</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Login</Nav.Link>
                    </Nav>
                </Navbar>
            )
        }
    }
}

export default NavBar