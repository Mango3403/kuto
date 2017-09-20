import React, { Component } from 'react';
import { fabric } from 'fabric';
import ButtonControlList from './ButtonControlList';
import './Ruler.css';

class Ruler extends Component {

    constructor() {
        super();

        this.state = {
            canvas: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            canvas: nextProps.canvas
        });
    }

    componentDidMount() {
        const
            workspace = document.getElementById('workspace'),
            canvas = new fabric.Canvas('c', {
                width: window.innerWidth - 10,
                height: 500
            });

        canvas.stopContextMenu = true;

        this.setState({
            canvas: canvas
        });
    }

    render() {
        const { canvas } = this.state;

        return (
            <div id="workspace">
                <canvas id="c">您的浏览器不支持 canvas</canvas>
                <ButtonControlList canvas={canvas} />
            </div>
        );
    }
}

export default Ruler;
