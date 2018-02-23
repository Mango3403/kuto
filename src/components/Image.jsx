import React, { Component } from 'react';
import { Sidebar, Icon, Segment, Menu, Image, Button, Dropdown, List, Radio, Form, Input } from 'semantic-ui-react';
import img0 from '../static/images/picture/0.jpeg';
import img1 from '../static/images/picture/1.jpeg';
import img2 from '../static/images/picture/2.jpeg';
import img3 from '../static/images/picture/3.jpeg';
import img4 from '../static/images/picture/4.jpg';
// import eventProxy from '../eventProxy'

const styles = {
    panel: {
        padding: 8,
        paddingTop: 0,
        zIndex: 310,
    },
    inputFileButton: {
        position: 'absolute',
        left: 1000,
        top: 0,
        opacity: 0,
    },
};

// 大类
const options1 = [
    {
        key: 'all',
        text: '所有图片',
        value: 'all',
    },
    {
        key: 'image',
        text: '图片',
        value: 'image',
    },
    {
        key: 'icon',
        text: '剪切画',
        value: 'icon',
    },
];

// 小类
const options2 = [
    {
        key: 'all',
        text: '所有类型',
        value: 'all',
    },
    {
        key: 'cartoon',
        text: '卡通',
        value: 'cartoon',
    },
    {
        key: 'flower',
        text: '鲜花',
        value: 'flower',
    },
];

class ImagePanel extends Component {
    state = {
        visible: false,
        image: [
            { key: 0, options: 'icon flower default', src: img4 },
            { key: 1, options: 'icon cartoon default', src: img0 },
            { key: 2, options: 'icon cartoon default', src: img1 },
            { key: 3, options: 'image cartoon default', src: img2 },
            { key: 4, options: 'image cartoon default', src: img3 },
        ],
    }

    render() {
        const { imagepanel } = this.props;

        return (
            <Sidebar as={Segment} animation="push" direction="bottom" style={styles.panel} visible={imagepanel}>
                <Menu pointing secondary style={{ marginBottom: 0, }}>
                    <Menu.Item header>
                        <h3>图片</h3>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Icon onClick={this.props.closeImagePanel} name="close" bordered size="small" />
                    </Menu.Item>
                </Menu>
                <Panel
                    image={this.state.image}
                    openFilterImagePanel={this.props.openFilterImagePanel}
                    closeImagePanel={this.props.closeImagePanel}
                    addImage={this.props.addImage}
                />
            </Sidebar>
        );
    }
}

class Panel extends Component {
    state = {
        currentImage: [],
        saveImage: [],
    };

    componentDidMount() {
        const { image } = this.props;
        const currentImage = [];

        for (const p of image) {
            // 获取每张图片options的值进行分类
            const narr = p.options.split(' ');

            // 将系统默认图片加入数组
            if (narr[narr.length - 1] === 'default') {
                currentImage.push(p);
            }
        }

        this.setState({
            currentImage,
            saveImage: currentImage,
        });
    }

    // 点击图片
    clickImage = (e) => {
        this.props.addImage(e);
        this.props.openFilterImagePanel();
        this.props.closeImagePanel();
    }

    setOption1 = (e, { value }) => {
        const { image } = this.props;

        const currentImage = [];

        if (value === 'all') {
            this.setState({ currentImage: image });
        } else {
            for (const p of image) {
                // 获取每张图片options的值进行分类
                const narr = p.options.split(' ');

                // 将符合大类的图片加入数组
                if (narr[0] === value) {
                    currentImage.push(p);
                }
            }

            this.setState({
                currentImage,
                saveImage: currentImage,
            });
        }
    }

    setOption2 = (e, { value }) => {
        const { saveImage } = this.state;

        const arr = [];

        if (value === 'all') {
            this.setState({ currentImage: saveImage });
        } else {
            for (const p of saveImage) {
                // 获取每张图片options的值进行分类
                const narr = p.options.split(' ');

                // 将符合小类的图片加入数组
                if (narr[1] === value) {
                    arr.push(p);
                }
            }

            this.setState({ currentImage: arr });
        }
    }

    clickFileInput = () => {
        const fileInput = document.getElementById('upload');
        fileInput.click();
    }

    uploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const { currentImage } = this.state;
        const obj = { key: currentImage.length, options: 'image cartoon nodefault', src: null };

        reader.readAsDataURL(file);
        reader.onload = () => {
            obj.src = reader.result;
            currentImage.unshift(obj);
            this.setState({ currentImage });
        };
    }

    render() {
        return (
            <div style={{ padding: '0', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
                <Menu secondary style={{ margin: 0, width: '100%', justifyContent: 'space-between' }}>
                    <Menu.Item>
                        <Button primary size="tiny" onClick={this.clickFileInput}>上传</Button>
                        <input style={styles.inputFileButton} type="file" id="upload" accept="image/*" onChange={this.uploadImage} />
                    </Menu.Item>
                    <Dropdown
                        item
                        options={options1}
                        defaultValue={options1[0].value}
                        onChange={this.setOption1}
                    />
                    <Dropdown
                        item
                        options={options2}
                        defaultValue={options2[0].value}
                        onChange={this.setOption2}
                    />
                </Menu>

                <div style={{ maxHeight: '230px', minWidth: '100%', overflowX: 'hidden' }}>
                    <hr />
                    <Image.Group
                        className="wrap"
                        style={{
                            margin: 0,
                            width: '100%',
                            flexWrap: 'wrap',
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        {this.state.currentImage.map(p => (
                            <Image
                                key={p.key}
                                bordered
                                height={100}
                                width={100}
                                src={p.src}
                                onClick={this.clickImage}
                            />
                        ))}
                    </Image.Group>
                </div>
            </div>
        );
    }
}

class FilterImagePanel extends Component {
    state = {
        checked: false,
    };

    // 点击灰度化开关
    clickToggle = () => {
        if (this.state.checked) {
            this.props.setGrayClear();
        } else {
            this.props.setGray();
        }
        this.setState({ checked: !this.state.checked });
    }

    render() {
        const { filterimagepanel, image } = this.props;
        const { checked } = this.state;

        return (
            <Sidebar as={Segment} animation="push" direction="bottom" style={styles.panel} visible={filterimagepanel}>
                <Menu pointing secondary>
                    <Menu.Item header>
                        <h3>编辑图片</h3>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Icon onClick={this.props.closeFilterImagePanel} name="close" bordered size="small" />
                    </Menu.Item>
                </Menu>
                <List style={{ marginTop: '10px' }}>
                    <List.Item style={{ display: 'flex' }}>
                        <Radio toggle label="灰度化" checked={checked} onChange={this.clickToggle} />
                    </List.Item>
                    <List.Item disabled={!checked}>
                        <Form>
                            <p>
                                过滤梯度值: {image && image.filters.length > 0 ? image.filters[1].distance : 0.00}
                            </p>
                            <Button.Group size="small" style={{ width: '100%' }}>
                                <Button disabled={image && image.filters.length > 0 ? image.filters[1].distance === 0 : true} icon="minus" onClick={this.props.distanceMinus} />
                                <Button>
                                    <Input
                                        min={0}
                                        max={1}
                                        name="duration"
                                        onChange={this.props.changeDistance}
                                        step={0.01}
                                        type="range"
                                        value={image && image.filters.length > 0 ? image.filters[1].distance : 0.00}
                                        disabled={!checked}
                                        size="big"
                                    />
                                </Button>
                                <Button disabled={image && image.filters.length > 0 ? image.filters[1].distance === 1 : false} icon="plus" onClick={this.props.distancePlus} />
                            </Button.Group>
                        </Form>
                    </List.Item>
                </List>
            </Sidebar>
        );
    }
}

export { ImagePanel, FilterImagePanel };

// var image = [
//     { key: 0, options: 'icon flower default', src: 'img4' },
//     { key: 1, options: 'icon cartoon default', src: 'img0' },
//     { key: 2, options: 'icon cartoon default', src: 'img1' },
//     { key: 3, options: 'image cartoon default', src: 'img2' },
//     { key: 4, options: 'image cartoon default', src: 'img3' },
// ];
