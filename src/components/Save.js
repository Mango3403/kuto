import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import { Checkbox, Modal, Icon, Button, Header, Image } from 'semantic-ui-react'

class Save extends Component {
    constructor() {
        super()

        this.state = {
            checked: false,
            open: false,
            saveImages: {
                src: '',
                name: 'custom.png'
            },
            canvas: null,
            putImage: null
        }

        this.download = this.download.bind(this)
        this.close = this.close.bind(this)
    }

    toggle = () => this.setState({ checked: !this.state.checked })

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        })
    }

    show = dimmer => () => {
        this.saveImage()
        this.setState({
            dimmer,
            open: true
        })
    }

    close() {
        const { checked, canvas } = this.state;

        if (checked) {
            this.download()
            localStorage.removeItem('myCanvas')
            window.onbeforeunload = null
        }

        this.setState({ open: false })
    }

    saveImage() {
        const { canvas } = this.state

        const dataurl = canvas.toDataURL('image/png');

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