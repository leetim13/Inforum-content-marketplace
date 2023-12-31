import React, { Component } from 'react'
import { Navbar, NavDropdown, Dropdown, Button, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import { history } from '../_helpers'
class NavBarComp extends Component {
    render() {
      	const action = this.props.user 
		? (<Nav style={{ paddingRight: "4em" }}>
			<NavDropdown align="end"
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
				{ this.props.user.role === 'Bank' 
				? (<div>
					<Dropdown.Item href="/myCampaigns" >My Campaigns</Dropdown.Item>
					<Dropdown.Item href="/createCampaign">Create Campaign</Dropdown.Item>
					{/* <Dropdown.Item href="/insights">Insights</Dropdown.Item> */}
				</div>) 
				: null }
				{ this.props.user.role === 'Admin' 
				? (<div>
					<Dropdown.Item href="/insights/-1" >Site Insights</Dropdown.Item>
				</div>)
				: null }
				<Dropdown.Item href="/login">Logout</Dropdown.Item>
			</NavDropdown>
		</Nav>)
		: <Button variant="outline-secondary" style={{ marginRight: "4em" }} onClick={() => history.push("/login")}>Login</Button>
        return (
		<Navbar bg="white" variant="light" sticky="top">
			<Navbar.Brand href="/">
				<img
					src="../assets/logo_cropped.png"
					width="45%"
					height="80%"
					alt="React Bootstrap logo"
				/>
			</Navbar.Brand>

			<Nav className="me-auto">
				<Nav.Link href="/">Browse Offers</Nav.Link>
				<Nav.Link href="/instructions">Instructions</Nav.Link>
			</Nav>
			
			{ action }
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
