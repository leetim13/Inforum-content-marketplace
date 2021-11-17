import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, FormControl, Button, Nav, Container } from 'react-bootstrap'

export default class NavBarComp extends Component {
    render() {
        return (
            <Navbar bg="white" variant="light">
            <Container>
                <Navbar.Brand href="/">
                  <img
                    src="../assets/logo_cropped.png"
                    width="45%"
                    height="80%"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>

              <Nav className="me-auto">
                  <Nav.Link href="/landing">Browse Offers</Nav.Link>
                  <Nav.Link href="/instructions">Instructions</Nav.Link>
              </Nav>

              <Nav >
              <NavDropdown 
                // BUG: profile images not aligned with dropdown menu, using just text for now
                // title={
                //     // <div className="dropdown-menu dropdown-menu-end">
                //         <img className="thumbnail-image" 
                //             src="../assets/profile_logo.svg"
                //             width="10%"
                //             height="10%"
                //             alt="user pic"
                //         />
                //     // </div>
                // } 
                title='My Account'>
                <Dropdown.Item href="/myRewards" >My Rewards</Dropdown.Item>
                <Dropdown.Item href="/myPosts">My Posts</Dropdown.Item>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/createCampaign">Create Campaign</Dropdown.Item>
                <Dropdown.Item href="/insights">Insights</Dropdown.Item>
              </NavDropdown>
            </Nav>
            </Container>
            </Navbar>
        )
    }
}

