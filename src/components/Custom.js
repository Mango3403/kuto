import React from 'react'
import { fabric } from 'fabric'
import 'fabric-customise-controls'
import CustomControl from './CustomControl'
import del from '../assets/images/control/handle_del.png'
import rotate from '../assets/images/control/handle_rotate.png'
import zoom from '../assets/images/control/handle_zoom.png'
import change from '../assets/images/control/handle_change.png'

const Sign = () => (
    <div style={{ position: 'absolute', width: 'calc(100% - 10px)', height: '500px' }}>
        <div style={{ borderTop: '0.1px solid red', borderLeft: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '150px', left: 'calc((100% - 200px) / 2)', zIndex: '1' }}></div>
        <div style={{ borderTop: '0.1px solid red', borderRight: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '150px', right: 'calc((100% - 200px) / 2)', zIndex: '1' }}></div>
        <div style={{ borderLeft: '0.1px solid red', borderBottom: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '340px', left: 'calc((100% - 200px) / 2)', zIndex: '1' }}></div>
        <div style={{ borderRight: '0.1px solid red', borderBottom: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '340px', right: 'calc((100% - 200px) / 2)', zIndex: '1' }}></div>
        <div style={{ borderTop: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '250px', left: 'calc(100% / 2 - 5px)', zIndex: '1' }}></div>
        <div style={{ borderRight: '0.1px solid red', position: 'absolute', width: '10px', height: '10px', top: '245px', left: 'calc(100% / 2 - 10px)', zIndex: '1' }}></div>
    </div>
);

class Custom extends React.Component {
    state = {
        canvas: null
    }

    componentWillUpdate() {
        window.onbeforeunload = this.saveLocalStorage.bind(this);
    }

    saveLocalStorage() {
        const { canvas } = this.state

        this.setCookie('myCanvas', JSON.stringify(canvas.toJSON()))
        localStorage.setItem('myCanvas', JSON.stringify(canvas.toJSON()))
    }

    setCookie(name, value, expiredays) {
        const exdate = new Date()

        exdate.setDate(exdate.getDate() + expiredays)

        document.cookie =
            name +
            '=' +
            window.escape(value) +
            ((expiredays == null) ? '' : 'expires=' + exdate.toGMTString())
    }

    getCookie(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '=')

            if (start != -1) {
                start = start + name.length + 1

                let end = document.cookie.indexOf('', start)

                if (end == -1) {
                    end = document.cookie.length
                }

                return window.unescape(document.cookie.substring(start, end))
            }
        }

        return null
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
        })

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
        })

        this.init()
    }

    init() {
        const rul = document.getElementById('ruler')

        const canvas = new fabric.Canvas('c', {
            preserveObjectStacking: true,
            selection: false,
            stopContextMenu: true,
            width: window.innerWidth - 10,
            height: 500
        })

        // 当 localStorage 中存在缓存并且缓存对象不为空时，提示是否读取缓存 
        const myCanvas = JSON.parse(localStorage.getItem('myCanvas')) || JSON.parse(this.getCookie('myCanvas')) || null

        if ((localStorage.getItem('myCanvas') || this.getCookie('myCanvas')) && myCanvas.objects.length > 0) {
            if (window.confirm("继续编辑未完成的内容？")) {
                canvas.loadFromJSON(myCanvas, canvas.renderAll.bind(canvas), (o, object) => {
                    object.lockRotation = false
                    object.hasBorders = true
                    object.lockUniScaling = true
                    object.centeredScaling = true
                    object.setControlsVisibility({
                        mtr: false
                    })
                })
            }
        }

        const rul1 = new ruler({
            container: rul
        })
        rul1.api.setScale(0.5)
        rul1.api.setPos({
            x: canvas.width / 2 - 16,
            y: canvas.height / 2 - 16
        })

        this.setState({ canvas })
    }

    render() {
        return (
            <div style={{ margin: '15px 0', display: 'inline-block' }}>
                <Sign />
                <div id="ruler" style={{ position: 'absolute', width: 'calc(100% - 10px)', height: '500px' }}></div>
                <canvas id="c" style={{ userSelect: 'none', border: '0.1px dotted #ccc' }}>你的浏览器不支持画布功能，尝试更换浏览器</canvas>
                <CustomControl canvas={this.state.canvas} />
            </div>
        )
    }
}

export default Custom