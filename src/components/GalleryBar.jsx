import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Sidebar, Menu, Icon } from 'semantic-ui-react';
import { fabric } from 'fabric';
import Gallery from './Gallery';
import './GalleryBar.css';
import img0 from '../imgs/0.jpeg';
import img1 from '../imgs/1.jpeg';
import img2 from '../imgs/2.jpeg';
import img3 from '../imgs/3.jpeg';

class GalleryBar extends Component {
    constructor() {
        super();

        this.state = {
            visible: false,
            gallery: [
                {id: 0, src: img0, isSelected: false},
                {id: 1, src: img1, isSelected: false},
                {id: 2, src: img2, isSelected: false},
                {id: 3, src: img3, isSelected: false}
            ],
            images: [],
            canvas: {}
        }

        this.addImage = this.addImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    addImage() {
        const { images, canvas } = this.state;

        console.log(images);

        for (let image of images) {
            fabric.Image.fromURL(image.src, (img) => {
                img.scale(0.3);
                img.hasBorders = false;

                img.filters.push(new fabric.Image.filters.Grayscale());
                img.filters.push(new fabric.Image.filters.RemoveWhite({
                    threshold: 90,
                    distance: 40
                }));                

                img.filters.push(new fabric.Image.filters.Multiply({
                    color: '#D6D8EA'
                }));

                img.applyFilters(canvas.add(img).renderAll.bind(canvas));
            });
        }

        this.setState({
            images: []
        });
    }

    uploadImage() {
        const
            files = ReactDOM.findDOMNode(this.refs.file).files,
            file = files[0],
            reader = new FileReader(),
            { gallery } = this.state,
            img = {
                id: gallery.length + 1,
                src: null,
                isSelected: false
            };;

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
        const { visible, gallery, images } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar as={Menu} animation='push' width='thin' direction='bottom' visible={visible} vertical inverted>
                    <Button primary onClick={this.addImage}>添加选中图片</Button>
                    <span className="uploadImage">
                        <p>上传图片</p>
                        <input type="file" ref="file" onChange={this.uploadImage} />
                    </span>
                    <Gallery gallery={gallery} images={images} />
                </Sidebar>
            </div>
        )
    }
}

export default GalleryBar;