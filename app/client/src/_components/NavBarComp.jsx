import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, FormControl, Button, Nav, Container } from 'react-bootstrap'
import { Router } from 'react-router-dom';
import { Route, Switch,Link } from 'react-router-dom';

import { PrivateRoute } from '../_components';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

export default class NavBarComp extends Component {
    render() {
        return (
          // <Router>
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
                  <Nav.Link href="/">Browse Offers</Nav.Link>
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
                <Dropdown.Item divider />
                <Dropdown.Item href="/myPosts">My Posts</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item divider />
                <Dropdown.Item href="/insights">Insights</Dropdown.Item>
              </NavDropdown>
              </Nav>



            </Navbar>

          //   <Switch>
          //     <Route path="/login" component={LoginPage} />
          //     <PrivateRoute exact path="/" component={HomePage} />
          //  </Switch>

          // </Router>
        )
    }
}