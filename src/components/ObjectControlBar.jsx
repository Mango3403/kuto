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
        this.bringForward = this.bringForward.bind(this);
        this.sendBackwards = this.sendBackwards.bind(this);
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

    bringForward() {
        const { canvas } = this.state;

        canvas.bringForward(canvas.getActiveObject());
    }

    sendBackwards() {
        const { canvas } = this.state;

        canvas.sendBackwards(canvas.getActiveObject());
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
                        <Button basic onClick={this.sendToFront}>
                            置顶
                        </Button>
                        <Button basic onClick={this.sendToBack}>
                            置底
                        </Button>
                        <Button basic onClick={this.bringForward}>
                            向上一层
                        </Button>
                        <Button basic onClick={this.sendBackwards}>
                            向下一层
                        </Button>
                        <Button basic onClick={this.center}>
                            中心对齐
                        </Button>
                    </div>
                </Sidebar>
            </div>
        );
    }
}

export default ObjectControlBar;