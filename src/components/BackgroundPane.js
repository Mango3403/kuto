import React, { Component } from 'react'
import { Button, Grid, Message, Image, Sidebar, Icon, Item, Menu } from 'semantic-ui-react'
import bg1 from '../assets/images/material/a.jpg'

const styles = {
    img: {
        width: '20px',
        height: '20px'
    },
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em'
    },
    backgroundColors: {
        black: '#000000',
        white: '#cecece',
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
        '黑', '白', '蓝', '绿', '青'
    ],
    colorValues = [
        'rgba(30, 30, 30, 0.8)',
        'rgba(255, 255, 255, 0)',
        'rgba(34, 58, 120, 0.8)',
        'rgba(40, 158, 19, 0.8)',
        'rgba(187, 217, 233, 0.8)'
    ]

class BackgroundPane extends Component {
    constructor(props) {
        super(props)

        this.state = {
            canvas: props.canvas,
            background: [
                { id: 0, src: bg1 }
            ]
        }

        this.handleClick = this.handleClick.bind(this)
        this.openInputColor = this.openInputColor.bind(this)
        this.setImage = this.setImage.bind(this)
        this.removeBackgroundImage = this.removeBackgroundImage.bind(this)
        this.clear = this.clear.bind(this)
        this.setColor = this.setColor.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    handleClick(e, { value }) {
        this.setColor(value)
    }

    setColor(color) {
        const { canvas } = this.state
        console.log(color)

        canvas.setBackgroundColor(color)
        canvas.renderAll()
    }

    setImage(src) {
        const { canvas } = this.state

        canvas.setBackgroundImage(src, canvas.renderAll.bind(canvas), {
            opacity: 0.5,
            originX: 'left',
            originY: 'top'
        })
    }

    openInputColor() {
        document.getElementById('color').click()
    }

    removeBackgroundImage() {
        const { canvas } = this.state

        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas))
    }

    clear() {
        const { canvas } = this.state

        canvas.setBackgroundColor(null)
        canvas.setBackgroundImage(null)
        canvas.renderAll()
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, background, active } = this.state

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar style={styles.sideBar} as={Message} animation='overlay' direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name='close' />
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
                    <Menu compact>
                        {
                            background.map((i, index) => (
                                <Menu.Item key={index} fitted style={{ paddingLeft: '10px' }}>
                                    <Image
                                        src={i.src}
                                        style={styles.img}
                                        floated='left'
                                        onClick={e => this.setImage(e.target.src)}
                                    />
                                </Menu.Item>
                            ))
                        }
                        <Menu.Item fitted style={{ paddingLeft: '10px' }}>
                            <Image
                                src={null}
                                style={styles.img}
                                floated='left'
                                onClick={this.removeBackgroundImage}
                            />
                        </Menu.Item>
                        <Menu.Item fitted name='恢复默认' onClick={this.clear} />
                    </Menu>
                </Sidebar>
            </div>
        )
    }
}

export default BackgroundPane