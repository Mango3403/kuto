import React from 'react';
import { fabric } from 'fabric/dist/fabric';
import 'fabric-customise-controls';
import { ruler } from 'ruler.js/dist/ruler';
import CustomControl from '../components/CustomControl';
import del from '../static/images/control/handle_del.png';
import rotate from '../static/images/control/handle_rotate.png';
import zoom from '../static/images/control/handle_zoom.png';
import change from '../static/images/control/handle_change.png';
import right from '../static/images/control/right.svg';
import left from '../static/images/control/left.svg';
import top from '../static/images/control/top.svg';
import bottom from '../static/images/control/bottom.svg';

const WINDOW_WIDTH = window.innerWidth > 400 ? 400 : window.innerWidth - 10;

const styles = {
  signLayout: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: '500px',
  },
  signCenterVertical: {
    borderTop: '0.1px solid red',
    position: 'absolute',
    width: '10px',
    height: '10px',
    top: '250px',
    left: 'calc(100% / 2 - 5px)',
    zIndex: '1',
  },
  signCenterHorizontal: {
    borderRight: '0.1px solid red',
    position: 'absolute',
    width: '10px',
    height: '10px',
    top: '245px',
    left: 'calc(100% / 2 - 10px)',
    zIndex: '1',
  },
  canvasWrapper: {
    margin: '0 auto',
    width: WINDOW_WIDTH,
    height: '100vh',
  },
  ruler: {
    width: WINDOW_WIDTH,
    height: '500px',
  },
  canvas: {
    userSelect: 'none',
    border: '0.1px dotted #ccc',
  },
};

const Sign = () => (
  <div style={styles.signLayout}>
    <div style={styles.signCenterVertical} />
    <div style={styles.signCenterHorizontal} />
  </div>
);

class Custom extends React.Component {
  constructor() {
    super();
    this.state = {
      canvas: null,
      visible: false,
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

  setCookie = (name, value, expiredays) => {
    const exdate = new Date();

    exdate.setDate(exdate.getDate() + expiredays);

    document.cookie = `${name}=${window.escape(value)}${(expiredays == null) ? '' : `expires=${exdate.toGMTString()}`}`;
  }

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

  init() {
    const canvas = new fabric.Canvas('canvas', {
      preserveObjectStacking: true,
      selection: false,
      stopContextMenu: true,
      width: WINDOW_WIDTH,
      height: 500,
    });

    canvas.on('selection:created', () => {
      this.setState({
        visible: true,
      });
    });

    canvas.on('selection:cleared', () => {
      this.setState({
        visible: false,
      });
    });

    document.getElementsByClassName('canvas-wrapper').item(0).setAttribute('clientWidth', canvas.getWidth());

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
  }

  render() {
    return (
      <div className="canvas-wrapper" style={styles.canvasWrapper}>
        <Sign />
        <div id="ruler" style={styles.ruler} />
        <canvas id="canvas" style={styles.canvas}>
          你的浏览器不支持画布功能，尝试更换浏览器
        </canvas>
        <CustomControl canvas={this.state.canvas} visible={this.state.visible} />
      </div>
    );
  }
}

export default Custom;
