import React, { Component } from 'react'
import { Sidebar, Icon, Input, Segment, Menu, Button, Dropdown, Container } from 'semantic-ui-react'
import { fabric } from 'fabric'
import 'fabric-customise-controls'

const color = {
    // 银色
    silver: '#D6D8EA'
}

const fontFamily = [
    { key: 'SimSun', value: 'SimSun', text: '宋体' },
    { key: 'SimHei', value: 'SimHei', text: '黑体' },
    { key: 'Impact', value: 'Impact', text: '华文楷体' },
    { key: 'STSong', value: 'STSong', text: '华文宋体' },
];

class Text extends Component {
    state = {
        visible: false,
        text: null
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

        const text = new fabric.Text('输入文字', {
            fontSize: 40,
            fill: color.silver,
            lockRotation: false,
            hasBorders: true,
            lockUniScaling: true,
            centeredScaling: true
        })

        text.setControlsVisibility({
            mtr: false
        })

        text.on('selected', function () {
            _this.setState({ text })
        })

        console.log(text);

        canvas.viewportCenterObject(text).add(text).setActiveObject(text)

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
        this.setState({
            text: text.setFontFamily(value)
        })
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
                    <Container>
                        <br />
                        <label>文本：</label>
                        <Input value={text ? text.getText() : '输入文字'} onChange={this.setText} onFocus={this.setText} />
                        <br />
                        <br />
                        <Button onClick={() => document.getElementById('color').click()} style={{ backgroundColor: text ? text.getFill() : '' }}>颜色</Button>
                        <input type="color" onChange={this.setFill} id="color" style={{ position: 'absolute', bottom: '3000px' }} />
                        <Dropdown
                            defaultValue={fontFamily[0].value}
                            search
                            selection
                            options={fontFamily}
                            onChange={this.setFontFamily}
                        />
                    </Container>
                </Sidebar>
            </div>
        )
    }
}

export default Text