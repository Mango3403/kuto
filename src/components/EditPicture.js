import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { fabric } from 'fabric/dist/fabric.min'
import { Sidebar, Icon, Segment, Popup, List, Menu, Radio, Form, Grid, Button } from 'semantic-ui-react'
// import eventProxy from '../eventProxy'

class EditPicture extends Component {

    state = {
        isOpen: false,
        visible: false,
        checked: false,
        threshold: 0,
        distance: 0
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

    toggle = () => {
        this.setState({ checked: !this.state.checked })
        this.setGray()
    }
    handleClose = () => this.setState({ isOpen: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeThresholdValue = e => {
        this.setState({
            threshold: parseInt(e.target.value),
        })
        console.log(`state.threshold: ${this.state.threshold}, e.target.value: ${e.target.value}`);
    }

    handleThresholdAdd = e => this.setState({ threshold: this.state.threshold + 1 })
    handleThresholdMinus = e => this.setState({ threshold: this.state.threshold - 1, })

    changeDistanceValue = e => this.setState({
        distance: parseInt(e.target.value)
    })

    handleDistanceAdd = e => this.setState({ distance: this.state.distance + 1 })
    handleDistanceMinus = e => this.setState({ distance: this.state.distance - 1 })

    changeThreshold = () => {
        const { canvas } = this.props;
        const
            { threshold } = this.state,
            obj = canvas.getActiveObject(),
            distance = obj.filters[1].distance;

        obj.clone(obj => {
            obj.filters[1].threshold = threshold
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
        const { canvas } = this.props;
        const
            { distance } = this.state,
            obj = canvas.getActiveObject(),
            threshold = obj.filters[1].threshold;

        obj.clone(obj => {
            obj.filters[1].distance = distance
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

    setGray = () => {
        const { canvas } = this.props;
        const picture = canvas.getActiveObject();

        if (!this.state.checked) {
            picture.filters[0] = new fabric.Image.filters.Grayscale()
            picture.filters[1] = new fabric.Image.filters.RemoveWhite()
            // picture.filters.push(new fabric.Image.filters.Tint({
            //     color: color.silver
            // }));

            picture.applyFilters(canvas.renderAll.bind(canvas));

            this.setState({
                threshold: picture.filters[1].threshold,
                distance: picture.filters[1].distance,
            });
        } else {
            picture.filters = [];
            picture.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    render() {
        const { threshold, distance } = this.state;

        return (
            <div>
                <Popup
                    trigger={
                        <Icon name='pencil' />
                    }
                    on='click'
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content='请选中一张图片'
                />
                <Sidebar as={Segment} animation="push" direction='bottom' visible={this.state.visible}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>编辑图片</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onTouchEnd={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <List>
                        <List.Item>
                            <Radio toggle label="灰度化" checked={this.state.checked} onChange={this.toggle} />
                        </List.Item>
                        <List.Item disabled={!this.state.checked}>
                            <Grid columns={2}>
                                <Grid.Column as={Form}>
                                    <Form.Input
                                        label={`过滤像素值: ${threshold}`}
                                        min={0}
                                        max={200}
                                        name='duration'
                                        onChange={this.changeThresholdValue}
                                        step={5}
                                        type='range'
                                        value={threshold}
                                        disabled={!this.state.checked}
                                        onMouseUp={this.changeThreshold}
                                        onTouchEnd={this.changeThreshold}
                                    />
                                    <Button.Group>
                                        <Button disabled={threshold === 0} icon='minus' onTouchEnd={this.handleThresholdMinus} onMouseUp={this.changeThreshold} />
                                        <Button>{threshold}</Button>
                                        <Button disabled={threshold === 200} icon='plus' onTouchEnd={this.handleThresholdAdd} onMouseUp={this.changeThreshold} />
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column as={Form}>
                                    <Form.Input
                                        label={`过滤梯度值: ${distance}`}
                                        min={0}
                                        max={200}
                                        name='duration'
                                        onChange={this.changeDistanceValue}
                                        step={5}
                                        type='range'
                                        value={distance}
                                        disabled={!this.state.checked}
                                        onMouseUp={this.changeDistance}
                                        onTouchEnd={this.changeDistance}
                                    />
                                    <Button.Group>
                                        <Button disabled={distance === 0} icon='minus' onTouchEnd={this.handleDistanceMinus} onMouseUp={this.changeDistance} />
                                        <Button>{distance}</Button>
                                        <Button disabled={distance === 200} icon='plus' onTouchEnd={this.handleDistanceAdd} onMouseUp={this.changeDistance} />
                                    </Button.Group>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    </List>
                </Sidebar>
            </div>
        )
    }
}

export default EditPicture
