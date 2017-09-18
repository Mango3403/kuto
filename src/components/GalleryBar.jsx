import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Card, Sidebar, Icon } from 'semantic-ui-react';
// import { fabric } from 'fabric';
import Gallery from './Gallery';
import './GalleryBar.css';
import img0 from '../imgs/0.jpeg';
import img1 from '../imgs/1.jpeg';
import img2 from '../imgs/2.jpeg';
import img3 from '../imgs/3.jpeg';

// const colors = {
//     silver: '#D6D8EA'
// };

class GalleryBar extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            gallery: [
                { id: 0, src: img0 },
                { id: 1, src: img1 },
                { id: 2, src: img2 },
                { id: 3, src: img3 }
            ],
            // images: [],
            canvas: null
        }

        // this.addImage = this.addImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    // addImage() {
    //     const { images, canvas, visible } = this.state;

    //     for (let image of images) {
    //         fabric.Image.fromURL(image.src, (img) => {

    //             img.scale(0.3);

    //             canvas.viewportCenterObject(img);
    //             img.lockRotation = true;
    //             img.hasBorders = false;

    //             img.filters.push(new fabric.Image.filters.Grayscale());
    //             img.filters.push(new fabric.Image.filters.RemoveWhite({
    //                 threshold: 90,
    //                 distance: 40
    //             }));

    //             img.filters.push(new fabric.Image.filters.Multiply({
    //                 color: colors.silver
    //             }));

    //             img.applyFilters(canvas.add(img).renderAll.bind(canvas));
    //         });
    //     }

    //     this.setState({
    //         images: [],
    //         visible: !visible
    //     });
    // }

    uploadImage() {
        const
            files = ReactDOM.findDOMNode(this.refs.file).files,
            file = files[0],
            reader = new FileReader(),
            { gallery } = this.state,
            img = {
                id: gallery.length,
                src: null
            };

        reader.readAsDataURL(file);
        reader.onload = (event) => {
            img.src = reader.result;
        }

        gallery.push(img);

        this.setState({
            gallery: gallery
        });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, gallery, canvas } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar as={Card} animation='push' width='thin' direction='bottom' visible={visible}>
                    {/* <Button primary onDoubleClick={this.addImage}>添加选中图片</Button> */}
                    <span className="uploadImage">
                        <p>上传图片</p>
                        <input type="file" ref="file" onChange={this.uploadImage} />
                    </span>
                    <Gallery gallery={gallery} canvas={canvas} />
                </Sidebar>
            </div>
        )
    }
}

export default GalleryBar;