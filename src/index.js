import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-map-react';
import shallowCompare from 'react-addons-shallow-compare';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			center: {
				lat: 23.94905,
				lng: 120.93033
			}
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}
	render() {
		return (
			<div style={{height: '500px', width: '500px'}}>
				<GoogleMap
					defaultCenter={this.state.center}
					defaultZoom={16}>
					<span lat={23.94905} lng={120.93033}>HELLO</span>
				</GoogleMap>
			</div>
		);
	}
}

ReactDOM.render(
	<App />, 
	document.getElementById('app')
);
