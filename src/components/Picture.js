import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Sidebar, Icon, Image, Popup, Table, Checkbox, Button, Segment, Menu } from 'semantic-ui-react'
import { fabric } from 'fabric'
// import eventProxy from '../eventProxy'
import upload from '../assets/images/upload.png'
import img0 from '../assets/images/picture/0.jpeg'
import img1 from '../assets/images/picture/1.jpeg'
import img2 from '../assets/images/picture/2.jpeg'
import img3 from '../assets/images/picture/3.jpeg'

const color = {
    // 银色
    silver: '#9698AA'
}

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
            img = { id: picture.length, src: null }

        reader.readAsDataURL(file)
        reader.onload = (event) => {
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

            // img.filters.push(new fabric.Image.filters.Grayscale())
            // img.filters.push(new fabric.Image.filters.RemoveWhite({
            //     threshold: 90,
            //     distance: 40
            // }))
            // img.filters.push(new fabric.Image.filters.Tint({
            //     color: color.silver
            // }))

            // img.applyFilters(canvas.add(img).renderAll.bind(canvas))

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

const PanelO = () => (
    <Table compact celled definition>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox slider />
                </Table.Cell>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>No</Table.Cell>
            </Table.Row>
        </Table.Body>

        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                    <Button floated='right' icon labelPosition='left' primary size='small'>
                        <Icon name='user' /> Add User
                    </Button>
                    <Button size='small'>Approve</Button>
                    <Button disabled size='small'>Approve All</Button>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
)

class Picture extends Component {
    state = {
        visible: false,
        picture: [
            { src: img0 },
            { src: img1 },
            { src: img2 },
            { src: img3 }
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
                    <Panel picture={this.state.picture} canvas={this.props.canvas} setClose={this.toggleVisibility} />
                    {/* <PanelO /> */}
                </Sidebar>
            </div>
        )
    }
}

export default Picture
