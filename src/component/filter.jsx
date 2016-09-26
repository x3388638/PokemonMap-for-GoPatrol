import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import pokemonNames from '../../static/pokemonNames.js';
import '../../static/css/filter.css';

class FilterCheckbox extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Col md={4}>
				<div className={`filterCheckbox ${this.props.isSelected ? 'active' : ''}`} onClick={this.props.onToggle}>
					<img src={`../../static/svg/${this.props.pokeNum}.svg`} width="50px" height="50px" />
					&nbsp;&nbsp;&nbsp;{this.props.pokeName}
				</div>
			</Col>
		);
	}
}

export default class Filter extends React.Component {
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
			modalOpened: false, 
			filterList
		}

		this.handleClick = this.handleClick.bind(this);
		this.close = this.close.bind(this);
	}
	handleClick() {
		this.setState({
			modalOpened: true
		});
	}
	close() {
		this.setState({
			modalOpened: false
		});
	}
	handleToggle(pokeNum) {
		var filterList = JSON.parse(localStorage.filterList);
		filterList[pokeNum] = !filterList[pokeNum];
		localStorage.filterList = JSON.stringify(filterList);
		this.setState({
			filterList: [...filterList]
		});
		this.props.onFilter();
	}
	render() {
		var buttonStyle = {
			position: 'absolute', 
			top: '20px', 
			left: '40px'
		}
		return (
			<span style={buttonStyle} >
				<Button id="btn-filter" onClick={this.handleClick}>過濾</Button>
				<Modal id="modal-filter" show={this.state.modalOpened} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>地圖顯示</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							{
								pokemonNames.map((val, i) => {
									return (
										<FilterCheckbox 
											key={i} 
											pokeNum={i} 
											pokeName={val} 
											isSelected={this.state.filterList[i]}
											onToggle={this.handleToggle.bind(this, i)}
										/>
									);
								})
							}
						</Row>
					</Modal.Body>
				</Modal>
			</span>
		);
	}
}
