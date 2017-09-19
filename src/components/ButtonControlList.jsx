import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import GalleryBar from './GalleryBar';
import FontBar from './FontBar';
import Remove from './Remove';
import BackgroundBar from './BackgroundBar';
// import { fabric } from 'fabric';


const styles = {
	text: {
        // 银色
        color: '#D6D8EA',
        fontSize: 30
    },
	menu: {
		position: 'absolute',
		// 56.53 224.63
		left: (window.innerWidth - 10 - 224) / 2,
		top: '450px',
		zIndex: '100'
	},
	menuItem: { padding: '10px', fontSize: '2em' }
};

class ButtonControlList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeItem: '',
			canvas: props.canvas,
			text: []
		}

		// this.addText = this.addText.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			canvas: nextProps.canvas
		})
	}

	// addText() {
	// 	const
	// 		{ text, canvas } = this.state,
	// 		newText = {
	// 			id: text.length,
	// 			obj: null
	// 		};

	// 	const t = new fabric.Text('输入文字', {
	// 		fontSize: styles.text.fontSize,
	// 		fill: styles.text.color,
	// 		lockRotation: false,
	// 		hasBorders: true,
	// 		lockUniScaling: true,
	// 		centeredScaling: true
	// 	});

	// 	t.setControlsVisibility({
	// 		mtr: false
	// 	});

	// 	canvas.viewportCenterObject(t);

	// 	canvas.add(t);

	// 	newText.obj = t;
	// 	text.push(newText);

	// 	this.setState({
	// 		text: text
	// 	});
	// }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem, canvas } = this.state

		return (
			<Menu icon style={styles.menu}>
				{/* <Menu.Item style={styles.menuItem} name='font' active={activeItem === 'font'} onClick={this.addText}> */}
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
			</Menu>
		)
	}
}

ButtonControlList.defaultProps = {
	canvas: {}
};

export default ButtonControlList;