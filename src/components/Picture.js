import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Sidebar, Icon, Image, Popup, Table, Checkbox, Button, Segment, Menu, Dropdown, Grid } from 'semantic-ui-react'
import { fabric } from 'fabric'
// import eventProxy from '../eventProxy'
import upload from '../assets/images/upload.png'
import img0 from '../assets/images/picture/0.jpeg'
import img1 from '../assets/images/picture/1.jpeg'
import img2 from '../assets/images/picture/2.jpeg'
import img3 from '../assets/images/picture/3.jpeg'
import img4 from '../assets/images/picture/4.jpg'

class Panel extends Component {

    state = {
        isTipsOpen: false,
        tapedTwice: false,
    }

    uploadImage = () => {
        const
            files = ReactDOM.findDOMNode(this.refs.file).files,
            file = files[0],
            reader = new FileReader(),
            { picture } = this.props,
            obj = { key: picture.length, options: 'image cartoon', src: null }

        reader.readAsDataURL(file)
        reader.onload = event => {
            img.src = reader.result

            picture.unshift(img)

            this.setState({ picture })
        }
    }

    addImage = e => {
        const { canvas } = this.props

        // 发布 openFilter 事件，由 EditPicture 组件接收
        // setTimeout(() => eventProxy.trigger('openFilter'), 300)

        fabric.Image.fromURL(e.target.src, img => {
            img.scale(0.3)

            canvas.viewportCenterObject(img)
            img.lockRotation = false
            img.hasBorders = true
            img.lockUniScaling = true
            img.centeredScaling = true

            img.setControlsVisibility({
                mtr: false
            })

            canvas.add(img).setActiveObject(img);
        })

        this.props.setClose()
    }

    render() {
        const { picture } = this.props

        return (
            <div>
                <div style={{ float: 'left', margin: '5px', height: '80px', width: '50px', boxShadow: '0 0 10px #3195e0', background: 'url(' + upload + ') no-repeat', backgroundSize: '40px 40px', backgroundPosition: '5px 15px' }}>
                    <input style={{ height: '80px', fontSize: '1px', position: 'relative', left: 0, top: 0, opacity: 0 }} type="file" ref="file" accept="image/*" onChange={this.uploadImage} />
                </div>
                <Image.Group style={{ display: 'flex', overflowX: 'auto' }}>
                    {
                        picture.map((i, index) => (
                            <Popup
                                key={index}
                                trigger={
                                    <Image onDoubleClick={this.addImage} src={i.src} height="85px" style={{ margin: '5px 3px', border: '0.1px solid black' }} />
                                }
                                content='双击图片加入画板'
                                hideOnScroll
                            />
                        ))
                    }
                </Image.Group>
            </div>
        )
    }
}

// 大类
const options1 = [
    {
        key: 'all',
        text: '全部',
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
    }
]

// 小类
const options2 = [
    {
        key: 'all',
        text: '全部',
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
]

class PanelO extends Component {
    state = {
        currentPicture: [],
        savePicture: []
    }

    componentDidMount() {
        const { picture } = this.props;
        let currentPicture = [];

        for (const p of picture) {
            // 获取每张图片options的值进行分类
            let narr = p.options.split(' ');

            // 将系统默认图片加入数组
            if (narr[narr.length - 1] === 'default') {
                currentPicture.push(p);
            }
        }

        this.setState({
            currentPicture: currentPicture,
            savePicture: currentPicture
        })
    }

    clickFileInput = () => {
        let fileInput = ReactDOM.findDOMNode(this.refs.file);
        fileInput.click();
    }

    uploadImage = () => {
        const
            files = ReactDOM.findDOMNode(this.refs.file).files,
            file = files[0],
            reader = new FileReader(),
            { picture } = this.props,
            obj = { key: picture.length, options: 'image cartoon nodefault', src: null }

        reader.readAsDataURL(file)
        reader.onload = event => {
            obj.src = reader.result

            picture.unshift(obj)

            this.setState({ picture })
        }
    }

    addImage = e => {
        const { canvas } = this.props
        // 发布 openFilter 事件，由 EditPicture 组件接收
        // setTimeout(() => eventProxy.trigger('openFilter'), 300)
        fabric.Image.fromURL(e.target.src, img => {
            img.scale(0.3)
            img.lockRotation = false
            img.hasBorders = true
            img.lockUniScaling = true
            img.centeredScaling = true
            img.setControlsVisibility({
                mtr: false
            })

            canvas.viewportCenterObject(img)
            canvas.add(img).setActiveObject(img);
        })
    }

    setOption1 = (e, { value }) => {
        const { picture } = this.props;

        let currentPicture = [];

        if (value === 'all') {
            this.setState({ currentPicture: picture })
        } else {
            for (const p of picture) {
                // 获取每张图片options的值进行分类
                let narr = p.options.split(' ');

                // 将符合大类的图片加入数组
                if (narr[0] === value) {
                    currentPicture.push(p);
                }
            }

            this.setState({
                currentPicture: currentPicture,
                savePicture: currentPicture
            })
        }
    }

    setOption2 = (e, { value }) => {
        const { currentPicture, savePicture } = this.state;

        let arr = [];

        if (value === 'all') {
            this.setState({ currentPicture: savePicture })
        } else {
            for (const p of savePicture) {
                // 获取每张图片options的值进行分类
                let narr = p.options.split(' ');

                // 将符合小类的图片加入数组
                if (narr[1] === value) {
                    arr.push(p);
                }
            }

            this.setState({ currentPicture: arr })
        }
    }

    render() {
        return (
            <div style={{ overflow: 'hidden' }}>
                <Menu pointing secondary>
                    <Menu.Item>
                        <Button primary size="tiny" onClick={this.clickFileInput}>上传</Button>
                        <input style={{ position: 'absolute', left: 1000, top: 0, opacity: 0 }} type="file" ref="file" accept="image/*" onChange={this.uploadImage} />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown inline options={options1} defaultValue={options1[0].value} onChange={this.setOption1} />
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown inline options={options2} defaultValue={options2[0].value} onChange={this.setOption2} />
                    </Menu.Item>
                </Menu>

                <Grid celled="internally" style={{ height: '250px', overflowY: 'auto' }}>
                    <Grid.Row columns={3}>
                        {
                            this.state.currentPicture.map(p => (
                                <Grid.Column key={p.key}>
                                    <Image bordered height={80} src={p.src} onClick={this.addImage} />
                                </Grid.Column>
                            ))
                        }
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

class Picture extends Component {
    state = {
        visible: false,
        picture: [
            { key: 0, options: 'icon flower default', src: img4 },
            { key: 1, options: 'icon cartoon default', src: img0 },
            { key: 2, options: 'icon cartoon default', src: img1 },
            { key: 3, options: 'image cartoon default', src: img2 },
            { key: 4, options: 'image cartoon default', src: img3 },
        ]
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar as={Segment} animation="push" direction='bottom' visible={this.state.visible}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>图片</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    {/* <Panel picture={this.state.picture} canvas={this.props.canvas} setClose={this.toggleVisibility} /> */}
                    <PanelO canvas={this.props.canvas} picture={this.state.picture} />
                </Sidebar>
            </div>
        )
    }
}

export default Picture

// var picture = [
//     { key: 0, options: 'icon flower default', src: 'img4' },
//     { key: 1, options: 'icon cartoon default', src: 'img0' },
//     { key: 2, options: 'icon cartoon default', src: 'img1' },
//     { key: 3, options: 'image cartoon default', src: 'img2' },
//     { key: 4, options: 'image cartoon default', src: 'img3' },
// ]