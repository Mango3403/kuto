import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { fabric } from 'fabric/dist/fabric'
import { Sidebar, Icon, Segment, Popup, List, Menu, Radio, Form, Grid, Button } from 'semantic-ui-react'
// import eventProxy from '../eventProxy'

class EditPicture extends Component {
    state = {
        isOpen: false,
        visible: false,
        checked: false,
        distance: 0.02
    }

    componentDidUpdate() {
        if (this.state.visible) {
            this.changeDistance();
        }
    }

    handleOpen = () => {
        const { canvas } = this.props

        if (canvas.getActiveObject() && canvas.getActiveObject().isType('image')) {
            this.toggleVisibility()
        } else {
            this.setState({ isOpen: true })
        }
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked })
        this.setGray()
    }
    handleClose = () => this.setState({ isOpen: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeDistanceValue = e => {
        this.setState({ distance: parseFloat(e.target.value) })
        console.log(this.state.distance);
    }

    handleDistanceAdd = e => this.setState({ distance: this.state.distance + 0.01 })
    handleDistanceMinus = e => this.setState({ distance: this.state.distance - 0.01 })

    changeDistance = e => {
        const { canvas } = this.props;
        const { distance } = this.state;
        const obj = canvas.getActiveObject();

        if (obj && obj.filters.length > 0) {
            obj.filters[1].distance = distance.toFixed(2);
            obj.applyFilters();
            canvas.renderAll();
        }
    }

    setGray = () => {
        const { canvas } = this.props;
        const picture = canvas.getActiveObject();
        if (!this.state.checked) {
            picture.filters[0] = new fabric.Image.filters.Grayscale()
            picture.filters[1] = new fabric.Image.filters.RemoveColor({
                color: '#fff',
                distance: 0
            })
            this.setState({
                distance: picture.filters[1].distance
            });
        } else {
            picture.filters = [];
        }
        picture.applyFilters();
        canvas.renderAll();
    }

    render() {
        const { distance } = this.state;

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
                            <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
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
                                        label={`过滤梯度值: ${distance.toFixed(2)}`}
                                        min={0}
                                        max={1}
                                        name='duration'
                                        onChange={this.changeDistanceValue}
                                        step={0.01}
                                        type='range'
                                        value={distance.toFixed(2)}
                                        disabled={!this.state.checked}
                                    />
                                    <Button.Group>
                                        <Button disabled={distance === 0} icon='minus' onClick={this.handleDistanceMinus} />
                                        <Button>{distance.toFixed(2)}</Button>
                                        <Button disabled={distance === 1} icon='plus' onClick={this.handleDistanceAdd} />
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
