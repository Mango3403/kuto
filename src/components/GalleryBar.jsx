import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import { Message, Sidebar, Icon } from 'semantic-ui-react';
// import { fabric } from 'fabric';
import Gallery from './Gallery';
import img0 from '../images/0.jpeg';
import img1 from '../images/1.jpeg';
import img2 from '../images/2.jpeg';
import img3 from '../images/3.jpeg';

const styles = {
    sideBar: {
        fontSize: '0.5em'
    }
};

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
        this.setState({ canvas: nextProps.canvas })
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible, gallery, canvas } = this.state;

        return (
            <div>
                <Icon onClick={this.toggleVisibility} name='picture' />
                <Sidebar style={styles.sideBar} as={Message} animation="overlay" direction='bottom' visible={visible}>
                    <Icon onClick={this.toggleVisibility} name="close" />
                    <br />
                    <Gallery gallery={gallery} canvas={canvas} />
                </Sidebar>
            </div>
        );
    }
}

export default GalleryBar;