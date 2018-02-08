import React from 'react';
import { fabric } from 'fabric/dist/fabric';
import 'fabric-customise-controls';
import { Transition, Image } from 'semantic-ui-react';
import Controls from '../components/Controls';
import Contact from '../components/Contact';
import del from '../static/images/control/handle_del.png';
import rotate from '../static/images/control/handle_rotate.png';
import zoom from '../static/images/control/handle_zoom.png';
import change from '../static/images/control/handle_change.png';
import right from '../static/images/control/right.svg';
import left from '../static/images/control/left.svg';
import top from '../static/images/control/top.svg';
import bottom from '../static/images/control/bottom.svg';
import hintImage from '../static/images/hint.png';

let WINDOW_WIDTH = window.innerWidth / 2;
let WINDOW_HEIGHT = 500;

if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
}

const styles = {
    signLayout: {
        position: 'absolute',
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
    },
    // 纵向准心
    signCenterVertical: {
        borderTop: '0.1px solid red',
        position: 'absolute',
        width: '15px',
        height: '15px',
        top: `${WINDOW_HEIGHT / 2}px`,
        left: `${((WINDOW_WIDTH / 2) + 7.5) - 15}px`,
        zIndex: '1',
    },
    // 横向准心
    signCenterHorizontal: {
        borderRight: '0.1px solid red',
        position: 'absolute',
        width: '15px',
        height: '15px',
        top: `${(WINDOW_HEIGHT / 2) - 7.5}px`,
        left: `${(WINDOW_WIDTH / 2) - 15}px`,
        zIndex: '1',
    },
};

// 准心
const Sign = () => (
    <div style={styles.signLayout}>
        <div style={styles.signCenterVertical} />
        <div style={styles.signCenterHorizontal} />
    </div>
);

class Kuto extends React.Component {
    state = {
        hint: false,
        businessUserID: '2',
        layer: false,
        valLeft: '0.0',
        valTop: '0.0',
        valWidth: '0.0',
        valHeight: '0.0',
    };

    componentWillMount() {
        fabric.Canvas.prototype.customiseControls({
            tl: {
                action: (e, target) => {
                    // 删除IText时会报警告
                    target.canvas.remove(target);
                },
                cursor: 'default',
            },
            tr: {
                action: 'rotate',
                cursor: 'default',
            },
            br: {
                action: 'scale',
                cursor: 'default',
            },
            mb: {
                action: -'scaleY',
                cursor: 'default',
            },
            mt: {
                action: 'scaleY',
                cursor: 'default',
            },
            ml: {
                action: 'scaleX',
                cursor: 'default',
            },
            mr: {
                action: -'scaleX',
                cursor: 'default',
            },
        });

        fabric.Object.prototype.customiseCornerIcons({
            settings: {
                borderColor: 'black',
                cornerSize: 50,
                cornerPadding: 25,
            },
            tl: {
                icon: del,
            },
            tr: {
                icon: rotate,
            },
            br: {
                icon: zoom,
            },
            bl: {
                icon: change,
            },
            mb: {
                icon: bottom,
            },
            mt: {
                icon: top,
            },
            ml: {
                icon: left,
            },
            mr: {
                icon: right,
            },
        });

        fabric.Object.prototype.setControlsVisibility({
            mtr: false,
        });

        fabric.Object.prototype.padding = 20;
        fabric.Object.prototype.centeredScaling = true;
        fabric.Object.prototype.originX = 'center';
        fabric.Object.prototype.originY = 'center';
    }

    componentDidMount() {
        this.init();
        this.showHint();
    }

    componentWillUpdate() {
        window.onbeforeunload = this.saveLocalStorage.bind(this);
    }

    // 设置cookie值
    // setCookie = (name, value, expiredays) => {
    //   const exdate = new Date();

    //   exdate.setDate(exdate.getDate() + expiredays);

    //   document.cookie = `${name}=
    //   ${window.escape(value)}${(expiredays == null) ?
    //       ''
    //       : `expires=${exdate.toGMTString()}`}`;
    // }

    // 获取cookie取得缓存 —— 未使用
    // getCookie = (name) => {
    //   if (document.cookie.length > 0) {
    //     let start = document.cookie.indexOf(`${name}=`);

    //     if (start !== -1) {
    //       start = start + name.length + 1;

    //       let end = document.cookie.indexOf('', start);

    //       if (end === -1) {
    //         end = document.cookie.length;
    //       }

    //       return window.unescape(document.cookie.substring(start, end));
    //     }
    //   }

    //   return null;
    // }

    // 保存给定区域的图片
    saveImage = () => {
        const { canvas } = this.state;

        if (canvas.overlayImage !== null) {
            return canvas.toDataURL({
                format: 'png',
                left: canvas.overlayImage.left -
                    ((canvas.overlayImage.width * canvas.overlayImage.scaleX) / 2),
                top: canvas.overlayImage.top -
                    ((canvas.overlayImage.height * canvas.overlayImage.scaleY) / 2),
                height: canvas.overlayImage.height * canvas.overlayImage.scaleY,
                width: canvas.overlayImage.width * canvas.overlayImage.scaleX,
            });
        }
        return canvas.toDataURL({
            format: 'png',
            left: this.state.valLeft,
            top: this.state.valTop,
            height: this.state.valHeight,
            width: this.state.valWidth,
        });
    }

    // 清空画布
    clear = () => {
        this.state.canvas.clear();
    }

    // 置底
    sendToBack = () => {
        const { canvas } = this.state;
        canvas.sendToBack(canvas.getActiveObject());
    }

    // 置顶
    bringToFront = () => {
        const { canvas } = this.state;
        canvas.bringToFront(canvas.getActiveObject());
    }

    // 向上一层
    bringForward = () => {
        const { canvas } = this.state;
        canvas.bringForward(canvas.getActiveObject());
    }

    // 向下一层
    sendBackwards = () => {
        const { canvas } = this.state;
        canvas.sendBackwards(canvas.getActiveObject());
    }

    // 中心对齐
    center = () => {
        const { canvas } = this.state;
        canvas.getActiveObject().center().setCoords();
    }

    // 添加线段
    addLine = () => {
        const line = new fabric.Line([105, 250, 205, 250], {
            left: 200,
            top: 200,
            fill: null,
            stroke: '#000',
            strokeWidth: 1,
        });

        this.state.canvas.add(line).setActiveObject(line).renderAll();
    }

    // 添加圆形
    addCircle = () => {
        const circle = new fabric.Circle({
            left: 200,
            top: 200,
            radius: 30,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(circle).setActiveObject(circle).renderAll();
    }

    // 添加三角形
    addTriangle = () => {
        const triangle = new fabric.Triangle({
            left: 200,
            top: 200,
            width: 100,
            height: 100,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(triangle).setActiveObject(triangle).renderAll();
    }

    // 添加矩形
    addRect = () => {
        const rect = new fabric.Rect({
            left: 200,
            top: 200,
            width: 100,
            height: 80,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(rect).setActiveObject(rect).renderAll();
    }

    // 创建正多边形顶点
    regularPolygonPoints = (sideCount, radius) => {
        const sweep = (Math.PI * 2) / sideCount;
        const cx = radius;
        const cy = radius;
        const points = [];
        for (let i = 0; i < sideCount; i += 1) {
            const x = cx + (radius * Math.sin(i * sweep));
            const y = cy + (radius * -Math.cos(i * sweep));
            points.push({ x, y });
        }
        return points;
    }

    // 添加正五边形
    addPentagon = () => {
        const points = this.regularPolygonPoints(5, 30);
        const polygon = new fabric.Polygon(points, {
            left: 200,
            top: 200,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(polygon).setActiveObject(polygon).renderAll();
    }

    // 添加正六边形
    addHexagon = () => {
        const points = this.regularPolygonPoints(6, 30);
        const polygon = new fabric.Polygon(points, {
            left: 200,
            top: 200,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(polygon).setActiveObject(polygon).renderAll();
    }

    // 创建星形的顶点
    starPolygonPoints = (spikeCount, outerRadius, innerRadius) => {
        const cx = outerRadius;
        const cy = outerRadius;
        const sweep = Math.PI / spikeCount;
        const points = [];
        let angle = 0;

        for (let i = 0; i < spikeCount; i += 1) {
            let x = cx + (Math.sin(angle) * outerRadius);
            let y = cy + (-Math.cos(angle) * outerRadius);
            points.push({ x, y });
            angle += sweep;

            x = cx + (Math.sin(angle) * innerRadius);
            y = cy + (-Math.cos(angle) * innerRadius);
            points.push({ x, y });
            angle += sweep;
        }
        return points;
    }

    // 添加五角星形
    addPentagram = () => {
        const points = this.starPolygonPoints(5, 50, 25);
        const polygon = new fabric.Polygon(points, {
            left: 200,
            top: 200,
            fill: null,
            stroke: '#000',
            strokeWidth: 5,
        });
        this.state.canvas.add(polygon).setActiveObject(polygon).renderAll();
    }

    // 设置图形填充色
    setShapeFill = (color) => {
        const { canvas } = this.state;
        const obj = canvas.getActiveObject();
        obj.set('fill', color);
        canvas.renderAll();
    }

    // 设置图形边框色
    setShapeStroke = (color) => {
        const { canvas } = this.state;
        const obj = canvas.getActiveObject();
        obj.set('stroke', color);
        canvas.renderAll();
    }

    // 图形边框粗细 + 1
    strokeWidthPlus = () => {
        const { canvas } = this.state;
        const obj = canvas.getActiveObject();
        const value = obj.strokeWidth + 1;
        obj.set('strokeWidth', value);
        canvas.renderAll();
    }

    // 图形边框粗细 - 1
    strokeWidthMinus = () => {
        const { canvas } = this.state;
        const obj = canvas.getActiveObject();
        const value = obj.strokeWidth - 1;
        obj.set('strokeWidth', value);
        canvas.renderAll();
    }

    // 添加文字
    addText = (color) => {
        const { canvas } = this.state;

        const text = new fabric.IText('你的内容', {
            fontSize: 40,
            fill: '#949494', // 银色
            fontFamily: 'Arial', // 默认字体
            textAlign: 'center',
        });

        canvas.viewportCenterObject(text).add(text).setActiveObject(text).renderAll();

        this.setState({ text });
    }

    // 设置文字内容
    setText = (value) => {
        const { canvas } = this.state;

        const text = canvas.getActiveObject();

        text.text = value;

        canvas.renderAll();
    }

    // 设置文字填充色
    setTextFill = (color) => {
        const { canvas, text } = this.state;
        text.set('fill', color);
        canvas.renderAll();
    }

    // 设置文字字体
    setFontFamily = (e, { value }) => {
        const { canvas, text } = this.state;
        text.set('fontFamily', value);
        canvas.renderAll();
    }

    // 添加图片
    addImage = (e) => {
        const { canvas } = this.state;
        // 发布 openFilter 事件，由 EditImage 组件接收
        // setTimeout(() => eventProxy.trigger('openFilter'), 300)
        fabric.Image.fromURL(e.target.src, (img) => {
            img.scale(0.3);

            // img.setControlVisible('bl', false);

            canvas.viewportCenterObject(img).add(img).setActiveObject(img);
        }, canvas.renderAll.bind(canvas));
    }

    // 取消灰度化
    setGrayClear = () => {
        const { canvas } = this.state;
        const image = canvas.getActiveObject();
        image.filters = [];
        image.applyFilters();
        canvas.renderAll();
    }

    // 设置图片灰度化
    setGray = () => {
        const { canvas } = this.state;
        const image = canvas.getActiveObject();
        image.filters[0] = new fabric.Image.filters.Grayscale();
        image.filters[1] = new fabric.Image.filters.RemoveColor({
            color: '#fff',
            distance: 0,
        });
        image.applyFilters();
        canvas.renderAll();
    }

    // 灰度值增加
    distancePlus = () => {
        const { canvas } = this.state;
        const image = canvas.getActiveObject();
        image.filters[1].distance = image.filters[1].distance + 0.01;
        image.applyFilters();
        canvas.renderAll();
    }

    // 灰度值减少
    distanceMinus = () => {
        const { canvas } = this.state;
        const image = canvas.getActiveObject();
        image.filters[1].distance = image.filters[1].distance - 0.01;
        image.applyFilters();
        canvas.renderAll();
    }

    // 改变灰度值
    changeDistance = e => {
        const { canvas } = this.state;
        const image = canvas.getActiveObject();
        image.filters[1].distance = parseFloat(e.target.value);
        image.applyFilters();
        canvas.renderAll();
    }

    // 绘制\控制模式开关
    drawingMode = () => {
        const { canvas } = this.state;
        canvas.isDrawingMode = !canvas.isDrawingMode;
    }

    // 当未获得BusinessUserId参数时弹出提示框
    showHint = () => {
        const request = this.GetRequest();

        if (!request.BusinessUserID) {
            setTimeout(() => {
                this.setState({
                    hint: true,
                });
                setTimeout(() => {
                    this.setState({
                        hint: false,
                    });
                }, 5000);
            }, 1000);
        } else {
            this.setState({
                businessUserID: request.BusinessUserID,
            });
        }
    }

    // 获取url参数
    GetRequest() {
        const url = window.location.search; //  获取url中"?"符后的字串
        let theRequest = {};
        if (url.indexOf('?') !== -1) {
            let str = url.substr(1);
            let strs = str.split('&');
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
            }
        }
        return theRequest;
    }

    // 本地缓存
    saveLocalStorage() {
        const { canvas } = this.state;

        // this.setCookie('myCanvas', JSON.stringify(canvas.toJSON()))
        localStorage.setItem('myCanvas', JSON.stringify(canvas.toJSON()));
    }

    // Controls组件方法
    closeShapePanel = () => {
        this.refs.controls.closeShapePanel();
    }
    closeTextPanel = () => {
        this.refs.controls.closeTextPanel();
    }
    closeFilterImagePanel = () => {
        this.refs.controls.closeFilterImagePanel();
    }
    closeLayerPanel = () => {
        this.refs.controls.closeLayerPanel();
    }

    // 初始化
    init() {
        const canvas = window._canvas = new fabric.Canvas('canvas', {
            preserveObjectStacking: true,
            selection: false,
            stopContextMenu: true,
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
        });

        canvas.on('selection:created', (e) => {
            if (e.target.type === 'i-text') {
                this.setState({
                    text: e.target,
                });
            } else if (e.target.type === 'image') {
                this.setState({
                    image: e.target,
                });
            } else if (e.target.type === 'path') {
                return false;
            } else {
                this.setState({
                    shape: e.target,
                });
            }

            this.setState({
                layer: true,
            });
        });

        canvas.on('selection:updated', (e) => {
            if (e.target.type === 'i-text') {
                this.closeShapePanel();
                this.closeFilterImagePanel();
                this.closeLayerPanel();
                this.setState({
                    text: e.target,
                });
            } else if (e.target.type === 'image') {
                this.closeShapePanel();
                this.closeTextPanel();
                this.closeLayerPanel();
                this.setState({
                    image: e.target,
                });
            } else if (e.target.type === 'path') {
                return false;
            } else {
                this.closeTextPanel();
                this.closeFilterImagePanel();
                this.closeLayerPanel();
                this.setState({
                    shape: e.target,
                });
            }
        });

        canvas.on('selection:cleared', () => {
            this.closeShapePanel();
            this.closeFilterImagePanel();
            this.closeLayerPanel();
            this.closeTextPanel();
            this.setState({
                layer: false,
            });
        });

        canvas.on('after:render', () => {
            const lefts = [];
            const tops = [];
            const bottoms = [];
            const rights = [];

            canvas.forEachObject((obj) => {
                const bound = obj.getBoundingRect();
                bound.right = bound.left + bound.width;
                bound.bottom = bound.top + bound.height;

                lefts.push(bound.left);
                tops.push(bound.top);
                rights.push(bound.right);
                bottoms.push(bound.bottom);
            });

            const bottomMax = Math.max.apply(null, bottoms);
            const rightMax = Math.max.apply(null, rights);
            const leftMin = Math.min.apply(null, lefts);
            const topMin = Math.min.apply(null, tops);

            this.setState({
                valHeight: (bottomMax - topMin).toFixed(1),
                valWidth: (rightMax - leftMin).toFixed(1),
                valLeft: leftMin,
                valTop: topMin,
            });
        });

        // 当 localStorage 中存在缓存并且缓存对象不为空时，提示是否读取缓存
        const myCanvas = JSON.parse(localStorage.getItem('myCanvas')) || null;
        // const myCanvas =
        //    JSON.parse(localStorage.getItem('myCanvas')) ||
        //    JSON.parse(this.getCookie('myCanvas')) ||
        //    null

        // if ((localStorage.getItem('myCanvas') || this.getCookie('myCanvas')) && myCanvas.objects.length > 0) {}
        if (localStorage.getItem('myCanvas') && myCanvas.objects.length > 0) {
            if (window.confirm('继续编辑未完成的内容？')) {
                canvas.loadFromJSON(myCanvas, canvas.renderAll.bind(canvas));
            }
        }

        this.setState({ canvas });

        // document.getElementsByClassName('canvas-wrapper').item(0).setAttribute('clientWidth', canvas.getWidth());
    }

    render() {
        return (
            <div>
                <Sign />
                <div id="ruler"></div>
                <canvas id="canvas">你的浏览器不支持画布功能，尝试更换浏览器</canvas>
                <Controls
                    ref="controls"
                    canvas={this.state.canvas}
                    businessUserID={this.state.businessUserID}
                    layer={this.state.layer}

                    text={this.state.text}
                    image={this.state.image}
                    shape={this.state.shape}

                    clear={this.clear}

                    sendToBack={this.sendToBack}
                    bringToFront={this.bringToFront}
                    bringForward={this.bringForward}
                    sendBackwards={this.sendBackwards}
                    center={this.center}

                    addLine={this.addLine}
                    addCircle={this.addCircle}
                    addTriangle={this.addTriangle}
                    addRect={this.addRect}
                    addPentagon={this.addPentagon}
                    addHexagon={this.addHexagon}
                    addPentagram={this.addPentagram}
                    setShapeFill={this.setShapeFill}
                    setShapeStroke={this.setShapeStroke}
                    strokeWidthMinus={this.strokeWidthMinus}
                    strokeWidthPlus={this.strokeWidthPlus}

                    addText={this.addText}
                    setText={this.setText}
                    setTextFill={this.setTextFill}
                    setFontFamily={this.setFontFamily}

                    addImage={this.addImage}
                    setGray={this.setGray}
                    setGrayClear={this.setGrayClear}
                    distancePlus={this.distancePlus}
                    distanceMinus={this.distanceMinus}
                    changeDistance={this.changeDistance}

                    drawingMode={this.drawingMode}

                    saveImage={this.saveImage}
                />
                <Contact />
                <div style={{ position: 'fixed', top: '90px', left: window.innerWidth / 2 - 128, zIndex: -1, }}>
                    <Transition.Group animation="fade" duration={500}>
                        {this.state.hint && <Image src={hintImage} />}
                    </Transition.Group>
                </div>
            </div>
        );
    }
}

export default Kuto;
