import React, { Component } from 'react'
import { Sidebar, Icon, Accordion, Input, Message } from 'semantic-ui-react'
import { fabric } from 'fabric'
import 'fabric-customise-controls'

const color = {
    // 银色
    silver: '#D6D8EA'
}

class TextPane extends Component {
    constructor() {
        super()

        this.state = {
            visible: false,
            canvas: null,
            text: null
        }

        this.addText = this.addText.bind(this)
        this.updateText = this.updateText.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        })
    }

    componentDidMount() {
        fabric.Canvas.prototype.customiseControls({
            bl: {
                action: this.updateText,
                cursor: 'pointer'
            }
        })
    }

    updateText(e, target) {
        this.toggleVisibility()
        this.setState({
            text: target
        })
    }

    openVisibility = () => this.setState({ visible: true })
    closeVisibility = () => this.setState({ visible: false })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText() {
        const { canvas } = this.state

        const t = new fabric.Text('输入文字', {
            fontSize: 40,
            fill: color.silver,
            lockRotation: false,
            hasBorders: true,
            lockUniScaling: true,
            centeredScaling: true
        })

        t.setControlsVisibility({
            mtr: false
        })

        canvas.viewportCenterObject(t)
        canvas.add(t)
        canvas.setActiveObject(t)
        
        this.setState({
            text: t
        })
        this.openVisibility()
    }

    render() {
        const { text } = this.state

        return (
            <div>
                <Icon
                    onClick={this.addText}
                    name="font"
                />
                <Sidebar style={{ padding: '5px', paddingRight: '25px', fontSize: '0.5em' }} as={Message} animation="overlay" direction="bottom" visible={this.state.visible} onDismiss={this.toggleVisibility}>
                    <Accordion>
                        <Accordion.Title>
                            <Input
                                placeholder={text ? text.text : '输入文字'}
                                onChange={({ target: { value } }) => {
                                    text.text = value
                                    this.setState({
                                        text: text
                                    })
                                    this.state.canvas.renderAll()
                                }}
                            />
                        </Accordion.Title>
                    </Accordion>
                </Sidebar>
            </div>
        )
    }
}

export default TextPane