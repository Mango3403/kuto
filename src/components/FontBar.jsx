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

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText() {
        console.log(fabric.Canvas.prototype);

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
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction="bottom" visible={visible}>
                    <Icon onClick={this.toggleVisibility} name="close" />
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

{/* <div>
<Icon
    onClick={this.addTextNew}
    name="font"
/>
<Sidebar style={styles.sideBar} as={Message} animation="overlay" direction="bottom" visible={visible}>
    <Icon onClick={this.toggleVisibility} name="close" />
    <Button primary onClick={this.addText}>添加文字</Button>
    {
        text.map(i => (
            <Accordion
                key={i.id}
            >
                <Accordion.Title>
                    <Icon name='dropdown' />
                    <Input
                        placeholder='输入文字'
                        onChange={({ target: { value } }) => {
                            text[i.id].obj.text = value;
                            this.setState({
                                text: text
                            });
                            canvas.renderAll();
                        }}
                    />
                </Accordion.Title>
                <Accordion.Content>
                    <p>字体\斜体\粗体</p>
                </Accordion.Content>
            </Accordion>
        ))
    }
</Sidebar>
</div> */}