import React, { Component } from 'react';
import Custom from './Custom.jsx';
import './Main.css';

class Main extends Component {
	render() {
		return (
			<div className="Main">
				<div className="Main-header">
					<h2>定制平台</h2>
				</div>
				<Custom />
			</div>
		);
	}
}

export default Main;
