import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Image, Button, Menu, Dropdown, Grid } from 'semantic-ui-react';
import { fabric } from 'fabric/dist/fabric';
// import eventProxy from '../eventProxy'

// 大类
const options1 = [
  {
    key: 'all',
    text: '所有图片',
    value: 'all',
  },
  {
    key: 'image',
    text: '图片',
    value: 'image',
  },
  {
    key: 'icon',
    text: '剪切画',
    value: 'icon',
  },
];

// 小类
const options2 = [
  {
    key: 'all',
    text: '所有类型',
    value: 'all',
  },
  {
    key: 'cartoon',
    text: '卡通',
    value: 'cartoon',
  },
  {
    key: 'flower',
    text: '鲜花',
    value: 'flower',
  },
];

class Panel extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: [],
      saveImage: [],
    };
  }

  componentDidMount() {
    const { image } = this.props;
    const currentImage = [];

    for (const p of image) {
      // 获取每张图片options的值进行分类
      const narr = p.options.split(' ');

      // 将系统默认图片加入数组
      if (narr[narr.length - 1] === 'default') {
        currentImage.push(p);
      }
    }

    this.setState({
      currentImage,
      saveImage: currentImage,
    });
  }

  addImage = (e) => {
    const { canvas } = this.props;
    // 发布 openFilter 事件，由 EditImage 组件接收
    // setTimeout(() => eventProxy.trigger('openFilter'), 300)
    fabric.Image.fromURL(e.target.src, (img) => {
      img.scale(0.3);

      // img.setControlVisible('bl', false);

      canvas
        .viewportCenterObject(img)
        .add(img)
        .setActiveObject(img);
    });
  }

  setOption1 = (e, { value }) => {
    const { image } = this.props;

    const currentImage = [];

    if (value === 'all') {
      this.setState({ currentImage: image });
    } else {
      for (const p of image) {
        // 获取每张图片options的值进行分类
        const narr = p.options.split(' ');

        // 将符合大类的图片加入数组
        if (narr[0] === value) {
          currentImage.push(p);
        }
      }

      this.setState({
        currentImage,
        saveImage: currentImage,
      });
    }
  }

  setOption2 = (e, { value }) => {
    const { saveImage } = this.state;

    const arr = [];

    if (value === 'all') {
      this.setState({ currentImage: saveImage });
    } else {
      for (const p of saveImage) {
        // 获取每张图片options的值进行分类
        const narr = p.options.split(' ');

        // 将符合小类的图片加入数组
        if (narr[1] === value) {
          arr.push(p);
        }
      }

      this.setState({ currentImage: arr });
    }
  }

  clickFileInput = () => {
    const fileInput = ReactDOM.findDOMNode(this.refs.file);
    fileInput.click();
  }

  uploadImage = () => {
    const { files } = ReactDOM.findDOMNode(this.refs.file);
    const file = files[0];
    const reader = new FileReader();
    const { currentImage } = this.state;
    const obj = { key: currentImage.length, options: 'image cartoon nodefault', src: null };

    reader.readAsDataURL(file);
    reader.onload = () => {
      obj.src = reader.result;
      currentImage.unshift(obj);
      this.setState({ currentImage });
    };
  }

  render() {
    const styles = {
      inputFileButton: {
        position: 'absolute',
        left: 1000,
        top: 0,
        opacity: 0,
      },
    };

    return (
      <div style={{ overflow: 'hidden' }}>
        <Menu secondary>
          <Menu.Item>
            <Button primary size="tiny" onTouchEnd={this.clickFileInput}>上传</Button>
            <input style={styles.inputFileButton} type="file" ref="file" accept="image/*" onChange={this.uploadImage} />
          </Menu.Item>
          <Dropdown
            item
            options={options1}
            defaultValue={options1[0].value}
            onChange={this.setOption1}
          />
          <Dropdown
            item
            options={options2}
            defaultValue={options2[0].value}
            onChange={this.setOption2}
          />
        </Menu>

        <div style={{ height: '250px', overflowX: 'hidden' }}>
          <Grid>
            <Grid.Row columns={3}>
              {
                this.state.currentImage.map(p => (
                  <Grid.Column key={p.key} style={{ marginTop: '10px' }}>
                    <Image
                      bordered
                      height={100}
                      width={100}
                      src={p.src}
                      onTouchEnd={this.addImage}
                    />
                  </Grid.Column>
                ))
              }
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Panel;
