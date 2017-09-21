import React, { Component } from 'react';
import { fabric } from 'fabric';
import { Sidebar, Icon, Message, Rating, Popup } from 'semantic-ui-react';

const styles = {
    sideBar: {
        fontSize: '0.5em'
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
            canvas: null,
            rating: 0
        }

        this.changeThreshold = this.changeThreshold.bind(this);
        this.changeDistance = this.changeDistance.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    handleChange = e => this.setState({ rating: e.target.value })

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    changeThreshold(e) {
        const
            { canvas } = this.state,
            obj = canvas.getActiveObject(),
            distance = obj.filters[1].distance,
            val = parseInt(e.target.value);

        obj.clone(obj => {
            obj.filters[1].threshold = val;
            obj.lockRotation = false;

            canvas.remove(canvas.getActiveObject());
            canvas.add(obj);
            canvas.setActiveObject(obj);
        });

        this.setState({
            imgObj: {
                threshold: val,
                distance: distance
            }
        });
        console.log(this.state.imgObj);
    }

    changeDistance(e) {
        const
            { canvas } = this.state,
            obj = canvas.getActiveObject(),
            threshold = obj.filters[1].threshold,
            val = parseInt(e.target.value);

        obj.clone(obj => {
            obj.filters[1].distance = val;
            obj.lockRotation = false;

            canvas.remove(canvas.getActiveObject());
            canvas.add(obj);
            canvas.setActiveObject(obj);
        });

        this.setState({
            imgObj: {
                threshold: threshold,
                distance: val
            }
        });
        console.log(this.state.imgObj);

    }

    render() {
        const { visible, canvas, rating, imgObj } = this.state;
        return (
            <div>
                <Popup
                    trigger={
                        <Icon
                            onClick={() => {
                                console.log(canvas.getActiveObject().type)
                                if (canvas.getActiveObject() && canvas.getActiveObject().type == 'image') {
                                    this.toggleVisibility()
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
                    <div>阈值: {imgObj.threshold}</div>
                    <input type='range' min={0} max={200} value={imgObj.threshold} onChange={this.changeThreshold} />
                    <div>阈值增量: {imgObj.distance}</div>
                    <input type='range' min={0} max={200} value={imgObj.distance} onChange={this.changeDistance} />
                    <br />
                    <Rating rating={rating} maxRating={5} />
                </Sidebar>
            </div>
        );
    }
}

export default FilterBar;
