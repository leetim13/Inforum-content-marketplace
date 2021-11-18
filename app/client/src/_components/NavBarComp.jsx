import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, FormControl, Button, Nav, Container } from 'react-bootstrap'
import { connect } from 'react-redux';

class NavBarComp extends Component {
    render() {
      	const dropDown = this.props.user ? (<Nav >
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
			{ this.props.user.role === 'User' || this.props.user.role === 'Admin' 
			? (<div>
				<Dropdown.Item href="/myRewards" >My Rewards</Dropdown.Item>
				<Dropdown.Item href="/myPosts">My Posts</Dropdown.Item>
				</div>) 
			: null }
			{ this.props.user.role === 'Admin' ? <Dropdown.Divider/> : null}
			{ this.props.user.role === 'Bank' || this.props.user.role === 'Admin' 
			? (<div>
			<Dropdown.Item href="/createCampaign">Create Campaign</Dropdown.Item>
			<Dropdown.Item href="/insights">Insights</Dropdown.Item>
			</div>) 
			: null }
			<Dropdown.Item href="/login">Logout</Dropdown.Item>
			</NavDropdown>
		</Nav>) : null
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
              { dropDown }
            </Container>
            </Navbar>
        )
    }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedNavBarComp = connect(mapStateToProps)(NavBarComp);
export { connectedNavBarComp as NavBarComp };
