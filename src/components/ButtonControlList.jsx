import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon } from 'semantic-ui-react';
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import BackgroundBar from './BackgroundBar';
import Save from './Save';
import FilterBar from './FilterBar';
import ObjectControlBar from './ObjectControlBar';

const styles = {
	show: {
		transform: 'rotate(-45deg)'
	},
	hide: {
		transform: 'rotate(135deg)'
	},
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		left: (window.innerWidth - 10 - 300) / 2,
		top: '475px'
	},
	menu2: {
		position: 'absolute',
		right: '5px',
		// 56.53 224.63
		top: '420px'
	},
	menu3: {
		position: 'absolute',
		display: 'none',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		right: (window.innerWidth - 10 - 300) / 2,
		top: '460px'
	},
	menuItem: { padding: '4px', fontSize: '2em' }
};

class ButtonControlList extends Component {

	constructor() {
		super();

		this.state = {
			view: true,
			activeItem: '',
			canvas: null
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			canvas: nextProps.canvas
		});
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	handleViewToggle = () => {
		const
			menu1 = ReactDOM.findDOMNode(this.refs.menu1),
			menu2 = ReactDOM.findDOMNode(this.refs.menu2),
			menu3 = ReactDOM.findDOMNode(this.refs.menu3),
			{ view } = this.state;

		if (view) {
			menu1.style.display = 'none';
			menu2.style.display = 'none';
			menu3.style.display = 'flex';
		} else {
			menu1.style.display = 'flex';
			menu2.style.display = 'flex';
			menu3.style.display = 'none';
		}

		this.setState({
			view: !this.state.view
		});
	}

	render() {
		const { activeItem, canvas, view } = this.state;

		return (
			<div>
				<Menu icon style={styles.menu1} ref='menu1'>
					<Menu.Item style={styles.menuItem} name='font' active={activeItem === 'font'} onClick={this.handleItemClick}>
						<FontBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='picture' active={activeItem === 'picture'} onClick={this.handleItemClick}>
						<GalleryBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='paint brush' active={activeItem === 'paint brush'} onClick={this.handleItemClick}>
						<FilterBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='dilicious' active={activeItem === 'dilicious'} onClick={this.handleItemClick}>
						<BackgroundBar canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='save' active={activeItem === 'save'} onClick={this.handleItemClick}>
						<Save canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='trash' active={activeItem === 'trash'} onClick={this.handleItemClick}>
						<Remove canvas={canvas} />
					</Menu.Item>

					<Menu.Item style={styles.menuItem} name='hide' active={activeItem === 'hide'} onClick={this.handleItemClick}>
						<Icon style={styles.hide} link onClick={this.handleViewToggle} rotated='clockwise' name='long arrow up' />
					</Menu.Item>
				</Menu>

				<Menu icon style={styles.menu2} ref='menu2'>
					<Menu.Item style={styles.menuItem} name="object" active={activeItem === 'object'} onClick={this.handleItemClick}>
						<ObjectControlBar canvas={canvas} />
					</Menu.Item>
				</Menu>

				<Menu icon style={styles.menu3} ref='menu3'>
					<Menu.Item style={styles.menuItem} name='show' active={activeItem === 'show'} onClick={this.handleItemClick}>
						<Icon style={styles.show} link onClick={this.handleViewToggle} rotated='clockwise' name='long arrow up' />
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default ButtonControlList;