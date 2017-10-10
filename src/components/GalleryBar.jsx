import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Message, Sidebar, Icon, Image, Popup } from 'semantic-ui-react';
import { fabric } from 'fabric';
import upload from '../images/upload.png';
import img0 from '../images/0.jpeg';
import img1 from '../images/1.jpeg';
import img2 from '../images/2.jpeg';
import img3 from '../images/3.jpeg';

const styles = {
    img: {
        margin: '5px 3px',
        height: '85px',
        boxShadow: '0 0 5px grey'
    },
    imgObj: {
        // 银色
        color: '#9698AA',
    },
    imageGroup: {
        display: 'flex',
        overflowX: 'scroll'
    },
    fileInputContainer: {
        float: 'left',
        margin: '5px',
        height: '80px',
        width: '50px',
        boxShadow: '0 0 10px #3195e0',
        background: 'url(' + upload + ') no-repeat',
        backgroundSize: '40px 40px',
        backgroundPosition: '5px 15px',
    },
    fileInput: {
        height: '100px',
        fontSize: '1px',
        position: 'relative',
        left: 0,
        top: 0,
        opacity: 0,
    },
    sideBar: {
        padding: '5px',
        paddingRight: '25px',
        fontSize: '0.5em'
    }
};

const timeoutLength = 2500;

let clickTimer = null;

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTipsOpen: false,
            tapedTwice: false,
            gallery: [],
            canvas: null,
        }

        this.addImage = this.addImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gallery: nextProps.gallery,
            canvas: nextProps.canvas
        });
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
            gallery.unshift(img);

            this.setState({
                gallery: gallery
            });
        }
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
            img.filters.push(new fabric.Image.filters.Tint({
                color: styles.imgObj.color
            }));

            img.applyFilters(canvas.add(img).renderAll.bind(canvas));
            canvas.setActiveObject(img);

        });

        this.props.setClose();
    }

    render() {
        const { gallery } = this.state;

        return (
            <div>
                <div style={styles.fileInputContainer}>
                    <input style={styles.fileInput} type="file" ref="file" onChange={this.uploadImage} />
                </div>
                <Image.Group style={styles.imageGroup}>
                    {
                        gallery.map((i, index) => (
                            <Popup
                                key={index}
                                trigger={
                                    <Image onDoubleClick={this.addImage} src={i.src} style={styles.img} />
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

class GalleryBar extends Component {

    state = {
        visible: false,
        gallery: [
            { src: img0 },
            { src: img1 },
            { src: img2 },
            { src: img3 }
        ],
        canvas: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas });
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, gallery, canvas } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction='bottom' visible={visible} onDismiss={this.toggleVisibility}>
                    <Gallery gallery={gallery} canvas={canvas} setClose={this.toggleVisibility} />
                </Sidebar>
            </div>
        );
    }
}

export default GalleryBar;