import React, { Component } from 'react';
import { Message, Card, Image, Sidebar, Icon } from 'semantic-ui-react';
import bg1 from '../imgs/material/1.png';

const styles = {
    img: {
        width: '50px',
        height: '50px'
    }
};

class Background extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canvasvisible: false,
            canvas: props.canvas,
            background: [
                {id: 0, src: bg1}
            ]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, canvas, background } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='delicious' />
                <Sidebar as={Card} animation='overlay' direction='bottom' visible={visible}>
                    <Message>
                        <Message.Header>
                            添加背景图
                        </Message.Header>
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
                    </Message>
                    <Message>
                        <Message.Header>
                            设置背景色
                        </Message.Header>
                        <input
                            type="color"
                            onChange={({ target: { value } }) => {
                                canvas.backgroundColor = value;
                                canvas.renderAll();
                            }}
                        />
                    </Message>
                </Sidebar>
            </div>
        )
    }
}

export default Background;