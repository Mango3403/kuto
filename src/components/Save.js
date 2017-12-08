import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { Checkbox, Modal, Icon, Button, Header, Image } from 'semantic-ui-react'

class Save extends Component {

    state = {
        checked: false,
        open: false,
        valLeft: '0.0',
        valTop: '0.0',
        valWidth: '0.0',
        valHeight: '0.0',
        saveImages: {
            src: '',
            name: 'custom.png'
        }
    }

    componentWillReceiveProps(nextProps) {
        const
            _this = this,
            _canvas = nextProps.canvas;
            
        _canvas.on('after:render', function () {
            let lefts = [],
                tops = [],
                bottoms = [],
                rights = [];

            _canvas.forEachObject(obj => {
                let bound = obj.getBoundingRect();
                bound.right = bound.left + bound.width;
                bound.bottom = bound.top + bound.height;

                lefts.push(bound.left);
                tops.push(bound.top);
                rights.push(bound.right);
                bottoms.push(bound.bottom);
            });

            let bottomMax = Math.max.apply(null, bottoms);
            let rightMax = Math.max.apply(null, rights);
            let leftMin = Math.min.apply(null, lefts);
            let topMin = Math.min.apply(null, tops);

            _this.setState({
                valHeight: (bottomMax - topMin).toFixed(1),
                valWidth: (rightMax - leftMin).toFixed(1),
                valLeft: leftMin,
                valTop: topMin
            });
        })
    }

    toggle = () => this.setState({ checked: !this.state.checked })

    show = dimmer => () => {
        this.saveImage()
        this.setState({
            dimmer,
            open: true
        })
    }

    close = () => {
        const { checked } = this.state;

        if (checked) {
            this.download()
            localStorage.removeItem('myCanvas')
            window.onbeforeunload = null
        }

        this.setState({ open: false })
    }

    saveImage = () => {
        const { canvas } = this.props

        let dataurl = null;

        if (canvas.overlayImage !== null) {
            dataurl = canvas.toDataURL({
                format: 'png',
                left: canvas.overlayImage.left - canvas.overlayImage.width / 2,
                top: canvas.overlayImage.top - canvas.overlayImage.height / 2,
                height: canvas.overlayImage.height,
                width: canvas.overlayImage.width,
            });
        } else {
            dataurl = canvas.toDataURL({
                format: 'png',
                left: this.state.valLeft,
                top: this.state.valTop,
                height: this.state.valHeight,
                width: this.state.valWidth,
            });
        }

        console.log(canvas);

        this.setState({
            saveImages: {
                src: dataurl
            },
        })
    }

    download() {
        const a = document.createElement('a')
        a.setAttribute('href', this.state.saveImages.src)
        a.setAttribute('download', this.state.saveImages.name)
        a.click()
    }

    render() {
        let data = { dataurl: this.state.saveImages.src };
        let path = {
            pathname: '/form',
            state: data
        };

        return (
            <div>
                <Icon name="save" onClick={this.show(true)} />
                <Modal closeOnDimmerClick={false} dimmer={this.state.dimmer} open={this.state.open} onClose={this.close}>
                    <Modal.Header>保存完毕</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='small' bordered src={this.state.saveImages.src} />
                        <Modal.Description>
                            微信用户, 按住图片3秒, 可保存到本地
                            <br />
                            <Checkbox label='保存图片到本地?' onChange={this.toggle} checked={this.state.checked} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Link to={path}>
                            <Button positive content="下一步" onClick={this.close} style={{ marginBottom: '10px' }} />
                        </Link>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Save
