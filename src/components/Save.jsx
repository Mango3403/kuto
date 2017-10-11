import React, { Component } from 'react';
import { fabric } from 'fabric';
import { Checkbox, Modal, Icon, Button, Header, Image } from 'semantic-ui-react';

class Save extends Component {
    constructor() {
        super();

        this.state = {
            checked: false,
            open: false,
            saveImages: {
                src: '',
                name: 'custom.png'
            },
            canvas: null
        }

        this.download = this.download.bind(this);
        this.close = this.close.bind(this);
    }

    toggle = () => this.setState({ checked: !this.state.checked })

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

    close() {
        const { checked, canvas } = this.state;

        if (checked) {
            this.download();
            localStorage.removeItem('myCanvas');
            window.onbeforeunload = null;       
        }

        this.setState({ open: false })
    }

    saveImage() {
        const { canvas } = this.state;

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
                        <Image wrapped size='small' bordered src={saveImages.src} />
                        <Modal.Description>
                            <Checkbox label='保存图片到本地?' onChange={this.toggle} checked={this.state.checked} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive content="下一步" onClick={this.close} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Save;
