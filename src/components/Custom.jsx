import React from 'react';
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import ButtonControlList from './ButtonControlList';
import './Custom.css';
import del from '../imgs/control/handle_del.png';
import rotate from '../imgs/control/handle_rotate.png';
import zoom from '../imgs/control/handle_zoom.png';
import change from '../imgs/control/handle_change.png';

fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 50,
        cornerShape: 'rect',
        cornerPadding: 20
    },
    tl: {
        icon: del
    },
    tr: {
        icon: rotate
    },
    br: {
        icon: zoom
    },
    bl: {
        icon: change
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
    },
    bl: {
        action: function (e, target) {
            console.log(target);
        },
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
        this.init();
    }

    init() {
        const canvas = new fabric.Canvas('c', {
            width: window.innerWidth - 10,
            height: 500
        });

        canvas.stopContextMenu = true;   

        const hintX = new fabric.Line([canvas.width / 2 - 5, canvas.height / 2, canvas.width / 2 + 5, canvas.height / 2], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const hintY = new fabric.Line([canvas.width / 2, canvas.height / 2 - 5, canvas.width / 2, canvas.height / 2 + 5], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });

        const tlx = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4 + 10, canvas.height / 4], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const tly = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4, canvas.height / 4 + 10], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const trx = new fabric.Line([canvas.width * (3 / 4), canvas.height / 4, canvas.width * (3 / 4) - 10, canvas.height / 4], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const tr_y = new fabric.Line([canvas.width * (3 / 4), canvas.height / 4, canvas.width * (3 / 4), canvas.height / 4 + 10], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const blx = new fabric.Line([canvas.width / 4, canvas.height * (3 / 4), canvas.width / 4 + 10, canvas.height * (3 / 4)], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const bly = new fabric.Line([canvas.width / 4, canvas.height * (3 / 4), canvas.width / 4, canvas.height * (3 / 4) - 10], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const brx = new fabric.Line([canvas.width * (3 / 4), canvas.height * (3 / 4), canvas.width * (3 / 4) - 10, canvas.height * (3 / 4)], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });
        const bry = new fabric.Line([canvas.width * (3 / 4), canvas.height * (3 / 4), canvas.width * (3 / 4), canvas.height * (3 / 4) - 10], {
            strokeWidth: 2,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
        });

        canvas.add(hintX);
        canvas.add(hintY);
        canvas.add(tlx);
        canvas.add(tly);
        canvas.add(trx);
        canvas.add(tr_y);
        canvas.add(blx);
        canvas.add(bly);
        canvas.add(brx);
        canvas.add(bry);

        this.setState({
            canvas: canvas
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ canvas: nextProps.canvas })
    }

    render() {
        const { canvas } = this.state;

        return (
            <div className="custom">
                <canvas id="c">您的浏览器不支持 canvas</canvas>
                <ButtonControlList canvas={canvas} />
            </div>
        );
    }
}

export default Custom;