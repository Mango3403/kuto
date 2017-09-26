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
    ruler: {
        position: 'absolute',
        width: 'calc(100% - 10px)',
        height: '500px'
    },
    c: {
        width: '100%',
        height: '500px',
        userSelect: 'none',
        boxShadow: '0 0 2px grey',
        borderRadius: '5px'
    },
    sc: {
        position: 'absolute',
        top: '15px',
        left: '4px',
        zIndex: '-1'
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
            canvas: null,
            rul: null
        };
    }

    componentDidMount() {
        this.init();
    }

    init() {
        const rul = document.getElementById('ruler');

        const canvas = new fabric.Canvas('c', {
            preserveObjectStacking: true,
            selection: false,
            width: window.innerWidth - 10,
            height: 500
        });

        const staticCanvas = new fabric.StaticCanvas('sc', {
            width: window.innerWidth - 10,
            height: 500
        });

        canvas.stopContextMenu = true;        

        const config = {
            strokeWidth: 1,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center'
        };

        const hintX = new fabric.Line([canvas.width / 2 - 5, canvas.height / 2, canvas.width / 2 + 5, canvas.height / 2], config);
        const hintY = hintX.clone(i => {
            i.angle = 90;
        });
        const tlx = new fabric.Line([(canvas.width - 200) / 2, (canvas.height - 200) / 2, (canvas.width - 200) / 2 + 10, (canvas.height - 200) / 2]);
        const tly = new fabric.Line([(canvas.width - 200) / 2, (canvas.height - 200) / 2, (canvas.width - 200) / 2, (canvas.height - 200) / 2 + 10]);
        const trx = tlx.clone(i => i.left += 200 - i.width);
        const tr_y = tly.clone(i => i.left += 200);
        const blx = tlx.clone(i => i.top += 200);
        const bly = tly.clone(i => i.top += 200 - i.height);
        const brx = blx.clone(i => i.left += 200 - i.width);
        const bry = bly.clone(i => i.left += 200);

        const group = new fabric.Group([hintX, hintY, tlx, tly, trx, tr_y, blx, bly, brx, bry], config);
        staticCanvas.add(group);

        const rul1 = new ruler({
            container: rul
        });
        rul1.api.setScale(0.5);
        rul1.api.setPos({
            x: canvas.width / 2 - 16,
            y: canvas.height / 2 - 16
        });

        this.setState({
            canvas: canvas,
            rul: rul1
        });
    }

    render() {
        const { canvas, rul } = this.state;

        return (
            <div style={styles.custom}>
                <div id="ruler" style={styles.ruler}></div>
                <canvas id="c" style={styles.c}>您的浏览器不支持 canvas</canvas>
                <canvas id="sc" style={styles.sc}></canvas>
                <ButtonControlList canvas={canvas} rul={rul} />
            </div>
        );
    }
}

export default Custom;