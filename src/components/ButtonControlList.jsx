import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import BackgroundBar from './BackgroundBar';
import Save from './Save';
import FilterBar from './FilterBar';
import ObjectControlBar from './ObjectControlBar';

const styles = {
	viewToggle: {
		position: 'absolute',
		top: '460px',
		right: '5px'
	},
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		left: (window.innerWidth - 10 - 350) / 2,
		top: '460px',
		zIndex: '1100'
	},
	menu2: {
		position: 'absolute',
		right: '5px',
		// 56.53 224.63
		top: '400px',
		zIndex: '1100'
	},
	menuItem: { padding: '7.5px', fontSize: '2em' }
};

class ButtonControlList extends Component {

	constructor() {
		super();

		this.state = {
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
			menu2 = ReactDOM.findDOMNode(this.refs.menu2);
			
		menu1.style.display = menu1.style.display === 'none' ? 'flex' : 'none';
		menu2.style.display = menu2.style.display === 'none' ? 'flex' : 'none';
	}

	render() {
		const { activeItem, canvas, menu1 } = this.state;

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
				</Menu>
				<Button style={styles.viewToggle} size='big' circular color='google plus' icon='ellipsis vertical' onClick={this.handleViewToggle} />
				<Menu icon style={styles.menu2} ref='menu2'>
					<Menu.Item style={styles.menuItem} name="object" active={activeItem === 'object'} onClick={this.handleItemClick}>
						<ObjectControlBar canvas={canvas} />
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default ButtonControlList;