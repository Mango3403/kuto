import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import { fabric } from 'fabric/dist/fabric';
import Image from './Image';
import Text from './Text';
import Clear from './Clear';
import Background from './Background';
import Save from './Save';
import Shape from './Shape';
import EditImage from './EditImage';
import EditShape from './EditShape';
import DrawingMode from './DrawingMode';
import Help from './Help';
import EditLayer from './EditLayer';

const WINDOW_WIDTH = window.innerWidth > 400 ? 400 : window.innerWidth - 10;

const styles = {
  menu1: {
    margin: '0',
    position: 'relative',
    top: '-41px',
  },
  menu2: {
    margin: '0',
    position: 'absolute',
    right: '5px',
    // 56.53 224.63
    top: '240px',
  },
  menu3: {
    margin: '0',
    position: 'relative',
    left: '130px',
    top: '-41px',
  },
  menuItem: {
    padding: '4px',
    fontSize: '2em',
  },
};

class CustomControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFill: false,
      fill: '#ff0',
      stroke: '#ccc',
      strokeWidth: 5,
      isDrawingMode: true,
      edittext: false,
      editimage: false,
      editshape: false,
      menu: true,
      help: false,
    };
  }

  componentDidMount() {
    const _this = this;

    fabric.Canvas.prototype.customiseControls({
      bl: {
        action(e, target) {
          _this.isType(target);
        },
        cursor: 'pointer',
      },
    });
  }

  /**
   * 绘制\控制模式按钮
   */
  drawingModeToggle = () => {
    const { canvas } = this.props;
    const { isDrawingMode } = this.state;
    canvas.isDrawingMode = isDrawingMode;
    this.setState({ isDrawingMode: !isDrawingMode });
  }

  /**
   * 菜单
   */
  menuToggle = () => this.setState({ menu: !this.state.menu })

  /**
   * 判断画布对象的类型：文本、图片、图形
   */
  isType = (target) => {
    if (target.type === 'text') {
      this.editTextToggle();
    } else if (target.type === 'image') {
      this.editImageToggle();
    } else {
      this.editShapeToggle();
    }
  }

  setStroke = (color) => {
    const { canvas } = this.props;
    const obj = canvas.getActiveObject();
    obj.set('stroke', color);
    canvas.renderAll();
    this.setState({ stroke: color });
  }

  setShapeFill = (color) => {
    const { canvas } = this.props;
    const obj = canvas.getActiveObject();
    obj.set('fill', color);
    canvas.renderAll();
    this.setState({ fill: color });
  }

  fillToggle = () => {
    const { canvas } = this.props;
    const obj = canvas.getActiveObject();
    if (this.state.isFill) {
      obj.set('fill', null);
    } else {
      obj.set('fill', this.state.fill);
    }
    canvas.renderAll();
    this.setState({ isFill: !this.state.isFill });
  }

  strokeWidthPlus = () => {
    const { canvas } = this.props;
    const obj = canvas.getActiveObject();
    const value = obj.strokeWidth + 1;
    obj.set('strokeWidth', value);
    canvas.renderAll();
    this.setState({ strokeWidth: value });
  }

  strokeWidthMinus = () => {
    const { canvas } = this.props;
    const obj = canvas.getActiveObject();
    const value = obj.strokeWidth - 1;
    obj.set('strokeWidth', value);
    canvas.renderAll();
    this.setState({ strokeWidth: value });
  }

  /**
   * 帮助按钮
   */
  helpToggle = () => this.setState({ help: !this.state.help })

  /**
   * 编辑文本面板
   */
  openEditText = () => this.setState({ edittext: true })
  closeEditText = () => this.setState({ edittext: false })
  editTextToggle = () => this.setState({ edittext: !this.state.edittext })

  /**
   * 编辑图形面板
   */
  openEditShape = () => this.setState({ editshape: true })
  closeEditShape = () => this.setState({ editshape: false })
  editShapeToggle = () => this.setState({ editshape: !this.state.editshape })

  /**
   * 编辑图片面板
   */
  openEditImage = () => this.setState({ editimage: true })
  closeEditImage = () => this.setState({ editimage: false })
  editImageToggle = () => this.setState({ editimage: !this.state.editimage })

  render() {
    const { canvas } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {
          this.state.menu ?
            <div>
              {
                this.state.help ?
                  <Help />
                  :
                  null
              }
              <Menu icon style={styles.menu1}>
                <Shape canvas={canvas} openEditShape={this.openEditShape} isFill={this.state.isFill} />
                <Menu.Item style={styles.menuItem}>
                  <Text
                    canvas={canvas}
                    edittext={this.state.edittext}
                    closeEditText={this.closeEditText}
                    openEditText={this.openEditText}
                  />
                </Menu.Item>
                <Menu.Item style={styles.menuItem}>
                  <Image canvas={canvas} openEditImage={this.openEditImage} />
                </Menu.Item>
                <Menu.Item style={styles.menuItem}>
                  <Background canvas={canvas} />
                </Menu.Item>
                <Menu.Item style={styles.menuItem}>
                  <Save canvas={canvas} />
                </Menu.Item>
                <Menu.Item style={styles.menuItem}>
                  <Clear canvas={canvas} />
                </Menu.Item>
                <Menu.Item style={styles.menuItem}>
                  <Icon style={{ transform: 'rotate(135deg)' }} link onClick={this.menuToggle} rotated="clockwise" name="long arrow up" />
                </Menu.Item>
              </Menu>

              <EditImage
                canvas={canvas}
                editimage={this.state.editimage}
                closeEditImage={this.closeEditImage}
              />
              <EditShape
                canvas={canvas}
                editshape={this.state.editshape}
                closeEditShape={this.closeEditShape}
                fill={this.state.fill}
                isFill={this.state.isFill}
                fillToggle={this.fillToggle}
                setShapeFill={this.setShapeFill}
                stroke={this.state.stroke}
                setStroke={this.setStroke}
                strokeWidth={this.state.strokeWidth}
                strokeWidthPlus={this.strokeWidthPlus}
                strokeWidthMinus={this.strokeWidthMinus}
              />

              <Menu icon vertical style={styles.menu2}>
                <Menu.Item style={styles.menuItem}>
                  <DrawingMode
                    isDrawingMode={this.state.isDrawingMode}
                    drawingModeToggle={this.drawingModeToggle}
                  />
                </Menu.Item>
                <Menu.Item style={styles.menuItem} onClick={this.helpToggle}>
                  <Icon name="help" />
                </Menu.Item>
                {
                  this.props.visible ?
                    <Menu.Item style={styles.menuItem}>
                      <EditLayer canvas={canvas} />
                    </Menu.Item>
                    :
                    null
                }
              </Menu>
            </div>
            :
            <Menu icon style={styles.menu3}>
              <Menu.Item style={styles.menuItem}>
                <Icon style={{ transform: 'rotate(-45deg)' }} link onClick={this.menuToggle} rotated="clockwise" name="long arrow up" />
              </Menu.Item>
            </Menu>
        }
      </div>
    );
  }
}

CustomControl.defaultProps = {
  visible: false,
};

CustomControl.propTypes = {
  visible: PropTypes.bool,
};

export default CustomControl;
