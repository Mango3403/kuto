import React, { Component } from 'react';
import { Button, Grid, Message, Image, Sidebar, Icon, Item } from 'semantic-ui-react';
import more from '../images/control/more.png';
import bg1 from '../images/material/a.jpg';

const styles = {
    img: {
        width: '50px',
        height: '50px'
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
                    <Item.Group>
                        <Item>
                            <Grid columns={8}>
                                {
                                    colors.map(c => (
                                        <Button key={c.name} value={c.value} color={c.color} onClick={this.handleClick}>{c.name}</Button>
                                    ))
                                }
                                <Image onClick={this.openInputColor} src={more} style={{height: '3em'}} />
                                <input type="color" onChange={e => this.setColor(e.target.value)} style={{display: 'none'}} />
                            </Grid>
                        </Item>
                        <Item>
                            <Image.Group size='tiny'>
                                {
                                    background.map((i, index) => (
                                        <Image
                                            key={index}
                                            src={i.src}
                                            style={styles.img}
                                            floated='left'
                                            onClick={e => this.setImage(e.target.src)}
                                        />
                                    ))
                                }
                                <Image src={null} style={styles.img} floated='left' onClick={this.removeBackgroundImage} />
                                <Button onClick={this.clear} size='big'>恢复默认</Button>
                            </Image.Group>
                        </Item>
                    </Item.Group>
                </Sidebar>
            </div>
        )
    }
}

export default BackgroundBar;