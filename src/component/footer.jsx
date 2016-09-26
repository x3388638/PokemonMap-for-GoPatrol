import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	render() {
		return (
			<Row>
				<Col md={12} className="text-center">
				</Col>
			</Row>
		);
	}
}
