import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, FormControl, Button, Nav, Container } from 'react-bootstrap'

export default class NavBarComp extends Component {
    render() {
        return (
            <Navbar bg="white" variant="light">
                <Navbar.Brand href="/">
                  <img
                    src="logo_cropped.png"
                    width="45%"
                    height="80%"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link href="/landing">Browse Offers</Nav.Link>
                  <Nav.Link href="/instructions">Instructions</Nav.Link>
              </Nav>


              <Nav pullRight>
              <NavDropdown 
                title={
                    <div className="pull-left">
                        <img className="thumbnail-image" 
                            src="logo192.png"
                            width="20%"
                            height="20%"
                            alt="user pic"
                        />
                    </div>
                } 
                id="profile-dropdown">
                <Dropdown.Item href="/myRewards">My Rewards</Dropdown.Item>
                <Dropdown.Item href="/myPosts">My Posts</Dropdown.Item>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/insights">Insights</Dropdown.Item>
              </NavDropdown>
              </Nav>
            </Navbar>
        )
    }
}