import React, { Component } from 'react'
import { Sidebar, Icon, Input, Segment, Menu, Button, Select, Container } from 'semantic-ui-react'
import { fabric } from 'fabric'
import 'fabric-customise-controls'

const color = {
    // 银色
    silver: '#D6D8EA'
}

const fontFamily = [
    { key: 'SimSun', value: 'SimSun', text: '宋体' },
    { key: 'SimHei', value: 'SimHei', text: '黑体' }
];

class Text extends Component {
    state = {
        visible: false,
        text: null
    }

    componentDidMount() {
        fabric.Canvas.prototype.customiseControls({
            bl: {
                action: this.updateText,
                cursor: 'pointer'
            }
        })
    }

    updateText = (e, target) => {
        this.toggleVisibility()
        this.setState({
            text: target
        })
    }

    openVisibility = () => this.setState({ visible: true })
    closeVisibility = () => this.setState({ visible: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText = () => {
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

        canvas.viewportCenterObject(text).add(text).setActiveObject(text)

        this.setState({ text })
        this.openVisibility()
    }

    setText = ({ target: { value } }) => {
        const { canvas } = this.props;
        const { text } = this.state;
        text.text = value
        this.setState({ text })
        canvas.renderAll()
    }

    setColor = color => {
        const { canvas } = this.props;
        const text = canvas.getActiveObject();
        console.log(color);
        text.setColor(color);
        canvas.renderAll();
    }

    setFontFamily = (e, { name, value }) => {
        const { canvas } = this.props;
        const text = canvas.getActiveObject();
        text.setFontFamily(value);
        canvas.renderAll();
    }

    render() {
        const { text } = this.state

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
                        <Input
                            placeholder={text ? text.text : '输入文字'}
                            onChange={this.setText}
                        />
                        <br />
                        <br />
                        <Button onClick={() => document.getElementById('color').click()}>颜色</Button>
                        <input type="color" onChange={e => this.setColor(e.target.value)} id="color" style={{ position: 'absolute', bottom: '3000px' }} />
                        <Select placeholder="选择字体" search selection options={fontFamily} onChange={this.setFontFamily} />
                    </Container>
                </Sidebar>
            </div>
        )
    }
}

export default Text