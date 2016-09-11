import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class Filter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var buttonStyle = {
			position: 'absolute', 
			top: '20px', 
			left: '40px'
		}
		return (
			<Button id="btn-filter" style={buttonStyle} >過濾</Button>
		);
	}
}
