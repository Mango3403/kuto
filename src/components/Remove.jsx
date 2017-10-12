import React from 'react';
import { Confirm, Icon, Image } from 'semantic-ui-react';
import clear from '../images/control/clear.png';

class Remove extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            canvas: null
        }

        this.clear = this.clear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    show = () => this.setState({ open: true })
    handleConfirm = () => { this.clear(); this.setState({ open: false }); }
    handleCancel = () => this.setState({ open: false })

    close = () => this.setState({ open: false })

    clear() {
        const { canvas } = this.state;

        canvas.clear();
    }

    render() {
        const { open } = this.state;

        return (
            <div style={{padding: '0 4px', width: '33px'}}>
                <Icon as={Image} style={{width: '24px', height: '28px'}} src={clear} onClick={this.show} />
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