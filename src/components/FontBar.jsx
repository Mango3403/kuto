import React, { Component } from 'react';
import { Sidebar, Icon, Button, Accordion, Input, Message } from 'semantic-ui-react';
import { fabric } from 'fabric';

const styles = {
    text: {
        // 银色
        // color: '#D6D8EA',
        color: '#9698AA',
        fontSize: 40
    },
    sideBar: {
        fontSize: '0.5em'
    }
};

class FontBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            canvas: props.canvas,
            text: []
        }

        this.addText = this.addText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    addText() {
        const
            { text, canvas } = this.state,
            newText = {
                id: text.length,
                obj: null
            };

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

        newText.obj = t;
        text.push(newText);

        this.setState({
            text: text
        });
    }

    render() {
        const { visible, text, canvas } = this.state;
        return (
            <div>
                <Icon onClick={this.toggleVisibility} name="font" />
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
            </div>
        )
    }
}

export default FontBar;