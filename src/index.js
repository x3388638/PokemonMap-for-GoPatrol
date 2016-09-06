import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import Grid from 'react-bootstrap/lib/Grid';

import Navigation from './component/navigation';
import MapContainer from './container/mapContainer';
import Footer from './component/footer';

import '../static/css/style.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bodyHeight: 0
		}
	}
	componentDidMount() {
		this.setState({
			bodyHeight: window.innerHeight
		});
		window.onresize = (e) => {
			if(window.innerHeight != this.state.bodyHeight) {
				this.setState({
					bodyHeight: window.innerHeight
				});
			}
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	render() {
		return (
			<div>
				<Navigation />
				<Grid fluid>
					<MapContainer bodyHeight={this.state.bodyHeight} />
					<Footer />
				</Grid>
			</div>
		);
	}
}

ReactDOM.render(
	<App />, 
	document.getElementById('app')
);
