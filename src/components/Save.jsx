import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
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

    dataURLtoBlob(dataurl) {
        let 
            arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    close() {
        const { checked, canvas } = this.state;

        if (checked) {
            this.download();
            localStorage.removeItem('myCanvas');
            window.onbeforeunload = null;
        }

        const dataurl = canvas.toDataURL('image/png');
        const blob = this.dataURLtoBlob(dataurl);

        this.saveFile(blob, 1, 1);

        this.setState({ open: false });
    }

	saveFile(image, CustomerID, BusinessUserID) {
		const xhr = new XMLHttpRequest();

		xhr.open("post", "/KutoAdmin/SaveFile", true);

		let formData = new FormData();
		formData.append("image", image, "custom.png");
		formData.append('draft', 'test');
		formData.append('CustomerID', CustomerID);
		formData.append('BusinessUserID', BusinessUserID);

		xhr.onload = function () {
			if (xhr.status == 200) {
				console.log('OK!');
			} else {
				console.log('Error: ' + xhr.status);
			}
		}

		xhr.send(formData);
	}

    saveImage() {
        const { canvas } = this.state;

        this.setState({
            saveImages: {
                src: canvas.toDataURL('image/png')
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
                <Modal closeOnDimmerClick={false} dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>保存完毕</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='small' bordered src={saveImages.src} />
                        <Modal.Description>
                            微信用户, 按住图片3秒, 可保存到本地
                            <br />
                            <Checkbox label='保存图片到本地?' onChange={this.toggle} checked={this.state.checked} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Link to='/form'>
                            <Button positive content="下一步" onClick={this.close} style={{ marginBottom: '10px' }} />
                        </Link>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Save;
