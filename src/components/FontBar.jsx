import React, { Component } from 'react';
import { Sidebar, Icon, Accordion, Input, Message } from 'semantic-ui-react';
import { fabric } from 'fabric';
import 'fabric-customise-controls';

const styles = {
    text: {
        // 银色
        color: '#D6D8EA',
        // color: '#9698AA',
        fontSize: 40
    },
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em'
    }
};

class FontBar extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            canvas: null,
            text: null
        };

        this.addText = this.addText.bind(this);
        this.addTextNew = this.addTextNew.bind(this);
        this.updateText = this.updateText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    componentDidMount() {
        fabric.Canvas.prototype.customiseControls({
            bl: {
                action: this.updateText,
                cursor: 'pointer'
            }
        });
    }

    updateText(e, target) {
        this.toggleVisibility();
        this.setState({
            text: target
        });
    }

    openVisibility = () => this.setState({ visible: true })
    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText() {
        const { text, canvas } = this.state;

        const t = new fabric.Text('输入文字', {
            fontSize: styles.text.fontSize,
            fill: styles.text.color,
            lockRotation: false,
            hasBorders: true,
            lockUniScaling: true,
            centeredScaling: true
        });

        t.setControlsVisibility({
            mtr: false
        });

        canvas.viewportCenterObject(t);
        canvas.add(t);
        canvas.setActiveObject(t); 
        this.openVisibility();       
    }

    addTextNew() {
        const { canvas } = this.state;

        if (canvas.getActiveObject()) {
            if (canvas.getActiveObject().isType('text')) {
                this.toggleVisibility();
            }
        }
    }

    render() {
        const { visible, text, canvas } = this.state;

        return (
            <div>
                <Icon
                    onClick={this.addText}
                    name="font"
                />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction="bottom" visible={visible} onDismiss={this.toggleVisibility}>
                    <Accordion>
                        <Accordion.Title>
                            <Icon name='dropdown' />
                            <Input
                                placeholder={text ? text.text : '输入文字'}
                                onChange={({ target: { value } }) => {
                                    text.text = value;
                                    this.setState({
                                        text: text
                                    });
                                    canvas.renderAll();
                                }}
                            />
                        </Accordion.Title>
                    </Accordion>
                </Sidebar>
            </div>
        );
    }
}

export default FontBar;