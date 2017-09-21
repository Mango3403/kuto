import React from 'react';
import { fabric } from 'fabric';
import 'fabric-customise-controls';
import ButtonControlList from './ButtonControlList';
import del from '../images/control/handle_del.png';
import rotate from '../images/control/handle_rotate.png';
import zoom from '../images/control/handle_zoom.png';
import change from '../images/control/handle_change.png';

const styles = {
    custom: {
        margin: '15px 0',
        display: 'inline-block'
    },
    c: {
        width: '100%',
        height: '600px',
        userSelect: 'none',
        boxShadow: '0 0 2px grey',
        borderRadius: '5px',
    }
};

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
        const
            canvas = new fabric.Canvas('c', {
                width: window.innerWidth - 10,
                height: 500
            }),
            config = {
                strokeWidth: 1,
                fill: 'red',
                stroke: 'red',
                originX: 'center',
                originY: 'center',
                selectable: false
            };

        canvas.stopContextMenu = true;

        const hintX = new fabric.Line([canvas.width / 2 - 5, canvas.height / 2, canvas.width / 2 + 5, canvas.height / 2], config);
        const hintY = hintX.clone(i => {
            i.angle = 90;
        });

        const tlx = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4 + 10, canvas.height / 4]);
        const tly = new fabric.Line([canvas.width / 4, canvas.height / 4, canvas.width / 4, canvas.height / 4 + 10]);
    
        const trx = tlx.clone(i => {
            i.left += canvas.width / 2 - i.width;
        });
        const tr_y = tly.clone(i => {
            i.left += canvas.width / 2;
        });
        const blx = tlx.clone(i => {
            i.top += canvas.height / 2;
        });
        const bly = tly.clone(i => {
            i.top += canvas.height / 2 - i.height;
        });
        const brx = blx.clone(i => {
            i.left += canvas.width / 2 - i.width;
        });
        const bry = bly.clone(i => {
            i.left += canvas.width / 2;
        });

        const group = new fabric.Group([hintX, hintY, tlx, tly, trx, tr_y, blx, bly, brx, bry], config);
        canvas.add(group);

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
            <div style={styles.custom}>
                <canvas id="c" style={styles.c}>您的浏览器不支持 canvas</canvas>
                <ButtonControlList canvas={canvas} />
            </div>
        );
    }
}

export default Custom;