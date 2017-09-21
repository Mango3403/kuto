import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import BackgroundBar from './BackgroundBar';
import Save from './Save';
import FilterBar from './FilterBar';


const styles = {
	text: {
		// 银色
		color: '#D6D8EA',
		fontSize: 30
	},
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		left: (window.innerWidth - 10 - 280) / 2,
		top: '460px',
		zIndex: '100'
	},
	menu2: {
		position: 'absolute',
		// 56.53 224.63
		// right: (window.innerWidth - 10 - 280) / 2,
		right: '5px',
		top: '250px',
		zIndex: '100'
	},
	menuItem: { padding: '10px', fontSize: '2em' }
};

class ButtonControlList extends Component {

	constructor() {
		super();

		this.state = {
			activeItem: '',
			canvas: null,
			text: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			canvas: nextProps.canvas
		})
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, canvas } = this.state

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

					<Menu.Item style={styles.menuItem} name='save' active={activeItem === 'save'} onClick={this.handleItemClick}>
						<Save canvas={canvas} />
					</Menu.Item>
				</Menu>
				<Menu icon vertical style={styles.menu2}>
					<Menu.Item style={styles.menuItem} name='pencil' active={activeItem === 'pencil'} onClick={this.handleItemClick}>
						<FilterBar canvas={canvas} />
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}

export default ButtonControlList;