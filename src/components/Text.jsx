import React, { Component } from 'react';
import { Sidebar, Icon, Segment, Menu, Form } from 'semantic-ui-react';
import { fabric } from 'fabric/dist/fabric';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

const fontFamily = [
  { key: 'Arial', value: 'Arial', text: '默认字体' },
  { key: 'LiDeBiao-Xing3efdf0dc8b19aca', value: 'LiDeBiao-Xing3efdf0dc8b19aca', text: '德彪钢笔' },
  { key: 'winmantun23001efe02015619aca', value: 'winmantun23001efe02015619aca', text: '浪漫原体' },
  { key: 'GoodVibrationsRf33e9f42419aca', value: 'GoodVibrationsRf33e9f42419aca', text: 'GoodVibrationsROB' },
  { key: 'Helvetica-Neue-f33f1506b19aca', value: 'Helvetica-Neue-f33f1506b19aca', text: 'Helvetica-Neue-LT-Std' },
];

class Text extends Component {
  constructor() {
    super();
    this.state = {
      text: undefined,
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
  }

  componentDidMount() {
    const field1 = document.getElementsByClassName('field').item(1);
    const field2 = document.getElementsByClassName('field').item(2);
    field1.style.width = 'calc(100% - 42px)';
    field2.style.paddingRight = '0';
    field2.style.height = '38px';
    this.createText();
  }

  createText = () => {
    const text = new fabric.Text('你的内容', {
      fontSize: 40,
      fill: '#D6D8EA', // 银色
      fontFamily: 'Arial', // 默认字体
    });

    this.setState({ text });
  }

  addText = () => {
    const { canvas, openEditText } = this.props;
    const { text } = this.state;

    canvas.viewportCenterObject(text).add(text).setActiveObject(text).renderAll();

    this.setState({ text });

    openEditText();
  }

  setText = ({ target: { value } }) => {
    const { canvas } = this.props;
    const { text } = this.state;
    text.set('text', value);
    canvas.renderAll();
    this.setState({ text });
  }

  setFill = (color) => {
    const { canvas } = this.props;
    const { text } = this.state;
    text.set('fill', color);
    canvas.renderAll();
    this.setState({ text });
  }

  setFontFamily = (e, { value }) => {
    const { canvas } = this.props;
    const { text } = this.state;
    text.set('fontFamily', value);
    canvas.renderAll();
    this.setState({ text });
  }

  handleOpen = () => this.setState({ displayColorPicker: true })
  handleClose = () => this.setState({ displayColorPicker: false })

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.setFill(color.hex);
  }

  render() {
    const { closeEditText, edittext } = this.props;
    const { text } = this.state;
    const styles = reactCSS({
      default: {
        color: {
          width: '28px',
          height: '28px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
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
          top: '-250px',
          zIndex: '110',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
        iconClose: {
          width: '2em',
        },
      },
    });

    return (
      <div>
        <Icon onClick={this.addText} name="font" />
        <Sidebar as={Segment} animation="push" direction="bottom" visible={edittext}>
          <Menu pointing secondary>
            <Menu.Item header>
              <h3>文字</h3>
            </Menu.Item>
            <Menu.Item position="right">
              <Icon onClick={closeEditText} name="close" bordered size="small" style={styles.iconClose} />
            </Menu.Item>
          </Menu>
          <Form style={{ padding: '5px', textAlign: 'center' }}>
            <h3 style={{ marginTop: '10px' }}>你的内容</h3>
            <Form.Input value={text ? text.text : '你的内容'} onChange={this.setText} onFocus={this.setText} />
            <Form.Group inline style={{ margin: 0 }}>
              <Form.Select selection options={fontFamily} pointing="bottom" defaultValue={text ? text.fontFamily : fontFamily[0].value} onChange={this.setFontFamily} style={{ width: '100%' }} />
              <div style={styles.swatch} onKeyPress={this.handleOpen} onClick={this.handleOpen}>
                <div style={styles.color} />
              </div>
            </Form.Group>
          </Form>
        </Sidebar>
        {
          this.state.displayColorPicker ?
            <div style={styles.popover}>
              <div style={styles.cover} onKeyPress={this.handleClose} onClick={this.handleClose} />
              <ChromePicker color={this.state.color} onChange={this.handleChange} />
            </div>
            :
            null
        }
      </div>
    );
  }
}

export default Text;
