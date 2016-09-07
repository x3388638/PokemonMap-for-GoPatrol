import React from 'react';

export default class Pokemon extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var pokeStyle = {
			position: 'relative',
			left: '-20px',
			top: '-15px'
		}
		return (
			<div>
				<img style={pokeStyle} src={`http://gopatrol.ass.tw/pixel_icons/${this.props.pokemonId}.png`} />
			</div>
		);
	}
}
