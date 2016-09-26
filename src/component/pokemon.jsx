import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactTooltip from 'react-tooltip';

import pokemonNames from '../../static/pokemonNames.js';

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
	getHHMMSS(time) {
		var date = new Date(time);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}
	handleClick(location) {
		window.location.href = `/#/map/${location}`;
	}
	render() {
		return (
			<div className={`pokemon ${this.props.filtered ? '' : 'filtered'}`}>
				<img 
					className="pokeIcon" 
					data-tip 
					data-for={`pokemonDesc${this.props.spawnPointId}`} 
					src={`../../static/svg/${this.props.pokemonId}.svg`} 
					onClick={this.handleClick.bind(this, `${this.props.latitude},${this.props.longitude}`)}
				/>
				<div className="timer">{this.state.remain}</div>
				<ReactTooltip id={`pokemonDesc${this.props.spawnPointId}`} type="dark" effect="solid" data-multiline>
					<span>
						{`#${this.props.pokemonId} ${pokemonNames[this.props.pokemonId]}`}<br />
						結束於 {this.getHHMMSS(this.props.expirationTime)}
					</span>
				</ReactTooltip>
			</div>
		);
	}
}
