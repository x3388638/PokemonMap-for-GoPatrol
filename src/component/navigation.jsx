import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Navbar from 'react-bootstrap/lib/Navbar';

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
						<a href="javascript:;">Pokemon Map for GoPrtrol</a>
					</Navbar.Brand>
				</Navbar.Header>
			</Navbar>
		);
	}
}
