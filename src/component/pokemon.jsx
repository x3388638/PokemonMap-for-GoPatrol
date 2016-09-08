import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import '../../static/css/pokemon.css';

export default class Pokemon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			remain: '--:--'
		}
		this.getRemain = this.getRemain.bind(this);
		this.getMMSS = this.getMMSS.bind(this);
	}
	componentDidMount() {
		this.getRemain()
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	getRemain() {
		setTimeout(() => {
			if(this['_reactInternalInstance'] != undefined) {
				var remain = this.props.expirationTime - Date.now();
				if(remain < 0) {
					this.props.onEnd(this.props.spawnPointId);
				} else {
					var mmss = this.getMMSS(remain);
					this.setState({
						remain: mmss
					}, this.getRemain);
				}
			}
		}, 1000);
	}
	getMMSS(time) {
		var date = new Date(time);
		var minutes = date.getMinutes();
		var seconds = "0" + date.getSeconds();
		return minutes + ':' + seconds.substr(-2);
	}
	render() {
		var pokeStyle = {
			position: 'relative',
			left: '-20px',
			top: '-15px'
		}
		return (
			<div>
				<img className="pokeIcon" style={pokeStyle} src={`../../static/svg/${this.props.pokemonId}.svg`} />
				<div className="timer">{this.state.remain}</div>
			</div>
		);
	}
}
