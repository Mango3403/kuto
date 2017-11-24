import React, { Component } from 'react'
import { Icon, Popup } from 'semantic-ui-react';

class GrayPicture extends Component {
    state = {
        isOpen: false
    }

    handleOpen = () => {
        const { canvas } = this.props

        if (!(canvas.getActiveObject() && canvas.getActiveObject().isType('image'))) {
            this.setState({ isOpen: true })
        } else {
            this.toggleVisibility()
        }
    }

    handleClose = () => this.setState({ isOpen: false })

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    setGray = () => {
        const { canvas } = this.props;

        const picture = canvas.getActiveObject();

        picture.filters.push(new fabric.Image.filters.Grayscale())
        picture.filters.push(new fabric.Image.filters.RemoveWhite({
            threshold: 90,
            distance: 40
        }))
        picture.filters.push(new fabric.Image.filters.Tint({
            color: color.silver
        }))

        picture.applyFilters(canvas.renderAll.bind(canvas))
    }

    render() {
        return (
            <div>
                <Popup
                    trigger={
                        <Icon name="edit" onClick={this.setGray} />
                    }
                    on='click'
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    content='请选中一张图片'
                />
            </div>
        )
    }
}

export default GrayPicture;