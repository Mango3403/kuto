import React, { Component } from 'react';
import { Sidebar, Menu, Icon, Button, Accordion, Input } from 'semantic-ui-react';
import { fabric } from 'fabric';

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
            left: 100,
            top: 100,
            fontSize: 30,
            fill: '#D6D8EA',
            hasBorders: false
        });

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
                <Sidebar as={Menu} animation='overlay' direction='bottom' visible={visible} inverted>
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
                                    <p style={{color: 'white'}}>字体\斜体\粗体</p>
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