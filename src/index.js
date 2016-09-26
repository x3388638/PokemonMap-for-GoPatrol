import React from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import Grid from 'react-bootstrap/lib/Grid';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import createHashHistory from 'history/lib/createHashHistory';
import Redirect from 'react-router/lib/Redirect';

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
					<MapContainer location={this.props.params.location} bodyHeight={this.state.bodyHeight} />
					<Footer />
				</Grid>
			</div>
		);
	}
}

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
ReactDOM.render(
	<Router history={appHistory}>
		<Route path="/" component={App} />
		<Route path="/map/:location" component={App} />
		<Redirect from="*" to="/" />
	</Router>, 
	document.getElementById('app')
);
