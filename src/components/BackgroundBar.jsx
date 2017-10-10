import React, { Component } from 'react';
import { Button, Grid, Message, Image, Sidebar, Icon, Item } from 'semantic-ui-react';
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
    { name: '灰', color: 'grey' },
    { name: '红', color: 'red' },
    { name: '黄', color: 'yellow' },
    { name: '绿', color: 'green' },
    { name: '蓝', color: 'blue' },
    { name: '黑', color: 'black' }
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

    handleClick(e, { color }) {
        this.setColor(color);
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
        inputColor.addEventListener('change', function (e) {
            this.setColor(e.target.value);
        });        
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
                                        <Button key={c.name} color={c.color} onClick={this.handleClick}>{c.name}</Button>
                                    ))
                                }
                                {/* <Button onClick={this.openInputColor}>...</Button> */}
                                <input type="color" onChange={e => this.setColor(e.target.value)} />
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