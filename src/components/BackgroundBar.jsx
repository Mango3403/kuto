import React, { Component } from 'react';
import { Menu, Message, Image, Sidebar, Icon, Item } from 'semantic-ui-react';
import bg1 from '../images/material/a.jpg';

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
    {name: '灰', color: 'grey'},    
    {name: '红', color: 'red'},
    {name: '黄', color: 'yellow'},
    {name: '粉', color: 'pink'},
    {name: '绿', color: 'green'},
    {name: '蓝', color: 'blue'},
    {name: '黑', color: 'black'}
];

class BackgroundBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: colors[0],
            canvasvisible: false,
            canvas: props.canvas,
            background: [
                { id: 0, src: bg1 },
            ]
        }

        this.handleClick = this.handleClick.bind(this);
        this.setImage = this.setImage.bind(this);
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
        this.setState({
            canvas: canvas
        });
    }

    setImage(e, { src }) {
        const { canvas } = this.state;

        canvas.setBackgroundImage(e.target.src, canvas.renderAll.bind(canvas), {
            opacity: 0.5,
            originX: 'left',
            originY: 'top'
        });

        this.setState({
            canvas: canvas
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    render() {
        const { visible, background, active } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar style={styles.sideBar} as={Message} animation='overlay' direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name='close' />
                    <br />
                    <Item.Group>
                        <Item>
                            <Menu inverted widths={8} style={{overflowX: 'auto'}}>
                                {colors.map(c => (
                                    <Menu.Item key={c.name} name={c.name} active={active === c.color} color={c.color} onClick={this.handleClick} />
                                ))}
                            </Menu>
                        </Item>
                        <br />
                        <Item>
                            <Image.Group size='tiny'>
                                {
                                    background.map(i => (
                                        <Image
                                            key={i.id}
                                            src={i.src}
                                            style={styles.img}
                                            floated='left'
                                            onClick={this.setImage}
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