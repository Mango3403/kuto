import React from 'react';
import { Icon, Sidebar, Message, Popup, Button } from 'semantic-ui-react';

class ObjectControlBar extends React.Component {

    constructor() {
        super();

        this.state = {
            visible: false,
            canvas: null
        };

        this.sendToBack = this.sendToBack.bind(this);
        this.sendToFront = this.sendToFront.bind(this);
        this.center = this.center.bind(this);
    }



    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    sendToBack() {
        const { canvas } = this.state;

        canvas.sendToBack(canvas.getActiveObject());
    }

    sendToFront() {
        const { canvas } = this.state;

        canvas.sendToFront(canvas.getActiveObject());
    }

    center() {
        const { canvas } = this.state;

        const obj = canvas.getActiveObject();
        obj.center().setCoords();
    }

    render() {
        const { visible, canvas } = this.state;

        return (
            <div>
                <Popup
                    trigger={
                        <Icon
                            onClick={e => {
                                e.preventDefault();
                                if (canvas.getActiveObject()) {
                                    this.toggleVisibility();
                                }
                                return false;
                            }}
                            name='signup'
                        />
                    }
                    content='请选中一个对象'
                />
                <Sidebar as={Message} animation="overlay" direction="bottom" visible={visible}>
                    <Icon onClick={this.toggleVisibility} name="close" size="tiny" />
                    <div>
                        <Button animated='fade' onClick={this.sendToFront}>
                            <Button.Content visible>
                                置顶
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="angle double up" />
                            </Button.Content>
                        </Button>
                        <Button animated='fade' onClick={this.sendToBack}>
                            <Button.Content visible>
                                置底
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="angle double down" />
                            </Button.Content>
                        </Button>
                        <Button animated='fade'>
                            <Button.Content visible>
                                移至上一层
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="angle up" />
                            </Button.Content>
                        </Button>
                        <Button animated='fade'>
                            <Button.Content visible>
                                移至下一层
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="angle down" />
                            </Button.Content>
                        </Button>
                        <Button animated='fade' onClick={this.center}>
                            <Button.Content visible>
                                中心对齐
                            </Button.Content>
                            <Button.Content hidden>
                                <Icon name="crosshairs" />
                            </Button.Content>
                        </Button>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

export default ObjectControlBar;