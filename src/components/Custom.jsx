import React from 'react';
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import ButtonControlList from './ButtonControlList';
import './Custom.css';
import del from '../imgs/control/handle_del.png';
import rotate from '../imgs/control/handle_rotate.png';
import zoom from '../imgs/control/handle_zoom.png';

fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 50,
        cornerShape: 'rect',
        cornerPadding: 10
    },
    tl: {
        icon: del
    },
    tr: {
        icon: rotate
    },
    br: {
        icon: zoom
    }
});

fabric.Canvas.prototype.customiseControls({
    tl: {
        action: 'remove',
        cursor: 'pointer'
    },
    tr: {
        action: 'rotate',
        cursor: 'pointer'
    },
    br: {
        action: 'scale',
        cursor: 'pointer'
    }
});

class Custom extends React.Component {

    constructor() {
        super();

        this.state = {
            canvas: null
        }
    }

    componentDidMount() {
        const
            ruler = document.querySelector('#ruler'),
            canvas = new fabric.Canvas('c', {
                width: window.innerWidth - 10,
                height: 500
            });

        ruler.style.width = canvas.width + 'px';
        ruler.style.height = canvas.height;

        this.setState({
            canvas: canvas
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas})
    }

    render() {
        const { canvas } = this.state;

        return (
            <div className="custom">
                <div id="canvas_container">
                    <div id='ruler'>
                        <h1>定制图案</h1>
                    </div>
                    <canvas id="c">您的浏览器不支持 canvas</canvas>
                </div>
                <ButtonControlList canvas={canvas} />
            </div>
        );
    }
}

export default Custom;