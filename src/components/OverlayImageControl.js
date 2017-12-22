import React, { Component } from 'react'
import { Icon, Sidebar, Segment, Form, Menu, Popup, Button, Input } from 'semantic-ui-react'

class OverlayImageControl extends Component {
    state = {
        isOpen: false,
        visible: false,
    }

    handleOpen = () => {
        const { canvas } = this.props

        if (!(canvas && canvas.overlayImage)) {
            this.setState({ isOpen: true })
        } else {
            this.toggleVisibility()
        }
    }

    handleClose = () => this.setState({ isOpen: false })

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    setHeight = e => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleY = parseInt(e.target.value);

        canvas.renderAll();
    }

    plusHeight = () => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleY += 0.01;

        canvas.renderAll();
    }

    minusHeight = () => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleY -= 0.01;

        canvas.renderAll();
    }

    setWidth = e => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleX = parseInt(e.target.value);

        canvas.renderAll();
    }

    plusWidth = () => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleX += 0.01;

        canvas.renderAll();
    }

    minusWidth = () => {
        const { canvas } = this.props;

        canvas.overlayImage.scaleX -= 0.01;

        canvas.renderAll();
    }

    setLeft = e => {
        const { canvas } = this.props;

        canvas.overlayImage.left = parseInt(e.target.value);

        canvas.renderAll();
    }

    plusLeft = () => {
        const { canvas } = this.props;

        canvas.overlayImage.left++;

        canvas.renderAll();
    }

    minusLeft = () => {
        const { canvas } = this.props;

        canvas.overlayImage.left--;

        canvas.renderAll();
    }

    setTop = e => {
        const { canvas } = this.props;

        canvas.overlayImage.top = parseInt(e.target.value);

        canvas.renderAll();
    }

    plusTop = () => {
        const { canvas } = this.props;

        canvas.overlayImage.top++;

        canvas.renderAll();
    }

    minusTop = () => {
        const { canvas } = this.props;

        canvas.overlayImage.top--;

        canvas.renderAll();
    }

    render() {
        const { visible, active } = this.state
        const { canvas } = this.props;

        return (
            <div>
                <Popup
                    trigger={
                        <Icon name="object group" />
                    }
                    on='click'
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content='请先设置遮罩层'
                />
                <Sidebar as={Segment} animation='push' direction='bottom' visible={visible} style={{ overflowX: 'hidden' }}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>遮罩层</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onTouchEnd={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <Form.Group
                        style={{
                            margin: '10px',
                            display: 'flex',
                            display: '-webkit-flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Form.Field control={Input} type="number" label="高度" placeholder={(canvas && canvas.overlayImage) ? canvas.overlayImage.scaleY : 0} onChange={this.setHeight} />
                        <Button.Group>
                            <Button icon='plus' onTouchEnd={this.plusHeight} />
                            <Button icon='minus' onTouchEnd={this.minusHeight} />
                        </Button.Group>
                    </Form.Group>
                    <Form.Group
                        style={{
                            margin: '10px',
                            display: 'flex',
                            display: '-webkit-flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Form.Field control={Input} type="number" label="宽度" placeholder={(canvas && canvas.overlayImage) ? canvas.overlayImage.scaleX : 0} onChange={this.setWidth} />
                        <Button.Group>
                            <Button icon='plus' onTouchEnd={this.plusWidth} />
                            <Button icon='minus' onTouchEnd={this.minusWidth} />
                        </Button.Group>
                    </Form.Group>
                    <Form.Group
                        style={{
                            margin: '10px',
                            display: 'flex',
                            display: '-webkit-flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Form.Field control={Input} type="number" label="上边距" placeholder={(canvas && canvas.overlayImage) ? canvas.overlayImage.top : 0} onChange={this.setTop} />
                        <Button.Group>
                            <Button icon='plus' onTouchEnd={this.plusTop} />
                            <Button icon='minus' onTouchEnd={this.minusTop} />
                        </Button.Group>
                    </Form.Group>
                    <Form.Group
                        style={{
                            margin: '10px',
                            display: 'flex',
                            display: '-webkit-flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Form.Field control={Input} type="number" label="左边距" placeholder={(canvas && canvas.overlayImage) ? canvas.overlayImage.left : 0} onChange={this.setLeft} />
                        <Button.Group>
                            <Button icon='plus' onTouchEnd={this.plusLeft} />
                            <Button icon='minus' onTouchEnd={this.minusLeft} />
                        </Button.Group>
                    </Form.Group>
                </Sidebar>
            </div>
        )
    }
}

export default OverlayImageControl;
