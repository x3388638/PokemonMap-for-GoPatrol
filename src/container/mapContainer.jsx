import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import GoogleMap from 'google-map-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: 23.94905,
				lng: 120.93033
			}, 
			pokemons: [{
				spawnPointId: '3468d826627',
				longitude: 120.92743582251441,
				latitude: 23.941991037447053,
				expirationTime: 1473206270168,
				pokemonId: 129,
				name: 'Magikarp',
				distance: 835,
				isInformed: false 
			}]
		}
	}
	render() {
		var height = this.props.bodyHeight - 97 + 'px';
		return (
			<Row style={{height}}>
				<Col md={12} style={{height: '100%', width: '100%'}}>
					<GoogleMap
						defaultCenter={this.state.center}
						defaultZoom={16}
					>
					
					</GoogleMap>
				</Col>
			</Row>
		);
	}
}
