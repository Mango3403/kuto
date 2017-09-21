import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Image, Popup } from 'semantic-ui-react';
import { fabric } from 'fabric';
import upload from '../images/upload.png';

const timeoutLength = 2500;

const styles = {
    gallery: {
        padding: '5px', height: 'auto'
    },
    img: {

        margin: '5px 0',
        height: '150px',
        boxShadow: '0 0 5px grey'
    },
    imgObj: {
        // 银色
        color: '#D6D8EA',
    },
    imageGroup: {
        display: 'flex',
        overflowX: 'scroll'
    },
    fileInputContainer: {
        float: 'left',
        margin: '0 5px',
        height: '150px',
        width: '100px',
        boxShadow: '0 0 10px #3195e0',
        background: 'url(' + upload + ') no-repeat',
        backgroundSize: '70px 70px',
        backgroundPosition: '14px 40px',
    },
    fileInput: {
        height: '150px',
        fontSize: '1px',
        position: 'relative',
        left: 0,
        top: 0,
        opacity: 0,
    }
};

let clickTimer = null;

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTipsOpen: false,
            tapedTwice: false,
            gallery: [],
            // images: [],
            canvas: null,
        }

        this.addImage = this.addImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gallery: nextProps.gallery,
            // images: nextProps.images,
            canvas: nextProps.canvas
        });
    }

    handleOpen = () => {
        this.setState({ isTipsOpen: true })

        this.timeout = setTimeout(() => {
            this.setState({ isTipsOpen: false })
        }, timeoutLength)
    }

    handleClose = () => {
        this.setState({ isOpen: false })
        clearTimeout(this.timeout)
    }

    touchStart = (e) => {
        if (clickTimer == null) {
            clickTimer = setTimeout(function () {
                clickTimer = null;
            }, 500);
        } else {
            clearTimeout(clickTimer);
            clickTimer = null;
            this.addImage(e);
        }
    }

    dblTapHandler = (e) => {
        let tapedTwice = false;

        if (!tapedTwice) {
            tapedTwice = true;
            setTimeout(function () { tapedTwice = false; }, 300);
            return false;
        }
        e.preventDefault();
        //action on double tap goes below
        alert('You tapped me Twice !!!');
        this.addImage();
    }

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

    addImage(e) {
        const { canvas } = this.state;

        fabric.Image.fromURL(e.target.src, img => {

            img.scale(0.3);

            canvas.viewportCenterObject(img);
            img.lockRotation = false;
            img.hasBorders = true;
            img.lockUniScaling = true;
            img.centeredScaling = true;

            img.setControlsVisibility({
                mtr: false
            });

            img.filters.push(new fabric.Image.filters.Grayscale());
            img.filters.push(new fabric.Image.filters.RemoveWhite({
                threshold: 90,
                distance: 40
            }));

            img.filters.push(new fabric.Image.filters.Multiply({
                color: styles.imgObj.color
            }));

            img.applyFilters(canvas.add(img).renderAll.bind(canvas));
            canvas.setActiveObject(img);
        });

    }

    render() {
        const { gallery } = this.state;

        return (
            <div style={styles.gallery}>
                <div style={styles.fileInputContainer}>
                    <input style={styles.fileInput} type="file" ref="file" onChange={this.uploadImage} />
                </div>
                <Image.Group style={styles.imageGroup}>
                    {
                        gallery.map(i => (
                            <Popup
                                key={i.id}
                                trigger={
                                    <Image onDoubleClick={this.addImage} onTouchStart={this.touchStart} src={i.src} style={styles.img} />
                                }
                                content='双击图片加入画板'
                                hideOnScroll
                            />
                        ))
                    }
                </Image.Group>
            </div>
        );
    }
}

export default Gallery;