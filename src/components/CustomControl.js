import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon } from 'semantic-ui-react'
import Picture from './Picture'
import Text from './Text'
import Clear from './Clear'
import Background from './Background'
import Save from './Save'
import EditPicture from './EditPicture'
import EditLayer from './EditLayer'
import OverlayImageControl from './OverlayImageControl'
import Shape from './Shape'
import EditShape from './EditShape'

const styles = {
	menu1: {
		position: 'absolute',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		left: (window.innerWidth - 10 - 290) / 2,
		top: '475px'
	},
	menu2: {
		position: 'absolute',
		right: '5px',
		// 56.53 224.63
		top: '240px'
	},
	menu3: {
		position: 'absolute',
		display: 'none',
		// 56.53 224.63
		// left: (window.innerWidth - 10 - 332) / 2,
		right: (window.innerWidth - 10 - 290) / 2,
		top: '460px'
	},
	menuItem: { padding: '4px', fontSize: '2em' }
}

class CustomControl extends Component {
	state = {
		view: true,
	}

	handleViewToggle = () => {
		const
			menu1 = ReactDOM.findDOMNode(this.refs.menu1),
			menu2 = ReactDOM.findDOMNode(this.refs.menu2),
			menu3 = ReactDOM.findDOMNode(this.refs.menu3),
			{ view } = this.state

		if (view) {
			menu1.style.display = 'none'
			menu2.style.display = 'none'
			menu3.style.display = 'flex'
		} else {
			menu1.style.display = 'flex'
			menu2.style.display = 'flex'
			menu3.style.display = 'none'
		}

		this.setState({
			view: !this.state.view
		})
	}

	render() {
		const { canvas } = this.props;

		return (
			<div>
				<Menu icon style={styles.menu1} ref='menu1'>
					<Shape canvas={canvas} />
					<Menu.Item style={styles.menuItem}>
						<Text canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<Picture canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<Background canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<Save canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<Clear canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<Icon style={{ transform: 'rotate(135deg)' }} link onTouchEnd={this.handleViewToggle} rotated='clockwise' name='long arrow up' />
					</Menu.Item>
				</Menu>

				<Menu icon vertical style={styles.menu2} ref="menu2">
					<Menu.Item style={styles.menuItem}>
						<OverlayImageControl canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<EditPicture canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<EditLayer canvas={canvas} />
					</Menu.Item>
					<Menu.Item style={styles.menuItem}>
						<EditShape canvas={canvas} />
					</Menu.Item>
				</Menu>

				<Menu icon style={styles.menu3} ref='menu3'>
					<Menu.Item style={styles.menuItem}>
						<Icon style={{ transform: 'rotate(-45deg)' }} link onTouchEnd={this.handleViewToggle} rotated='clockwise' name='long arrow up' />
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}

export default CustomControl