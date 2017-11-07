import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Message, Sidebar, Icon, Image, Popup } from 'semantic-ui-react'
import { fabric } from 'fabric'
import eventProxy from '../eventProxy'
import upload from '../assets/images/upload.png'
import img0 from '../assets/images/picture/0.jpeg'
import img1 from '../assets/images/picture/1.jpeg'
import img2 from '../assets/images/picture/2.jpeg'
import img3 from '../assets/images/picture/3.jpeg'

const color = {
    // 银色
    silver: '#9698AA'
}

class Picture extends Component {
    constructor() {
        super()

        this.state = {
            isTipsOpen: false,
            tapedTwice: false,
            picture: [],
            canvas: null,
        }

        this.addImage = this.addImage.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            picture: nextProps.picture,
            canvas: nextProps.canvas
        })
    }

    uploadImage() {
        const
            files = ReactDOM.findDOMNode(this.refs.file).files,
            file = files[0],
            reader = new FileReader(),
            { picture } = this.state,
            img = { id: picture.length, src: null }

        reader.readAsDataURL(file)
        reader.onload = (event) => {
            img.src = reader.result

            picture.unshift(img)

            this.setState({ picture })
        }
    }

    addImage(e) {
        const { canvas } = this.state

        // 发布 openFilter 事件，由 PictureFilterPane 组件接收
        setTimeout(() => eventProxy.trigger('openFilter'), 300)

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

            img.filters.push(new fabric.Image.filters.Grayscale())
            img.filters.push(new fabric.Image.filters.RemoveWhite({
                threshold: 90,
                distance: 40
            }))
            img.filters.push(new fabric.Image.filters.Tint({
                color: color.silver
            }))

            img.applyFilters(canvas.add(img).renderAll.bind(canvas))
            canvas.setActiveObject(img)
        })

        this.props.setClose()
    }

    render() {
        const { picture } = this.state

        return (
            <div>
                <div style={{ float: 'left', margin: '5px', height: '80px', width: '50px', boxShadow: '0 0 10px #3195e0', background: 'url(' + upload + ') no-repeat', backgroundSize: '40px 40px', backgroundPosition: '5px 15px' }}>
                    <input style={{ height: '80px', fontSize: '1px', position: 'relative', left: 0, top: 0, opacity: 0 }} type="file" ref="file" onChange={this.uploadImage} />
                </div>
                <Image.Group style={{ display: 'flex', overflowX: 'scroll' }}>
                    {
                        picture.map((i, index) => (
                            <Popup
                                key={index}
                                trigger={
                                    <Image onDoubleClick={this.addImage} src={i.src} style={{ margin: '5px 3px', height: '85px', boxShadow: '0 0 5px grey' }} />
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

class PicturePane extends Component {
    state = {
        visible: false,
        picture: [
            { src: img0 },
            { src: img1 },
            { src: img2 },
            { src: img3 }
        ],
        canvas: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar style={{ padding: '5px', paddingRight: '25px', fontSize: '0.5em' }} as={Message} animation="overlay" direction='bottom' visible={this.state.visible} onDismiss={this.toggleVisibility}>
                    <Picture picture={this.state.picture} canvas={this.state.canvas} setClose={this.toggleVisibility} />
                </Sidebar>
            </div>
        )
    }
}

export default PicturePane