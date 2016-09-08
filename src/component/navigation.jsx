import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="javascript:;">Pokemon Map for GoPatrol</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="https://github.com/x3388638/PokemonMap-for-GoPatrol" >
							GitHub
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
