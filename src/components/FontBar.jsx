import React, { Component } from 'react';
import { Card, Sidebar, Icon, Button, Accordion, Input } from 'semantic-ui-react';
import { fabric } from 'fabric';

const font = {
    // 银色
    color: '#D6D8EA',
    fontSize: 30
};

class FontBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canvasvisible: false,
            canvas: props.canvas,
            text: []
        }

        this.addText = this.addText.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
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
            fontSize: font.fontSize,
            fill: font.color,
            lockRotation: true,
            hasBorders: true
        });

        canvas.viewportCenterObject(t);

        canvas.add(t);

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
                <Icon onClick={this.toggleVisibility} name='font' />
                <Sidebar as={Card} animation='overlay' direction='bottom' visible={visible}>
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