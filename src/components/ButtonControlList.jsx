import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import Background from './Background';

const styles = {
	menu: {
		position: 'absolute',
		right: '10px',
		top: '150px',
		zIndex: '100'
	}
};

class ButtonControlList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeItem: '',
			canvas: props.canvas
		}

	}

	componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas})
	}
	

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, canvas } = this.state

		return (
			<Menu icon vertical style={styles.menu}>
				<Menu.Item name='font' active={activeItem === 'font'} onClick={this.handleItemClick}>
					<FontBar canvas={canvas} />
				</Menu.Item>

				<Menu.Item name='picture' active={activeItem === 'picture'} onClick={this.handleItemClick}>
					<GalleryBar canvas={canvas} />
				</Menu.Item>

				<Menu.Item name='trash' active={activeItem === 'trash'} onClick={this.handleItemClick}>
					<Remove canvas={canvas} />
				</Menu.Item>

				<Menu.Item name='dilicious' active={activeItem === 'dilicious'} onClick={this.handleItemClick}>
					<Background canvas={canvas} />
				</Menu.Item>
			</Menu>
		)
	}
}

ButtonControlList.defaultProps = {
	canvas: {}
};

export default ButtonControlList;