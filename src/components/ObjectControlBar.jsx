import React from 'react';
import { Icon, Sidebar, Message, Popup } from 'semantic-ui-react';

class ObjectControlBar extends React.Component {

    state = {
        visible: false,
        canvas: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

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
                </Sidebar>
            </div>
        );
    }
}

export default ObjectControlBar;