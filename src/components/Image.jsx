import React, { Component } from 'react';
import { Sidebar, Icon, Segment, Menu, Image, Button, Dropdown, List, Radio, Form, Input } from 'semantic-ui-react';
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

class ImagePanel extends Component {
    state = {
        visible: false,
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
        options: [],
        selections: [],
        imgs: [],
        url: '/static/imgLib/卡通/七龙珠',
        param: 1,
    };

    componentDidMount() {
        const { options, url } = this.state;

        this.getImages(url);

        this.getOptions();
    }

    // 点击图片
    clickImage = (e) => {
        this.props.addImage(e);
        this.props.openFilterImagePanel();
        this.props.closeImagePanel();
    }

    // 获取大分类
    getOptions = () => {
        let request = new XMLHttpRequest();
        request.open('GET', '/static/imgLib/gallery.json', true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                let options = [];
                let key = 0;
                for (const item of data) {
                    key += 1;
                    let obj = {
                        key,
                        text: item.name,
                        value: key,
                        selections: item.subDirs,
                    };
                    options.push(obj);
                }
                this.setState({ options });
            } else {
                // We reached our target server, but it returned an error
                console.log('未找到服务器');
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            console.log('与服务器连接出现问题');
        };

        request.send();
    }

    // 获取小分类
    getSelections = (value) => {
        const { options } = this.state;
        let data = options[value - 1].selections;
        let selections = [];
        let key = 0;
        for (const item of data) {
            key += 1;
            let obj = {
                key,
                text: item.name,
                value: key,
                selections: item.subDirs,
            };
            selections.push(obj);
        }
        this.setState({ selections });
        return selections;
    }

    // 大类下拉菜单方法
    handleChangeOptions = (e, { value }) => {
        const { options } = this.state;

        let selections = this.getSelections(value);

        const url = `/static/imgLib/${options[value - 1].text}`;

        const u = `${url}/${selections[0].text}`;

        this.getImages(u);

        this.setState({ url });
    }

    // 小类下拉菜单方法
    handleChangeSelections = (e, { value }) => {
        const { selections, url } = this.state;

        const u = `${url}/${selections[value - 1].text}`;

        this.getImages(u);

        this.setState({ param: value });
    }

    // 获取图片
    getImages = (url, imgs = [], key = 0, count = 0) => {
        let request = new XMLHttpRequest();
        request.open('GET', `${url}/list.json`, true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                let data = JSON.parse(request.responseText);
                let _imgs = imgs;
                let _key = key;
                let len = data.length > 21 ? 21 : data.length;
                for (let i = count; i < len + count; i++) {
                    const element = data[i];
                    if (!element) {
                        return false;
                    } else {
                        _key += 1;
                        let obj = {
                            key: _key,
                            src: `${url}/${element}`,
                            message: `图片${_key}`
                        };
                        _imgs.push(obj);
                    }
                }

                this.setState({ imgs: _imgs });
            } else {
                // We reached our target server, but it returned an error
                console.log('未找到服务器');
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            console.log('与服务器连接出现问题');
        };

        request.send();
    }

    // 滚动到图片底部后，再获取
    handleScroll = (e) => {
        const { imgs, url, selections, param } = this.state;
        if (selections.length > 0) {
            let offset = Math.ceil(e.target.scrollHeight - e.target.scrollTop);
            let len = imgs.length;
            if (offset < 240 && len >= 21) {
                const { text } = selections[param - 1];
                const u = `${url}/${text}`;
                this.getImages(u, imgs, imgs[len - 1].key, len - 1);
                console.log(imgs[len - 1].key);
            }
        }
    }

    // 点击上传按钮
    clickFileInput = () => {
        const fileInput = document.getElementById('upload');
        fileInput.click();
    }

    // 上传图片
    uploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const { imgs } = this.state;
        const obj = { key: imgs.length, src: null };

        reader.readAsDataURL(file);
        reader.onload = () => {
            obj.src = reader.result;
            imgs.unshift(obj);
            this.setState({ imgs });
        };
    }

    render() {
        const { value, imgs, options, selections } = this.state;

        return (
            <div style={{ padding: '0', overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>
                <Menu secondary style={{ margin: 0, width: '100%', justifyContent: 'space-between' }}>
                    <Menu.Item>
                        <Button primary size="tiny" onClick={this.clickFileInput}>上传</Button>
                        <input style={styles.inputFileButton} type="file" id="upload" accept="image/*" onChange={this.uploadImage} />
                    </Menu.Item>
                    <Dropdown item compact scrolling options={options} placeholder="卡通" value={value} onChange={this.handleChangeOptions} />
                    <Dropdown item compact scrolling options={selections} placeholder={selections.length ? selections[0].text : "七龙珠"} value={value} onChange={this.handleChangeSelections} />
                </Menu>

                <div style={{ maxHeight: '230px', minWidth: '100%', overflowX: 'hidden' }} onScroll={this.handleScroll}>
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
                        {
                            imgs.map(img => (
                                <Image
                                    key={img.key}
                                    bordered
                                    height={100}
                                    width={100}
                                    src={img.src}
                                    alt={img.message}
                                    onClick={this.clickImage}
                                />
                            ))
                        }
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
