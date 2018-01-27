import React from 'react';
import { fabric } from 'fabric/dist/fabric';
import 'fabric-customise-controls';
import { ruler } from 'ruler.js/dist/ruler';
import CustomControl from './CustomControl';
import Contact from './Contact';
import del from '../static/images/control/handle_del.png';
import rotate from '../static/images/control/handle_rotate.png';
import zoom from '../static/images/control/handle_zoom.png';
import change from '../static/images/control/handle_change.png';
import right from '../static/images/control/right.svg';
import left from '../static/images/control/left.svg';
import top from '../static/images/control/top.svg';
import bottom from '../static/images/control/bottom.svg';

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
    top: WINDOW_HEIGHT / 2 + 'px',
    left: WINDOW_WIDTH / 2 + 7.5 - 15 + 'px',
    zIndex: '1',
  },
  // 横向准心
  signCenterHorizontal: {
    borderRight: '0.1px solid red',
    position: 'absolute',
    width: '15px',
    height: '15px',
    top: WINDOW_HEIGHT / 2 - 7.5 + 'px',
    left: WINDOW_WIDTH / 2 - 15 + 'px',
    zIndex: '1',
  },
  canvasWrapper: {
    margin: '0 auto',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  ruler: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  canvas: {
    userSelect: 'none',
    // border: '0.1px dotted #ccc',
  },
};

// 准心
const Sign = () => (
  <div style={styles.signLayout}>
    <div style={styles.signCenterVertical} />
    <div style={styles.signCenterHorizontal} />
  </div>
);

class Custom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: undefined,
      visible: false,
      text: undefined,
      image: undefined,
      shape: undefined,
      edittext: false,
      editimage: false,
      editshape: false,
    };
  }

  componentWillMount() {
    fabric.Canvas.prototype.customiseControls({
      tl: {
        action: 'remove',
        cursor: 'pointer',
      },
      tr: {
        action: 'rotate',
        cursor: 'pointer',
      },
      br: {
        action: 'scale',
        cursor: 'pointer',
      },
      mb: {
        action: -'scaleY',
        cursor: 'pointer',
      },
      mt: {
        action: 'scaleY',
        cursor: 'pointer',
      },
      ml: {
        action: 'scaleX',
        cursor: 'pointer',
      },
      mr: {
        action: -'scaleX',
        cursor: 'pointer',
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
  }

  componentWillUpdate() {
    window.onbeforeunload = this.saveLocalStorage.bind(this);
  }

  // 设置cookie值
  setCookie = (name, value, expiredays) => {
    const exdate = new Date();

    exdate.setDate(exdate.getDate() + expiredays);

    document.cookie = `${name}=${window.escape(value)}${(expiredays == null) ? '' : `expires=${exdate.toGMTString()}`}`;
  }

  // 获取cookie取得缓存 —— 未使用
  getCookie = (name) => {
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(`${name}=`);

      if (start !== -1) {
        start = start + name.length + 1;

        let end = document.cookie.indexOf('', start);

        if (end === -1) {
          end = document.cookie.length;
        }

        return window.unescape(document.cookie.substring(start, end));
      }
    }

    return null;
  }

  saveLocalStorage() {
    const { canvas } = this.state;

    // this.setCookie('myCanvas', JSON.stringify(canvas.toJSON()))
    localStorage.setItem('myCanvas', JSON.stringify(canvas.toJSON()));
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
      if (e.target.type == 'text') {
        this.setState({
          text: e.target,
        });
      } else if (e.target.type == 'image') {
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
        visible: true,
      });
    });

    canvas.on('selection:updated', (e) => {
      if (e.target.type == 'text') {
        this.closeEditImage();
        this.closeEditShape();
        this.setState({
          text: e.target,
        });
      } else if (e.target.type == 'image') {
        this.closeEditText();
        this.closeEditShape();
        this.setState({
          image: e.target,
        });
      } else if (e.target.type === 'path') {
        return false;
      } else {
        this.closeEditText();
        this.closeEditImage();
        this.setState({
          shape: e.target,
        });
      }
    });

    canvas.on('selection:cleared', () => {
      this.setState({
        visible: false,
        edittext: false,
        editimage: false,
        editshape: false,
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

  /**
   * 编辑文本面板
   */
  openEditText = () => {
    this.setState({
      edittext: true
    });
  }
  closeEditText = () => this.setState({ edittext: false })
  editTextToggle = () => {
    this.setState({
      edittext: !this.state.edittext
    });
  }

  /**
   * 编辑图片面板
   */
  openEditImage = () => this.setState({ editimage: true })
  closeEditImage = () => this.setState({ editimage: false })
  editImageToggle = () => this.setState({ editimage: !this.state.editimage })

  /**
   * 编辑图形面板
   */
  openEditShape = () => this.setState({ editshape: true })
  closeEditShape = () => this.setState({ editshape: false })
  editShapeToggle = () => this.setState({ editshape: !this.state.editshape })

  render() {
    return (
      <div className="canvas-wrapper" style={styles.canvasWrapper}>
        <Sign />
        <div id="ruler" style={styles.ruler} />
        <canvas id="canvas" style={styles.canvas}>
          你的浏览器不支持画布功能，尝试更换浏览器
        </canvas>
        <CustomControl
          canvas={this.state.canvas}
          visible={this.state.visible}
          text={this.state.text}
          image={this.state.image}
          shape={this.state.shape}
          editimage={this.state.editimage}
          edittext={this.state.edittext}
          editshape={this.state.editshape}
          openEditText={this.openEditText}
          closeEditText={this.closeEditText}
          editTextToggle={this.editTextToggle}
          openEditImage={this.openEditImage}
          closeEditImage={this.closeEditImage}
          editImageToggle={this.editImageToggle}
          openEditShape={this.openEditShape}
          closeEditShape={this.closeEditShape}
          editShapeToggle={this.editShapeToggle}
        />
        <Contact />
      </div>
    );
  }
}

export default Custom;
