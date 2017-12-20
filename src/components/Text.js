import React, { Component } from 'react'
import { Sidebar, Icon, Input, Segment, Menu, Button, Dropdown, Form } from 'semantic-ui-react'
import { fabric } from 'fabric/dist/fabric.min'
import 'fabric-customise-controls'

const fontFamily = [
    { key: 'Arial', value: 'Arial', text: '默认字体' },    
    { key: 'LiDeBiao-Xing3efdf0dc8b19aca', value: 'LiDeBiao-Xing3efdf0dc8b19aca', text: '德彪钢笔' },
    { key: 'winmantun23001efe02015619aca', value: 'winmantun23001efe02015619aca', text: '浪漫原体' },
];

class Text extends Component {
    state = {
        visible: false,
        text: null,
    }

    componentDidMount() {
        fabric.Canvas.prototype.customiseControls({
            bl: {
                action: this.toggleVisibility,
                cursor: 'pointer'
            }
        });
    }

    openVisibility = () => this.setState({ visible: true })
    closeVisibility = () => this.setState({ visible: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText = () => {
        const _this = this;
        const { canvas } = this.props

        const text = new fabric.Text('你的内容', {
            fontSize: 40,
            fill: '#D6D8EA', //银色
            fontFamily: 'Arial', //默认字体
        })

        text.on('selected', function (e) {
            _this.setState({ text });
        });

        canvas
            .viewportCenterObject(text)
            .add(text)
            .setActiveObject(text)

        this.openVisibility()
    }

    setText = ({ target: { value } }) => {
        const { canvas } = this.props;
        const { text } = this.state;

        this.setState({
            text: text ? text.setText(value) : canvas.getActiveObject()
        })

        canvas.renderAll();
    }

    setFill = ({ target: { value } }) => {
        const { canvas } = this.props;
        const { text } = this.state;
        this.setState({
            text: text.setFill(value)
        })
        canvas.renderAll();
    }

    setFontFamily = (e, { value }) => {
        const { canvas } = this.props;
        const { text } = this.state;

        text.fontFamily = value;

        this.setState({ text })
        canvas.renderAll();
    }

    render() {
        const { text } = this.state;

        return (
            <div>
                <Icon onTouchEnd={this.addText} name="font" />
                <Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>文字</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onTouchEnd={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <Form style={{ marginTop: '20px', marginLeft: '30px' }}>
                        <Form.Field control={Input} value={text ? text.getText() : ''} onChange={this.setText} onFocus={this.setText} width={14} />
                        <Form.Group>
                            <Form.Field control={Button} onTouchEnd={() => document.getElementById('color').click()} content='颜色' style={{ backgroundColor: text ? text.getFill() : '' }} />
                            <input type="color" onChange={this.setFill} id="color" style={{ position: 'absolute', bottom: '3000px' }} />
                            <Form.Field control={Dropdown} selection options={fontFamily} pointing='bottom' defaultValue={ text ? text.getFontFamily() : fontFamily[0].value} onChange={this.setFontFamily} />
                        </Form.Group>
                    </Form>
                </Sidebar>
            </div>
        )
    }
}

export default Text

{/* <Container>
<br />
<label>文本：</label>
<Input value={text ? text.getText() : '输入文字'} onChange={this.setText} onFocus={this.setText} />
<br />
<br />
<Button onTouchEnd={() => document.getElementById('color').click()} style={{ backgroundColor: text ? text.getFill() : '' }}>颜色</Button>
<Dropdown
    defaultValue={fontFamily[0].value}
    selection
    pointing='bottom'
    options={fontFamily}
    onChange={this.setFontFamily}
/>
</Container> */}