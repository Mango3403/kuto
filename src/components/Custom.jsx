import React from 'react';
import ReactDOM from 'react-dom';
import { fabric } from 'fabric';
import { Title, Textfield, Button, Drawer, DrawerHeader, Icon, DrawerContent, GridList, Tile, TilePrimary, TileContent } from 'react-mdc-web/lib';
import '../material+icons.css';
import './Custom.css';
import img1 from '../imgs/1.jpeg';
import img2 from '../imgs/2.jpeg';
import img3 from '../imgs/3.jpeg';

const style = {
    drawerHeader: {
        overflow: 'scroll'
    }
};

class Custom extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            canvas: {},
            isOpenGallery: false,
            isOpenText: false,
            gallery: props.gallery,
            text: [],
            images: []
        }

        this.addText = this.addText.bind(this);
        this.addImage = this.addImage.bind(this);
    }

    componentDidMount() {
        const canvas = new fabric.Canvas('c', {
            width: window.innerWidth - 70,
            height: 400
        });

        this.setState({
            canvas: canvas
        });
    }

    addText() {
        console.log('添加文字');
        const
            { text, canvas } = this.state,
            newText = {
                id: text.length + 1,
                obj: null
            };

        const t = new fabric.Text('输入文字', {
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

    addImage() {
        console.log('添加图片');
        const { images, canvas } = this.state;

        for (let image of images) {
            fabric.Image.fromURL(image.src, function (img) {
                img.scale(0.3);
                canvas.add(img);
                canvas.renderAll();
            });
        }

        this.setState({
            images: []
        });
    }

    selectImage({ id, isSelected }) {
        const { images, gallery } = this.state;
        const image = ReactDOM.findDOMNode(this.refs.myImageList).querySelectorAll('img').item(id - 1);

        console.log(gallery);

        gallery[id - 1].isSelected = !isSelected;

        if (isSelected) {
            image.style.boxShadow = '';
            images.pop();
        } else {
            image.style.boxShadow = '0 0 10px black';
            images.push(gallery[id - 1]);
        }

        console.log(images);

        this.setState({
            gallery: gallery,
            images: images
        });
    }

    remove() {
        const { text, canvas } = this.state;
        if (canvas.getActiveObject()) {
            console.log(canvas.getActiveObject());
            console.log(canvas.getActiveObject().get('type'));

            // 判断选中对象类型，删除数据再删除对象
            switch (canvas.getActiveObject().get('type')) {
                case 'text':
                    text.pop();
                    this.setState({
                        text: text
                    });
                    break;

                case 'image':

                    break;

                default:
                    break;
            }
            canvas.remove(canvas.getActiveObject());
        }
    }

    render() {
        const { isOpenGallery, isOpenText, canvas, text, gallery } = this.state;
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
                                    switch (key.func) {
                                        case 'isOpenGallery':
                                            this.setState({
                                                isOpenGallery: !this.state.isOpenGallery
                                            });
                                            break;
                                        case 'isOpenText':
                                            this.setState({
                                                isOpenText: !this.state.isOpenText
                                            });
                                            break;
                                        case 'remove':
                                            this.remove();
                                            break;
                                        default:
                                            break;
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
                    <DrawerHeader style={style.drawerHeader}>
                        <Title>图片</Title>
                        <hr />
                        <DrawerContent>
                            <GridList ref="myImageList">
                                {
                                    gallery.map((key) => (
                                        <Tile
                                            key={key.id}
                                            onClick={() => {
                                                this.selectImage(key)
                                            }}
                                        >
                                            <TilePrimary>
                                                <TileContent src={key.src} />
                                            </TilePrimary>
                                        </Tile>
                                    ))
                                }
                            </GridList>
                            <Button raised>导入图片</Button>
                            <Button raised onClick={this.addImage}>添加图片</Button>
                        </DrawerContent>
                    </DrawerHeader>
                </Drawer>
                <Drawer
                    open={isOpenText}
                    onClose={() => { this.setState({ isOpenText: false }) }}
                >
                    <DrawerHeader style={style.drawerHeader}>
                        <Title>文字</Title>
                        <hr />
                        <DrawerContent>
                            <ol>
                                {
                                    text.map((key) => (
                                        <li
                                            key={key.id}
                                            style={{ zIndex: 100 }}
                                        >
                                            <Textfield
                                                value={text[key.id - 1].obj.text}
                                                onChange={({ target: { value } }) => {
                                                    text[key.id - 1].obj.text = value;
                                                    this.setState({
                                                        text: text
                                                    });
                                                    canvas.renderAll();
                                                }}
                                            />
                                        </li>
                                    ))
                                }
                            </ol>
                            <Button raised onClick={this.addText}>添加文字</Button>
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
    ],
    gallery: [
        {
            id: 1,
            src: img1,
            isSelected: false
        },
        {
            id: 2,
            src: img2,
            isSelected: false
        },
        {
            id: 3,
            src: img3,
            isSelected: false
        }
    ]
};

export default Custom;