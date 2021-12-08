import React, { Component } from 'react'
import { Navbar, Container } from 'react-bootstrap'

export default class NavBarFooterComp extends Component {
    render() {
        return (
          <Container fluid>
              <Navbar bg="light" >
                <span align="left">
                 {/* <b> &nbsp; About &nbsp; Contact </b> <br /> */}
                &nbsp; Inforum &copy; 2021. Powered by React.
                </span>
               </Navbar>
          </Container>
        )
    }
}

