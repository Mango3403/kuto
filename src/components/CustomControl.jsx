import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

const styles = {
  menu1: {
    margin: 0,
    position: 'relative',
    top: '-41px',
  },
  menu2: {
    margin: 0,
    position: 'absolute',
    right: '5px',
    // 56.53 224.63
    top: '240px',
  },
  menu3: {
    margin: 0,
    position: 'relative',
    display: 'none',
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
      view: true,
      isFill: false,
      fill: '#ff0',
      stroke: '#ccc',
      strokeWidth: 5,
      isDrawingMode: false,
      initialText: null,
      textVisible: false,
      imageVisible: false,
      shapeVisible: false,
    };
  }

  componentDidMount() {
    const that = this;

    fabric.Canvas.prototype.customiseControls({
      bl: {
        action(e, target) {
          that.isType(target);
        },
        cursor: 'pointer',
      },
    });
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

  drawingModeToggle = () => {
    const { canvas } = this.props;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    this.setState({
      isDrawingMode: !canvas.isDrawingMode,
    });
  }

  textToggleVisibility = () => {
    const { canvas } = this.props;
    const text = canvas.getActiveObject();
    this.setState({
      textVisible: !this.state.textVisible,
      initialText: text,
    });
  }

  imageToggleVisibility = () => {
    this.setState({ imageVisible: !this.state.imageVisible });
  }

  shapeToggleVisibility = () => {
    this.setState({ shapeVisible: !this.state.shapeVisible });
  }

  handleViewToggle = () => {
    const menu1 = ReactDOM.findDOMNode(this.refs.menu1);
    const menu2 = ReactDOM.findDOMNode(this.refs.menu2);
    const menu3 = ReactDOM.findDOMNode(this.refs.menu3);
    const { view } = this.state;

    if (view) {
      menu1.style.display = 'none';
      menu2.style.display = 'none';
      menu3.style.display = 'flex';
    } else {
      menu1.style.display = 'flex';
      menu2.style.display = 'flex';
      menu3.style.display = 'none';
    }

    this.setState({
      view: !this.state.view,
    });
  }

  isType = (target) => {
    if (target.type === 'text') {
      this.textToggleVisibility();
    } else if (target.type === 'image') {
      this.imageToggleVisibility();
    } else {
      this.shapeToggleVisibility();
    }
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

  render() {
    const { canvas } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Menu icon style={styles.menu1} ref="menu1">
          <Shape canvas={canvas} isFill={this.state.isFill} />
          <Menu.Item style={styles.menuItem}>
            <Text
              canvas={canvas}
              textVisible={this.state.textVisible}
              initialText={this.state.initialText}
              textToggleVisibility={this.textToggleVisibility}
            />
          </Menu.Item>
          <Menu.Item style={styles.menuItem}>
            <Image canvas={canvas} />
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
            <Icon style={{ transform: 'rotate(135deg)' }} link onTouchEnd={this.handleViewToggle} rotated="clockwise" name="long arrow up" />
          </Menu.Item>
        </Menu>

        <EditImage
          canvas={canvas}
          imageVisible={this.state.imageVisible}
          imageToggleVisibility={this.imageToggleVisibility}
        />
        <EditShape
          canvas={canvas}
          shapeVisibility={this.state.shapeVisible}
          shapeToggleVisibility={this.shapeToggleVisibility}
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

        <Menu icon vertical style={styles.menu2} ref="menu2">
          <Menu.Item style={styles.menuItem}>
            <DrawingMode
              isDrawingMode={this.state.isDrawingMode}
              drawingModeToggle={this.drawingModeToggle}
            />
          </Menu.Item>
          <Menu.Item style={styles.menuItem}>
            <Help />
          </Menu.Item>
        </Menu>

        <Menu icon style={styles.menu3} ref="menu3">
          <Menu.Item style={styles.menuItem}>
            <Icon style={{ transform: 'rotate(-45deg)' }} link onTouchEnd={this.handleViewToggle} rotated="clockwise" name="long arrow up" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default CustomControl;
