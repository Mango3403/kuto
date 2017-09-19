import React from 'react';
import { Confirm, Icon } from 'semantic-ui-react';

class Remove extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            canvas: null,
            text: []
        }

        this.clear = this.clear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas,
            text: nextProps.text
        });
    }

    show = () => this.setState({ open: true })
    handleConfirm = () => {this.clear(); this.setState({ open: false }); }
    handleCancel = () => this.setState({ open: false })

    close = () => this.setState({ open: false })

    clear() {
        const { canvas } = this.state;

        canvas.clear();

        this.setState({
            text: []
        });
    }

    render() {
        const { open } = this.state;

        return (
            <div>
                <Icon name='trash' onClick={this.show} />
                <Confirm
                    open={open}
                    content='确定要清空画布吗?'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }
}

export default Remove;