import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, FormControl, Button, Nav, Container } from 'react-bootstrap'

export default class NavBarFooterComp extends Component {
    render() {
        return (
          <Container>
            <Navbar bg="light" fixed="bottom">
              <div>
                <span>&nbsp; Inforum &copy; 2021. Powered by React.</span>
              </div>


                
               </Navbar>
            </Container>
        )
    }
}

