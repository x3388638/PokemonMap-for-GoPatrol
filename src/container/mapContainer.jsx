import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import GoogleMap from 'google-map-react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Pokemon from '../component/pokemon';
import Filter from '../component/filter';
import CONFIG from '../../static/config';

export default class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		var filterList;
		if(localStorage.filterList) {
			filterList = JSON.parse(localStorage.filterList);
		} else {
			filterList = [];
			for(var i = 0; i <= 151; i++) {
				filterList[i] = true;
			}
			localStorage.filterList = JSON.stringify(filterList);
		}
		this.state = {
			filterList, 
			pokemons: [
				// {
				// 	spawnPointId: '3468d8399df',
				// 	longitude: 120.92743582251441,
				// 	latitude: 23.954502483185834,
				// 	expirationTime: 1473224840243,
				// 	pokemonId: 58,
				// 	name: 'Growlithe',
				// 	distance: 672,
				// 	isInformed: false 
				// }
			]
		}
		this.handleEnd = this.handleEnd.bind(this);
		this.addPokemon = this.addPokemon.bind(this);
		this.handleFilter = this.handleFilter.bind(this);

		this.socket = io();
		this.socket.on('newPokemon', (data) => {
			this.addPokemon(data);
		});
	}
	componentDidMount() {
		this.socket.emit('giveMeCurrentPokemons', 1);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	addPokemon(data) {
		var shouleSetStatus = true;
		for(var p of this.state.pokemons) {
			if(p.spawnPointId == data.spawnPointId) {
				shouleSetStatus = false;
				break;
			}
		}
		shouleSetStatus && this.setState({
			pokemons: [...this.state.pokemons, data]
		});
	}
	handleEnd(spawnPointId) {
		var p = [...this.state.pokemons];
		for(var i = 0; i < p.length; i++) {
			if(p[i].spawnPointId == spawnPointId) {
				p.splice(i, 1);
				break;
			}
		}
		this.setState({
			pokemons: p
		});
	}
	handleFilter() {
		this.setState({
			filterList: [...JSON.parse(localStorage.filterList)]
		});
	}
	render() {
		var height = this.props.bodyHeight - 97 + 'px';
		return (
			<Row style={{height}}>
				<Col md={12} style={{height: '100%', width: '100%'}}>
					<GoogleMap
						defaultCenter={CONFIG.mapCenter}
						defaultZoom={16}
						bootstrapURLKeys={{key: CONFIG.googleApiKey}}
					>
						{
							this.state.pokemons.map((val, i) => {
								return (
									<Pokemon 
										key={val.spawnPointId} 
										lat={val.latitude} 
										lng={val.longitude} 
										onEnd={this.handleEnd} 
										filtered={this.state.filterList[val.pokemonId]}
										{...val} 
									/>
								)
							})
						}
					</GoogleMap>
					<Filter onFilter={this.handleFilter} />
				</Col>
			</Row>
		);
	}
}
