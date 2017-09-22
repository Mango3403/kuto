import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import BackgroundBar from './BackgroundBar';
import Save from './Save';
import FilterBar from './FilterBar';

let visibleGuides1 = true;

const styles = {
	text: {
		// 银色
		color: '#D6D8EA',
		fontSize: 30
	},
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		left: (window.innerWidth - 10 - 332) / 2,
		top: '460px',
		zIndex: '1'
	},
	menu2: {
		position: 'absolute',
		right: '5px',
		// 56.53 224.63
		top: '390px',
	},
	menuItem: { padding: '10px', fontSize: '2em' }
};

class ButtonControlList extends Component {

	constructor() {
		super();

		this.state = {
			activeItem: '',
			canvas: null,
			rul: null,
			text: []
		}

		this.setRulerVisible = this.setRulerVisible.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			canvas: nextProps.canvas,
			rul: nextProps.rul
		});
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	setRulerVisible() {
		const { rul } = this.state;
		console.log(rul);

		rul.api.toggleRulerVisibility(visibleGuides1 = !visibleGuides1);

		this.setState({
			rul: rul
		});
	}

	render() {
		const { activeItem, canvas, ruler } = this.state

		return (
			<div>
				<Menu icon style={styles.menu1}>
					<Menu.Item style={styles.menuItem} name='font' active={activeItem === 'font'} onClick={this.handleItemClick}>
						<FontBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='picture' active={activeItem === 'picture'} onClick={this.handleItemClick}>
						<GalleryBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='trash' active={activeItem === 'trash'} onClick={this.handleItemClick}>
						<Remove canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='dilicious' active={activeItem === 'dilicious'} onClick={this.handleItemClick}>
						<BackgroundBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='paint brush' active={activeItem === 'paint brush'} onClick={this.handleItemClick}>
						<FilterBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='save' active={activeItem === 'save'} onClick={this.handleItemClick}>
						<Save canvas={canvas} />
					</Menu.Item>
				</Menu>
				<Menu icon vertical style={styles.menu2}>
					<Menu.Item style={styles.menuItem}>
						<Icon name="eye" onClick={this.setRulerVisible} />
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}

export default ButtonControlList;