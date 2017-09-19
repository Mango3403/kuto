import React, { Component } from 'react';
import { Menu, Message, Image, Sidebar, Icon, Item } from 'semantic-ui-react';
import bg1 from '../imgs/material/1.png';

const styles = {
    img: {
        width: '50px',
        height: '50px'
    },
    sideBar: {
        fontSize: '0.5em'
    }
};

const colors = [
    { name: '白色', color: 'white' },
    { name: '红色', color: 'red' },
    { name: '蓝色', color: 'blue' },
    { name: '绿色', color: 'green' }
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

        this.handleAClick = this.handleAClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    handleAClick(e, { name, color }) {
        const { canvas } = this.state;

        canvas.backgroundColor = color;
        canvas.renderAll();
        this.setState({
            canvas: canvas,
            active: color
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    render() {
        const { visible, canvas, background, active } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar style={styles.sideBar} as={Message} animation='overlay' direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name='close' />
                    <br />
                    <Item.Group>
                        <Item>
                            <Menu compact inverted style={{ position: 'absolute' }}>
                                {colors.map(c => (
                                    <Menu.Item key={c.color} name={c.name} active={active === c.color} color={c.color} onClick={this.handleAClick} />
                                ))}
                            </Menu>
                        </Item>
                        <br/>
                        <Item>
                            <Image.Group size='tiny'>
                                {
                                    background.map(i => (
                                        <Image
                                            key={i.id}
                                            src={i.src}
                                            shape='circular'
                                            style={styles.img}
                                            floated='left'
                                            onClick={() => {
                                                canvas.setBackgroundColor({
                                                    source: i.src,
                                                    repeat: 'repeat'
                                                }, canvas.renderAll.bind(canvas));
                                            }}
                                        />
                                    ))
                                }
                            </Image.Group>
                        </Item>
                    </Item.Group>
                </Sidebar>
            </div>
        )
    }
}

export default BackgroundBar;