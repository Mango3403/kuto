import React from 'react'
import { Icon, Sidebar, Segment, Popup, Button, Image, Menu } from 'semantic-ui-react'
import order from '../assets/images/control/order.png'

class EditLayer extends React.Component {
	state = {
		isOpen: false,
		visible: false,
	}

	handleOpen = () => this.props.canvas.getActiveObject() ? this.toggleVisibility() : this.setState({ isOpen: true })

	handleClose = () => this.setState({ isOpen: false })

	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	sendToBack = () => this.props.canvas.sendToBack(this.props.canvas.getActiveObject())

	bringToFront = () => this.props.canvas.bringToFront(this.props.canvas.getActiveObject())

	bringForward = () => this.props.canvas.bringForward(this.props.canvas.getActiveObject())

	sendBackwards = () => this.props.canvas.sendBackwards(this.props.canvas.getActiveObject())

	center = () => this.props.canvas.getActiveObject().center().setCoords()

	render() {
		return (
			<div>
				<Popup
					trigger={
						<Icon as={Image} style={{ width: '1.3em' }} src={order} />
					}
					on="click"
					open={this.state.isOpen}
					onOpen={this.handleOpen}
					onClose={this.handleClose}
					content="请选中一个对象"
				/>
				<Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
					<Menu pointing secondary>
						<Menu.Item header>
							<h3>编辑图层</h3>
						</Menu.Item>
						<Menu.Item position="right">
							<Icon onTouchEnd={this.toggleVisibility} name="close" bordered />
						</Menu.Item>
					</Menu>
					<Menu compact>
						<Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置顶" onTouchEnd={this.bringToFront} />

						<Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向上一层" onTouchEnd={this.bringForward} />

						<Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向下一层" onTouchEnd={this.sendBackwards} />

						<Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置底" onTouchEnd={this.sendToBack} />

						<Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="中心对齐" onTouchEnd={this.center} />
					</Menu>
				</Sidebar>
			</div>
		)
	}
}

export default EditLayer