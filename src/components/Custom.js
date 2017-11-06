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
        zIndex: -1
    },
    tc: {
        position: 'absolute',
        width: 'calc(100% - 10px)',
        height: '500px'
    },
    tl: {
        borderTop: '0.1px solid red',
        borderLeft: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '150px',
        left: 'calc((100% - 200px) / 2)',
        zIndex: '1'
    },
    tr: {
        borderTop: '0.1px solid red',
        borderRight: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '150px',
        right: 'calc((100% - 200px) / 2)',
        zIndex: '1'
    },
    bl: {
        borderLeft: '0.1px solid red',
        borderBottom: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '340px',
        left: 'calc((100% - 200px) / 2)',
        zIndex: '1'
    },
    br: {
        borderRight: '0.1px solid red',
        borderBottom: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '340px',
        right: 'calc((100% - 200px) / 2)',
        zIndex: '1'
    },
    ch: {
        borderTop: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '250px',
        left: 'calc(100% / 2 - 5px)',
        zIndex: '1'
    },
    cv: {
        borderRight: '0.1px solid red',
        position: 'absolute',
        width: '10px',
        height: '10px',
        top: '245px',
        left: 'calc(100% / 2 - 10px)',
        zIndex: '1'
    }
};

class Custom extends React.Component {
    constructor() {
        super();

        this.state = {
            canvas: null
        };

        this.saveLocalStorage = this.saveLocalStorage.bind(this);
    }

    componentWillUpdate() {
        window.onbeforeunload = this.saveLocalStorage
    }

    saveLocalStorage() {
        const { canvas } = this.state;

        this.setCookie('myCanvas', JSON.stringify(canvas.toJSON()));
        localStorage.setItem('myCanvas', JSON.stringify(canvas.toJSON()));
    }

    setCookie(name, value, expiredays) {
        var exdate = new Date();

        exdate.setDate(exdate.getDate() + expiredays);

        document.cookie =
            name +
            '=' +
            window.escape(value) +
            ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
    }

    getCookie(name) {
        if (document.cookie.length > 0) {

            var start = document.cookie.indexOf(name + '=');

            if (start != -1) {
                start = start + name.length + 1;

                var end = document.cookie.indexOf(';', start);

                if (end == -1) {
                    end = document.cookie.length;
                }

                return window.unescape(document.cookie.substring(start, end));
            }
        }

        return null;
    }

    componentDidMount() {
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
            }
        });

        this.init();
    }

    init() {
        const rul = document.getElementById('ruler');

        const canvas = new fabric.Canvas('c', {
            preserveObjectStacking: true,
            selection: false,
            stopContextMenu: true,
            width: window.innerWidth - 10,
            height: 500
        });

        // 当 localStorage 中存在缓存并且缓存对象不为空时，提示是否读取缓存 
        const myCanvas = JSON.parse(localStorage.getItem('myCanvas')) || JSON.parse(this.getCookie('myCanvas')) || null;

        if ((localStorage.getItem('myCanvas') || this.getCookie('myCanvas')) && myCanvas.objects.length > 0) {
            if (confirm("继续编辑未完成的内容？")) {
                canvas.loadFromJSON(myCanvas, canvas.renderAll.bind(canvas), (o, object) => {
                    object.lockRotation = false;
                    object.hasBorders = true;
                    object.lockUniScaling = true;
                    object.centeredScaling = true;
                    object.setControlsVisibility({
                        mtr: false
                    });
                });
            } else {
                const rul1 = new ruler({
                    container: rul
                });
                rul1.api.setScale(0.5);
                rul1.api.setPos({
                    x: canvas.width / 2 - 16,
                    y: canvas.height / 2 - 16
                });

                this.setState({
                    canvas: canvas
                });
                return true;
            }
        }

        const rul1 = new ruler({
            container: rul
        });
        rul1.api.setScale(0.5);
        rul1.api.setPos({
            x: canvas.width / 2 - 16,
            y: canvas.height / 2 - 16
        });

        this.setState({
            canvas: canvas
        });
    }

    alertCookie() { alert(document.cookie) }

    alertLocalStorage() { alert(JSON.stringify(window.localStorage)) }

    render() {
        const { canvas } = this.state;

        return (
            <div id="main" style={styles.custom}>
                <div style={styles.tc}>
                    <div style={styles.tl}></div>
                    <div style={styles.tr}></div>
                    <div style={styles.bl}></div>
                    <div style={styles.br}></div>
                    <div style={styles.ch}></div>
                    <div style={styles.cv}></div>
                </div>
                <div id="ruler" style={styles.ruler}></div>
                <canvas id="c" style={styles.c}>您的浏览器不支持 canvas</canvas>
                <ButtonControlList canvas={canvas} />
            </div>
        );
    }
}

export default Custom;