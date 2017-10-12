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
		position: 'absolute',
		top: '465px',
		right: '3px',
		transform: 'rotate(135deg)',
		fontSize: '3em'		
	},
	hide: {
		position: 'absolute',
		top: '465px',
		right: '3px',
		transform: 'rotate(-45deg)',
		fontSize: '3em'
	},
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		left: (window.innerWidth - 10 - 350) / 2,
		top: '460px'
	},
	menu2: {
		position: 'absolute',
		right: '5px',
		// 56.53 224.63
		top: '400px'
	},
	menuItem: { padding: '7.5px', fontSize: '2em' }
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
			{ view } = this.state;

		if (view) {
			menu1.style.display = 'none';
			menu2.style.display = 'none';
		} else {
			menu1.style.display = 'flex';
			menu2.style.display = 'flex';
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
				</Menu>

				{
					view ?
						<Icon style={styles.show} link size='big' onClick={this.handleViewToggle} rotated='clockwise' name='long arrow up' /> :
						<Icon style={styles.hide} link size='big' onClick={this.handleViewToggle} rotated='clockwise' name='long arrow up' />
				}

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