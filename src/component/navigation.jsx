import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import CONFIG from '../../static/config';

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
						{
							CONFIG.telegramChannel &&
							<NavItem eventKey={1} href={`https://telegram.me/${CONFIG.telegramChannel}`} >
								Telegram 廣播頻道
							</NavItem>
						}
						<NavItem eventKey={2} href="https://github.com/x3388638/PokemonMap-for-GoPatrol" >
							GitHub
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
