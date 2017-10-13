import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fabric } from 'fabric';
import { Button, Sidebar, Icon, Message, Popup, List, Label, Menu } from 'semantic-ui-react';

const styles = {
    sideBar: {
        fontSize: '0.5em',
        fontFamily: '黑体',
        padding: '0 25px 5px 0'
    },
    range: {
        position: 'relative',
        top: '5px',
        right: '5px'
    }
}

class FilterBar extends Component {

    constructor() {
        super();

        this.state = {
            isOpen: false,
            visible: false,
            imgObj: {
                threshold: 90,
                distance: 40
            },
            canvas: null
        }

        this.changeThreshold = this.changeThreshold.bind(this);
        this.changeDistance = this.changeDistance.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    handleOpen = () => {
        const { canvas } = this.state;

        if (!(canvas.getActiveObject() && canvas.getActiveObject().isType('image'))) {
            this.setState({ isOpen: true });
        } else {
            this.toggleVisibility();
        }
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeThresholdValue = (e) => this.setState({ imgObj: { threshold: parseInt(e.target.value), distance: this.state.imgObj.distance } })

    handleThresholdAdd = (e) => this.setState({ imgObj: { threshold: this.state.imgObj.threshold + 1, distance: this.state.imgObj.distance } })
    handleThresholdMinus = (e) => this.setState({ imgObj: { threshold: this.state.imgObj.threshold - 1, distance: this.state.imgObj.distance } })

    changeDistanceValue = (e) => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: parseInt(e.target.value) } })

    handleDistanceAdd = (e) => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: this.state.imgObj.distance + 1 } })
    handleDistanceMinus = (e) => this.setState({ imgObj: { threshold: this.state.imgObj.threshold, distance: this.state.imgObj.distance - 1 } })

    changeThreshold() {
        const
            { canvas, imgObj } = this.state,
            obj = canvas.getActiveObject(),
            distance = obj.filters[1].distance,
            val = imgObj.threshold;

        obj.clone(obj => {
            obj.filters[1].threshold = val;
            obj.lockRotation = false;
            obj.hasBorders = true;
            obj.lockUniScaling = true;
            obj.centeredScaling = true;

            obj.setControlsVisibility({
                mtr: false
            });

            canvas.remove(canvas.getActiveObject()).add(obj).setActiveObject(obj);
        });

    }

    changeDistance(e) {
        const
            { canvas, imgObj } = this.state,
            obj = canvas.getActiveObject(),
            threshold = obj.filters[1].threshold,
            val = imgObj.distance;

        obj.clone(obj => {
            obj.filters[1].distance = val;
            obj.lockRotation = false;
            obj.hasBorders = true;
            obj.lockUniScaling = true;
            obj.centeredScaling = true;

            obj.setControlsVisibility({
                mtr: false
            });

            canvas.remove(canvas.getActiveObject());
            canvas.add(obj);
            canvas.setActiveObject(obj);
        });

    }

    render() {
        const { isOpen, visible, canvas, imgObj } = this.state;

        return (
            <div>
                <Popup
                    trigger={
                        <Icon
                            name='pencil'
                        />
                    }
                    on='click'
                    open={isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content='请选中一张图片'
                />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction='bottom' visible={visible} onDismiss={this.toggleVisibility}>
                    <List>
                        <List.Item>
                            <span>过滤梯度: </span>
                            <input style={styles.range} type="range" min={0} max={200} value={imgObj.distance} onChange={this.changeDistanceValue} onMouseUp={this.changeDistance} onTouchEnd={this.changeDistance} />
                            <Menu size='mini' compact>
                                <Menu.Item disabled={imgObj.distance === 0} icon='minus' onClick={this.handleDistanceMinus} onMouseUp={this.changeDistance} />
                                <Menu.Item name={imgObj.distance.toString()} />
                                <Menu.Item disabled={imgObj.distance === 200} icon='plus' onClick={this.handleDistanceAdd} onMouseUp={this.changeDistance} />
                            </Menu>
                        </List.Item>
                        <List.Item>
                            <span>过滤像素: </span>
                            <input style={styles.range} type="range" min={0} max={200} value={imgObj.threshold} onChange={this.changeThresholdValue} onMouseUp={this.changeThreshold} onTouchEnd={this.changeThreshold} />
                            <Menu size='mini' compact>
                                <Menu.Item disabled={imgObj.threshold === 0} icon='minus' onClick={this.handleThresholdMinus} onMouseUp={this.changeThreshold} />
                                <Menu.Item name={imgObj.threshold.toString()} />
                                <Menu.Item disabled={imgObj.threshold === 200} icon='plus' onClick={this.handleThresholdAdd} onMouseUp={this.changeThreshold} />
                            </Menu>
                        </List.Item>
                    </List>
                </Sidebar>
            </div>
        );
    }
}

export default FilterBar;
