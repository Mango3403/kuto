import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import { fabric } from 'fabric/dist/fabric';
import { ImagePanel, FilterImagePanel } from './Image';
import ClearWarning from './ClearWarning';
import BackgroundPanel from './BackgroundPanel';
import SavePanel from './SavePanel';
import { ShapeMenu, ShapePanel } from './Shape';
import { TextPanel } from './Text';
import LayerPanel from './LayerPanel';
import layerImg from '../static/images/control/order.png';

const styles = {
    // 底部菜单
    bottomMenu: {
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: 301,
    },
    // 右侧菜单
    rightMenu: {
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        zIndex: 301,
    },
    menuItem: {
        paddingLeft: 5,
        paddingRight: 5,
        minWidth: '3em',
    },
    menuItemShape: {
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: '3em',
    }
};

class Controls extends Component {
    state = {
        tooltip: false,
        isDrawingMode: false,
        strokeWidth: 5,
        shapepanel: false,
        textpanel: false,
        imagepanel: false,
        filterimagepanel: false,
        backgroundpanel: false,
        layerpanel: false,
        save: false,
        clearWarning: false,
        menu: true,
        dataurl: '',
    };

    componentDidMount() {
        fabric.Canvas.prototype.customiseControls({
            bl: {
                action: (e, target) => {
                    this.isType(target);
                },
                cursor: 'pointer',
            },
        });
    }

    // 控制按钮开关
    clickViewButton = () => this.setState({ menu: !this.state.menu })

    // 编辑图形面板
    openShapePanel = () => this.setState({ shapepanel: true })
    closeShapePanel = () => this.setState({ shapepanel: false })
    toggleShapePanel = () => this.setState({ shapepanel: !this.state.shapepanel })

    // 编辑文本面板
    openTextPanel = () => this.setState({ textpanel: true })
    closeTextPanel = () => this.setState({ textpanel: false })
    toggleTextPanel = () => this.setState({ textpanel: !this.state.textpanel })
    clickTextButton = () => {
        this.props.addText(this.state.fill);
        this.openTextPanel();
    }

    // 编辑图片面板
    openImagePanel = () => this.setState({ imagepanel: true })
    closeImagePanel = () => this.setState({ imagepanel: false })
    toggleImagePanel = () => this.setState({ imagepanel: !this.state.imagepanel })

    // 编辑过滤图片面板
    openFilterImagePanel = () => this.setState({ filterimagepanel: true })
    closeFilterImagePanel = () => this.setState({ filterimagepanel: false })
    toggleFilterImagePanel = () => this.setState({ filterimagepanel: !this.state.filterimagepanel })

    // 编辑背景面板
    openBackgroundPanel = () => this.setState({ backgroundpanel: true })
    closeBackgroundPanel = () => this.setState({ backgroundpanel: false })
    toggleBackgroundPanel = () => this.setState({ backgroundpanel: !this.state.backgroundpanel })
    clickBackgroundButton = () => {
        this.openBackgroundPanel();
        // this.checkOverlayImage();
    }

    // 编辑图层面板
    openLayerPanel = () => this.setState({ layerpanel: true })
    closeLayerPanel = () => this.setState({ layerpanel: false })
    toggleLayerPanel = () => this.setState({ layerpanel: !this.state.layerpanel })

    // 保存面板开关
    openSave = () => this.setState({ save: true })
    closeSave = () => this.setState({ save: false })
    clickSaveButton = () => {
        const dataurl = this.props.saveImage();
        this.setState({ dataurl });
        this.openSave();
    }

    // 清空警告
    openClearWarning = () => this.setState({ clearWarning: true })
    closeClearWarning = () => this.setState({ clearWarning: false })

    // 绘制\控制模式按钮
    drawingModeToggle = () => {
        this.props.drawingMode();
        this.setState({ isDrawingMode: !this.state.isDrawingMode });
    }

    // 判断画布对象的类型：文本、图片、图形
    isType = (target) => {
        if (target.type === 'i-text') {
            this.toggleTextPanel();
        } else if (target.type === 'image') {
            this.toggleFilterImagePanel();
        } else if (target.type === 'path') {
            return false;
        } else {
            this.toggleShapePanel();
        }
    }

    // 帮助开关
    toggleTooltip = () => this.setState({ tooltip: !this.state.tooltip })

    render() {
        const { tooltip, isDrawingMode } = this.state;

        return (
            <div>
                {
                    this.state.menu ?
                        <div>
                            <Menu compact icon="labeled" style={styles.bottomMenu}>
                                <Menu.Item style={styles.menuItemShape}>
                                    <ShapeMenu
                                        tooltip={tooltip}
                                        openShapePanel={this.openShapePanel}
                                        addLine={this.props.addLine}
                                        addCircle={this.props.addCircle}
                                        addTriangle={this.props.addTriangle}
                                        addRect={this.props.addRect}
                                        addPentagon={this.props.addPentagon}
                                        addHexagon={this.props.addHexagon}
                                        addPentagram={this.props.addPentagram}
                                    />
                                    {tooltip && '图形'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.clickTextButton}>
                                    <Icon name="font" />
                                    {tooltip && '文字'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem}>
                                    <Icon name="image" onClick={this.openImagePanel} />
                                    {tooltip && '图片'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.clickBackgroundButton}>
                                    <Icon name="desktop" />
                                    {tooltip && '背景'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.clickSaveButton}>
                                    <Icon name="save" />
                                    {tooltip && '保存'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.openClearWarning}>
                                    <Icon name="trash" />
                                    {tooltip && '清空'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.clickViewButton}>
                                    <Icon name="hide" />
                                    {tooltip && '隐藏'}
                                </Menu.Item>
                            </Menu>

                            <Menu compact icon="labeled" vertical style={styles.rightMenu}>
                                <Menu.Item style={styles.menuItem} onClick={this.drawingModeToggle}>
                                    {isDrawingMode ? <Icon name="hand pointer" /> : <Icon name="paint brush" />}
                                    {tooltip && '模式'}
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} onClick={this.toggleTooltip}>
                                    <Icon name="help" />
                                    {tooltip && '帮助'}
                                </Menu.Item>
                                {
                                    this.props.layer &&
                                    <Menu.Item style={styles.menuItem} onClick={this.openLayerPanel}>
                                        <Icon as={Image} src={layerImg} />
                                        {tooltip && '图层'}
                                    </Menu.Item>
                                }
                            </Menu>
                        </div>
                        :
                        <Menu compact icon="labeled" style={styles.bottomMenu}>
                            <Menu.Item style={styles.menuItem} onClick={this.clickViewButton}>
                                <Icon name="unhide" />
                                {tooltip && '展示'}
                            </Menu.Item>
                        </Menu>
                }

                <ShapePanel
                    shape={this.props.shape}
                    strokeWidthPlus={this.props.strokeWidthPlus}
                    strokeWidthMinus={this.props.strokeWidthMinus}
                    setShapeStroke={this.props.setShapeStroke}
                    setShapeFill={this.props.setShapeFill}
                    strokeWidth={this.state.strokeWidth}
                    shapepanel={this.state.shapepanel}
                    closeShapePanel={this.closeShapePanel}
                />
                <TextPanel
                    textpanel={this.state.textpanel}
                    closeTextPanel={this.closeTextPanel}
                    setText={this.props.setText}
                    setTextFill={this.props.setTextFill}
                    setFontFamily={this.props.setFontFamily}
                    text={this.props.text}
                />
                <ImagePanel
                    imagepanel={this.state.imagepanel}
                    closeImagePanel={this.closeImagePanel}
                    openFilterImagePanel={this.openFilterImagePanel}
                    addImage={this.props.addImage}
                />
                <FilterImagePanel
                    filterimagepanel={this.state.filterimagepanel}
                    closeFilterImagePanel={this.closeFilterImagePanel}
                    setGray={this.props.setGray}
                    setGrayClear={this.props.setGrayClear}
                    distancePlus={this.props.distancePlus}
                    distanceMinus={this.props.distanceMinus}
                    changeDistance={this.props.changeDistance}
                    image={this.props.image}
                />
                <BackgroundPanel
                    canvas={this.props.canvas}
                    backgroundpanel={this.state.backgroundpanel}
                    closeBackgroundPanel={this.closeBackgroundPanel}
                />
                <LayerPanel
                    layerpanel={this.state.layerpanel}
                    closeLayerPanel={this.closeLayerPanel}
                    sendToBack={this.props.sendToBack}
                    bringToFront={this.props.bringToFront}
                    bringForward={this.props.bringForward}
                    sendBackwards={this.props.sendBackwards}
                    center={this.props.center}
                />
                <SavePanel
                    save={this.state.save}
                    dataurl={this.state.dataurl}
                    closeSave={this.closeSave}
                    businessUserID={this.props.businessUserID}
                />
                <ClearWarning
                    clearWarning={this.state.clearWarning}
                    closeClearWarning={this.closeClearWarning}
                    clear={this.props.clear}
                />
            </div>
        );
    }
}

export default Controls;
