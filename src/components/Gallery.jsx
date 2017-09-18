import React, { Component } from 'react';
import { Image, Popup } from 'semantic-ui-react';
import { fabric } from 'fabric';
import './Gallery.css';

const timeoutLength = 2500;

const colors = {
    silver: '#D6D8EA'
};

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTipsOpen: false,
            gallery: [],
            // images: [],
            canvas: null
        }

        this.addImage = this.addImage.bind(this);
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
                color: colors.silver
            }));

            img.applyFilters(canvas.add(img).renderAll.bind(canvas));
        });

        // this.setState({
        //     // images: [],
        //     // visible: !visible
        // });
    }

    // selectImage({ id, isSelected }) {
    //     const { images, gallery } = this.state;
    //     const image = document.querySelectorAll('img').item(id);

    //     gallery[id].isSelected = !isSelected;

    //     if (isSelected) {
    //         image.style.boxShadow = '';
    //         images.pop();
    //     } else {
    //         image.style.boxShadow = '0 0 10px #3195e0';
    //         images.push(gallery[id]);
    //     }

    //     this.setState({
    //         images: images
    //     });
    // }

    render() {
        const { gallery } = this.state;

        return (
            <div style={{ margin: '5px', height: '170px', width: '100vw', overflow: 'auto' }}>
                <Popup
                    trigger={
                        <Image.Group style={{ display: 'flex' }}>
                            {
                                gallery.map(i => (
                                    <Image key={i.id} onDoubleClick={this.addImage} src={i.src} />
                                ))
                            }
                        </Image.Group>
                    }
                    content='双击图片加入画板'
                    hideOnScroll
                />

            </div>
        );
    }
}

/* <Grid columns={2} divided style={style.grid}>
<Grid.Row stretched>
    {
        gallery.map(i => (
            <Grid.Column
                key={i.id}
            >
                <Image onDoubleClick={this.addImage} src={i.src} />
            </Grid.Column>
        ))
    }
</Grid.Row>
</Grid> */

export default Gallery;