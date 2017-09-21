import React, { Component } from 'react';
import { fabric } from 'fabric';
import { Modal, Icon, Button, Header, Image } from 'semantic-ui-react';

class Save extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            saveImages: {
                src: '',
                name: 'custom.png'
            },
            canvas: null
        }

        this.download = this.download.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        })
    }

    show = dimmer => () => {
        this.saveImage();
        this.setState({
            dimmer,
            open: true
        });
    }
    close = () => {
        this.addHint();
        this.setState({ open: false })
    }

    addHint() {
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

        const hintX = new fabric.Line([canvas.width / 2 - 5, canvas.height / 2, canvas.width / 2 + 5, canvas.height / 2], config);
        const hintY = hintX.clone(i => {
            i.selectable = false;
            i.angle = 90;
        });

        const tlx = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4 + 10, canvas.height / 4]);
        const tly = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4, canvas.height / 4 + 10]);

        const trx = tlx.clone(i => {
            i.left += canvas.width / 2 - i.width;
        });
        const tr_y = tly.clone(i => {
            i.left += canvas.width / 2;
        });
        const blx = tlx.clone(i => {
            i.top += canvas.height / 2;
        });
        const bly = tly.clone(i => {
            i.top += canvas.height / 2 - i.height;
        });
        const brx = blx.clone(i => {
            i.left += canvas.width / 2 - i.width;
        });
        const bry = bly.clone(i => {
            i.left += canvas.width / 2;
        });

        const group = new fabric.Group([hintX, hintY, tlx, tly, trx, tr_y, blx, bly, brx, bry], config);
        canvas.getObjects().unshift(group);
        canvas.renderAll();

        this.setState({
            canvas: canvas
        });

        console.log(canvas);
    }

    saveImage() {
        const { canvas } = this.state;
        let objs = canvas.getObjects(), count = 0;

        objs.splice(0, 1);

        this.setState({
            saveImages: {
                src: canvas.toDataURL()
            }
        });
    }

    download() {
        const { saveImages } = this.state;

        const a = document.createElement('a');
        a.setAttribute('href', saveImages.src);
        a.setAttribute('download', saveImages.name);
        a.click();
    }

    render() {
        const { saveImages, open, dimmer } = this.state;

        return (
            <div>
                <Icon name="save" onClick={this.show(true)} />
                <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>保存完毕</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src={saveImages.src} />
                        <Modal.Description>
                            <Header>处理你的图片</Header>
                            <p>保存图片到本地?</p>
                            <Button onClick={this.download}>是</Button>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content="完成" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Save;
