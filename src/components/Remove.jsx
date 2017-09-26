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
    handleConfirm = () => { this.clear(); this.setState({ open: false }); }
    handleCancel = () => this.setState({ open: false })

    close = () => this.setState({ open: false })

    clear() {
        const
            { canvas } = this.state,
            config = {
                strokeWidth: 1,
                fill: 'red',
                stroke: 'red',
                originX: 'center',
                originY: 'center',
                selectable: false
            };

        canvas.clear();

        const hintX = new fabric.Line([canvas.width / 2 - 5, canvas.height / 2, canvas.width / 2 + 5, canvas.height / 2], config);
        const hintY = hintX.clone(i => i.angle = 90);
        const tlx = new fabric.Line([(canvas.width - 200) / 2, (canvas.height - 200) / 2, (canvas.width - 200) / 2 + 10, (canvas.height - 200) / 2]);
        const tly = new fabric.Line([(canvas.width - 200) / 2, (canvas.height - 200) / 2, (canvas.width - 200) / 2, (canvas.height - 200) / 2 + 10]);
        const trx = tlx.clone(i => i.left += 200 - i.width);
        const tr_y = tly.clone(i => i.left += 200);
        const blx = tlx.clone(i => i.top += 200);
        const bly = tly.clone(i => i.top += 200 - i.height);
        const brx = blx.clone(i => i.left += 200 - i.width);
        const bry = bly.clone(i => i.left += 200);

        const group = new fabric.Group([hintX, hintY, tlx, tly, trx, tr_y, blx, bly, brx, bry], config);
        canvas.add(group);       

        this.setState({
            canvas: canvas,
            text: []
        });

        console.log(canvas);
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