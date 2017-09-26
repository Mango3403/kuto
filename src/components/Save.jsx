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

    close = () => this.setState({ open: false })

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
