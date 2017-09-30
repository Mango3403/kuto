import React from 'react';
import { Icon, Sidebar, Message, Popup, Button } from 'semantic-ui-react';

const styles = {
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em'
    }
};

class ObjectControlBar extends React.Component {

    constructor() {
        super();

        this.state = {
            visible: false,
            canvas: null
        };

        this.sendToBack = this.sendToBack.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
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

    bringToFront() {
        const { canvas } = this.state;

        canvas.bringToFront(canvas.getActiveObject());
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
                            name="signup"
                        />
                    }
                    on="click"
                    onOpen={e => {
                        if (canvas.getActiveObject()) {
                            this.toggleVisibility();
                        }
                    }}
                    content="请选中一个对象"
                />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction="bottom" visible={visible} onDismiss={this.toggleVisibility}>
                    <div>
                        <Button basic onClick={this.bringToFront}>
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