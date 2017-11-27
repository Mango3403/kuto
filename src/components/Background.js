import React, { Component } from 'react'
import { Button, Grid, Segment, Image, Sidebar, Icon, Item, Menu, Container, Header } from 'semantic-ui-react'
import bg1 from '../assets/images/background/bg1.jpg'
import ol1 from '../assets/images/overlay/ol1.png'
import ol2 from '../assets/images/overlay/ol2.png'
import ol3 from '../assets/images/overlay/ol3.png'
import ol4 from '../assets/images/overlay/ol4.png'
import ol5 from '../assets/images/overlay/ol5.png'
import white from '../assets/images/white.jpg'

const styles = {
    backgroundColors: {
        white: '#cecece',
        black: '#000000',
        blue: '#2185d0',
        green: '#21ba45',
        teal: '#00b5ad',
        violet: '#6435c9'
    }
}

const
    colors = [
        'black', '', 'blue', 'green', 'teal'
    ],
    colorNames = [
        '白', '黑', '蓝', '绿', '青'
    ],
    colorValues = [
        'rgba(255, 255, 255, 0)',
        'rgba(30, 30, 30, 0.8)',
        'rgba(34, 58, 120, 0.8)',
        'rgba(40, 158, 19, 0.8)',
        'rgba(187, 217, 233, 0.8)'
    ],
    overlay = [
        { key: 0, src: ol1 },
        { key: 1, src: ol2 },
        { key: 2, src: ol3 },
        { key: 3, src: ol4 },
        { key: 4, src: ol5 },
    ],
    background = [
        { key: 0, src: bg1 }
    ];

class Background extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleClick = (e, { value }) => {
        this.setColor(value)
    }

    setColor = color => {
        const { canvas } = this.props
        console.log(color)

        canvas.setBackgroundColor(color).renderAll()
    }

    setBackgroundImage = e => {
        const { canvas } = this.props

        canvas.setBackgroundImage(e.target.src, canvas.renderAll.bind(canvas), {
            width: canvas.getWidth(),
            height: canvas.getHeight(),
            opacity: 0.5,
            originX: 'left',
            originY: 'top'
        })
    }

    setOverlayImage = e => {
        const {canvas} = this.props;

        canvas.setOverlayImage(e.target.src, canvas.renderAll.bind(canvas), {
            width: canvas.getWidth(),
            height: canvas.getHeight(),
            originX: 'left',
            originY: 'top'
        });
    }

    openInputColor = () => {
        document.getElementById('color').click()
    }

    removeBackgroundImage = () => {
        const { canvas } = this.props

        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas))
    }

    removeOverlayImage = () => {
        const { canvas } = this.props

        canvas.setOverlayImage(null, canvas.renderAll.bind(canvas))
    }

    clear = () => {
        const { canvas } = this.props

        canvas.setBackgroundColor(null).setBackgroundImage(null).renderAll()
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, active } = this.state

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar as={Segment} animation='push' direction='bottom' visible={visible} style={{ overflowX: 'hidden' }}>
                    <Menu pointing secondary>
                        <Menu.Item header>
                            <h3>背景</h3>
                        </Menu.Item>
                        <Menu.Item position="right">
                            <Icon onClick={this.toggleVisibility} name="close" bordered size="small" />
                        </Menu.Item>
                    </Menu>
                    <Header>背景色</Header>
                    <Container>
                        <Menu compact>
                            {
                                colors.map((color, index) => (
                                    <Menu.Item key={color} name={color} style={{ backgroundColor: colorValues[index] }} value={colorValues[index]} onClick={this.handleClick}>
                                        {colorNames[index]}
                                    </Menu.Item>
                                ))
                            }
                            <Menu.Item onClick={this.openInputColor} style={{ backgroundColor: styles.backgroundColors.violet }}>
                                ...
                            <input id="color" type="color" onChange={e => this.setColor(e.target.value)} style={{ position: 'absolute', bottom: '3000px' }} />
                            </Menu.Item>
                        </Menu>
                    </Container>
                    <Header>背景图</Header>
                    <Container style={{ overflowX: 'auto' }}>
                        <Image.Group style={{ width: 1000 }}>
                            <Image floated="left" bordered height={60} src={white} onClick={this.removeBackgroundImage} />
                            {
                                background.map(bg => (
                                    <Image floated="left" bordered height={60} key={bg.key} src={bg.src} onClick={this.setBackgroundImage} />
                                ))
                            }
                        </Image.Group>
                    </Container>
                    <Header>遮罩层</Header>
                    <Container style={{ overflowX: 'auto' }}>
                        <Image floated="left" bordered height={60} src={white} onClick={this.removeOverlayImage} />
                        <Image.Group style={{ width: 1000 }}>
                            {
                                overlay.map(ol => (
                                    <Image floated="left" bordered height={60} key={ol.key} src={ol.src} onClick={this.setOverlayImage} />
                                ))
                            }
                        </Image.Group>
                    </Container>
                </Sidebar>
            </div >
        )
    }
}

export default Background