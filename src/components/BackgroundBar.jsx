import React, { Component } from 'react';
import { Button, Grid, Message, Image, Sidebar, Icon, Item, Menu } from 'semantic-ui-react';
import bg1 from '../images/material/a.jpg';

const styles = {
    img: {
        width: '20px',
        height: '20px'
    },
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em'
    }
};

const colors = [
    { name: '黑', color: 'black', value: 'rgba(30, 30, 30, 0.8)' },
    { name: '白', value: '' },
    { name: '蓝', color: 'blue', value: 'rgba(34, 58, 120, 0.8)' },
    { name: '绿', color: 'green', value: 'rgba(40, 158, 19, 0.8)' },
    { name: '青', color: 'teal', value: 'rgba(187, 217, 233, 0.8)' }
];

class BackgroundBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: colors[0],
            canvasvisible: false,
            canvas: props.canvas,
            background: [
                { id: 0, src: bg1 }
            ]
        }

        this.handleClick = this.handleClick.bind(this);
        this.setImage = this.setImage.bind(this);
        this.removeBackgroundImage = this.removeBackgroundImage.bind(this);
        this.clear = this.clear.bind(this);
        this.setColor = this.setColor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    handleClick(e, { color, value }) {
        this.setColor(value);
        this.setState({ active: color });
    }

    setColor(color) {
        const { canvas } = this.state;

        canvas.setBackgroundColor(color);
        canvas.renderAll();
    }

    setImage(src) {
        const { canvas } = this.state;

        canvas.setBackgroundImage(src, canvas.renderAll.bind(canvas), {
            opacity: 0.5,
            originX: 'left',
            originY: 'top'
        });
    }

    openInputColor() {
        const inputColor = document.querySelector('input[type="color"]');

        inputColor.click();
    }

    removeBackgroundImage() {
        const { canvas } = this.state;

        canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    }

    clear() {
        const { canvas } = this.state;

        canvas.setBackgroundColor(null);
        canvas.setBackgroundImage(null);
        canvas.renderAll();
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    render() {
        const { visible, background, active } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar style={styles.sideBar} as={Message} animation='overlay' direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name='close' />
                    <Menu compact inverted color={colors}>
                        {
                            colors.map(c => (
                                <Menu.Item key={c.name} active={active === c.color} value={c.value} color={c.color} onClick={this.handleClick}>
                                    {c.name}
                                </Menu.Item>
                            ))
                        }
                        <Menu.Item onClick={this.openInputColor}>
                            ...
                        </Menu.Item>
                        <input type="color" onChange={e => this.setColor(e.target.value)} style={{ display: 'none' }} />
                    </Menu>
                    <Menu compact inverted>
                        {
                            background.map((i, index) => (
                                <Menu.Item fitted style={{paddingLeft: '10px'}}>
                                    <Image
                                        key={index}
                                        src={i.src}
                                        style={styles.img}
                                        floated='left'
                                        onClick={e => this.setImage(e.target.src)}
                                    />
                                </Menu.Item>
                            ))
                        }
                        <Menu.Item fitted style={{paddingLeft: '10px'}}>
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

export default BackgroundBar;