import React, { Component } from 'react';
import { Icon, Dropdown, Image, Sidebar, Segment, Menu, Form, Button } from 'semantic-ui-react';
import circleImg from '../static/images/control/circle.png';
import lineImg from '../static/images/control/line.png';
import triangleImg from '../static/images/control/triangle.png';
import rectImg from '../static/images/control/rect.png';
import pentagon from '../static/images/control/pentagon.png';
import pentagram from '../static/images/control/pentagram.png';
import hexagon from '../static/images/control/hexagon.png';
import reactCSS from 'reactcss';
import { BlockPicker } from 'react-color';

const stylesMain = {
    dropDown: {
        margin: 0,
        padding: 0,
        minWidth: '3em',
    },
    dropDownItem: {
        minWidth: '3.5em',
    },
    panel: {
        padding: 8,
        paddingTop: 0,
        zIndex: 310,
    },
};

class ShapeMenu extends Component {
    // 点击图形按钮方法
    clickShapeButton = (func) => () => {
        func();
        this.props.openShapePanel();
    }

    render() {
        const { tooltip } = this.props;

        return (
            <Dropdown trigger={<Icon name="puzzle" />} item icon={null} upward button pointing="top left" closeOnChange={false} style={stylesMain.dropDown}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addCircle)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={circleImg} />
                        {tooltip && ' 圆形'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addLine)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={lineImg} />
                        {tooltip && ' 线段'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addTriangle)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={triangleImg} />
                        {tooltip && ' 三角形'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addRect)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={rectImg} />
                        {tooltip && ' 矩形'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addPentagon)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={pentagon} />
                        {tooltip && ' 正五边形'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addPentagram)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={pentagram} />
                        {tooltip && ' 五角星'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={this.clickShapeButton(this.props.addHexagon)} style={stylesMain.dropDownItem}>
                        <Icon as={Image} src={hexagon} />
                        {tooltip && ' 正六边形'}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

class ShapePanel extends Component {
    state = {
        picker: false,
        checked: false,
        isFill: false,
        color: {
            r: '0',
            g: '0',
            b: '0',
        },
        stroke: '#000000',
        fill: '#ffff00',
    }

    // 填充开关
    toggleChecked = () => this.setState({ checked: !this.state.checked })
    clickCheckButton = () => {
        if (this.state.checked) {
            this.props.setShapeFill(null);
        } else {
            this.props.setShapeFill(this.state.fill);
        }
        this.toggleChecked();
    }

    // 颜色选择器开关
    colorPickerOpen = () => this.setState({ picker: true })
    colorPickerClose = () => this.setState({ picker: false })

    // 颜色选择器更换颜色
    colorPickerChange = (color) => {
        if (this.state.isFill) {
            this.props.setShapeFill(color.hex);
            this.setState({ color, fill: color.hex });
        } else {
            this.props.setShapeStroke(color.hex);
            this.setState({ color, stroke: color.hex });
        }
    }

    render() {
        const { strokeWidth, shapepanel, shape } = this.props;
        const { picker } = this.state;

        const styles = reactCSS({
            default: {
                fill: {
                    width: '28px',
                    height: '28px',
                    borderRadius: '2px',
                    background: shape ? shape.fill : this.state.fill,
                },
                stroke: {
                    width: '28px',
                    height: '28px',
                    borderRadius: '2px',
                    background: shape ? shape.stroke : this.state.stroke,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 311,
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <Sidebar as={Segment} animation="push" direction="bottom" style={stylesMain.panel} visible={shapepanel}>
                    <Menu pointing secondary style={{ marginBottom: 0 }}>
                        <Menu.Item header>
                            <h3>图形</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.props.closeShapePanel} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <Form style={{ padding: '5px' }}>
                        <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <span>边框粗细</span>
                            <Button.Group>
                                <Button disabled={shape ? shape.strokeWidth === 1 : strokeWidth === 1} icon="minus" onClick={this.props.strokeWidthMinus} />
                                <Button>{shape ? shape.strokeWidth : strokeWidth}</Button>
                                <Button disabled={shape ? shape.strokeWidth === 30 : strokeWidth === 30} icon="plus" onClick={this.props.strokeWidthPlus} />
                            </Button.Group>
                        </Form.Group>
                        <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>边框颜色</span>
                            <div
                                style={styles.swatch}
                                onKeyPress={() => { this.setState({ color: this.state.stroke }); this.colorPickerOpen(); }}
                                onClick={() => { this.setState({ color: this.state.stroke }); this.colorPickerOpen(); }}
                            >
                                <div style={styles.stroke} />
                            </div>
                        </Form.Group>
                        <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
                            <span>填充颜色</span>
                            <Form.Checkbox label="填充" checked={this.state.checked} onChange={this.clickCheckButton} />
                            <div
                                style={styles.swatch}
                                onKeyPress={() => {
                                    if (this.state.checked) {
                                        this.setState({ isFill: true, color: this.state.fill });
                                        this.colorPickerOpen();
                                    } else {
                                        return false;
                                    }
                                }}
                                onClick={() => {
                                    if (this.state.checked) {
                                        this.setState({ isFill: true, color: this.state.fill });
                                        this.colorPickerOpen();
                                    } else {
                                        return false;
                                    }
                                }}
                            >
                                <div style={styles.fill} />
                            </div>
                        </Form.Group>
                    </Form>
                </Sidebar>
                {
                    picker &&
                    <div style={styles.popover}>
                        <div
                            style={styles.cover}
                            onKeyPress={() => { this.colorPickerClose(); this.setState({ isFill: false }); }}
                            onClick={() => { this.colorPickerClose(); this.setState({ isFill: false }); }}
                        />
                        <BlockPicker
                            color={this.state.color}
                            onChangeComplete={this.colorPickerChange}
                        />
                    </div>
                }
            </div>
        );
    }
}


export { ShapeMenu, ShapePanel };
