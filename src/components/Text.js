import React, { Component } from 'react'
import { Sidebar, Icon, Input, Segment, Menu, Button, Dropdown, Form } from 'semantic-ui-react'
import { fabric } from 'fabric'
import 'fabric-customise-controls'
const FontFaceObserver = require('fontfaceobserver');

const fontFamily = [
    { key: 'simsun', value: 'simsun', text: '宋体' },
    { key: 'simhei', value: 'simhei', text: '黑体' },
    { key: 'STXINGKA', value: 'STXINGKA', text: '华文行楷' },
    { key: 'STSONG', value: 'STSONG', text: '华文宋体' },
    { key: 'STCAIYUN', value: 'STCAIYUN', text: '华文彩云' },
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

        console.log(fabric.Text.prototype);
    }

    openVisibility = () => this.setState({ visible: true })
    closeVisibility = () => this.setState({ visible: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    // 加载并使用字体
    loadAndUseFont = (text, font) => {
        const { canvas } = this.props;
        let myfont = new FontFaceObserver(font);

        myfont.load()
            .then(function (e) {
                // when font is loaded, use it.
                text.set('fontFamily', font);
                console.log(e);
                canvas.renderAll();
            }).catch(function (e) {
                console.log(e)
                alert('字体加载失败' + font);
            });
    }

    addText = () => {
        const _this = this;
        const { canvas } = this.props

        const text = new fabric.Text('输入文字', {
            fontSize: 40,
            fill: '#D6D8EA', //银色
        })

        text.on('selected', function (e) {
            _this.setState({ text });
        });

        canvas
            .viewportCenterObject(text)
            .add(text)
            .setActiveObject(text)

        this.openVisibility()
        // this.setState({ text })
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

        this.loadAndUseFont(text, value);

        this.setState({ text })
        canvas.renderAll();
    }

    render() {
        const { text } = this.state;

        return (
            <div>
                <Icon onClick={this.addText} name="font" />
                <Sidebar as={Segment} animation="push" direction="bottom" visible={this.state.visible}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>文字</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <Form style={{ marginTop: '20px', marginLeft: '30px' }}>
                        <Form.Field control={Input} value={text ? text.getText() : ''} onChange={this.setText} onFocus={this.setText} width={14} />
                        <Form.Group>
                            <Form.Field control={Button} onClick={() => document.getElementById('color').click()} content='颜色' style={{ backgroundColor: text ? text.getFill() : '' }} />
                            <input type="color" onChange={this.setFill} id="color" style={{ position: 'absolute', bottom: '3000px' }} />
                            <Form.Field control={Dropdown} selection options={fontFamily} pointing='bottom' defaultValue={fontFamily[0].value} onChange={this.setFontFamily} />
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
<Button onClick={() => document.getElementById('color').click()} style={{ backgroundColor: text ? text.getFill() : '' }}>颜色</Button>
<Dropdown
    defaultValue={fontFamily[0].value}
    selection
    pointing='bottom'
    options={fontFamily}
    onChange={this.setFontFamily}
/>
</Container> */}