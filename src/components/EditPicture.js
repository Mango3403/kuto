import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { fabric } from 'fabric'
import { Button, Sidebar, Icon, Segment, Popup, List, Label, Menu } from 'semantic-ui-react'
// import eventProxy from '../eventProxy'

class EditPicture extends Component {
    constructor() {
        super()

        this.state = {
            isOpen: false,
            visible: false,
            imgObj: {
                threshold: 90,
                distance: 40
            }
        }
    }

    componentDidMount() {
        // eventProxy.on('openFilter', () => {
        //     this.handleOpen()
        // })
    }

    handleOpen = () => {
        const { canvas } = this.props

        if (!(canvas.getActiveObject() && canvas.getActiveObject().isType('image'))) {
            this.setState({ isOpen: true })
        } else {
            this.toggleVisibility()
        }
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeThresholdValue = e => this.setState({ imgObj: { threshold: parseInt(e.target.value), distance: this.state.imgObj.distance } })

    handleThresholdAdd = e => this.setState({ imgObj: { threshold: this.state.imgObj.threshold + 1, distance: this.state.imgObj.distance } })
    handleThresholdMinus = e => this.setState({ imgObj: { threshold: this.state.imgObj.threshold - 1, distance: this.state.imgObj.distance } })

    changeDistanceValue = e => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: parseInt(e.target.value) } })

    handleDistanceAdd = e => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: this.state.imgObj.distance + 1 } })
    handleDistanceMinus = e => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: this.state.imgObj.distance - 1 } })

    changeThreshold = () => {
        const {canvas} = this.props;
        const
            { imgObj } = this.state,
            obj = canvas.getActiveObject(),
            distance = obj.filters[1].distance,
            val = imgObj.threshold

        obj.clone(obj => {
            obj.filters[1].threshold = val
            obj.lockRotation = false
            obj.hasBorders = true
            obj.lockUniScaling = true
            obj.centeredScaling = true

            obj.setControlsVisibility({
                mtr: false
            })

            canvas.remove(canvas.getActiveObject()).add(obj).setActiveObject(obj)
        })

    }

    changeDistance = e => {
        const {canvas} = this.props;
        const
            { imgObj } = this.state,
            obj = canvas.getActiveObject(),
            threshold = obj.filters[1].threshold,
            val = imgObj.distance

        obj.clone(obj => {
            obj.filters[1].distance = val
            obj.lockRotation = false
            obj.hasBorders = true
            obj.lockUniScaling = true
            obj.centeredScaling = true

            obj.setControlsVisibility({
                mtr: false
            })

            canvas.remove(canvas.getActiveObject()).add(obj).setActiveObject(obj)
        })

    }

    render() {
        const { imgObj } = this.state

        return (
            <div>
                <Popup
                    trigger={
                        <Icon
                            name='pencil'
                        />
                    }
                    on='click'
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content='请选中一张灰度化图片'
                />
                <Sidebar as={Segment} animation="push" direction='bottom' visible={this.state.visible}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>编辑图片</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <List>
                        <List.Item>
                            <span>过滤梯度: </span>
                            <input style={{ position: 'relative', top: '5px', right: '5px' }} type="range" min={0} max={200} value={imgObj.distance} onChange={this.changeDistanceValue} onMouseUp={this.changeDistance} onTouchEnd={this.changeDistance} />
                            <Menu size='mini' compact>
                                <Menu.Item disabled={imgObj.distance === 0} icon='minus' onClick={this.handleDistanceMinus} onMouseUp={this.changeDistance} />
                                <Menu.Item name={imgObj.distance.toString()} />
                                <Menu.Item disabled={imgObj.distance === 200} icon='plus' onClick={this.handleDistanceAdd} onMouseUp={this.changeDistance} />
                            </Menu>
                        </List.Item>
                        <List.Item>
                            <span>过滤像素: </span>
                            <input style={{ position: 'relative', top: '5px', right: '5px' }} type="range" min={0} max={200} value={imgObj.threshold} onChange={this.changeThresholdValue} onMouseUp={this.changeThreshold} onTouchEnd={this.changeThreshold} />
                            <Menu size='mini' compact>
                                <Menu.Item disabled={imgObj.threshold === 0} icon='minus' onClick={this.handleThresholdMinus} onMouseUp={this.changeThreshold} />
                                <Menu.Item name={imgObj.threshold.toString()} />
                                <Menu.Item disabled={imgObj.threshold === 200} icon='plus' onClick={this.handleThresholdAdd} onMouseUp={this.changeThreshold} />
                            </Menu>
                        </List.Item>
                    </List>
                </Sidebar>
            </div>
        )
    }
}

export default EditPicture
