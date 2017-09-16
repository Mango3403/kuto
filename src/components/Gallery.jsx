import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react'
import './Gallery.css';

const style = {
    grid: {
        height: '200px'
    }
};

class Gallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gallery: [],
            images: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gallery: nextProps.gallery,
            images: nextProps.images
        });
    }

    selectImage({ id, isSelected }) {
        const { images, gallery } = this.state;
        const image = document.querySelectorAll('img').item(id);

        console.log(gallery);

        gallery[id].isSelected = !isSelected;

        if (isSelected) {
            image.style.boxShadow = '';
            images.pop();
        } else {
            image.style.boxShadow = '0 0 10px #3195e0';
            images.push(gallery[id]);
        }

        this.setState({
            images: images
        });

        console.log(images);        
    }

    render() {
        const { gallery } = this.state;

        return (
            <Grid columns={2} divided style={style.grid}>
                <Grid.Row stretched>
                    {
                        gallery.map(i => (
                            <Grid.Column
                                key={i.id}
                            >
                                <Image src={i.src} onClick={() => {this.selectImage(i)}} />
                            </Grid.Column>
                        ))
                    }
                </Grid.Row>
            </Grid>
        );
    }
}

export default Gallery;