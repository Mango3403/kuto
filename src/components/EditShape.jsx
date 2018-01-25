import React, { Component } from 'react';
import { Icon, Sidebar, Segment, Menu, Form, Button } from 'semantic-ui-react';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

class EditShape extends Component {
  state = {
    displaystrokeColorPicker: false,
    strokeColor: {
      r: '0',
      g: '0',
      b: '0',
      a: '1',
    },
    displayfillColorPicker: false,
    fillColor: {
      r: '255',
      g: '255',
      b: '0',
      a: '1',
    },
  }

  fillColorHandleClick = () => {
    this.setState({
      displayfillColorPicker: !this.state.displayfillColorPicker,
    });
  }

  strokeColorHandleClick = () => {
    this.setState({
      displaystrokeColorPicker: !this.state.displaystrokeColorPicker,
    });
  }

  handleClose = () => {
    if (this.state.displayfillColorPicker) {
      this.setState({
        displayfillColorPicker: false,
      });
    } else {
      this.setState({
        displaystrokeColorPicker: false,
      });
    }
  }

  handleChange = (color) => {
    const { setShapeFill, setStroke, isFill } = this.props;
    if (this.state.displayfillColorPicker && isFill) {
      this.setState({ fillColor: color.rgb });
      setShapeFill(color.hex);
    } else if (this.state.displaystrokeColorPicker) {
      this.setState({ strokeColor: color.rgb });
      setStroke(color.hex);
    }
  }

  render() {
    const {
      strokeWidth,
      closeEditShape,
      editshape,
      strokeWidthMinus,
      strokeWidthPlus,
      fillToggle,
      shape
    } = this.props;
    const { strokeColor, fillColor } = this.state;

    const styles = reactCSS({
      default: {
        strokeColor: {
          width: '28px',
          height: '28px',
          borderRadius: '2px',
          background: shape ? shape.stroke : `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a})`,
        },
        fillColor: {
          width: '28px',
          height: '28px',
          borderRadius: '2px',
          background: shape ? shape.fill : `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover1: {
          position: 'absolute',
          top: '210px',
          right: '50px',
          zIndex: '110',
        },
        popover2: {
          position: 'absolute',
          top: '160px',
          right: '50px',
          zIndex: '110',
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
        <Sidebar as={Segment} animation="push" direction="bottom" visible={editshape}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>图形</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={closeEditShape} name="close" bordered size="small" />
            </Menu.Item>
          </Menu>
          <Form style={{ padding: '5px' }}>
            <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <span>边框粗细</span>
              <Button.Group>
                <Button disabled={shape ? shape.strokeWidth === 1 : strokeWidth === 1} icon="minus" onClick={strokeWidthMinus} />
                <Button>{shape ? shape.strokeWidth : strokeWidth}</Button>
                <Button disabled={shape ? shape.strokeWidth === 30 : strokeWidth === 30} icon="plus" onClick={strokeWidthPlus} />
              </Button.Group>
            </Form.Group>
            <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>边框颜色</span>
              <div
                style={styles.swatch}
                onKeyPress={this.strokeColorHandleClick}
                onClick={this.strokeColorHandleClick}
              >
                <div style={styles.strokeColor} />
              </div>
            </Form.Group>
            <Form.Group inline style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
              <span>填充颜色</span>
              <Form.Checkbox label="填充" checked={shape ? shape.fill ? true : false : false} onChange={this.props.fillToggle} />
              <div
                style={styles.swatch}
                onKeyPress={this.fillColorHandleClick}
                onClick={this.fillColorHandleClick}
              >
                <div style={styles.fillColor} />
              </div>
            </Form.Group>
          </Form>
        </Sidebar>
        {
          this.state.displayfillColorPicker || this.state.displaystrokeColorPicker ?
            <div style={this.state.displayfillColorPicker ? styles.popover1 : styles.popover2}>
              <div
                style={styles.cover}
                onKeyPress={this.handleClose}
                onClick={this.handleClose}
              />
              <ChromePicker
                color={
                  this.state.displayfillColorPicker ?
                    this.state.fillColor :
                    this.state.strokeColor
                }
                onChange={this.handleChange}
              />
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default EditShape;
