import React from 'react';
import { fabric } from 'fabric';
import { Textfield, Button, Drawer, DrawerHeader, DrawerHeaderContent, Icon, DrawerContent } from 'react-mdc-web/lib';
import '../material+icons.css';
import './Main.css';

class Custom extends React.Component {

    constructor() {

        super();

        this.state = {
            canvas: {},
            isOpenGallery: false,
            isOpenText: false,
            gallery: [],
            text: []
        }

        this.remove = this.remove.bind(this);
        this.addText = this.addText.bind(this);
    }

    componentDidMount() {
        const canvas = new fabric.Canvas('c', {
            width: window.innerWidth - 50,
            height: 400
        });

        this.setState({
            canvas: canvas
        });
    }

    addText() {
        const
            { text, canvas } = this.state,
            newText = {
                id: text.length + 1,
                value: 'Hello',
                obj: null
            };

        const t = new fabric.Text(newText.value, {
            left: 100,
            top: 100,
            fontSize: 30
        });

        canvas.add(t);

        newText.obj = t;
        text.push(newText);

        this.setState({
            text: text
        });
    }

    remove() {
        const { canvas } = this.state;
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
        }
    }

    render() {
        const { isOpenGallery, isOpenText, canvas, text } = this.state;
        const { ctrls } = this.props;

        return (
            <div className="custom">
                <canvas id="c">您的浏览器不支持 canvas</canvas>
                <ul>
                    {
                        ctrls.map((key) => (
                            <li
                                key={key.id}
                                onClick={() => {
                                    const f = key.func;
                                    if (f === 'isOpenGallery') {
                                        this.setState({
                                            isOpenGallery: !this.state.isOpenGallery
                                        })
                                    } else if (f === 'isOpenText') {
                                        this.setState({
                                            isOpenText: !this.state.isOpenText
                                        })
                                    } else if (f === 'remove') {
                                        this.remove();
                                    }
                                }}
                            >
                                <Icon
                                    name={key.name}
                                />
                            </li>
                        ))
                    }
                </ul>
                <Drawer
                    open={isOpenGallery}
                    onClose={() => { this.setState({ isOpenGallery: false }) }}
                >
                    <DrawerHeader>
                        <DrawerHeaderContent>
                            图片
                        </DrawerHeaderContent>
                    </DrawerHeader>
                </Drawer>
                <Drawer
                    open={isOpenText}
                    onClose={() => { this.setState({ isOpenText: false }) }}
                >
                    <DrawerHeader>
                        <DrawerHeaderContent>
                            文字
                        </DrawerHeaderContent>
                        <DrawerContent>
                            {
                                text.map((key) => (
                                    <div
                                        key={key.id}
                                        style={{ zIndex: 100 }}
                                    >
                                        <Textfield
                                            value={key.value}
                                            onChange={({ target: { value } }) => {
                                                text[key.id - 1].value = value;
                                                text[key.id - 1].obj.text = value;
                                                this.setState({
                                                    text: text
                                                });
                                                canvas.renderAll();
                                            }}
                                        />
                                    </div>
                                ))
                            }
                            <Button onClick={this.addText}>添加文字</Button>
                        </DrawerContent>
                    </DrawerHeader>
                </Drawer>
            </div>
        );
    }
}

Custom.defaultProps = {
    ctrls: [
        {
            id: '1',
            name: 'arrow_back'
        },
        {
            id: '2',
            name: 'arrow_forward'
        },
        {
            id: '3',
            name: 'delete',
            func: 'remove'
        },
        {
            id: '4',
            name: 'refresh'
        },
        {
            id: '5',
            name: 'add'
        },
        {
            id: '6',
            name: 'title',
            func: 'isOpenText'
        },
        {
            id: '7',
            name: 'image',
            func: 'isOpenGallery'
        }
    ]
};

export default Custom;