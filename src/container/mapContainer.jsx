import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import GoogleMap from 'google-map-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Pokemon from '../component/pokemon';

export default class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: 23.94905,
				lng: 120.93033
			}, 
			pokemons: [{ spawnPointId: '3468d825fa5',
  longitude: 120.92976713395625,
  latitude: 23.942890911060527,
  expirationTime: 1473210292353,
  pokemonId: 129,
  name: 'Magikarp',
  distance: 685,
  isInformed: false },
{ spawnPointId: '3468d82f58b',
  longitude: 120.93030512257738,
  latitude: 23.943188387532356,
  expirationTime: 1473210331276,
  pokemonId: 129,
  name: 'Magikarp',
  distance: 649,
  isInformed: false },
{ spawnPointId: '3468d83bad5',
  longitude: 120.92734615580005,
  latitude: 23.951519684658344,
  expirationTime: 1473210374047,
  pokemonId: 133,
  name: 'Eevee',
  distance: 409,
  isInformed: false }
]
		}
		this.handleEnd = this.handleEnd.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	handleEnd(spawnPointId) {
		var p = [...this.state.pokemons];
		for(var i = 0; i < p.length; i++) {
			if(p[i].spawnPointId == spawnPointId) {
				p.splice(i, 1);
			}
		}
		this.setState({
			pokemons: p
		});
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
						{
							this.state.pokemons.map((val, i) => {
								return <Pokemon key={i} {...val} lat={val.latitude} lng={val.longitude} onEnd={this.handleEnd} />
							})
						}
					</GoogleMap>
				</Col>
			</Row>
		);
	}
}
