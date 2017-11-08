import React from 'react'
import { Icon, Sidebar, Message, Popup, Button, Image, Menu } from 'semantic-ui-react'
import order from '../assets/images/control/order.png'

class LayerPane extends React.Component {
    state = {
        isOpen: false,
        visible: false,
        canvas: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        })
    }

    handleOpen = () => !this.state.canvas.getActiveObject() ? this.setState({ isOpen: true }) : this.toggleVisibility()

    handleClose = () => this.setState({ isOpen: false })

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    sendToBack = () => this.state.canvas.sendToBack(this.state.canvas.getActiveObject())

    bringToFront = () => this.state.canvas.bringToFront(this.state.canvas.getActiveObject())

    bringForward = () => this.state.canvas.bringForward(this.state.canvas.getActiveObject())

    sendBackwards = () => this.state.canvas.sendBackwards(this.state.canvas.getActiveObject())

    center = () => this.state.canvas.getActiveObject().center().setCoords()

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
                <Sidebar style={{ padding: '5px', paddingRight: '25px', fontSize: '0.5em', width: '1000px' }} as={Message} animation="overlay" direction="bottom" visible={this.state.visible} onDismiss={this.toggleVisibility}>
                    <Menu compact>
                        <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置顶" onClick={this.bringToFront} />

                        <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向上一层" onClick={this.bringForward} />

                        <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="向下一层" onClick={this.sendBackwards} />

                        <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="置底" onClick={this.sendToBack} />

                        <Menu.Item style={{ paddingRight: '5px', paddingLeft: '5px' }} fitted="horizontally" name="中心对齐" onClick={this.center} />
                    </Menu>
                </Sidebar>
            </div>
        )
    }
}

export default LayerPane