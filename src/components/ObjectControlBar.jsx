import React from 'react';
import { Icon, Sidebar, Message, Popup, Button, Image, Menu } from 'semantic-ui-react';
import order from '../images/control/order.png';

const styles = {
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em',
        width: '1000px'
    },
    menu: {
        overflowX: 'scroll'
    }
};

class ObjectControlBar extends React.Component {

    constructor() {
        super();

        this.state = {
            isOpen: false,
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

    handleOpen = () => {
        const { canvas } = this.state;

        if (!canvas.getActiveObject()) {
            this.setState({ isOpen: true });
        } else {
            this.toggleVisibility();
        }
    }

    handleClose = () => {
        this.setState({ isOpen: false });
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
        const { isOpen, visible, canvas } = this.state;

        return (
            <div>
                <Popup
                    trigger={
                        <Icon as={Image} style={{ width: '1.3em' }} src={order} />
                    }
                    on="click"
                    open={isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content="请选中一个对象"
                />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction="bottom" visible={visible} onDismiss={this.toggleVisibility}>
                    <Menu style={styles.menu}>
                        <Menu.Item name='置顶' onClick={this.bringToFront} />

                        <Menu.Item name='置底' onClick={this.sendToBack} />

                        <Menu.Item name='向上一层' onClick={this.bringForward} />

                        <Menu.Item name='向下一层' onClick={this.sendBackwards} />

                        <Menu.Item name='中心对齐' onClick={this.center} />
                    </Menu>
                </Sidebar>
            </div>
        );
    }
}

export default ObjectControlBar;