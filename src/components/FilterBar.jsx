import React, { Component } from 'react';
import { fabric } from 'fabric';
import { Button, Sidebar, Icon, Message, Popup, List, Label } from 'semantic-ui-react';

const styles = {
    sideBar: {
        fontSize: '0.5em',
        padding: '5px'
    },
    input: {
        margin: '5px auto'
    }
}

class FilterBar extends Component {

    constructor() {
        super();

        this.state = {
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

            canvas.remove(canvas.getActiveObject());
            canvas.add(obj);
            canvas.setActiveObject(obj);
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
        const { visible, canvas, imgObj } = this.state;
        return (
            <div>
                <Popup
                    trigger={
                        <Icon
                            onClick={(e) => {
                                e.preventDefault();
                                if (canvas.getActiveObject() && canvas.getActiveObject().type == 'image') {
                                    this.toggleVisibility();
                                }
                                return false;
                            }}
                            name='pencil'
                        />
                    }
                    content='请选中一张图片'
                />
                <Sidebar style={styles.sideBar} as={Message} animation='overlay' direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name='close' />
                    <br />
                    <List>
                        <List.Item>
                            <Label size="large" horizontal>过滤梯度: </Label>
                            <input type="range" min={0} max={200} value={imgObj.distance} onChange={this.changeDistanceValue} onMouseUp={this.changeDistance} />
                            <Button.Group size="mini">
                                <Button disabled={imgObj.distance === 0} icon='minus' onClick={this.handleDistanceMinus} onMouseUp={this.changeDistance} />
                                <Label>{imgObj.distance}</Label>
                                <Button disabled={imgObj.distance === 200} icon='plus' onClick={this.handleDistanceAdd} onMouseUp={this.changeDistance} />
                            </Button.Group>
                        </List.Item>
                        <List.Item>
                            <Label size="large" horizontal>过滤像素: </Label>
                            <input type="range" min={0} max={200} value={imgObj.threshold} onChange={this.changeThresholdValue} onMouseUp={this.changeThreshold} />
                            <Button.Group size="mini">
                                <Button disabled={imgObj.threshold === 0} icon='minus' onClick={this.handleThresholdMinus} onMouseUp={this.changeThreshold} />
                                <Label>{imgObj.threshold}</Label>
                                <Button disabled={imgObj.threshold === 200} icon='plus' onClick={this.handleThresholdAdd} onMouseUp={this.changeThreshold} />
                            </Button.Group>
                        </List.Item>
                    </List>
                </Sidebar>
            </div>
        );
    }
}

export default FilterBar;
